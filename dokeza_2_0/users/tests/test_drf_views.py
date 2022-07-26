import pytest
from django.test import RequestFactory

from dokeza_2_0.users.api.views import UserViewSet
from dokeza_2_0.users.models import User

pytestmark = pytest.mark.django_db

def test_get_queryset(self, user: User, rf: RequestFactory):
    view = UserViewSet()
    request = rf.get("/fake-url/")
    request.user = user

    view.request = request

    assert user in view.get_queryset()

def test_me(self, user: User, rf: RequestFactory):
    view = UserViewSet()
    request = rf.get("/fake-url/")
    request.user = user

    view.request = request

    response = view.me(request)

    assert response.data == {
        "email": user.email,
        "name": user.name,
        "url": f"http://testserver/api/users/{user.email}/",
    }
