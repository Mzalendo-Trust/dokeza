from django.urls import path

from .views import (
    PostCreateAPIView,
    PostDeleteAPIView,
    PostDetailAPIView,
    PostListAPIView,
    PostUpdateAPIView,
)

urlpatterns = [
    path('', PostListAPIView.as_view(), name='list'),
    path('create/$', PostCreateAPIView.as_view(), name='create'),
    path('(?P<slug>[\w-]+)/$', PostDetailAPIView.as_view(), name='detail'),
    path('(?P<slug>[\w-]+)/edit/$', PostUpdateAPIView.as_view(), name='update'),
    path('(?P<slug>[\w-]+)/delete/$', PostDeleteAPIView.as_view(), name='delete'),
]
  