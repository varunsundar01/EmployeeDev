# Generated by Django 3.2 on 2021-04-23 00:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('employees', '0004_employee_is_verified'),
    ]

    operations = [
        migrations.AlterField(
            model_name='employee',
            name='is_verified',
            field=models.BooleanField(default=False),
        ),
    ]