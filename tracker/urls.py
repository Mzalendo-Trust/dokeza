from django.urls import path, re_path
from . import views

app_name="tracker"

urlpatterns = [
    path('', views.index, name='index' ),
    re_path(r'^(?:.*)/?$', views.index)
]