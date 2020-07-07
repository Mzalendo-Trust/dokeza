from django.urls import path

from .views import (
    BillCreateAPIView,
    BillDeleteAPIView,
    BillDetailAPIView,
    BillListAPIView,
    BillUpdateAPIView,
)

urlpatterns = [
    path('', BillListAPIView.as_view(), name='list'),
    path('create/', BillCreateAPIView.as_view(), name='create'),
    path('<slug>/', BillDetailAPIView.as_view(), name='detail'),
    path('<slug>/edit/', BillUpdateAPIView.as_view(), name='update'),
    path('<slug>/delete/', BillDeleteAPIView.as_view(), name='delete'),
]
  