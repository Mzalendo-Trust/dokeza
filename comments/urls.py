from django.urls import path
from django.contrib import admin

from .views import (
    comment_thread,
    comment_delete

    )

app_name="comments"

urlpatterns = [
    path('<id>\d+/', comment_thread, name='thread'),
    path('<id>\d+/delete/', comment_delete, name='delete'),
]
