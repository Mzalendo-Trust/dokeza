from django.urls import path

from .views import DocsListView, DocDisplayView

app_name = 'other_docs'

urlpatterns = [
    path('', DocsListView.as_view(), name='list'),
    path('(?P<slug>[\w-]+)/', DocDisplayView.as_view(), name='detail'),
]
