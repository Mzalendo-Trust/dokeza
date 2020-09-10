from django.urls import path

from . import views

app_name = 'docbuilder'

urlpatterns = [
    path('', views.index, name='index'),
    path('generate/', views.generate, name='generate'),
    path('upload/', views.upload, name='upload'),
    path('generate-report/<int:object_id>/<str:mode>', views.report, name='generate-report'),
    path('create/', views.create, name='create'),
]