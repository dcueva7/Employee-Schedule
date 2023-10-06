from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone
from datetime import time

# Create your models here.

DAYS_OF_WEEK = [
    ('M', 'Monday'),
    ('T', 'Tuesday'),
    ('W', 'Wednesday'),
    ('Th', 'Thursday'),
    ('F', 'Friday'),
]

class Department(models.Model):
    department = models.CharField(max_length=10)

    def __str__(self):
        return 'Department: ' + self.department
    

class Employee(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    email = models.EmailField(max_length=254)
    color = models.CharField(max_length=20, default='red')
    department = models.ForeignKey(Department, null=True, on_delete=models.SET_NULL)

    def __str__(self):
        return self.first_name + ' ' + self.last_name
    

class Shift(models.Model):
    student = models.ForeignKey(Employee, on_delete=models.CASCADE)
    start_time = models.TimeField(blank=True)
    end_time = models.TimeField(blank=True)
    date = models.DateField(default=timezone.now)

    class Meta:
        unique_together = ('student', 'start_time', 'end_time', 'date')

    def __str__(self):
        return self.student.first_name + ' shift on ' + str(self.date)
    

class Availability(models.Model):
    student = models.ForeignKey(Employee, on_delete=models.CASCADE)
    start_time = models.TimeField(blank=True)
    end_time = models.TimeField(blank=True)
    day = models.CharField(max_length=3, choices=DAYS_OF_WEEK)

    def __str__(self):
        return self.student + 's availabilaity'
    
class ShiftAdjustment(models.Model):
    employee = models.CharField(max_length=30)
    shift = models.ForeignKey(Shift, null=True, on_delete=models.SET_NULL)
    type_of_coverage = models.CharField(max_length=10)
    start = models.TimeField(null=True)
    end = models.TimeField(null=True)
    date = models.DateField(null=True)
    approved = models.BooleanField()
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta:
        unique_together = ('user', 'start', 'end', 'date')

    def __str__(self):
        return self.employee + ' is requesting an adjustment on ' + str(self.date)
    
class AvailableShift(models.Model):
    start = models.TimeField(null=True)
    end = models.TimeField(null=True)
    date = models.DateField(null=True)

    def __str__(self):
        return 'Available Shift on ' + str(self.date)
    


