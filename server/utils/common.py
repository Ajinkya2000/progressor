from rest_framework_simplejwt.tokens import RefreshToken


def get_tokens_for_user(user):
  refresh = RefreshToken.for_user(user)

  return {
    'refresh': str(refresh),
    'access': str(refresh.access_token),
  }


def internal_server_error_message(message="Something went wrong! Please try again later."):
  return {'message': [message]}
