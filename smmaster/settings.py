"""
Django settings for smmaster project.

Generated by 'django-admin startproject' using Django 1.11.3.

For more information on this file, see
https://docs.djangoproject.com/en/1.11/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/1.11/ref/settings/
"""

import os
import re
import sys

# Build paths inside the project like this: os.path.join(BASE_DIR, ...)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

TESTING = 'test' in sys.argv

if __name__ in ['settings', 'smmaster.settings']:
    sys.path.insert(0, os.path.join(BASE_DIR, 'smmaster'))

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/1.11/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!
SECRET_KEY = 'M-jqwQ:{<8zXxJT#Apy*%kCt>]%a.$o(<FK%(!,?@;uV=T<4ns'

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['127.0.0.1', '10.1.1.156']


# Application definition

INSTALLED_APPS = [
    'django_admin_env_notice',  # should be before django.contrib.admin

    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.sites',

    # 3rd party
    'debug_toolbar',

    'raven.contrib.django.raven_compat',

    # Custom apps
    'accounts',
]

MIDDLEWARE = [

    'raven.contrib.django.raven_compat.middleware.Sentry404CatchMiddleware',

    'debug_toolbar.middleware.DebugToolbarMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]


# Urls to be ignored be sentry 404 catcher

IGNORABLE_404_URLS = (
    re.compile('/foo'),
)


ROOT_URLCONF = 'smmaster.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
                'django_admin_env_notice.context_processors.from_settings',
            ],
        },
    },
]

WSGI_APPLICATION = 'smmaster.wsgi.application'


# Database
# https://docs.djangoproject.com/en/1.11/ref/settings/#databases

DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.postgresql',
        'NAME': 'smmaster',
        'USER': 'smmaster_user',
        'PASSWORD': 'QKUtS8a1',
        'HOST': '127.0.0.1',
        'PORT': 5432,
    }
}


# Password validation
# https://docs.djangoproject.com/en/1.11/ref/settings/#auth-password-validators

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
# https://docs.djangoproject.com/en/1.11/topics/i18n/

LANGUAGE_CODE = 'ru-RU'

TIME_ZONE = 'Europe/Moscow'

USE_I18N = True

USE_L10N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/1.11/howto/static-files/

STATIC_URL = '/static/'
STATIC_ROOT = os.path.join(BASE_DIR, 'webroot', 'static')
MEDIA_URL = '/media/'
MEDIA_ROOT = os.path.join(BASE_DIR, 'webroot', 'media')

STATICFILES_FINDERS = (
    'django.contrib.staticfiles.finders.FileSystemFinder',
    'django.contrib.staticfiles.finders.AppDirectoriesFinder',)

SITE_ID = 1


# celery settings
broker_connection_link = 'redis://localhost:6379/0'
BROKER_URL = CELERY_RESULT_BACKEND = broker_connection_link
CELERY_ACCEPT_CONTENT = ('json', )

AUTH_USER_MODEL = 'accounts.User'

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,

    'root': {
        'level': 'WARNING',
        'handlers': ['sentry'],
    },

    'handlers': {
        'file': {
            'class': 'logging.FileHandler',
            'filename': os.path.join(BASE_DIR, 'var', 'smmaster.log'),
        },
        'console': {
            'class': 'logging.StreamHandler',
        },

        'sentry': {
            'level': 'ERROR',  # To capture more than ERROR, change to WARNING, INFO, etc.
            'class': 'raven.contrib.django.raven_compat.handlers.SentryHandler',
            'tags': {'custom-tag': 'x'},
        },

    },
    'loggers': {
        'django': {
            'handlers': ['file'],
            'level': 'INFO',
            'propagate': True,
        },
    },
}

if TESTING:
    CACHES = {
        'default': {
            'BACKEND': 'django.core.cache.backends.dummy.DummyCache',
        }
    }
    LOGGING = None
else:
    SESSION_ENGINE = 'django.contrib.sessions.backends.cache'
    CACHES = {
        "default": {
            "BACKEND": "django_redis.cache.RedisCache",
            "LOCATION": "redis://127.0.0.1:6379/2",
            "OPTIONS": {
                "CLIENT_CLASS": "django_redis.client.DefaultClient"
            },
            "KEY_PREFIX": "smmaster"
        }
    }

DEFAULT_FROM_EMAIL = 'no-reply@smmaster.ru'

try:
    from .settings_local import *  # noqa
except ImportError:
    pass

TEMPLATES[0]['OPTIONS']['debug'] = DEBUG
