# Generated by Django 4.2.2 on 2023-10-09 23:54

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('myapp', '0017_department_employee_department'),
    ]

    operations = [
        migrations.AlterField(
            model_name='employee',
            name='department',
            field=models.ForeignKey(default='TSC', null=True, on_delete=django.db.models.deletion.SET_NULL, to='myapp.department'),
        ),
    ]
