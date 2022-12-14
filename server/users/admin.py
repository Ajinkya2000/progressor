from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from django.contrib.auth.models import Group

from .models import User, Tokens


class CustomUserAdmin(UserAdmin):
  """Define admin model for custom User model with no username field."""

  readonly_fields = ['created_at', 'updated_at']

  fieldsets = (
    (None, {'fields': ('email', 'password')}),
    (('Personal info'), {'fields': (
      'name', 'is_leetcode_connected', 'is_verified', 'is_google_user')}),
    (('Personal info (Google)'), {'fields': ('first_name', 'last_name',)}),
    (('Permissions'), {'fields': ('is_active',
     'is_staff', 'is_superuser', 'user_permissions')}),
    (('Important dates'), {'fields': (
      'last_login', 'created_at', 'updated_at')}),
  )
  add_fieldsets = (
    (None, {
      'classes': ('wide',),
      'fields': ('email', 'password1', 'password2'),
    }),
  )
  list_display = ('email', 'id', 'name', 'is_staff')
  search_fields = ('email', 'name')
  ordering = ('email',)


admin.site.register(User, CustomUserAdmin)
admin.site.register(Tokens)
admin.site.unregister(Group)
