from django.urls import path

from .views import (get_user, create_user, login_user,
                    verify_user_email, verify_user_token)

urlpatterns = [
  path('user/', get_user, name='get_user_details'),
  path('user/signup/', create_user, name='create_user'),
  path('user/signin/', login_user, name='login_user'),
  path('user/verify/email/', verify_user_email, name='verify_user_email'),
  path('user/verify/', verify_user_token, name='verify_user_token'),
]
