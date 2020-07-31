import pytest
from django.urls import resolve, reverse

from dokeza_2_0.users.models import User

pytestmark = pytest.mark.django_db

# @pytest.mark.django_db

def test_detail(user: User):
    assert (
        reverse("users:detail", kwargs={"email": user.email})
        == f"/users/{user.email}/"
    )
    assert resolve(f"/users/{user.email}/").view_name == "users:detail"


def test_update():
    assert reverse("users:update") == "/users/~update/"
    assert resolve("/users/~update/").view_name == "users:update"


def test_redirect():
    assert reverse("users:redirect") == "/users/~redirect/"
    assert resolve("/users/~redirect/").view_name == "users:redirect"


def test_documents():
    assert reverse("users:documents") == "/users/~documents/"
    assert resolve("/users/~documents/").view_name == "users:documents"


def test_annotations():
    assert reverse("users:annotations") == "/users/~annotations/"
    assert resolve("/users/~annotations/").view_name == "users:annotations"


def test_comments():
    assert reverse("users:comments") == "/users/~comments/"
    assert resolve("/users/~comments/").view_name == "users:comments"
