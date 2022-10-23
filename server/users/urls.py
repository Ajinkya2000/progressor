from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

from .views import (get_user, create_update_user,
                    verify_user_email, verify_user_token)

urlpatterns = [
  path('user/', get_user, name='get_user_details'),
  path('user/signup/', create_update_user, name='create_user'),
  path('user/signin/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
  path('user/access/', TokenRefreshView.as_view(), name='token_refresh'),
  path('user/verify/email/', verify_user_email, name='verify_user_email'),
  path('user/verify/', verify_user_token, name='verify_user_token'),
]
