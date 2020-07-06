from django.urls import path

from .views import (
    IdeasListView,
    MyIdeasListView,
    SubmitIdeaView,
    IdeaDisplayView,
    IdeaUpdateView
)

app_name = "ideas"

urlpatterns = [
    path('ideas/$', IdeasListView.as_view(), name='list'),
    path('my_ideas/$', MyIdeasListView.as_view(), name='my_ideas'),
    path('submit_idea/$', SubmitIdeaView.as_view(), name='submit_idea'),
    path('(?P<slug>[\w-]+)/$', IdeaDisplayView.as_view(), name='detail'),
    path('(?P<slug>[\w-]+)/update/$', IdeaUpdateView.as_view(), name='update'),
]
