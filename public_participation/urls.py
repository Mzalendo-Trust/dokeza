from __future__ import unicode_literals
from django.urls import path

from .views import PublicEventsList, PublicEventView, PetitionListView, PetitionDetailView
from posts.views import MemorandumListView, MemorandumDetailView

app_name = "public_participation"

urlpatterns = [
    path('', PublicEventsList.as_view(), name='events'),
    path('events/<slug>/', PublicEventView.as_view(), name='events'),
    path('memoranda/', MemorandumListView.as_view(), name='memoranda'),
    path('memoranda/<slug>/', MemorandumDetailView.as_view(), name='memorandum'),
    path('petitions/', PetitionListView.as_view(), name='petitions'),
    path('petitions/<slug>/', PetitionDetailView.as_view(), name='petition-detail'),
]
