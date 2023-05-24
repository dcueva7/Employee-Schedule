from django.shortcuts import render
from rest_framework import generics, status
from . import serializers
from . import models
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.decorators import api_view, permission_classes
from django.contrib.auth.models import User
from django.http import Http404, HttpResponseNotAllowed
from datetime import *
from django.utils import timezone
from django.db import transaction

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


#funciton to create recurring schedule based on schedule during given week
def create_recurring_schedule():

    weeks_to_create = 5 #amount of weeks to create with base schedule
    base_schedule = '05/23/2024' #any date during the week of base schedule desired to use

    date_object = datetime.strptime(base_schedule, "%m/%d/%Y").date()

    base_week = date_object.isocalendar()[1]

    shifts = models.Shift.objects.filter(date__week=base_week)

    with transaction.atomic():
        for week in range(weeks_to_create):
            days_count = 7 * (week + 1)
            for shift in shifts:
                new_shift = models.Shift()
                new_shift.student = shift.student
                new_shift.start_time = shift.start_time
                new_shift.end_time = shift.end_time
                new_shift.date = shift.date + timedelta(days=days_count)
                new_shift.save()

    return 'Recurring schedule created'


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_hours_current_week(request):

    current_week = datetime.now().isocalendar()[1]
    if request.method == 'GET':
        shifts = models.Shift.objects.filter(student__user=request.user, date__week = current_week)

        total_seconds = 0
        for shift in shifts:
            start = datetime.combine(date.today(), shift.start_time)
            end = datetime.combine(date.today(), shift.end_time)

            total_seconds += (end - start).seconds

        total_hours = total_seconds/3600

        serializer = serializers.ShiftSerializer(shifts, many=True)

        return Response({'total_hours' : total_hours, 'shifts' : serializer.data}, status.HTTP_200_OK)

    else:
        return HttpResponseNotAllowed

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

class UpdateAdjustment(generics.UpdateAPIView):
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



