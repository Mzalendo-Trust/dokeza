from rest_framework import generics
from rest_framework.renderers import TemplateHTMLRenderer
from rest_framework.response import Response

from public_participation.models import PublicEvent
from .serializers import EventListSerializer, EventDetailSerializer


class PublicEventListAPIView(generics.ListAPIView):
    """
    List all public events, or create a new public event.
    """
    queryset = PublicEvent.objects.all()
    serializer_class = EventListSerializer


class PublicEventDetailAPIView(generics.RetrieveAPIView):
    """
    Retrieve a public event instance that is then viewed inside the template and not through the API.
    """
    queryset = PublicEvent.objects.all()
    serializer_class = EventDetailSerializer
    renderer_classes = (TemplateHTMLRenderer,)

    def get(self, request, *args, **kwargs):
        self.lookup_field = 'slug'
        self.object = self.get_object()
        return Response({'object': self.object},
                        template_name='public_participation/public_event_detail.html')
