import os
import celery

import raven

from raven.contrib.celery import register_signal, register_logger_signal

from django.conf import settings  # noqa
# set the default Django settings module for the 'celery' program.
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'smmaster.settings')


class Celery(celery.Celery):

    """ Configure celery with raven """

    def on_configure(self):
        if not getattr(settings, 'CELERY_RAVEN_DSN', None):
            # for no send raven reports from dev server
            return
        client = raven.Client(settings.CELERY_RAVEN_DSN)
        # register a custom filter to filter out duplicate logs
        register_logger_signal(client)
        # hook into the Celery error handler
        register_signal(client)


app = Celery('smmaster')

# Using a string here means the worker will not have to
# pickle the object when using Windows.
app.config_from_object('django.conf:settings')
app.autodiscover_tasks(lambda: settings.INSTALLED_APPS)
