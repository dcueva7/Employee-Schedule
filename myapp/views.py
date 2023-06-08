from rest_framework import generics, status
from . import serializers
from . import models
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from django.contrib.auth.models import User
from django.http import Http404, HttpResponseNotAllowed
from datetime import *
from django.utils import timezone
from django.db import transaction
from django.core.mail import send_mail
from django.core.exceptions import ValidationError, ObjectDoesNotExist


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

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def send_notifs(request):
    email_recipients = []
    employees = models.Employee.objects.all()

    for worker in employees:
        if(worker.user.id != request.data['user']):
            email_recipients.append(worker.email)

    try:
        send_mail(
            'Open Shift',
            'A shift is available for coverage.  If you are interested please log-in and review the shift in the Dashboard',
            'dnlcueva@hotmail.com',
            ['dnlcueva@hotmail.com'],
            fail_silently=False,
        )
    except ValidationError as e:
        return Response({"detail": str(e)}, status=400) 
    except Exception as e:  
        
        return Response({"detail": "Internal Server Error"}, status=500) 

    return Response({'List of recipients' : email_recipients}, status.HTTP_202_ACCEPTED)


#funciton to create recurring schedule based on schedule during given week
@api_view(['POST'])
@permission_classes([IsAdminUser])
def create_recurring_schedule(request):

    if request.method == 'POST':
        weeks_to_create = int(request.data['weeks']) #amount of weeks to create with base schedule
        base_schedule = request.data['date'] #any date during the week of base schedule desired to use

        date_object = datetime.strptime(base_schedule, "%Y-%m-%d").date()

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

        return Response({'message' : 'recurring schedule succesfully set'}, status.HTTP_200_OK)
    
    else:
        return HttpResponseNotAllowed()
    
#endpoint to modifty or list open shifts
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_open_shifts(request):
    if request.method == 'GET':
        query_set = models.AvailableShift.objects.all()
        serialized_data = serializers.AvailableShiftSerializer(query_set, many=True)

        return Response(serialized_data.data, status.HTTP_202_ACCEPTED)
    
    else:
        return HttpResponseNotAllowed
    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def add_open_shift(request):
    if request.method == 'POST':
        serialized_data = serializers.AvailableShiftSerializer(data=request.data)
        serialized_data.is_valid(raise_exception=True)
        serialized_data.save()

        return Response({'message: success'}, status.HTTP_201_CREATED)

    else:
        return HttpResponseNotAllowed
    
class DeleteOpenShift(generics.DestroyAPIView):
    queryset = models.AvailableShift.objects.all()
    serializer_class = serializers.AvailableShiftSerializer

    

@api_view(['POST'])
@permission_classes([IsAdminUser])
def bulk_delete_shifts(request):
    
    if request.method == 'POST':
        base_date = request.data['date'] #date to start bulk delete from

        date_object = datetime.strptime(base_date, "%Y-%m-%d").date()


        models.Shift.objects.filter(date__gte=date_object).delete()

        return Response({'message' : 'shifts succesfully deleted'}, status.HTTP_200_OK)
    
    else:
        return HttpResponseNotAllowed()


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
        return HttpResponseNotAllowed()

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
        return HttpResponseNotAllowed()
    

    
@api_view(['POST'])
@permission_classes([IsAuthenticated])
def request_adjustment(request):
        
    if request.method == 'POST':
        serialized_data = serializers.ShiftAdjustmentSerializer(data=request.data)
        serialized_data.is_valid(raise_exception=True)
        serialized_data.save()

        return Response(serialized_data.data, status.HTTP_201_CREATED)
    
    else:
        return HttpResponseNotAllowed()
    

    
class DeleteAdjustmentRequest(generics.DestroyAPIView):
    permission_classes = [IsAdminUser]
    queryset = models.ShiftAdjustment.objects.all()
    serializer_class = serializers.ShiftAdjustmentSerializer
    
    
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def retrieve_adjustments(request):
    if request.method == 'GET':
        if request.user.is_staff:
            queryset = models.ShiftAdjustment.objects.all()
            serialized_data = serializers.ShiftAdjustmentSerializer(queryset, many=True)

            return Response(serialized_data.data, status.HTTP_200_OK)
        
        else:
            query_set = models.ShiftAdjustment.objects.filter(user=request.user)
            serialized_data = serializers.ShiftAdjustmentSerializer(query_set, many=True)
            return Response(serialized_data.data, status.HTTP_200_OK)
    
    else:
        return HttpResponseNotAllowed()

class UpdateAdjustment(generics.UpdateAPIView):
    permission_classes = [IsAdminUser]
    queryset = models.ShiftAdjustment.objects.all()
    serializer_class = serializers.ShiftAdjustmentSerializer

@api_view(['GET'])
@permission_classes([ IsAuthenticated ])
def check_manager(request):

    manager = request.user.is_staff

    return Response({'message': manager})

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def change_username(request):
    serialized_data = serializers.UsernameChangeSerializer(instance=request.user,data=request.data)

    serialized_data.is_valid(raise_exception=True)
    serialized_data.save()

    return Response({'message': "username changed"}, status.HTTP_202_ACCEPTED)


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

@api_view(['POST'])
@authentication_classes([])
@permission_classes([AllowAny])
def add_employee(request):
    serialized_data = serializers.AddEmployeeSerializer(data=request.data)
    serialized_data.is_valid(raise_exception=True)
    serialized_data.save()

    return Response({'success' : 'employee added', 'employee' : serialized_data.data}, status.HTTP_201_CREATED)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def change_employee_color(request):

    if 'color' not in request.data:
        raise ValidationError({'error' : 'color was not included in request'})
    try:
        employee = models.Employee.object.get(user=request.user)
    except ObjectDoesNotExist:
        return Response({'error' : 'No associated user with this employee'}, status.HTTP_400_BAD_REQUEST)
    
    employee.color = request.data['color']
    employee.save()

    return Response({'message' : 'color saved'}, status.HTTP_202_ACCEPTED)
    

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



