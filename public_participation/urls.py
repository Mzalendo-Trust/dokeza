from __future__ import unicode_literals
from django.urls import path

from .views import PublicEventsList, PublicEventView

app_name = "public_participation"

urlpatterns = [
    path('', PublicEventsList.as_view(), name='events'),
    path('<slug>/', PublicEventView.as_view(), name='event'),
]
