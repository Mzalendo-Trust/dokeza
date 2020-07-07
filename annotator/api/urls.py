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
    path('create/', AnnotationCreateAPIView.as_view(), name='create'),
    path('<id>/', AnnotationDetailAPIView.as_view(), name='detail'),
    path('<id>/update/', AnnotationUpdateAPIView.as_view(), name='update'),
    path('<id>/delete/', AnnotationDeleteAPIView.as_view(), name='delete'),
]
