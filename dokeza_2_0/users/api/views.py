import datetime
from django.conf import settings
from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.generics import (
    CreateAPIView
)
from rest_framework.mixins import (
    ListModelMixin, RetrieveModelMixin, 
    UpdateModelMixin
)
from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated
)
from rest_framework.response import Response
from rest_framework.status import HTTP_200_OK, HTTP_400_BAD_REQUEST
from rest_framework.views import APIView
from rest_framework.viewsets import GenericViewSet

from .serializers import UserCreateSerializer, UserLoginSerializer
from .serializers import UserSerializer
from .permissions import IsOwnerOrReadOnly


CONSUMER_KEY = 'i-want-to-quote-7TfWi4aJ3KkfZg2tNsMEDhqd'
CONSUMER_SECRET = settings.SECRET_KEY
CONSUMER_TTL = 86400

User = get_user_model()


class UserDetailAPIView(APIView):
    pass

class UserRedirectAPIView(APIView):
    pass


class UserUpdateAPIView(APIView):
    pass


class UserViewSet(RetrieveModelMixin, ListModelMixin, UpdateModelMixin, GenericViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    lookup_field = "email"

    def get_queryset(self, *args, **kwargs):
        return self.queryset.filter(id=self.request.user.id)

    @action(detail=False, methods=["GET"])
    def me(self, request):
        serializer = UserSerializer(request.user, context={"request": request})
        return Response(status=status.HTTP_200_OK, data=serializer.data)


class UserCreateAPIView(CreateAPIView):
    serializer_class = UserCreateSerializer
    permission_classes = [AllowAny]
    queryset = User.objects.all()


class UserLoginAPIView(APIView):
    permission_classes = [AllowAny]
    serializer_class = UserLoginSerializer

    def post(self, request, *args, **kwargs):
        data = request.data
        serializer = UserLoginSerializer(data=data)
        if serializer.is_valid(raise_exception=True):
            new_data = serializer.data
            return Response(new_data, status=HTTP_200_OK)
        return Response(serializer.errors, status=HTTP_400_BAD_REQUEST)


def _now():
    return datetime.datetime.utcnow().replace(microsecond=0)



