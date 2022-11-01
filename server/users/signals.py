from django.db.models.signals import post_save
from django.dispatch import receiver

from .models import User


@receiver(post_save, sender=User)
def update_name_after_google_login(sender, instance, created, **kwargs):
  if not created and instance.is_google_user:
    sender.objects.filter(id=instance.id).update(
      name=f'{instance.first_name} {instance.last_name}', is_verified=True)
