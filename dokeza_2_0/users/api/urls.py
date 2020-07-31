from django.urls import path

from .views import UserCreateAPIView, UserLoginAPIView
# UserDetailAPIView, UserUpdateAPIView, UserRedirectAPIView UserListAPIView

app_name = "users"
urlpatterns = [
    # path('', UserListAPIView.as_view(), name='list'),
    path('login/', UserLoginAPIView.as_view(), name='login'),
    path('register/', UserCreateAPIView.as_view(), name='register'),

    # path('<email>', UserDetailAPIView.as_view(), name='detail'),
    # path('~redirect/', UserRedirectAPIView.as_view(), name='redirect'),
    # path('~update/', UserUpdateAPIView.as_view(), name='update'),
]
