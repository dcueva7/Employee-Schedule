from rest_framework import serializers
from django.contrib.auth.models import User

from . import models

class ShiftAdjustmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.ShiftAdjustment
        fields = '__all__'

class AvailabilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Availability
        fields = '__all__'


class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Employee
        fields = ['id','first_name', 'last_name', 'email', 'phone', 'color', 'user']

class AddEmployeeSerializer(serializers.ModelSerializer):
    user = serializers.SlugRelatedField(queryset = User.objects.all(), slug_field = 'username')
    class Meta:
        model = models.Employee
        fields = ['first_name','last_name', 'user', 'email']


class ShiftSerializer(serializers.ModelSerializer):
    student = EmployeeSerializer(read_only=False)
    class Meta:
        model = models.Shift
        fields = ['id','student', 'start_time', 'end_time', 'date']
    
class CreateShiftSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Shift
        fields = '__all__'
        
class AvailableShiftSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.AvailableShift
        fields = '__all__'

class UsernameChangeSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username']

