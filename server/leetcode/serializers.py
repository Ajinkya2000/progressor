from rest_framework import serializers

from .models import LeetcodeInitialData, LeetcodeUpdatedData

class LeetcodeUpdatedDataSerializer(serializers.ModelSerializer):
  class Meta:
    model = LeetcodeUpdatedData
    fields = '__all__'

class LeetcodeInitialDataSerializer(serializers.ModelSerializer):
  class Meta:
    model = LeetcodeInitialData
    fields = '__all__'
  
  def create(self, validated_data):
    """Create both initial and updated data objects"""
    leetcode_initial_data = LeetcodeInitialData.objects.create(**validated_data)
    LeetcodeUpdatedData.objects.create(**validated_data)
    return leetcode_initial_data
  
