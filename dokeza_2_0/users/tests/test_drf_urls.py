import pytest
from django.urls import resolve, reverse

from dokeza_2_0.users.models import User

pytestmark = pytest.mark.django_db

# @pytest.mark.django_db

def test_user_detail(user: User):
    assert (
        reverse("api:user-detail", kwargs={"email": user.email})
        == f"/api/users/{user.email}/"
    )
    assert resolve(f"/api/users/{user.email}/").view_name == "api:user-detail"


def test_user_list():
    assert reverse("api:user-list") == "/api/users/"
    assert resolve("/api/users/").view_name == "api:user-list"


def test_user_me():
    assert reverse("api:user-me") == "/api/users/me/"
    assert resolve("/api/users/me/").view_name == "api:user-me"
