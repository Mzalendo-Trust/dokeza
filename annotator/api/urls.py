from django.urls import path

from .views import (
    AnnotationCreateAPIView,
    AnnotationDeleteAPIView,
    AnnotationDetailAPIView,
    AnnotationListAPIView,
    AnnotationUpdateAPIView,
)

urlpatterns = [
    path('', AnnotationListAPIView.as_view(), name='list'),
    path('create/$', AnnotationCreateAPIView.as_view(), name='create'),
    path('(?P<id>[\w-]+)/$', AnnotationDetailAPIView.as_view(), name='detail'),
    path('(?P<id>[\w-]+)/update/$', AnnotationUpdateAPIView.as_view(), name='update'),
    path('(?P<id>[\w-]+)/delete/$', AnnotationDeleteAPIView.as_view(), name='delete'),
]
