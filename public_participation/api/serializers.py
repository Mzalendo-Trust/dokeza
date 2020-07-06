from rest_framework import permissions
from rest_framework.serializers import ModelSerializer, HyperlinkedModelSerializer, HyperlinkedIdentityField

from public_participation.models import PublicEvent


class EventListSerializer(HyperlinkedModelSerializer):
    url = HyperlinkedIdentityField(view_name='public_participation:event', lookup_field='slug',)

    class Meta:
        model = PublicEvent
        fields = [
            'title',
            'start',
            'end',
            'url',
        ]


class EventDetailSerializer(ModelSerializer):
    permission_classes = (permissions.AllowAny,)

    class Meta:
        model = PublicEvent
        fields = [
            'title',
            'slug',
            'start',
            'end',
            'house',
            'event_description',
            'event_location',
        ]
