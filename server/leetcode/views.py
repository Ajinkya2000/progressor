from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status

from scripts import leetcode_scraper

from .serializers import LeetcodeInitialDataSerializer
from .models import LeetcodeInitialData
from utils.common import internal_server_error_message
from utils.send_email import send_email
from .tasks import send_async_email


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def get_initial_leetcode_data(request):
  if request.method == 'POST':
    user = request.user

    # Check request for leetcode_username
    leetcode_username = request.data.get('leetcode_username', None)
    if leetcode_username is None:
      return Response(data={'detail': 'Leetcode username is required.'}, status=status.HTTP_400_BAD_REQUEST)

    # Check already exists
    already_exists = LeetcodeInitialData.objects.filter(
      leetcode_username=leetcode_username).exists()
    if already_exists:
      return Response(data={'detail': 'Leetcode Initial Data with this user already exists.'}, status=status.HTTP_400_BAD_REQUEST)

    # Scrape leetcode data
    initial_leetcode_data, error = leetcode_scraper.get_leetcode_data(
      leetcode_username)
    if error is not None:
      return Response(data={'detail': error}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    initial_data_serializer = LeetcodeInitialDataSerializer(
      data={'user_id': user.id, 'leetcode_username': leetcode_username, **initial_leetcode_data})

    try:
      if initial_data_serializer.is_valid(raise_exception=True):
        initial_data_serializer.save()
        send_async_email.delay(
          recipient_email=user.email,
          type_of_email='general',
          subject='Progressor - Your leetcode account is successfully connected.',
          data=initial_data_serializer.data
        )

        return Response(data=initial_data_serializer.data, status=status.HTTP_201_CREATED)
    except Exception as e:
      if initial_data_serializer.errors:
        return Response(data={'errors': initial_data_serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

      return Response(data={'errors': internal_server_error_message(str(e))}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
