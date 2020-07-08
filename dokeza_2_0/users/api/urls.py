from django.conf.urls import url

from .views import UserCreateAPIView, UserLoginAPIView
# UserDetailAPIView, UserUpdateAPIView, UserRedirectAPIView UserListAPIView


urlpatterns = [
    # url(r'^$', UserListAPIView.as_view(), name='list'),
    url(r'^login/$', UserLoginAPIView.as_view(), name='login'),
    url(r'^register/$', UserCreateAPIView.as_view(), name='register'),

    # url(r'^(?P<username>[\w.@+-]+)/$', UserDetailAPIView.as_view(), name='detail'),
    # url(r'^~redirect/$', UserRedirectAPIView.as_view(), name='redirect'),
    # url(r'^~update/$', UserUpdateAPIView.as_view(), name='update'),
]
