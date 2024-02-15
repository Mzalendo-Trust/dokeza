import json

from django.contrib import messages
from django.contrib.auth import get_user_model
from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from django.urls import reverse
from django.utils.translation import gettext_lazy as _
from django.utils.decorators import method_decorator
from django.views import View
from django.views.generic import DetailView, ListView, RedirectView, TemplateView, UpdateView, CreateView

from django.views.generic.dates import YearArchiveView
from django.views.generic.detail import SingleObjectMixin
from django.views.generic.edit import ModelFormMixin
from django.contrib.auth.mixins import LoginRequiredMixin

from bills.models import Bill
from posts.models import Petition

from .models import User, Profile

from bills.forms import BillForm
from posts.forms import PetitionForm
from config.settings import base
from config.utils import docManager

User = get_user_model()


class UserDetailView(LoginRequiredMixin, DetailView):

    model = User
    slug_field = "email"
    slug_url_kwarg = "email"

    def get_context_data(self, **kwargs):
        context = super(UserDetailView, self).get_context_data(**kwargs)
        # my_annotations =
        my_bills = Bill.objects.filter(owner=self.request.user)
        # my_comments =

        context['my_bills'] = my_bills
        # context['my_annotations'] = my_annotations
        # context['my_comments'] = my_comments
        context['page'] = 'users'
        context['stingo'] = 'profile'
        return context


user_detail_view = UserDetailView.as_view()


class UserUpdateView(LoginRequiredMixin, UpdateView):

    model = User
    fields = ['first_name', 'last_name', 'email', 'is_subscribed_tracker']

    def get_context_data(self, **kwargs):
        context = super(UserUpdateView, self).get_context_data(**kwargs)
        context['page'] = 'users'
        context['stingo'] = 'profile'
        return context

    def get_success_url(self):
        return reverse("users:detail",
                       kwargs={"email": self.request.user.email})

    def get_object(self):
        # Only get the User record for the user making the request
        return User.objects.get(email=self.request.user.email)

    def form_valid(self, form):
        messages.add_message(
            self.request, messages.INFO, _("Infos successfully updated")
        )
        return super().form_valid(form)


user_update_view = UserUpdateView.as_view()


class UserRedirectView(LoginRequiredMixin, RedirectView):

    permanent = False

    def get_redirect_url(self):
        return reverse("users:detail", kwargs={"email": self.request.user.email})


user_redirect_view = UserRedirectView.as_view()


class ProfileObjectMixin(SingleObjectMixin):
    """
    Provides views with the current user's profile.
    """
    model = Profile
    fields = ['gender', 'bio', 'county_residence', 'country', 'county_interest',
              'facebook', 'twitter', 'view_contacts', 'mobile']

    def get_context_data(self, **kwargs):
        context = super(ProfileObjectMixin, self).get_context_data(**kwargs)
        context['page'] = 'users'
        context['stingo'] = 'profile'
        return context

    def get_object(self):
        """Return's the current users profile."""
        try:
            return self.request.user.get_profile()
        except Profile.DoesNotExist:
            raise ValueError(
                "The user does not have an associated profile.")

    def get_success_url(self):
        return reverse("users:detail",
                       kwargs={"email": self.request.user.email})

    @method_decorator(login_required)
    def dispatch(self, request, *args, **kwargs):
        """Ensures that only authenticated users can access the view."""
        auth_user = ProfileObjectMixin
        return super(auth_user, self).dispatch(request, *args, **kwargs)


class ProfileUpdateView(ProfileObjectMixin, UpdateView):
    """
    A view that displays a form for editing a user's profile.

    Uses a form dynamically created for the `Profile` model and
    the default model's update template.
    """

    def get_success_url(self):
        return reverse("users:detail",
                       kwargs={"email": self.request.user.email})


class UserDocumentsView(LoginRequiredMixin, TemplateView):
    template_name = 'users/user_documents.html'

    def get_context_data(self, **kwargs):
        context = super(UserDocumentsView, self).get_context_data(**kwargs)
        print('document context', context)
        context['languages'] = docManager.LANGUAGES,
        context['preloadurl'] = base.DOC_SERV_PRELOADER_URL,
        context['editExt'] = json.dumps(base.DOC_SERV_EDITED),
        context['convExt'] = json.dumps(base.DOC_SERV_CONVERT),
        context['page'] = 'users'
        context['stingo'] = 'documents'
        return context


class UserSendMemorandum(View):
    pass
