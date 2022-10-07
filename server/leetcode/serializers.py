from functools import partial
from rest_framework import serializers

from .models import LeetcodeInitialData, LeetcodeUpdatedData
from users.serializers import UserSerializer


class LeetcodeUpdatedDataSerializer(serializers.ModelSerializer):
  class Meta:
    model = LeetcodeUpdatedData
    fields = '__all__'


class LeetcodeInitialDataSerializer(serializers.ModelSerializer):
  class Meta:
    model = LeetcodeInitialData
    fields = '__all__'

  def create(self, validated_data):
    """Create both initial and updated data objects and update user model"""
    leetcode_initial_data = LeetcodeInitialData.objects.create(
      **validated_data)
    LeetcodeUpdatedData.objects.create(**validated_data)

    # Update field 'is_leetcode_connected' to True on user model
    user = validated_data.pop('user')
    user_serializer = UserSerializer(
      user, data={'is_leetcode_connected': True}, partial=True)
    if user_serializer.is_valid(raise_exception=True):
      user_serializer.save()

    return leetcode_initial_data
