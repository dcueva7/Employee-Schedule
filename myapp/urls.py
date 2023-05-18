from django.urls import path
from . import views

urlpatterns = [
    path('check_manager/', views.check_manager, name='check_manager'),
    path('shift/list_shifts/', views.GetShifts.as_view(), name='list_shifts'),
    path('shift/add_shift/', views.CreateShift.as_view(), name='add_shift'),
    path('shift/get_single_shift/<int:pk>/', views.GetSingleShift.as_view(), name='get_single_shift'),
    path('shift/update_shift/<int:pk>/', views.UpdateShift.as_view(), name='update_shift'),
    path('shift/delete_shift/<int:pk>/', views.RemoveShift.as_view(), name='remove_shift'), 
    path('employee/add/', views.CreateEmployee.as_view(), name='add_employee'),
    path('employee/get_single_employee/<int:pk>/', views.GetSingleEmployee.as_view(), name='get_single_employee'),
    path('employee/get_all_employees/', views.GetAllEmployees.as_view(), name='get_all_employees'),
    path('employee/delete_employee/<int:pk>/', views.DeleteEmployee.as_view(), name='delete_employee'), 
    path('employee/update_employee/<int:pk>/', views.UpdateEmployee.as_view(), name='update_employee'),
    path('availability/add/', views.AddAvailability.as_view(), name='add_availability'),
    path('availability/update/<int:pk>', views.UpdateAvailability.as_view(), name='update_availability'),
    path('availability/list/', views.GetAllAvailability.as_view(), name='get_all_availability'),
    path('availability/delete/<int:pk>', views.DeleteAvailability.as_view(), name='delete_availability'),  

]