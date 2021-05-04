from django.urls import path, re_path
from . import views

app_name="highlights"

urlpatterns = [
    path('', views.index, name='index'),
    re_path(r'^(?:.*)/?$', views.index)
]