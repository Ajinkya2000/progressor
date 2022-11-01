import jwt
from decouple import config


def internal_server_error_message(message="Something went wrong! Please try again later."):
  return {'message': [message]}

# TODO: Add expiration time
def get_token_for_user(user_id):
  encoded_jwt = jwt.encode(
    {'user_id': user_id}, config('JWT_KEY'), algorithm="HS256")
  return encoded_jwt


def get_user_id_from_token(token):
  decoded_jwt = jwt.decode(token, config('JWT_KEY'), algorithms=['HS256'])
  return decoded_jwt.get('user_id')
