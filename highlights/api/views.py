from django.shortcuts import render
from django.utils.timezone import datetime
from django.http import HttpResponse
from rest_framework import viewsets, generics, status
from rest_framework.response import Response
from rest_framework.views import APIView
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
    queryset = Timeline.objects.all().order_by('-createdon')
    serializer_class = TimelineSerializer
    permission_classes = [AllowAny]


class TimelineUpdateVIew(APIView):
    permission_classes = [IsAuthenticated]

    def get_object(self, uuid):
        try:
            return Timeline.objects.get(uuid=uuid)
        except Timeline.DoesNotExist:
            raise Http404

    def put(self, request, uuid, format=None):
        images = request.data.pop('files')

        timeline = self.get_object(uuid)
        serializer = TimelineSerializer(timeline, data=request.data)
        serializer.is_valid(raise_exception=True)
        
        # if serializer.is_valid():
        #     serializer.save()

        with transaction.atomic():
            instance = serializer.save()

            for img in images:
                ims = TimelineImageSerializer(data=img)
                ims.is_valid(raise_exception=True)
                ims.save(timeline=instance)

            return Response(serializer.data)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class HighlightedUpdateVIew(APIView):
    permission_classes = [IsAuthenticated]

    def put(self, request, uuid, format=None):
        Timeline.objects.update(is_highlighted=False)
        Timeline.objects.filter(uuid=uuid).update(is_highlighted=True)

        return Response(request.data, status=status.HTTP_200_OK)


class TimelineListOneAPIView(ListAPIView):
    serializer_class = TimelineSerializer
    permission_classes = [IsAuthenticated]
    lookup_url_kwarg = 'uuid'

    def get_queryset(self, *args, **kwargs):
        uuid = self.kwargs.get(self.lookup_url_kwarg)
        queryset_list = Timeline.objects.filter(uuid=uuid)
        return queryset_list


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
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs):
        images = request.data.pop('files')
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        # self.perform_create(serializer)

        with transaction.atomic():
            # instance = serializer.save(createdby=self.request.user, createdon=datetime.today())
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
