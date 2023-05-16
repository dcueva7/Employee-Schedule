from rest_framework import serializers

from . import models

class AvailabilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Availability
        fields = '__all__'


class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Employee
        fields = '__all__'

class EmployeeNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Employee
        fields = ['first_name']



class ShiftSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Shift
        fields = '__all__'