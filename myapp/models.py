from django.db import models
from django.contrib.auth.models import User

# Create your models here.

DAYS_OF_WEEK = [
    ('M', 'Monday'),
    ('T', 'Tuesday'),
    ('W', 'Wednesday'),
    ('Th', 'Thursday'),
    ('F', 'Friday'),
]

class Employee(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    email = models.EmailField(max_length=254)

class Shift(models.Model):
    student = models.ForeignKey(Employee, on_delete=models.CASCADE)
    start_time = models.TimeField(blank=True)
    end_time = models.TimeField(blank=True)
    date = models.DateField(auto_now_add=True)

class Availability(models.Model):
    student = models.ForeignKey(Employee, on_delete=models.CASCADE)
    start_time = models.TimeField(blank=True)
    end_time = models.TimeField(blank=True)
    day = models.CharField(max_length=3, choices=DAYS_OF_WEEK)

