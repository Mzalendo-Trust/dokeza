from django.urls import path

from .views import (
    PostListView,
    PostDetailView,
    PostMonthArchiveView,
    MemorandumListView,
    MemorandumDetailView,
    PetitionListView,
    PetitionDetailView
)

app_name = "posts"

urlpatterns = [
    path('memoranda/', MemorandumListView.as_view(), name='memoranda'),
    path('memoranda/<slug>/', MemorandumDetailView.as_view(), name='memorandum'),
    path('petitions/', PetitionListView.as_view(), name='petitions'),
    path('petitions/<slug>/', PetitionDetailView.as_view(), name='petition'),
    path('', PostListView.as_view(), name='list'),
    path('<slug>/', PostDetailView.as_view(), name='detail'),
    path('<year>/<month>)/', PostMonthArchiveView.as_view(), name="archive_month"),
]
