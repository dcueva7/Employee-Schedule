from django.shortcuts import render
from rest_framework import generics
from . import serializers
from . import models
# Create your views here.


class CreateShift(generics.CreateAPIView):
    queryset = models.Shift.objects.all()
    serializer_class = serializers.ShiftSerializer

class GetSingleShift(generics.RetrieveAPIView):
    queryset = models.Shift.objects.all()
    serializer_class = serializers.ShiftSerializer

class RemoveShift(generics.DestroyAPIView):
    queryset = models.Shift.objects.all()
    serializer_class = serializers.ShiftSerializer

class UpdateShift(generics.UpdateAPIView):
    queryset = models.Shift.objects.all()
    serializer_class = serializers.ShiftSerializer
