from celery import shared_task
from scripts import leetcode_scraper

from utils.send_email import send_email, send_email_db_update, get_date
from .models import LeetcodeUpdatedData
from .serializers import LeetcodeUpdatedDataSerializer, LeetcodeDailyDataSerializer


@shared_task
def send_async_email(recipient_email, type_of_email, **kwargs):
  if type_of_email == 'general':
    subject = kwargs.get('subject', None)
    data = kwargs.get('data', None)
    if data is None:
      raise ValueError('Data is required.')

    return send_email(recipient_email, subject, data)


@shared_task
def update_leetcode_stats_all_users(leetcode_obj):
  user = leetcode_obj.get('user_id')
  email = user.get('email')
  leetcode_username = leetcode_obj.get('leetcode_username')
  print("Starting: ", email)

  # Scrape leetcode data
  new_leetcode_stats, error = leetcode_scraper.get_leetcode_data(
    leetcode_username)

  if error is not None:
    raise Exception(error)

  # Calculate Difference
  diff = {
    'total_questions': new_leetcode_stats['total_questions'] - leetcode_obj['total_questions'],
    'easy_questions': new_leetcode_stats['easy_questions'] - leetcode_obj['easy_questions'],
    'medium_questions': new_leetcode_stats['medium_questions'] - leetcode_obj['medium_questions'],
    'hard_questions': new_leetcode_stats['hard_questions'] - leetcode_obj['hard_questions'],
  }

  leetcode_updated_data_instance = LeetcodeUpdatedData.objects.get(
    user_id=user.get('id'))
  updated_data_serializer = LeetcodeUpdatedDataSerializer(
    instance=leetcode_updated_data_instance, data=new_leetcode_stats, partial=True)
  updated_data_serializer.is_valid(raise_exception=True)
  updated_data_serializer.save()

  daily_data_serializer = LeetcodeDailyDataSerializer(
    data={'user_id': user.get('id'), 'leetcode_username': leetcode_username, **diff})
  daily_data_serializer.is_valid(raise_exception=True)
  daily_data_serializer.save()

  # Send Email
  send_email_db_update(
    to_email=email,
    subject=f'Leetcode Stats for - {get_date()}',
    data=updated_data_serializer.data,
    diff=diff
  )
  print("Ending: ", email)
  return email
