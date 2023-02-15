from django.contrib import admin
from django.urls import path

from admin_dashboard.views import DashboardView

urlpatterns = [
    path('', DashboardView.as_view(), name='dashboard'),
]