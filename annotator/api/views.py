from django.db.models import Q

# from rest_framework.generics import (
#     ListAPIView,
#     CreateAPIView,
#     RetrieveAPIView,
#     RetrieveUpdateAPIView,
#     UpdateAPIView,
#     DestroyAPIView,
# )
# from rest_framework.filters import (
#     OrderingFilter,
#     SearchFilter,
# )

# from rest_framework.permissions import (
#     AllowAny,
#     IsAuthenticated,
#     IsAdminUser,
#     IsAuthenticatedOrReadOnly,
# )

# from annotator.models import Annotation
# # from .pagination import AnnotationLimitOffsetPagination, BillPageNumberPagination
# from .permissions import IsOwnerOrReadOnly
# from .serializers import (
#     AnnotationCreateUpdateSerializer,
#     AnnotationDetailSerializer,
#     AnnotationListSerializer
# )


# class AnnotationListAPIView(ListAPIView):
#     serializer_class = AnnotationListSerializer
#     # filter_backends = [SearchFilter, OrderingFilter]
#     # search_fields = ['title', 'content', 'user__first_name']

#     def get_queryset(self, *args, **kwargs):
#         queryset_list = Annotation.objects.all()
#         # query = self.request.GET.get("q")
#         # if query:
#         #     queryset_list = queryset_list.filter(
#         #         Q(title__icontains=query) |
#         #         Q(content__icontains=query) |
#         #         Q(user__first_name__icontains=query) |
#         #         Q(user__last_name__icontains=query)
#         #     ).distinct()
#         return queryset_list


# class AnnotationCreateAPIView(CreateAPIView):
#     queryset = Annotation.objects.all()
#     serializer_class = AnnotationCreateUpdateSerializer
#     permission_classes = [IsAuthenticated]

#     def perform_create(self, serializer):
#         serializer.save(user=self.request.user)


# class AnnotationDetailAPIView(RetrieveAPIView):
#     queryset = Annotation.objects.all()
#     serializer_class = AnnotationDetailSerializer
#     lookup_field = 'id'
#     permission_classes = [IsOwnerOrReadOnly]


# class AnnotationUpdateAPIView(RetrieveUpdateAPIView):
#     queryset = Annotation.objects.all()
#     serializer_class = AnnotationCreateUpdateSerializer
#     lookup_field = 'id'
#     permission_classes = [IsOwnerOrReadOnly]

#     def perform_update(self, serializer):
#         serializer.save(user=self.request.user)


# class AnnotationDeleteAPIView(DestroyAPIView):
#     queryset = Annotation.objects.all()
#     serializer_class = AnnotationDetailSerializer
#     lookup_field = 'id'
#     permission_classes = [IsAuthenticated]
