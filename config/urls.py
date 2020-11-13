from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.contrib.staticfiles.urls import staticfiles_urlpatterns
from django.urls import include, path
from django.views import defaults as default_views
from django.views.i18n import JavaScriptCatalog
from django.views.generic import TemplateView
from rest_framework.authtoken.views import obtain_auth_token

from dokeza_2_0.users.api.views import get_jwt_token
from .views import (
    HomeView,  HowToView, FaqView, PrivacyView, SearchView,
    ResourcesView, AboutView, ContactView
)
from posts.views import TagIndexView


urlpatterns = [
    path('', HomeView.as_view(), name='home'),
    path('how-to/', HowToView.as_view(), name='how_to'),
    path('faqs/', FaqView.as_view(), name='faqs'),
    path('about/', AboutView.as_view(), name='about'),
    path('privacy-policy/', PrivacyView.as_view(), name='privacy'),
    path('search/', SearchView.as_view(), name='search'),
    path('resources/', ResourcesView.as_view(), name='resources'),
    path('contacts/', ContactView.as_view(), name='contacts'),
    path('tag/<slug>/', TagIndexView.as_view(), name='tagged'),
    path('google6b1213ccd54381fc\.html', TemplateView.as_view(template_name="google6b1213ccd54381fc.html")),
    
    # Django Admin, use {% url 'admin:index' %}
    path('jsi18n', JavaScriptCatalog.as_view(), name='js-catlog'),
    path(settings.ADMIN_URL, admin.site.urls),
    
    # User management
    path("users/", include("dokeza_2_0.users.urls", namespace="users")),
    path("accounts/", include("allauth.urls")),
   
    # These are the App urls.
    path("bills/", include("bills.urls", namespace="bills")),
    path("regulations/", include("other_docs.urls", namespace="regulations")),
    path('docbuilder/', include('docbuilder.urls', namespace="docbuilder")),
    path('posts/', include('posts.urls', namespace='posts')),
    path('events/', include('public_participation.urls', namespace='public_participation')),
    path('ckeditor/', include('ckeditor_uploader.urls')),
   
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
if settings.DEBUG:
    # Static file serving when using Gunicorn + Uvicorn for local web socket development
    urlpatterns += staticfiles_urlpatterns()

# API URLS
urlpatterns += [
    # API base url
    path("api/", include("config.api_router")),
    # DRF auth token
    path("auth-token/", obtain_auth_token),
    path('api/auth/', include('rest_framework.urls', namespace='rest_framework')),
    path('api/auth/token/', get_jwt_token),
    path('api/users/', include('dokeza_2_0.users.api.urls', namespace='users-api')),

    # Access APIs
    # path('api/annotations/', include('annotator.api.urls', namespace='annotations-api')),
    path('api/bills/', include('bills.api.urls', namespace='bills-api')),
    # path('api/analysis/', include('posts.api.urls', namespace='posts-api')),
    # path('api/comments/', include('comments.api.urls', namespace='comments-api')),
    path('api/public-participation/', include('public_participation.api.urls', namespace='public_participation-api'))
]

if settings.DEBUG:
    # This allows the error pages to be debugged during development, just visit
    # these url in browser to see how these error pages look like.
    urlpatterns += [
        path(
            "400/",
            default_views.bad_request,
            kwargs={"exception": Exception("Bad Request!")},
        ),
        path(
            "403/",
            default_views.permission_denied,
            kwargs={"exception": Exception("Permission Denied")},
        ),
        path(
            "404/",
            default_views.page_not_found,
            kwargs={"exception": Exception("Page not Found")},
        ),
        path("500/", default_views.server_error),
    ]
    if "debug_toolbar" in settings.INSTALLED_APPS:
        import debug_toolbar

        urlpatterns = [path("__debug__/", include(debug_toolbar.urls))] + urlpatterns
