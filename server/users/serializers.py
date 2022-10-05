from rest_framework import serializers
from .models import User


class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = '__all__'

  def create(self, validated_data):
    return User.objects.create_user(**validated_data)

  def update(self, instance, validated_data):
    instance.email = validated_data.get('email', instance.email)
    instance.name = validated_data.get('name', instance.name)
    instance.save()
    return instance
