"""
Django settings for sps_cms project.
Hybrid Settings: Auto-detects Local vs. Cloud Run.
"""
from corsheaders.defaults import default_headers
from pathlib import Path
import os
import sys
import dotenv

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Load environment variables from .env file (for local dev)
dotenv.load_dotenv(os.path.join(BASE_DIR, '.env'), override=True)

# ==============================================================================
# CORE SECURITY & ENVIRONMENT CHECKS
# ==============================================================================

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = os.getenv('SECRET_KEY', 'django-insecure-fallback-change-me-in-prod')

# DETECT ENVIRONMENT
# Cloud Run automatically sets 'K_SERVICE'.
# If it is missing, we assume we are on your Local Machine.
# IS_ON_CLOUDRUN = 'K_SERVICE' in os.environ or 'CLOUD_RUN_JOB' in os.environ

# DETECT ENVIRONMENT
# We check for Google's keys OR our own custom key
IS_ON_CLOUDRUN = (
    'K_SERVICE' in os.environ 
    or 'CLOUD_RUN_JOB' in os.environ 
    or os.getenv('SPS_CLOUD_MODE') == 'true'  # <--- Our Custom Key
)

# DEBUG Logic:
# Local Machine -> DEBUG is True
# Cloud Run     -> DEBUG is False
# DEBUG = not IS_ON_CLOUDRUN

# Use the environment variable if it exists, otherwise default to the "Safe" logic
raw_debug = os.getenv('DEBUG')
if raw_debug is not None:
    DEBUG = raw_debug.lower() == 'true'
else:
    DEBUG = not IS_ON_CLOUDRUN

# ALLOWED HOSTS
# If we are local, allow localhost. If on Cloud, allow the wildcard or specific env var.
raw_allowed_hosts = os.getenv('DJANGO_ALLOWED_HOSTS', 'localhost,127.0.0.1')
if raw_allowed_hosts == '*':
    ALLOWED_HOSTS = ['*']
else:
    ALLOWED_HOSTS = [host.strip().strip('"').strip("'") for host in raw_allowed_hosts.split(',') if host.strip()]

ALLOWED_HOSTS.append('.ngrok-free.dev')
# ==============================================================================
# SECURITY HEADERS (Proxy Fix)
# ==============================================================================

# This is critical for Cloud Run to handle HTTPS correctly
SECURE_PROXY_SSL_HEADER = ('HTTP_X_FORWARDED_PROTO', 'https')

# CSRF Trusted Origins
CSRF_TRUSTED_ORIGINS = [
    'https://*.run.app', 
    'http://localhost:8080', 
    'http://127.0.0.1:8080',
    'http://localhost:8000',
    'http://127.0.0.1:8000',
    'https://heteromorphic-amado-deflexed.ngrok-free.dev',
    'https://*.ngrok-free.dev'
]
if os.getenv('CLOUDRUN_SERVICE_URL'):
    CSRF_TRUSTED_ORIGINS.append(os.getenv('CLOUDRUN_SERVICE_URL'))


# ==============================================================================
# APPS & MIDDLEWARE
# ==============================================================================

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    # Third Party
    'rest_framework',
    'corsheaders',
    # Local
    'jobs.apps.JobsConfig',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'whitenoise.middleware.WhiteNoiseMiddleware', # WhiteNoise handles static files
    'django.contrib.sessions.middleware.SessionMiddleware',
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]

ROOT_URLCONF = 'sps_cms.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
            ],
        },
    },
]

WSGI_APPLICATION = 'sps_cms.wsgi.application'


# ==============================================================================
# DATABASE (The Switch)
# ==============================================================================

# ==============================================================================
# DATABASE (The Fail-Safe Logic)
# ==============================================================================

# Check if DB_HOST exists. If it does, we MUST be trying to connect to Cloud SQL.
if os.getenv('DB_HOST'):
    # --- PRODUCTION (Cloud Run / Postgres) ---
    print(" --> DETECTED DB_HOST: USING POSTGRES", file=sys.stderr)
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql',
            'NAME': os.getenv('DB_NAME'),
            'USER': os.getenv('DB_USER'),
            'PASSWORD': os.getenv('DB_PASSWORD'),
            'HOST': os.getenv('DB_HOST'),
        }
    }
else:
    # --- LOCAL (SQLite) ---
    print(" --> NO DB_HOST FOUND: USING LOCAL SQLITE", file=sys.stderr)
    DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.sqlite3',
            'NAME': BASE_DIR / 'db.sqlite3',
        }
    }


# ==============================================================================
# PASSWORDS & AUTH
# ==============================================================================

AUTH_PASSWORD_VALIDATORS = [
    {'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator'},
    {'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator'},
    {'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator'},
    {'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator'},
]


# ==============================================================================
# INTERNATIONALIZATION
# ==============================================================================

LANGUAGE_CODE = 'en-us'
TIME_ZONE = 'UTC'
USE_I18N = True
USE_TZ = True


# ==============================================================================
# STATIC FILES
# ==============================================================================

STATIC_URL = 'static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'
STATICFILES_STORAGE = 'whitenoise.storage.CompressedManifestStaticFilesStorage'


# ==============================================================================
# LOGGING & FINAL TWEAKS
# ==============================================================================

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

CORS_ALLOWED_ORIGINS = [
    "http://localhost:8080",
    "http://127.0.0.1:8080",
    "http://localhost:5500",
    "http://127.0.0.1:5500",
    "https://storage.googleapis.com",
    "https://tommckechnie-90.github.io"
]

CORS_ALLOW_HEADERS = list(default_headers) + [
    "ngrok-skip-browser-warning",
]
# Only enforce SSL Redirects if we are truly in Production
if IS_ON_CLOUDRUN:
    SECURE_SSL_REDIRECT = True
    SESSION_COOKIE_SECURE = True
    CSRF_COOKIE_SECURE = True
    SECURE_HSTS_SECONDS = 31536000
else:
    # Local dev doesn't need SSL enforcement
    SECURE_SSL_REDIRECT = False
    SESSION_COOKIE_SECURE = False
    CSRF_COOKIE_SECURE = False

# Simple debug print to confirm mode
print("--------------------------------------------------", file=sys.stderr)
print(f"!!! SETTINGS LOADED !!!", file=sys.stderr)
print(f"!!! MODE: {'CLOUD RUN (Postgres)' if IS_ON_CLOUDRUN else 'LOCAL (SQLite)'}", file=sys.stderr)
print(f"!!! DEBUG: {DEBUG}", file=sys.stderr)
print("--------------------------------------------------", file=sys.stderr)

# ====================================================
# EMAIL SETTINGS
# ====================================================
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'
EMAIL_HOST = 'smtp.gmail.com'
EMAIL_PORT = 587
EMAIL_USE_TLS = True
EMAIL_HOST_USER = os.getenv('EMAIL_HOST_USER')
EMAIL_HOST_PASSWORD = os.getenv('EMAIL_HOST_PASSWORD')
DEFAULT_FROM_EMAIL = os.getenv('DEFAULT_FROM_EMAIL')

