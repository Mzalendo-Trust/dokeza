from django.urls import path

from . import views
from config.doc_views import index, actions

app_name = "users"

urlpatterns = [
    path("~documents/", index.default, name="documents"),
    path("~redirect/", view=views.user_redirect_view, name="redirect"),
    path("~update/", view=views.user_update_view, name="update"),
    path("<str:email>/", view=views.user_detail_view, name="detail"),
    path("~profile_update/", views.ProfileUpdateView.as_view(), name="profile_update"),
    # path("~annotations/<int:year>/", views.UserAnnotationArchiveView.as_view(),
    #     name="annotations_year_archive"),
    # path("~comments/<int:year>/", views.UserCommentsArchiveView.as_view(),
    #     name="comment_year_archive"),

    # URL pattern for the User Drafts
    path("~documents/upload", actions.upload),
    path("~documents/convert/", actions.convert),
    path("~documents/create/", actions.createNew),
    path("~documents/edit", actions.edit, name="document-edit"),
    path("~documents/track", actions.track),
    path("~documents/send-memo/<str:file_title>", views.UserSendMemorandum.as_view(), name="send-memorandum"),
    path("~documents/remove", actions.remove)
]
