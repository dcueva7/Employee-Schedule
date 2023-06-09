from django.urls import path
from . import views

urlpatterns = [
    path('check_manager/', views.check_manager),
    path('get_id/', views.get_user_id),
    path('shift/list_shifts/', views.GetShifts.as_view()),
    path('shift/add_shift/', views.CreateShift.as_view()),
    path('shift/get_single_shift/<int:pk>/', views.GetSingleShift.as_view()),
    path('shift/update_shift/<int:pk>/', views.UpdateShift.as_view()),
    path('shift/delete_shift/<int:pk>/', views.RemoveShift.as_view()), 
    path('employee/add/', views.add_employee),
    path('employee/get_current_employee/', views.get_current_employee),
    path('employee/get_all_employees/', views.GetAllEmployees.as_view()),
    path('employee/delete_employee/<int:pk>/', views.DeleteEmployee.as_view()), 
    path('employee/update_employee/<int:pk>/', views.UpdateEmployee.as_view()),
    path('availability/add/', views.AddAvailability.as_view()),
    path('availability/update/<int:pk>/', views.UpdateAvailability.as_view()),
    path('availability/list/', views.GetAllAvailability.as_view()),
    path('availability/delete/<int:pk>', views.DeleteAvailability.as_view()),
    path('request_adjustment/', views.request_adjustment),
    path('retrieve_adjustments/', views.retrieve_adjustments),  
    path('delete_adjustment/<int:pk>/', views.DeleteAdjustmentRequest.as_view()),
    path('update_adjustment/<int:pk>/', views.UpdateAdjustment.as_view()),
    path('get_total_hours/', views.get_hours_current_week),
    path('create_recurring_schedule/', views.create_recurring_schedule),
    path('bulk_delete_shifts/', views.bulk_delete_shifts),
    path('get_open_shifts/', views.get_open_shifts),
    path('add_open_shift/', views.add_open_shift),
    path('delete_open_shift/<int:pk>/', views.DeleteOpenShift.as_view()),
    path('send_notifs/', views.send_notifs),
    path('change_username/', views.change_username),
    path('change_employee_color/', views.change_employee_color),
]