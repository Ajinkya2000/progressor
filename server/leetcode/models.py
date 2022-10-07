from django.db import models

from users.models import User


class LeetcodeInitialData(models.Model):
  """Model for storing the original leetcode data after the user has registered for the very first time"""
  user = models.OneToOneField(User, on_delete=models.CASCADE)
  leetcode_username = models.CharField(
    max_length=64, verbose_name='Leetcode Username')
  total_questions = models.IntegerField(
    default=0, verbose_name='Total Questions Solved')
  easy_questions = models.IntegerField(
    default=0, verbose_name='Easy Questions Solved')
  medium_questions = models.IntegerField(
    default=0, verbose_name='Medium Questions Solved')
  hard_questions = models.IntegerField(
    default=0, verbose_name='Hard Questions Solved')
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)

  class Meta:
    verbose_name = 'Leetcode Initial Data'
    verbose_name_plural = 'Leetcode Initial Data'

  def __str__(self) -> str:
    return f'{self.user.name}\'s Leetcode Initial Data'


class LeetcodeUpdatedData(models.Model):
  """Model for daily updating the total_questions and other related fields"""
  user = models.OneToOneField(User, on_delete=models.CASCADE)
  leetcode_username = models.CharField(
    max_length=64, verbose_name='Leetcode Username')
  total_questions = models.IntegerField(
    default=0, verbose_name='Total Questions Solved')
  easy_questions = models.IntegerField(
    default=0, verbose_name='Easy Questions Solved')
  medium_questions = models.IntegerField(
    default=0, verbose_name='Medium Questions Solved')
  hard_questions = models.IntegerField(
    default=0, verbose_name='Hard Questions Solved')
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)

  class Meta:
    verbose_name = 'Leetcode Updated Data'
    verbose_name_plural = 'Leetcode Updated Data'

  def __str__(self) -> str:
    return f'{self.user.name}\'s Leetcode Updated Data'


class LeetcodeDailyData(models.Model):
  """Model to store the daily data for the number and difficulty of questions solved"""
  user = models.ForeignKey(User, on_delete=models.CASCADE)
  total_questions = models.IntegerField(
    default=0, verbose_name='Total Questions Solved')
  easy_questions = models.IntegerField(
    default=0, verbose_name='Easy Questions Solved')
  medium_questions = models.IntegerField(
    default=0, verbose_name='Medium Questions Solved')
  hard_questions = models.IntegerField(
    default=0, verbose_name='Hard Questions Solved')
  created_at = models.DateTimeField(auto_now_add=True)
  updated_at = models.DateTimeField(auto_now=True)

  class Meta:
    verbose_name = 'Daily Leetcode Data'
    verbose_name_plural = 'Daily Leetcode Data'

  def __str__(self) -> str:
    return f'{self.user.name}\'s Daily Leetcode Data'
