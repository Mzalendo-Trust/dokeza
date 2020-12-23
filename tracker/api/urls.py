from django.urls import path, re_path
from . import views

app_name="tracker"

urlpatterns = [
    path('list', views.BillTrackerListAPIView.as_view()),
    path('bills', views.BillsListAPIView.as_view()),
    path('create', views.BillTrackerCreateAPIView.as_view()),
]