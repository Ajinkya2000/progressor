from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager


class UserManager(BaseUserManager):
  """Define a model manager for User model with no username field."""

  def _create_user(self, email, password=None, **extra_fields):
    """Create and save a User with the given email and password."""
    if not email:
      raise ValueError('Email is required.')

    email = self.normalize_email(email)

    user = self.model(email=email, **extra_fields)
    user.set_password(password)
    user.save(using=self._db)
    return user

  def create_user(self, email, password=None, **extra_fields):
    extra_fields.setdefault('is_staff', False)
    extra_fields.setdefault('is_superuser', False)
    return self._create_user(email, password, **extra_fields)

  def create_superuser(self, email, password=None, **extra_fields):
    """Create and save a SuperUser with the given email and password."""
    extra_fields.setdefault('is_staff', True)
    extra_fields.setdefault('is_superuser', True)

    if extra_fields.get('is_staff') is not True:
      raise ValueError('Superuser must have is_staff=True.')
    if extra_fields.get('is_superuser') is not True:
      raise ValueError('Superuser must have is_superuser=True.')

    return self._create_user(email, password, **extra_fields)

class User(AbstractUser):
  username = None
  email = models.EmailField(unique=True)
  name = models.CharField(max_length=32)
  is_leetcode_connected = models.BooleanField(default=False, verbose_name = 'Leetcode Connected?')
  is_verified = models.BooleanField(default=False, verbose_name = 'Email Verified')
  is_google_user = models.BooleanField(default=True, verbose_name = 'Google User')
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)

  USERNAME_FIELD = 'email'
  REQUIRED_FIELDS = ['name']

  objects = UserManager()

  class Meta:
    verbose_name = 'User'
    verbose_name_plural = 'Users'

  def __str__(self) -> str:
    return f'{self.name} ({self.email})'


class Tokens(models.Model):
  user = models.ForeignKey(User, on_delete=models.CASCADE)
  verify_email_token = models.CharField(max_length=512, verbose_name='Verify Email Token')

  class Meta:
    verbose_name = 'Tokens'
    verbose_name_plural = 'Tokens'
  
  def __str__(self) -> str:
    return f'{self.user.name}\'s Tokens'
