from django.db.models import Q

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

from rest_framework.permissions import (
    AllowAny,
    IsAuthenticated,
    IsAdminUser,
    IsAuthenticatedOrReadOnly,
)

from bills.models import Bill
# from .pagination import BillLimitOffsetPagination, BillPageNumberPagination
from bills.api.permissions import IsOwnerOrReadOnly
from .serializers import (
    BillCreateUpdateSerializer,
    BillDetailSerializer,
    BillListSerializer
)


class BillListAPIView(ListAPIView):
    serializer_class = BillListSerializer
    filter_backends = [SearchFilter, OrderingFilter]
    search_fields = ['title', 'content', 'user__first_name']

    def get_queryset(self, *args, **kwargs):
        queryset_list = Bill.objects.all()
        # query = self.request.GET.get("q")
        # if query:
        #     queryset_list = queryset_list.filter(
        #         Q(title__icontains=query) |
        #         Q(content__icontains=query) |
        #         Q(owner__first_name__icontains=query) |
        #         Q(owner__last_name__icontains=query)
        #     ).distinct()
        return queryset_list


class BillCreateAPIView(CreateAPIView):
    queryset = Bill.objects.all()
    serializer_class = BillCreateUpdateSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


class BillDetailAPIView(RetrieveAPIView):
    queryset = Bill.objects.all()
    serializer_class = BillDetailSerializer
    lookup_field = 'slug'
    permission_classes = [AllowAny]


class BillUpdateAPIView(RetrieveUpdateAPIView):
    queryset = Bill.objects.all()
    serializer_class = BillCreateUpdateSerializer
    lookup_field = 'slug'
    permission_classes = [IsOwnerOrReadOnly]

    def perform_update(self, serializer):
        serializer.save(owner=self.request.user)


class BillDeleteAPIView(DestroyAPIView):
    queryset = Bill.objects.all()
    serializer_class = BillDetailSerializer
    lookup_field = 'slug'
    permission_classes = [IsAuthenticated]
