#!/bin/sh

# Wait for the Cloud SQL socket to be available
while ! nc -z -v /cloudsql/sps-global-recruitment:europe-west2:sps-jobs-db 5432; do
  echo "Waiting for the Cloud SQL proxy to be ready..."
  sleep 1
done

echo "Cloud SQL proxy is ready. Starting Gunicorn."

# Run the Gunicorn server
# The --workers flag is a good practice for production
gunicorn --bind :$PORT --workers 1 --threads 8 --timeout 0 sps_cms.wsgi:application