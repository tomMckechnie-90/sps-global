# Use the official lightweight Python image.
# https://hub.docker.com/_/python
FROM python:3.11-slim

# Allow statements and log messages to immediately appear in the Knative logs
ENV PYTHONUNBUFFERED True

# Copy local code to the container image.
ENV APP_HOME /app
WORKDIR $APP_HOME
COPY . .

# Install production dependencies.
# We use a virtualenv to isolate dependencies.
RUN python3 -m venv /venv && \
    /venv/bin/pip install --upgrade pip && \
    /venv/bin/pip install -r requirements.txt

# Make the run.sh script executable
RUN chmod +x /app/run.sh

# Use the virtualenv
ENV PATH="/venv/bin:$PATH"

# Run the web service on container startup. Here we use the run.sh script
# which waits for the Cloud SQL proxy to be ready before starting Gunicorn.
CMD ["/app/run.sh"]