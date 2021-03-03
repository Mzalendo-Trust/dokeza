from django.urls import path, re_path
from . import views

app_name="highlights"

urlpatterns = [
    path('list', views.TimelineListAPIView.as_view()),
    path('create', views.TimelineCreateAPIView.as_view()),
    path('upload', views.ImageViewSet.as_view()),
    path('delete/<uuid>', views.TimelineDeleteAPIView.as_view()),
]