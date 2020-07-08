from django.db.models import Q
from django.conf import settings
from rest_framework import status
from rest_framework.authentication import (
    SessionAuthentication, BasicAuthentication, )
import jwt
from rest_framework_jwt.utils import jwt_payload_handler
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_jwt.views import JSONWebTokenAPIView
from rest_framework_jwt.settings import api_settings
from rest_framework.generics import (
    ListAPIView,
    CreateAPIView,
    RetrieveAPIView,
    RetrieveUpdateAPIView,
    UpdateAPIView,
    DestroyAPIView,
)
from rest_framework.filters import (
    SearchFilter,
    OrderingFilter,
)

from rest_framework_jwt.serializers import JSONWebTokenSerializer
from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated,
    IsAdminUser,
    IsAuthenticatedOrReadOnly,
)

from dokeza.users.models import User, Visitor  # Institution, Visitor, Profile

# from dokeza.users.api.pagination import BillLimitOffsetPagination, BillPageNumberPagination
from bills.api.permissions import IsOwnerOrReadOnly
from .serializers import (
    # UserCreateUpdateSerializer,
    UserDetailSerializer,
    UserListSerializer,
    VisitorSerializer
)

jwt_response_payload_handler = api_settings.JWT_RESPONSE_PAYLOAD_HANDLER


class UserListAPIView(ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserListSerializer
    # filter_backends = [SearchFilter, OrderingFilter]
    # search_fields = ['name', 'first_name']
    # def get_queryset(self, *args, **kwargs):
    #     queryset_list = User.objects.all()
    #     # query = self.request.GET.get("q")
    #     # if query:
    #     #     queryset_list = queryset_list.filter(
    #     #         Q(title__icontains=query) |
    #     #         Q(content__icontains=query) |
    #     #         Q(owner__first_name__icontains=query) |
    #     #         Q(owner__last_name__icontains=query)
    #     #     ).distinct()
    #     return queryset_list


# class UserCreateAPIView(CreateAPIView):
#     queryset = User.objects.all()
#     serializer_class = UserCreateUpdateSerializer
#     permission_classes = [IsAuthenticated]

#     def perform_create(self, serializer):
#         serializer.save(owner=self.request.user)

class UserDetailAPIView(RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserDetailSerializer
    lookup_field = 'username'
    permission_classes = [IsOwnerOrReadOnly]


class VisitorAPIView(APIView):
    permission_classes = IsAuthenticatedOrReadOnly


# class UserUpdateAPIView(RetrieveUpdateAPIView):
#     queryset = User.objects.all()
#     serializer_class = UserCreateUpdateSerializer
#     lookup_field = 'slug'
#     permission_classes = [IsOwnerOrReadOnly]

#     def perform_update(self, serializer):
#         serializer.save(owner=self.request.user)


# class UserRedirectAPIView(DestroyAPIView):
#     queryset = User.objects.all()
#     serializer_class = UserDetailSerializer
#     lookup_field = 'slug'
#     permission_classes = [IsAuthenticated]
#

# ---------- This worked ---
# -> "detail": "Method \"GET\" not allowed."
# To be looked into later.
#
# class SendJSONWebToken(JSONWebTokenAPIView):
#     """
#     SendJSONWebToken is to receive the request.user and validate the credentials and send back a JSON with 'token' and 'user'.
#     """
#     serializer_class = JSONWebTokenSerializer

#     def get_token (self, request, *args, **kwargs):
#         user = request.user
#         if request.user.is_authenticated():
#             payload = jwt_payload_handler(user)
#             token = jwt.encode(payload, settings.SECRET_KEY)
#             return token.decode('unicode_escape')

# send_jwt_token = SendJSONWebToken.as_view()


