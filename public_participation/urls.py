from __future__ import unicode_literals
from django.urls import path

from .views import PublicEventsList, PublicEventView, PetitionListView, PetitionDetailView
from posts.views import MemorandumListView, MemorandumDetailView

app_name = "public_participation"

urlpatterns = [
    path('', PublicEventsList.as_view(), name='events'),
    path('events/(?P<slug>[\w-]+)/$', PublicEventView.as_view(), name='events'),
    path('memoranda/$', MemorandumListView.as_view(), name='memoranda'),
    path('memoranda/(?P<slug>[\w-]+)/$', MemorandumDetailView.as_view(), name='memorandum'),
    path('petitions/$', PetitionListView.as_view(), name='petitions'),
    path('petitions/(?P<slug>[\w-]+)/$', PetitionDetailView.as_view(), name='petition-detail'),
]
