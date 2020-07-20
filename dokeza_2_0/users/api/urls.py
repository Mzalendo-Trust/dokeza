from django.urls import path

from .views import UserCreateAPIView, UserLoginAPIView
# UserDetailAPIView, UserUpdateAPIView, UserRedirectAPIView UserListAPIView

app_name = "users"
urlpatterns = [
    # url(r'^$', UserListAPIView.as_view(), name='list'),
    path('login/', UserLoginAPIView.as_view(), name='login'),
    path('register/', UserCreateAPIView.as_view(), name='register'),

    # url(r'^(?P<username>[\w.@+-]+)/$', UserDetailAPIView.as_view(), name='detail'),
    # url(r'^~redirect/$', UserRedirectAPIView.as_view(), name='redirect'),
    # url(r'^~update/$', UserUpdateAPIView.as_view(), name='update'),
]
