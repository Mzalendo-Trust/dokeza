from django.urls import path

from .views import (
    AssemblyBillListView,
    SenateBillListView,
    BillListView,
    BillDetailView
)

from config.doc_views import actions

app_name="bills"

urlpatterns = [
    path('', BillListView.as_view(), name='list'),
    path('assembly/', AssemblyBillListView.as_view(), name='assembly'),
    path('senate/', SenateBillListView.as_view(), name='senate'),
    path("<slug>/", BillDetailView.as_view(), name="detail"),
    path("track", actions.track)
]
