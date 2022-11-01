from celery import shared_task
from utils.send_email import send_verification_email


@shared_task
def send_async_email(recipient_email, type_of_email, **kwargs):
  if type_of_email == 'verification':
    verification_url = kwargs.get('verification_url', None)
    if verification_url is None:
      raise ValueError('Verification URL is not provided or is invalid')

    return send_verification_email(recipient_email, verification_url)
