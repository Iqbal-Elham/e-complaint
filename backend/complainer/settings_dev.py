from .settings_base import *

# Security
SECRET_KEY = "django-insfaetretawetaweraweri30294029389$#$(#)*d4(m#40pbn+f6-6+"
JWT_EXPIRATION_TIME_SECONDS = 172800
ALLOWED_HOSTS = ["*"]
CORS_ALLOW_ALL_ORIGINS = True

DEBUG = True

# Database
DATABASES = {
    "default": {"ENGINE": "django.db.backends.sqlite3", "NAME": BASE_DIR / "db.sqlite3"}
}
