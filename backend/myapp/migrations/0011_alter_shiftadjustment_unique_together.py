# Generated by Django 4.2.1 on 2023-05-26 03:05

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0010_alter_shiftadjustment_shift'),
    ]

    operations = [
        migrations.AlterUniqueTogether(
            name='shiftadjustment',
            unique_together={('employee', 'shift')},
        ),
    ]