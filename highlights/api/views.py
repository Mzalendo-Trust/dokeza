from django.shortcuts import render
from rest_framework import viewsets, generics, status
from django.utils.timezone import datetime
from django.http import HttpResponse
import json
from rest_framework.response import Response

from .serializers import TimelineSerializer, TimelineImageSerializer
from highlights.models import Timeline, TimelineImage
from .permissions import IsOwnerOrReadOnly

from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated,
    IsAdminUser,
    IsAuthenticatedOrReadOnly
)

from rest_framework.generics import (
    ListAPIView,
    CreateAPIView,
    RetrieveAPIView,
    RetrieveUpdateAPIView,
    UpdateAPIView,
    DestroyAPIView,
)


class TimelineListAPIView(ListAPIView):
    serializer_class = TimelineSerializer
    permission_classes = [AllowAny]

    def get_queryset(self, *args, **kwargs):
        queryset_list = Timeline.objects.all()
        return queryset_list


class ImageViewSet(ListAPIView):
    queryset = TimelineImage.objects.all()
    serializer_class = TimelineImageSerializer
    permission_classes = [AllowAny]

    def post(self, request):
        serializer = TimelineImageSerializer(data=request.data, many=isinstance(request.data, list))
        if serializer.is_valid():
            # Save request image in the database
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # def post(self, request, *args, **kwargs):
    #     names = []
    #     # for f in request.FILES.getlist('images'):

    #     f = request.data['image']
    #     return Response(f, status=200)

    #     names.append('kim.jpg')
    #     TimelineImage.objects.create(name='kim.jpg', image=f)

        # file = request.data['file']
        # image = Image.objects.create(image=file)


class TimelineCreateAPIView(CreateAPIView):
    queryset = Timeline.objects.all()
    # serializer_class = TimelineSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        datalist = request.data
        # self.get_serializer(data=datalist, many=isinstance(datalist, list))
        serializer = TimelineSerializer(data=datalist, many=isinstance(datalist, list))
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)

        # if serializer.is_valid():
        #     serializer.save()
        #     return Response(serializer.data, status=status.HTTP_201_CREATED)
        # else:
        #     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        headers = self.get_success_headers(serializer.data)
        return Response(request.data, status=status.HTTP_201_CREATED, headers=headers)

    # def perform_create(self, serializer):
    # #     serializer.save(createdby=self.request.user, createdon=datetime.today())

    #       headers = self.get_success_headers(serializer.data)
    #       return Response(request.data, status=status.HTTP_201_CREATED, headers=headers)


class TimelineDeleteAPIView(DestroyAPIView):
    queryset = Timeline.objects.all()
    serializer_class = TimelineSerializer
    lookup_field = 'uuid'
    permission_classes = [IsAuthenticated]
