from django.shortcuts import render
from rest_framework import generics, status
from . import serializers
from . import models
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth.models import User
from django.http import Http404, HttpResponseNotAllowed

from pulp import *
# Create your views here.

prob = LpProblem("Scheduling Problem", LpMaximize)

def createSchedule():

    maxWeeklyHours = 40
    maxDailyHours = 8
    minWeeklyHours = 10
    maxShiftHours = 5
    timeInBetween = 3

    return 

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user_id(request):
    if request.method == 'GET':
        try:
            user = User.objects.get(id=request.user.id)
            return Response({ "id" : user.id })
        
        except User.DoesNotExist:
            raise Http404
        
    else:
        return HttpResponseNotAllowed
    

    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def request_adjustment(request):
        
    if request.method == 'POST':
        serialized_data = serializers.ShiftAdjustmentSerializer(data=request.data)
        serialized_data.is_valid(raise_exception=True)
        serialized_data.save()

        return Response(serialized_data.data, status.HTTP_201_CREATED)
    
    else:
        return HttpResponseNotAllowed 
    
class DeleteAdjustmentRequest(generics.DestroyAPIView):
    permission_classes = [IsAdminUser]
    queryset = models.ShiftAdjustment.objects.all()
    serializer_class = serializers.ShiftAdjustmentSerializer
    

class ListAdjustments(generics.ListAPIView):
    permission_classes = [IsAdminUser]
    queryset = models.ShiftAdjustment.objects.all()
    serializer_class = serializers.ShiftAdjustmentSerializer

@api_view(['GET'])
@permission_classes([ IsAdminUser ])
def check_manager(request):

    return Response({'message': 'true'})


class GetShifts(generics.ListAPIView):
    queryset = models.Shift.objects.all()
    serializer_class = serializers.ShiftSerializer

class CreateShift(generics.CreateAPIView):
    queryset = models.Shift.objects.all()
    serializer_class = serializers.CreateShiftSerializer

class GetSingleShift(generics.RetrieveAPIView):
    queryset = models.Shift.objects.all()
    serializer_class = serializers.ShiftSerializer

class RemoveShift(generics.DestroyAPIView):
    queryset = models.Shift.objects.all()
    serializer_class = serializers.ShiftSerializer

class UpdateShift(generics.UpdateAPIView):
    queryset = models.Shift.objects.all()
    serializer_class = serializers.CreateShiftSerializer

class CreateEmployee(generics.CreateAPIView):
    queryset = models.Employee.objects.all()
    serializer_class = serializers.EmployeeSerializer

class GetAllEmployees(generics.ListAPIView):
    queryset = models.Employee.objects.all()
    serializer_class = serializers.EmployeeSerializer

class GetSingleEmployee(generics.RetrieveAPIView):
    queryset = models.Employee.objects.all()
    serializer_class = serializers.EmployeeSerializer

class DeleteEmployee(generics.DestroyAPIView):
    queryset = models.Employee.objects.all()
    serializer_class = serializers.EmployeeSerializer

class UpdateEmployee(generics.UpdateAPIView):
    queryset = models.Employee.objects.all()
    serializer_class = serializers.EmployeeSerializer

class AddAvailability(generics.CreateAPIView):
    queryset = models.Availability.objects.all()
    serializer_class = serializers.AvailabilitySerializer

class UpdateAvailability(generics.UpdateAPIView):
    queryset = models.Availability.objects.all()
    serializer_class = serializers.AvailabilitySerializer

class GetAllAvailability(generics.ListAPIView):
    queryset = models.Availability.objects.all()
    serializer_class = serializers.AvailabilitySerializer

class DeleteAvailability(generics.DestroyAPIView):
    queryset = models.Availability.objects.all()
    serializer_class = serializers.AvailabilitySerializer



