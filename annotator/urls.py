from django.urls import path

from annotator import views

app_name="annotator"

urlpatterns = [
    path('', views.AnnotationIndexView.as_view(), name='index'),
    path('create/', views.index_create, name='create'),
    path('search/', views.search, name='search'),
    path('demo/', views.DemoView.as_view(), name='demo'),
    path('root/', views.root, name='root'),
    path('comment/', views.AnnotationCommentView.as_view(), name='comment'),
    path('update/<id>[\w-]+/', views.read_update_delete, name='read_update_delete'),
    path('delete/<id>[\w-]+/', views.read_update_delete, name='read_update_delete'),
]
