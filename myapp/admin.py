from django.contrib import admin
from . import models
# Register your models here.

admin.site.register(models.Employee)
admin.site.register(models.Shift)
admin.site.register(models.Availability)
admin.site.register(models.ShiftAdjustment)
admin.site.register(models.AvailableShift)
