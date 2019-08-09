from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from accounts.models import User


@admin.register(User)
class UserCustomAdmin(UserAdmin):

    list_display_links = ('email',)
    list_display = ('email', 'first_name', 'last_name')
