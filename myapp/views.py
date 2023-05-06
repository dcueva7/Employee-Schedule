from django.shortcuts import render
from rest_framework import generics
from . import serializers
from . import models
# Create your views here.


class createShift(generics.CreateAPIView):
    queryset = models.Shift
    serializer_class = serializers.ShiftSerializer

class getShift(generics.RetrieveAPIView):
    queryset = models.Shift
    serializer_class = serializers.ShiftSerializer

class removeShift(generics.DestroyAPIView):
    queryset = models.Shift
    serializer_class = serializers.ShiftSerializer

class updateShift(generics.UpdateAPIView):
    queryset = models.Shift
    serializer_class = serializers.ShiftSerializer
