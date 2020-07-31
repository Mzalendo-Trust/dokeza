import doc_config
import json

from django.contrib import messages
from django.contrib.auth import get_user_model
from django.contrib.auth.decorators import login_required
from django.contrib.auth.mixins import LoginRequiredMixin
from django.urls import reverse
from django.utils.translation import ugettext_lazy as _
from django.utils.decorators import method_decorator
from django.views import View
from django.views.generic import DetailView, ListView, RedirectView, TemplateView, UpdateView, CreateView

from django.views.generic.dates import YearArchiveView
from django.views.generic.detail import SingleObjectMixin
from django.views.generic.edit import ModelFormMixin
from django.contrib.auth.mixins import LoginRequiredMixin

from annotator.models import Annotation
from bills.models import Bill
from comments.models import Comment
from posts.models import Petition

from .models import User, Profile

from bills.forms import BillForm
from posts.forms import PetitionForm
from config.utils import docManager

User = get_user_model()


class UserDetailView(LoginRequiredMixin, DetailView):

    model = User
    slug_field = "email"
    slug_url_kwarg = "email"

    def get_context_data(self, **kwargs):
        context = super(UserDetailView, self).get_context_data(**kwargs)
        my_annotations = Annotation.objects.filter(user=self.request.user)
        my_bills = Bill.objects.filter(owner=self.request.user)
        my_comments = Comment.objects.filter(user=self.request.user)

        context['my_annotations'] = my_annotations
        context['my_bills'] = my_bills
        context['my_comments'] = my_comments
        context['page'] = 'users'
        context['stingo'] = 'profile'
        return context


user_detail_view = UserDetailView.as_view()


class UserUpdateView(LoginRequiredMixin, UpdateView):

    model = User
    fields = ['first_name', 'last_name', 'email']

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

# ---------------------------------------------------------
# User Panels Views
# ---------------------------------------------------------

class UserAnnotationView(TemplateView):
    template_name = 'users/user_annotations_list.html'

    def get_context_data(self, **kwargs):
        context = super(UserAnnotationView, self).get_context_data(**kwargs)
        user_annotations = [annot for annot in Annotation.objects.filter(user=self.request.user)]
        context['user_annotations'] = user_annotations
        context['page'] = 'users'
        context['stingo'] = 'annotations'
        return context


class UserAnnotationArchiveView(YearArchiveView):
    template_name = 'users/annotations_list.html'
    queryset = Annotation.objects.all()
    date_field = "created"
    make_object_list = True
    allow_future = True
    page = 'users'
    stingo = 'annotations'


class UserCommentsView(TemplateView):
    template_name = 'users/user_comments.html'

    def get_context_data(self, **kwargs):
        context = super(UserCommentsView, self).get_context_data(**kwargs)
        user_comments = [comms for comms in Comment.objects.filter(user=self.request.user)]
        context['user_comments'] = user_comments
        context['page'] = 'users'
        context['stingo'] = 'comments'
        return context


class UserCommentsArchiveView(YearArchiveView):
    template_name = 'users/user_comments_year.html'
    date_field = "timestamp"
    make_object_list = True
    allow_future = False
    page = 'users'
    stingo = 'comments'

    def get_queryset(self):
        return Comment.objects.filter(user=self.request.user)


class UserDocumentsView(LoginRequiredMixin, TemplateView):
    template_name = 'users/user_documents.html'
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        # context['user_documents'] = user_documents
        context['page'] = 'users'
        context['languages'] = docManager.LANGUAGES,
        context['preloadurl'] = doc_config.DOC_SERV_PRELOADER_URL,
        context['editExt'] = json.dumps(doc_config.DOC_SERV_EDITED),
        context['convExt'] = json.dumps(doc_config.DOC_SERV_CONVERT),
        # context['files'] = docManager.getStoredFiles(request),
        context['stingo'] = 'documents'
        print(context)
        return context


class UserBillListView(LoginRequiredMixin, ListView):
    """
    This View lists the bills that are the user's only.
    """

    model = Bill
    template_name = 'users/user_bill_list.html'

    def get_context_data(self, **kwargs):
        context = super(UserBillListView, self).get_context_data(**kwargs)
        my_bills = Bill.objects.filter(owner=self.request.user)
        context['my_bills'] = my_bills
        context['page'] = 'users'
        context['stingo'] = 'my_bills'
        return context


class UserBillDraftView(LoginRequiredMixin, CreateView):
    """
    This View is for the initial development of bills. Once the bill is saved, it will appear in the UserBillUpdateView.
    """

    model = Bill
    template_name = 'users/user_draftabill.html'
    form_class = BillForm

    def get_context_data(self, **kwargs):
        context = super(UserBillDraftView, self).get_context_data(**kwargs)
        context['page'] = 'users'
        context['stingo'] = 'draft_bill'
        return context

    def post(self, request, *args, **kwargs):
        print(dir(self))
        form = BillForm(request.POST or None)
        if form.is_valid():
            form.save()
            return redirect('users:bills')
        else:
            return self.form_invalid(form)


class UserBillUpdateView(LoginRequiredMixin, UpdateView):
    """
    This View is for the updating of bills. It only accesses the draft bills in development that belong to the user.
    """

    model = Bill
    template_name = 'users/user_draftabill.html'
    form_class = BillForm

    def get_context_data(self, **kwargs):
        context = super(UserBillUpdateView, self).get_context_data(**kwargs)
        context['page'] = 'users'
        context['stingo'] = 'draft_bill'
        return context

    def get_object(self, queryset=None):
        try:
            return super(UserBillUpdateView, self).get_object(queryset)
        except AttributeError:
            return None


class UserPetitionListView(LoginRequiredMixin, ListView):
    """
    This View lists the user's petitions only.
    """

    model = Petition
    template_name = 'users/user_petition_list.html'

    def get_context_data(self, **kwargs):
        context = super(UserPetitionListView, self).get_context_data(**kwargs)
        context['my_petitions'] = Petition.objects.filter(author=self.request.user)
        context['page'] = 'users'
        context['stingo'] = 'my_petitions'
        return context


class UserPetitionDraftView(LoginRequiredMixin, CreateView):
    """
    This view reveals the Petition Drafting form.
    """

    model = Petition
    template_name = 'users/user_draftapetition.html'
    form_class = PetitionForm

    def get_context_data(self, **kwargs):
        context = super(UserPetitionDraftView, self).get_context_data(**kwargs)
        context['page'] = 'users'
        context['stingo'] = 'draft_petition'
        return context

    def post(self, request, *args, **kwargs):
        self.object = self.get_object()
        form = PetitionForm(request.POST or None)
        if form.is_valid():
            form.save()
            return redirect('users:update_petition', kwargs={'slug': self.object.slug})
        else:
            return self.form_invalid(form)


class UserPetitionUpdateView(LoginRequiredMixin, UpdateView):
    """
    This View is for the updating of petitions. It only accesses the petitions that belong to the user.
    """

    model = Petition
    template_name = 'users/user_updateapetition.html'
    form_class = PetitionForm

    def get_context_data(self, **kwargs):
        context = super(UserPetitionUpdateView, self).get_context_data(**kwargs)
        context['page'] = 'users'
        context['stingo'] = 'draft_petition'
        return context

    def get_object(self, queryset=None):
        try:
            return super(UserPetitionUpdateView, self).get_object(queryset)
        except AttributeError:
            return None
