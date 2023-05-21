from rest_framework import serializers

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
        fields = ['id','first_name', 'last_name', 'color', 'user']



class ShiftSerializer(serializers.ModelSerializer):
    student = EmployeeSerializer(read_only=False)
    class Meta:
        model = models.Shift
        fields = ['id','student', 'start_time', 'end_time', 'date']
    
class CreateShiftSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Shift
        fields = '__all__'