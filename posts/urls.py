from django.urls import path

from .views import (
    PostListView,
    PostDetailView,
    PostMonthArchiveView
)

app_name = "posts"

urlpatterns = [
    path('', PostListView.as_view(), name='list'),
    path('(?P<slug>[\w-]+)/', PostDetailView.as_view(), name='detail'),
    path('(?P<year>[0-9]{4})/(?P<month>[-\w]+)/',
        PostMonthArchiveView.as_view(), name="archive_month"),
]
