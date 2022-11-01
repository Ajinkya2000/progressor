web: gunicorn --pythonpath server server.wsgi --log-file -
worker: cd server && celery -A server.celery worker --loglevel=INFO