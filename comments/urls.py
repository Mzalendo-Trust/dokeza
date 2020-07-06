from django.urls import path
from django.contrib import admin

from .views import (
    comment_thread,
    comment_delete

    )

app_name="comments"

urlpatterns = [
    path('(?P<id>\d+)/$', comment_thread, name='thread'),
    path('(?P<id>\d+)/delete/$', comment_delete, name='delete'),
]
