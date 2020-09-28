import time
import calendar
from datetime import datetime, timedelta
from django.http import HttpResponse
from django.views.generic import TemplateView

from public_participation.models import PublicEvent
from bills.models import Bill
from other_docs.models import Doc
from posts.models import Post, Memorandum

mnames = "January February March April May June July August September October November December"
mnames = mnames.split()
class JSONResponse(HttpResponse):

    """
    An HttpResponse that renders its content into JSON.
    """

    def __init__(self, data, **kwargs):
        content = JSONRenderer().render(data)
        kwargs['content_type'] = 'application/json'
        super(JSONResponse, self).__init__(content, **kwargs)


def Root(request):
    return JSONResponse({"name": "The Dokeza Annotation Store.", "version": "0.1.0"})
    

class HomeView(TemplateView):
    template_name = 'index.html'

    def get_context_data(self, **kwargs):
        context = super(HomeView, self).get_context_data(**kwargs)
        context['bills'] = Bill.objects.filter(private=False).order_by('-updated_date')
        context['other_docs'] = Doc.objects.order_by('-created')
        context['news'] = Post.objects.all().filter(draft=False).order_by('-publish')
        context['memoranda'] = Memorandum.objects.all().order_by('-deadline')
        context['page'] = 'home'
        context['stingo'] = 'latest'
        return context


class HowToView(TemplateView):
    template_name = 'pages/how_to.html'

    def get_context_data(self, **kwargs):
        context = super(HowToView, self).get_context_data(**kwargs)
        context['page'] = 'how_to'
        context['stingo'] = 'use_dokeza'
        return context

class FaqView(TemplateView):
    template_name = 'pages/faqs.html'

    def get_context_data(self, **kwargs):
        context = super(FaqView, self).get_context_data(**kwargs)
        context['page'] = 'how_to'
        context['stingo'] = 'faqs'
        return context


class PrivacyView(TemplateView):
    template_name = 'pages/privacypolicy.html'

    def get_context_data(self, **kwargs):
        context = super(PrivacyView, self).get_context_data(**kwargs)
        context['page'] = 'how_to'
        context['stingo'] = 'privacy'
        return context


class SearchView(TemplateView):
    template_name = 'pages/search.html'

    def get_context_data(self, **kwargs):
        context = super(SearchView, self).get_context_data(**kwargs)
        search_items = []
        context['search_items'] = search_items
        context['page'] = 'how_to'
        context['stingo'] = 'search'
        return context


class ContactView(TemplateView):
    template_name = 'pages/contacts.html'

    def get_context_data(self, **kwargs):
        context = super(ContactView, self).get_context_data(**kwargs)
        context['page'] = 'contacts'
        context['stingo'] = 'contact_us'
        return context


class ResourcesView(TemplateView):
    template_name = 'public_participation/memoranda_list.html'

    def get_context_data(self, **kwargs):
        context = super(ResourcesView, self).get_context_data(**kwargs)
        context['page'] = 'resources'
        context['stingo'] = 'memoranda'
        return context


class AboutView(TemplateView):
    template_name = 'pages/about.html'

    def get_context_data(self, **kwargs):
        context = super(AboutView, self).get_context_data(**kwargs)
        context['page'] = 'contacts'
        context['stingo'] = 'about'
        return context


class CalendarView(TemplateView):
    template_name = 'public_participation/public_list.html'

    def get_context_data(self, *args, **kwargs):
        """Listing of days in `month`."""
        year = time.localtime()[0]
        month = time.localtime()[1]
        lst = []

        # apply next / previous change
        change = ()
        if change in ("next", "prev"):
            now, mdelta = datetime(year, month, 1), timedelta(days=31)
            if change == "next":
                mod = mdelta
            elif change == "prev":
                mod = -mdelta

            year, month = (now + mod).timetuple()[:2]

        # init variables
        cal = calendar.Calendar()
        month_days = cal.itermonthdays(year, month)
        nyear, nmonth, nday = time.localtime()[:3]
        lst = [[]]
        week = 0

        # make month lists containing list of days for each week
        # each day tuple will contain list of events and 'current' indicator
        for day in month_days:
            events = current = False   # are there events for this day; current day?
            if day:
                events = PublicEvent.objects.filter(
                    start__year=year, start__month=month, start__day=day)
                if day == nday and year == nyear and month == nmonth:
                    current = True

            lst[week].append((day, events, current))
            if len(lst[week]) == 7:
                lst.append([])
                week += 1

        return dict(year=year, month=month, month_days=lst,
                    mname=mnames[month - 1])
