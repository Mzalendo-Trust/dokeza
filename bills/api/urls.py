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
    path('(?P<slug>[\w-]+)/', BillDetailAPIView.as_view(), name='detail'),
    path('(?P<slug>[\w-]+)/edit/', BillUpdateAPIView.as_view(), name='update'),
    path('(?P<slug>[\w-]+)/delete/', BillDeleteAPIView.as_view(), name='delete'),
]
  