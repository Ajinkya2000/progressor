from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .models import Tokens
from .serializers import UserSerializer, TokenSerializer
from utils.common import get_tokens_for_user, internal_server_error_message, get_user_id_from_token
from utils.send_email import send_verification_email


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user(request):
  serializer = UserSerializer(instance=request.user)
  if request.method == 'GET':
    return Response(data=serializer.data, status=status.HTTP_200_OK)


@api_view(['POST'])
def create_update_user(request):
  if request.method == 'POST':
    serializer = UserSerializer(data=request.data)

    try:
      if serializer.is_valid(raise_exception=True):
        user = serializer.save()
        tokens = get_tokens_for_user(user)

        return Response(data={'tokens': tokens}, status=status.HTTP_201_CREATED)
    except Exception as e:
      if serializer.errors:
        return Response(data={'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

      return Response(data={'errors': internal_server_error_message()}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def verify_user_email(request):
  if request.method == 'POST':
    user = request.user
    client_url = request.data.get('client_url')

    token = get_tokens_for_user(user).get('access')
    token_serializer = TokenSerializer(data={'user': user.id, 'verify_email_token': token})

    try:
      if token_serializer.is_valid(raise_exception=True):
        token_serializer.save()

        verification_url = f'{client_url}/verify?token={token}'
        send_verification_email(
          to_email=user.email, verification_url=verification_url)

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
      return Response(data={'detail': 'Token (from email) is required'}, status=status.HTTP_400_BAD_REQUEST)

    user_id = get_user_id_from_token(email_token)
    Tokens.objects.filter(user=user_id, verify_email_token=email_token).exists()

    
