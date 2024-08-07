from django.contrib import admin
from .models import User


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    exclude = ("password",)
    search_fields = ["username", "first_name", "last_name"]
    list_display = ("username", "first_name", "last_name", "last_login")
