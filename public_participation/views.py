from django.contrib.contenttypes.models import ContentType
from django.http import HttpResponseForbidden, HttpResponseRedirect
from django.views.generic import View
from django.views.generic import ListView, FormView, TemplateView, DetailView
from django.views.generic.detail import SingleObjectMixin
from .models import PublicEvent
from posts.models import Petition, Memorandum
from comments.forms import CommentForm
from comments.models import Comment
from hitcount.views import HitCountDetailView

mnames = "January February March April May June July August September October November December"
mnames = mnames.split()

"""
We have put the Mzalendo "posted" views in the "posts" app.
These are the News and Memoranda views. Petitions are part of the Public Particiapation here because they are a public creation.
"""


class PublicParticipationList(TemplateView):
    model = PublicEvent
    template_name = 'public_participation/public_list.html'

    def get_context_data(self, **kwargs):
        context = super(PublicParticipationList, self).get_context_data(**kwargs)
        context['events'] = PublicEvent.objects.all()
        context['memoranda'] = Memorandum.objects.all()
        context['petitions'] = Petition.objects.all()
        context['page'] = 'public'
        context['stingo'] = 'all'
        return context


class PublicEventsList(ListView):
    model = PublicEvent
    template_name = 'events/list.html'

    def get_context_data(self, *args, **kwargs):
        context = super(PublicEventsList, self).get_context_data(**kwargs)
        context["page"] = "events"
        context["stingo"] = "public"
        return context


class PublicEventView(DetailView):
    model = PublicEvent
    template_name = 'public_participation/public_event_detail.html'

    def get_context_data(self, *args, **kwargs):
        context = super(PublicEventView, self).get_context_data(**kwargs)

        if self.object.house == 1:
            house = 'assembly'
        elif self.object.house == 2:
            house = 'senate'
        else:
            house = 'county'

        context["page"] = "events"
        context["stingo"] = "details"
        context['house'] = house
        return context


class PetitionListView(ListView):
    model = Petition
    template_name = "public_participation/petitions_list.html"

    def get_context_data(self, **kwargs):
        context = super(PetitionListView, self).get_context_data(**kwargs)
        petitions = Petition.objects.filter(draft=False)
        context["page"] = "public"
        context["stingo"] = "petitions"
        context["petitions"] = petitions
        return context


class PetitionDisplayView(HitCountDetailView):
    model = Petition
    count_hit = True
    template_name = "public_participation/petition_detail.html"

    def get_context_data(self, *args, **kwargs):
        context = super(PetitionDisplayView, self).get_context_data(**kwargs)
        comments = self.object.comments

        initial_data = {
            "content_type": self.object.get_content_type,
            "object_id": self.object.id,
        }
        context["comment_form"] = CommentForm(initial=initial_data)
        context["comments"] = comments
        context["page"] = "public"
        context["stingo"] = "petitions"
        return context


class PetitionCommentView(SingleObjectMixin, FormView):
    model = Petition
    form_class = CommentForm
    template_name = "public_participation/petition_detail.html"

    def post(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return HttpResponseForbidden()
        self.object = self.get_object()

        form = CommentForm(request.POST or None)
        if form.is_valid():
            c_type = form.cleaned_data.get("content_type")
            content_type = ContentType.objects.get(model=c_type)
            obj_id = form.cleaned_data.get('object_id')
            content_data = form.cleaned_data.get("content")
            parent_obj = None
            try:
                parent_id = int(request.POST.get("parent_id"))
            except ValueError:
                parent_id = None

            if parent_id:
                parent_qs = Comment.objects.filter(id=parent_id)
                if parent_qs.exists() and parent_qs.count() == 1:
                    parent_obj = parent_qs.first()

            new_comment, created = Comment.objects.get_or_create(
                user=request.user,
                content_type=content_type,
                object_id=obj_id,
                content=content_data,
                parent=parent_obj,
            )
            return HttpResponseRedirect(
                new_comment.content_object.get_absolute_url()
            )
        else:
            return self.form_invalid(form)


class PetitionDetailView(View):

    def get(self, request, *args, **kwargs):
        view = PetitionDisplayView.as_view()
        return view(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        view = PetitionCommentView.as_view()
        return view(request, *args, **kwargs)
