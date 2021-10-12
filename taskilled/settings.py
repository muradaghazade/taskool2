"""
Django settings for taskilled project.

Generated by 'django-admin startproject' using Django 3.2.3.

For more information on this file, see
https://docs.djangoproject.com/en/3.2/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/3.2/ref/settings/
"""

from pathlib import Path
import os
import datetime
from django.urls import reverse_lazy

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/3.2/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'django-insecure-k9y5!e4y2qll*%7i92_0hxzt1uf3ju9wkc!ek0)0ez1!5qy#81'

# SECURITY WARNING: don't run with debug turned on in production!
# DEBUG = False if os.getenv('DEBUG') else True
DEBUG = True

ALLOWED_HOSTS = ['*']


# Application definition

INSTALLED_APPS = [
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'social_django',
    # local apps
    'accounts.apps.AccountsConfig',
    'core.apps.CoreConfig',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'social_django.middleware.SocialAuthExceptionMiddleware',
]

ROOT_URLCONF = 'taskilled.urls'

AUTHENTICATION_BACKENDS = (
    'social_core.backends.google.GoogleOAuth2',
    'social_core.backends.linkedin.LinkedinOAuth2',
    'django.contrib.auth.backends.ModelBackend', 
)




TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
                'social_django.context_processors.backends', # add this
                'social_django.context_processors.login_redirect', # add this
                'social_django.context_processors.backends',  
                'social_django.context_processors.login_redirect',
            ],
        },
    },
]

WSGI_APPLICATION = 'taskilled.wsgi.application'


# Database
# https://docs.djangoproject.com/en/3.2/ref/settings/#databases
import time
time.sleep(2)
DATABASES = {
        'default': {
            'ENGINE': 'django.db.backends.postgresql',
            'NAME': os.getenv('POSTGRES_DB', 'taskilled'),
            'USER': os.getenv('POSTGRES_USER', 'taskilled'),
            'PORT': os.getenv('POSTGRES_PORT', 5432),
            'PASSWORD': os.getenv('POSTGRES_PASSWORD', '12345'),
            'HOST': os.getenv('POSTGRES_HOST', '127.0.0.1'),
        }
    #     'default': {
    #     'ENGINE': 'django.db.backends.sqlite3',
    #     'NAME': BASE_DIR / 'db.sqlite3',
    # }
    }


# Password validation
# https://docs.djangoproject.com/en/3.2/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]


# Internationalization
# https://docs.djangoproject.com/en/3.2/topics/i18n/

LANGUAGE_CODE = 'en-us'

TIME_ZONE = 'UTC'

USE_I18N = True

USE_L10N = True

USE_TZ = True

SIMPLE_JWT = {
    'ACCESS_TOKEN_LIFETIME': datetime.timedelta(days=30),
}

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/3.2/howto/static-files/

STATIC_URL = '/static/'

# if DEBUG:
#    STATIC_ROOT = os.path.join(BASE_DIR, 'static')
# else:
STATICFILES_DIRS = [
    BASE_DIR / 'static',
]

# Base url to serve media files
MEDIA_URL = '/media/'

REST_FRAMEWORK = {
    'DEFAULT_AUTHENTICATION_CLASSES': (
        'rest_framework_simplejwt.authentication.JWTAuthentication',
    )
}

# Path where media is stored
MEDIA_ROOT = os.path.join(BASE_DIR, 'media/')

AUTH_USER_MODEL = 'accounts.User'

# Default primary key field type
# https://docs.djangoproject.com/en/3.2/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'


SOCIAL_AUTH_LINKEDIN_OAUTH2_KEY = '78gcdjmq4by6gt'         #Client ID
SOCIAL_AUTH_LINKEDIN_OAUTH2_SECRET = 'yuKE7baDqg0QdbD3'  #Client 
SOCIAL_AUTH_LINKEDIN_OAUTH2_SCOPE =  ['r_liteprofile'] 
SOCIAL_AUTH_LINKEDIN_OAUTH2_FIELD_SELECTORS = ['email-address', 'formatted-name', 'public-profile-url', 'picture-url']
SOCIAL_AUTH_LINKEDIN_OAUTH2_EXTRA_DATA = [
    ('id', 'id'),
    ('formattedName', 'name'),
    ('emailAddress', 'email_address'),
    ('pictureUrl', 'picture_url'),
    ('publicProfileUrl', 'profile_url'),
]


SOCIAL_AUTH_GOOGLE_OAUTH2_KEY = '919523282879-qb6dols3kt9dpssg67r54r904r7qntu3.apps.googleusercontent.com'
SOCIAL_AUTH_GOOGLE_OAUTH2_SECRET = 'iXi1Zp17jN9G4cJ_OEwZwLjT'


# SOCIAL_AUTH_REDIRECT_IS_HTTPS = True
SOCIAL_AUTH_URL_NAMESPACE = 'social'

LOGIN_URL = reverse_lazy('core:login')
LOGIN_REDIRECT_URL = reverse_lazy('core:profile')
LOGOUT_URL = reverse_lazy('core:login')
LOGOUT_REDIRECT_URL = reverse_lazy('core:login')

EMAIL_BACKEND = "django.core.mail.backends.smtp.EmailBackend"
EMAIL_HOST = "smtp.gmail.com"
EMAIL_USE_TLS = True
EMAIL_PORT = 587
EMAIL_HOST_USER = 'taskilled@gmail.com'
EMAIL_HOST_PASSWORD = 'gaehqjqzfbxykujt'