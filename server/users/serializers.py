from rest_framework import serializers
from .models import User, Tokens


class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = '__all__'
    extra_kwargs = {'password': {'write_only': True}}

  def create(self, validated_data):
    return User.objects.create_user(**validated_data)

  def update(self, instance, validated_data):
    instance.email = validated_data.get('email', instance.email)
    instance.name = validated_data.get('name', instance.name)
    instance.is_leetcode_connected = validated_data.get(
      'is_leetcode_connected', instance.is_leetcode_connected)
    instance.is_verified = validated_data.get(
      'is_verified', instance.is_verified)
    instance.save()
    return instance


class TokenSerializer(serializers.ModelSerializer):
  class Meta:
    model = Tokens
    fields = '__all__'
