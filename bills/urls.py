from django.urls import path

from .views import (
    AssemblyBillListView,
    SenateBillListView,
    BillListView,
    OpenMemoBillListView,
    CommitteeBillListView,
    PlenaryBillListView,
    RegulationListView,
    BillDetailView
)

from config.doc_views import actions

app_name="bills"

urlpatterns = [
    path('', BillListView.as_view(), name='list'),
    path('assembly/', AssemblyBillListView.as_view(), name='assembly'),
    path('senate/', SenateBillListView.as_view(), name='senate'),
    path('open_memo/', OpenMemoBillListView.as_view(), name='open_memo'),
    path('committee/', CommitteeBillListView.as_view(), name='committee'),
    path('plenary/', PlenaryBillListView.as_view(), name='plenary'),
    path('regulations/', RegulationListView.as_view(), name='regulations'),
    path("<slug>/", BillDetailView.as_view(), name="detail"),
    path("track", actions.track)
]
