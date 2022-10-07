from rest_framework import serializers
from .models import User


class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ['id', 'email', 'name', 'is_active', 'created_at', 'updated_at', 'is_leetcode_connected']

  def create(self, validated_data):
    return User.objects.create_user(**validated_data)

  def update(self, instance, validated_data):
    instance.email = validated_data.get('email', instance.email)
    instance.name = validated_data.get('name', instance.name)
    instance.is_leetcode_connected = validated_data.get('is_leetcode_connected', instance.is_leetcode_connected)
    instance.save()
    return instance
