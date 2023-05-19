from rest_framework import serializers

from . import models

class AvailabilitySerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Availability
        fields = '__all__'


class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Employee
        fields = ['id','first_name', 'last_name', 'color']



class ShiftSerializer(serializers.ModelSerializer):
    student = EmployeeSerializer(read_only=False)
    class Meta:
        model = models.Shift
        fields = ['id','student', 'start_time', 'end_time', 'date']

    # def to_representation(self, instance):
    #     rep = super().to_representation(instance)
    #     rep['student'] = instance.student.first_name + ' ' + instance.student.last_name
    #     return rep

    # def to_internal_value(self, data):
    #     value = super().to_internal_value(data)
    #     value['student'] = models.Employee.objects.get(id=data['student'])
    #     return value
    
class CreateShiftSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Shift
        fields = '__all__'