from django.urls import path
from . import views

urlpatterns = [
    path('add_shift/', views.CreateShift.as_view(), name='add_shift'),
    path('get_single_shift/<int:pk>', views.GetSingleShift.as_view(), name='get_single_shift'),
    path('update_shift/<int:pk>/', views.UpdateShift.as_view(), name='update_shift'),
    path('delete_shift/<int:pk>/', views.RemoveShift.as_view(), name='remove_shift'),    

]