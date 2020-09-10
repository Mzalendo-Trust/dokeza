from django.urls import path

from .views import (
    UserCreateAPIView, UserLoginAPIView, UserDetailAPIView,
    UserUpdateAPIView, UserRedirectAPIView
)

app_name = "users"
urlpatterns = [
    path('login/', UserLoginAPIView.as_view(), name='login'),
    path('register/', UserCreateAPIView.as_view(), name='register'),

    path('<email>', UserDetailAPIView.as_view(), name='detail'),
    path('~redirect/', UserRedirectAPIView.as_view(), name='redirect'),
    path('~update/', UserUpdateAPIView.as_view(), name='update'),
]
