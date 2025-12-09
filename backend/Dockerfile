FROM python:3.13 

ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# --- SAFEGUARD ---
# If a venv folder was accidentally copied, remove it.
RUN rm -rf venv/

# This is the final, correct command for Cloud Run.
CMD exec gunicorn --bind :$PORT --workers 1 --threads 8 --timeout 0 sps_cms.wsgi:application