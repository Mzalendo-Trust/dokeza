from django.shortcuts import render
from rest_framework import viewsets, generics, status
from django.utils.timezone import datetime
from django.http import HttpResponse
from rest_framework.response import Response
from django.db import transaction
import json

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
    queryset = Timeline.objects.all()
    serializer_class = TimelineSerializer
    permission_classes = [AllowAny]

class TimelineListOneAPIView(ListAPIView):
    queryset = Timeline.objects.all()
    serializer_class = TimelineSerializer
    permission_classes = [AllowAny]
    lookup_field = 'uuid'


# class ImageViewSet(ListAPIView):
#     queryset = TimelineImage.objects.all()
#     serializer_class = TimelineImageSerializer
#     permission_classes = [AllowAny]

#     def post(self, request):
#         serializer = TimelineImageSerializer(data=request.data, many=isinstance(request.data, list))
#         if serializer.is_valid():
#             # Save request image in the database
#             serializer.save()
#             return Response(serializer.data, status=status.HTTP_201_CREATED)

#         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)



class TimelineCreateAPIView(CreateAPIView):
    queryset = Timeline.objects.all()
    serializer_class = TimelineSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        images = request.data.pop('files')
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        # self.perform_create(serializer)
        with transaction.atomic():
            instance = serializer.save()
            for img in images:
                ims = TimelineImageSerializer(data=img)
                ims.is_valid(raise_exception=True)
                ims.save(timeline=instance)

            # return Response(instance, status=status.HTTP_201_CREATED)  

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
