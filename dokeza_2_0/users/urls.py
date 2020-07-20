from django.urls import path

from . import views
from src.views import index, actions

app_name = "users"
urlpatterns = [
    path("~redirect/", view=views.user_redirect_view, name="redirect"),
    path("~update/", view=views.user_update_view, name="update"),
    path("<str:email>/", view=views.user_detail_view, name="detail"),
    path("~profile_update/", views.ProfileUpdateView.as_view(), name="profile_update"),
    path("~annotations/", views.UserAnnotationView.as_view(), name="annotations"),
    path("~annotations/<int:year>/", views.UserAnnotationArchiveView.as_view(), name="annotations_year_archive"),
    path("~comments/", views.UserCommentsView.as_view(), name="comments"),
    path("~comments/<int:year>/", views.UserCommentsArchiveView.as_view(),
        name="comment_year_archive"),

    # URL pattern for the User Drafts
    path("~draft-bill/", views.UserBillDraftView.as_view(), name="draft-bill"),
    path("~draft-petition/", views.UserPetitionDraftView.as_view(), name="draft-petition"),
    path("~drafts/petitions/", views.UserPetitionListView.as_view(), name="petitions"),
    path("~drafts/petition/<slug>/", views.UserPetitionUpdateView.as_view(), name="update_petition"),
    path("~drafts/bills/", views.UserBillListView.as_view(), name="bills"),
    path("~drafts/bill/<slug>/", views.UserBillUpdateView.as_view(), name='update_bill'),
    path("~documents/", index.default, name="documents"),
    path("~documents/upload", actions.upload),
    path("~documents/conver", actions.convert),
    path("~documents/create", actions.createNew),
    path("~documents/edit", actions.edit),
    path("~documents/track", actions.track),
    path("~documents/remove", actions.remove)
]
