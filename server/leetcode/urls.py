from django.urls import path
from .views import get_initial_leetcode_data

urlpatterns = [
  path('leetcode/init/', get_initial_leetcode_data, name='Initial Leetcode Data'),
]
