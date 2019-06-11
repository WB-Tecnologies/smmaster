# Local settings for dev environment

DEBUG = True

EMAIL_HOST = 'debugmail.io'
EMAIL_PORT = 25
EMAIL_HOST_USER = ''
EMAIL_HOST_PASSWORD = ''
EMAIL_BACKEND = 'django.core.mail.backends.smtp.EmailBackend'


RAVEN_CONFIG = {}

CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.dummy.DummyCache',
    }
}

SESSION_ENGINE = 'django.contrib.sessions.backends.db'

COMPRESS_OFFLINE = False

ENVIRONMENT_NAME = "Vagrant server"
ENVIRONMENT_COLOR = "gray"

INTERNAL_IPS = ['127.0.0.1']


"""
import os
import raven

RAVEN_CONFIG = {
    'dsn': 'https://<key>:<secret>@sentry.io/<project>',
    # If you are using git, you can also automatically configure the
    # release based on the git info.
    'release': raven.fetch_git_sha(os.path.dirname(os.pardir)),
}
"""


CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.dummy.DummyCache',
    }
}

SESSION_ENGINE = 'django.contrib.sessions.backends.db'
