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
        fields = ['id','student', 'start_time', 'end_time', 'date']

    def to_representation(self, instance):
        rep = super().to_representation(instance)
        rep['student'] = instance.student.first_name + ' ' + instance.student.last_name
        return rep

    def to_internal_value(self, data):
        value = super().to_internal_value(data)
        value['student'] = models.Employee.objects.get(id=data['student'])
        return value