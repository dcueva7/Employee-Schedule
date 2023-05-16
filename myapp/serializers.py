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



class ShiftSerializer(serializers.ModelSerializer):
    student = serializers.StringRelatedField()
    class Meta:
        model = models.Shift
        fields = ['student', 'start_time', 'end_time', 'date']