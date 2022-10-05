from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from .serializers import UserSerializer
from .utils import get_tokens_for_user, internal_server_error_message


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user(request):
  serializer = UserSerializer(instance=request.user)
  if request.method == 'GET':
    return Response(serializer.data, status=status.HTTP_200_OK)


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
