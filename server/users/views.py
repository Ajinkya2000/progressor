from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .serializers import UserSerializer
from utils.common import get_tokens_for_user, internal_server_error_message
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


@api_view(['POST', 'PATCH'])
@permission_classes([IsAuthenticated])
def verify_user(request):
  if request.method == 'POST':
    user = request.user
    client_url = request.data.get('client_url')

    if user.is_verified == True:
      return Response(data={'detail': 'User already verified!'}, status=status.HTTP_400_BAD_REQUEST)

    token = get_tokens_for_user(user).get('access')
    verification_url = f'{client_url}/verify?token={token}'

    try:
      send_verification_email(
        to_email=user.email, verification_url=verification_url)
      return Response(data={'message': 'Email sent successfully!'}, status=status.HTTP_200_OK)
    except Exception as e:
      return Response(data={'errors': internal_server_error_message(str(e))}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

  if request.method == 'PATCH':
    user = request.user
    serializer = UserSerializer(instance=user, data={
                                'is_verified': True}, partial=True)

    try:
      if serializer.is_valid(raise_exception=True):
        user = serializer.save()
        tokens = get_tokens_for_user(user)
        return Response(data = {'user': serializer.data, 'tokens': tokens}, status=status.HTTP_200_OK)
    except Exception as e:
      if serializer.errors:
        return Response(data={'errors': serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

      return Response(data={'errors': internal_server_error_message()}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)