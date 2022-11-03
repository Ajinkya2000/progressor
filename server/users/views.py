import requests
from decouple import config

from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Tokens, User
from .serializers import UserSerializer, TokenSerializer
from utils.common import internal_server_error_message, get_token_for_user, get_user_id_from_token
from .tasks import send_async_email


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user(request):
  serializer = UserSerializer(instance=request.user)
  if request.method == 'GET':
    return Response(data=serializer.data, status=status.HTTP_200_OK)


@api_view(['POST'])
def create_user(request):
  if request.method == 'POST':
    serializer = UserSerializer(data=request.data)

    try:
      if serializer.is_valid(raise_exception=True):
        new_user = serializer.save()
        login_url = f"{config('DJANGO_SERVER_URI')}/auth/token/"
        r = requests.post(login_url, data={
          'username': new_user.email,
          'password': request.data.get('password'),
          'client_id': config('DJANGO_OAUTH_CLIENT_ID'),
          'client_secret': config('DJANGO_OAUTH_CLIENT_SECRET'),
          'grant_type': 'password'
        }).json()

        tokens = {'access': r.get('access_token'),
                  'refresh': r.get('refresh_token')}
        return Response(data={'tokens': tokens}, status=status.HTTP_201_CREATED)
    except Exception as e:
      if serializer.errors:
        return Response(data={'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

      return Response(data={'errors': internal_server_error_message()}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
def login_user(request):
  if request.method == 'POST':
    login_url = f"{config('DJANGO_SERVER_URI')}/auth/token/"
    r = requests.post(login_url, data={
      'username': request.data.get('email'),
      'password': request.data.get('password'),
      'client_id': config('DJANGO_OAUTH_CLIENT_ID'),
      'client_secret': config('DJANGO_OAUTH_CLIENT_SECRET'),
      'grant_type': 'password'
    }).json()

    if r.get('error', None) is not None:
      return Response(data={'detail': r.get('error_description', 'User not found.')}, status=status.HTTP_401_UNAUTHORIZED)

    data = {'access': r.get('access_token'),
            'refresh': r.get('refresh_token')}
    return Response(data=data, status=status.HTTP_201_CREATED)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def verify_user_email(request):
  if request.method == 'POST':
    user = request.user
    client_url = request.data.get('client_url')
    user_serializer = UserSerializer(instance=user)

    # Create Token with user id
    token = get_token_for_user(user_serializer.data.get('id'))
    token_serializer = TokenSerializer(
      data={'user': user.id, 'verify_email_token': token})

    try:
      if token_serializer.is_valid(raise_exception=True):
        token_serializer.save()

        verification_url = f'{client_url}/verify/{token}'
        send_async_email.delay(
          recipient_email=user.email,
          type_of_email='verification',
          verification_url=verification_url
        )

        return Response(data={'message': 'Email sent successfully!'}, status=status.HTTP_200_OK)
    except Exception as e:
      if token_serializer.errors:
        return Response(data={'errors': token_serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

      return Response(data={'errors': internal_server_error_message(str(e))}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['PATCH'])
def verify_user_token(request):
  if request.method == 'PATCH':
    email_token = request.data.get('email_token', None)

    if not email_token:
      return Response(data={'detail': 'Token (from email) is required.'}, status=status.HTTP_400_BAD_REQUEST)

    try:
      user_id = get_user_id_from_token(email_token)
      token_exists_for_user = Tokens.objects.filter(
        user=user_id, verify_email_token=email_token).exists()

      if not token_exists_for_user:
        return Response(data={'detail': 'Invalid Token!'}, status=status.HTTP_401_UNAUTHORIZED)

      user_serializer = UserSerializer(instance=User.objects.get(
        id=user_id), data={'is_verified': True}, partial=True)
      
      if user_serializer.is_valid(raise_exception=True):
        user_serializer.save()
        return Response(data={'user': user_serializer.validated_data}, status=status.HTTP_200_OK)
    except Exception as e:
      return Response(data={'errors': internal_server_error_message(str(e))}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
