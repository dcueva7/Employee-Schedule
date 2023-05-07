from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

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

    def __str__(self):
        return self.first_name + ' ' + self.last_name

class Shift(models.Model):
    student = models.ForeignKey(Employee, on_delete=models.CASCADE)
    start_time = models.TimeField(blank=True)
    end_time = models.TimeField(blank=True)
    date = models.DateField(default=timezone.now)

    def __str__(self):
        return self.student.first_name + ' shift on ' + str(self.date)

class Availability(models.Model):
    student = models.ForeignKey(Employee, on_delete=models.CASCADE)
    start_time = models.TimeField(blank=True)
    end_time = models.TimeField(blank=True)
    day = models.CharField(max_length=3, choices=DAYS_OF_WEEK)

