from django.urls import path, re_path
# from rest_framework import routers
from . import views

app_name="highlights"

urlpatterns = [
    path('list', views.TimelineListAPIView.as_view()),
    path('details/<uuid>', views.TimelineListOneAPIView.as_view()),
    path('update/highlighted/<uuid>', views.HighlightedUpdateVIew.as_view()),
    path('update/<uuid>', views.TimelineUpdateVIew.as_view()),
    path('create', views.TimelineCreateAPIView.as_view()),
    # path('upload', views.ImageViewSet.as_view()),
    path('delete/<uuid>', views.TimelineDeleteAPIView.as_view()),
    # path('')
]

# router = routers.SimpleRouter()
# router.register(r'create_upload', views.TimelineCreateAPIView.as_view())

# urlpatterns += router.urls