from django.contrib.contenttypes.models import ContentType
from django.http import HttpResponseForbidden, HttpResponseRedirect
from django.views.generic import View
from django.views.generic import ListView, FormView, TemplateView, DetailView
from django.views.generic.detail import SingleObjectMixin

from .models import PublicEvent
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

