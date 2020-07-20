from django.urls import path

from .views import (
    CommentListAPIView,
    CommentCreateAPIView,
    CommentDetailAPIView,
)

app_name="comments"

urlpatterns = [
    path('', CommentListAPIView.as_view(), name='list'),
    path('create/', CommentCreateAPIView.as_view(), name='create'),
    path('(<pk>\d+)/', CommentDetailAPIView.as_view(), name='thread'),
]
