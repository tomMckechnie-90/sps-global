FROM python:3.13 

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

# Install system dependencies needed to build psycopg2 from source
RUN apt-get update && apt-get install -y \
    build-essential \
    libpq-dev \
    && rm -rf /var/lib/apt/lists/*

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# --- SAFEGUARD ---
# If a venv folder was accidentally copied, remove it.
RUN rm -rf venv/

ENV SECRET_KEY=building_static_files
RUN python manage.py collectstatic --noinput

# This is the final, correct command for Cloud Run.
CMD exec gunicorn --bind 0.0.0.0:$PORT --workers 1 --threads 8 --timeout 0 --log-level debug --access-logfile - --error-logfile - sps_cms.wsgi:application