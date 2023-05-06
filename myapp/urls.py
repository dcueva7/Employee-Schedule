from django.urls import path
from . import views

urlpatterns = [
    path('add_shift/', views.createShift.as_view(), name='add_shift'),
    path('delete_shift/', views.removeShift.as_view(), name='remove_shift'),
    path('update_shift/', views.updateShift.as_view(), name='update_shift'),
    path('delete_shift/', views.removeShift.as_view(), name='remove_shift'),    

]