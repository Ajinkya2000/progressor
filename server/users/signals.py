from unicodedata import name
from django.db.models.signals import post_save
from django.dispatch import receiver

from .models import User


@receiver(post_save, sender=User)
def update_name_after_google_login(sender, instance, created, **kwargs):
  # instance.first_name is only present when logged in through Google Oauth
  # TODO: update this below if to check if is_google_login is True and remove instance.first_name check
  if not created and instance.first_name:
    sender.objects.filter(id=instance.id).update(
      name=f'{instance.first_name} {instance.last_name}', is_verified=True)
