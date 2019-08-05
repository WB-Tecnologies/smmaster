from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    email = models.EmailField('email', unique=True)

    def __str__(self):
        return f'{self.first_name} {self.last_name} <{self.email}>'
