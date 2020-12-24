from django.shortcuts import render
from rest_framework import viewsets, generics
from django.utils.timezone import datetime

from .serializers import BillTrackerSerializer, BillSerializer
from tracker.models import MyBill, BillTracker

from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated,
    IsAdminUser,
    IsAuthenticatedOrReadOnly,
)

from rest_framework.generics import (
    ListAPIView,
    CreateAPIView,
    RetrieveAPIView,
    RetrieveUpdateAPIView,
    UpdateAPIView,
    DestroyAPIView,
)


class BillsListAPIView(ListAPIView):
    serializer_class = BillSerializer
    queryset = MyBill.objects.all()
    permission_classes = [AllowAny]


class BillTrackerListAPIView(ListAPIView):
    serializer_class = BillTrackerSerializer
    permission_classes = [AllowAny]

    def get_queryset(self, *args, **kwargs):
        queryset_list = BillTracker.objects.all()
        return queryset_list


class BillTrackerCreateAPIView(CreateAPIView):
    queryset = BillTracker.objects.all()
    serializer_class = BillTrackerSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(createdby=self.request.user, createdon=datetime.today())


# class BillTrackerView(viewsets.ModelViewSet):
#     serializer_class = BillTrackerSerializer
#     queryset = BillTracker.objects.all()


# class BillView(viewsets.ModelViewSet):
#     serializer_class = BillSerializer
#     queryset = MyBill.objects.all()
