from django.urls import path

from .views import (
    PublicEventListAPIView,
)

urlpatterns = [
    path('events/$', PublicEventListAPIView.as_view(), name='events-list'),
]
