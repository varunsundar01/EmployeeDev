from django.contrib import admin
from .models import Employee
from django.contrib.auth.admin import UserAdmin

class UserAdminConfig(UserAdmin):
    search_fields = ('email', 'first_name', 'last_name', 'employee_number', 'department_name')
    list_filter = ('email', 'employee_number', 'is_staff', 'is_active')
    ordering = ('employee_number',)
    list_display = ('email', 'first_name', 'last_name', 'employee_number', 'department_name', 'is_active', 'is_staff')

    fieldsets = (
        (None, {'fields': ('email', 'password', 'employee_number', 'first_name', 'last_name', 'department_name')}),
        ('Permissions', {'fields': ('is_staff', 'is_active')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'employee_number', 'first_name', 'last_name', 'password1', 'password2', 'department_name')
            }),
    )

admin.site.register(Employee, UserAdminConfig)