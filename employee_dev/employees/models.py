from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager

class CustomAccountManager(BaseUserManager):
    def create_user(self, email, password, first_name, last_name, employee_number, department_name, **other_fields):
        if not email:
            raise ValueError('You must provide an email address')

        if not employee_number:
            raise ValueError('You must provide an employee number')

        email = self.normalize_email(email)
        user = self.model(email=email, first_name=first_name, last_name=last_name, employee_number=employee_number, department_name=department_name, **other_fields)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, password, first_name, last_name, employee_number, department_name, **other_fields):
        other_fields.setdefault('is_staff', True)
        other_fields.setdefault('is_superuser', True)
        other_fields.setdefault('is_active', True)

        if other_fields.get('is_staff') is not True:
            raise ValueError('Superuser must be assigned to is_staff=True')

        if other_fields.get('is_superuser') is not True:
            raise ValueError('Superuser must be assigned to is_superuser==True')

        return self.create_user(email, password, first_name, last_name, employee_number, department_name, **other_fields)

class Employee(AbstractBaseUser, PermissionsMixin):
    id = models.AutoField(primary_key=True)
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    employee_number = models.CharField(max_length=16, unique=True)
    department_name = models.CharField(max_length=100, choices=[
        ('Tooling Products', 'Tooling Products'), 
        ('Application Engineering', 'Application Engineering'), 
        ('Machine Engineering', 'Machine Engineering'), 
        ('Manufacturing & Assembly', 'Manufacturing & Assembly')]
        )
    is_verified = models.BooleanField(default=False)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    objects = CustomAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'employee_number', 'department_name']

    def __str__(self):
        return self.email