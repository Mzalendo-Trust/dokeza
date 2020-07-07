from django.urls import path

from .views import DocsListView, DocDisplayView

app_name = 'other_docs'

urlpatterns = [
    path('', DocsListView.as_view(), name='list'),
    path('<slug>/', DocDisplayView.as_view(), name='detail'),
]
