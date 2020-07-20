from django.urls import path

from .views import (
    PublicEventListAPIView,
)

app_name = "public_participation"

urlpatterns = [
    path('events/', PublicEventListAPIView.as_view(), name='events-list'),
]
