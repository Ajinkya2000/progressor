from rest_framework_simplejwt.tokens import RefreshToken, AccessToken
from users.models import User


def get_tokens_for_user(user):
  refresh = RefreshToken.for_user(user)

  return {
    'refresh': str(refresh),
    'access': str(refresh.access_token),
  }


def internal_server_error_message(message="Something went wrong! Please try again later."):
  return {'message': [message]}


def get_user_id_from_token(token_str):
  token_obj = AccessToken(token_str)
  user_id = token_obj.get('user_id')
  return user_id
