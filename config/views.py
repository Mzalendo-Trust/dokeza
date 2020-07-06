import time
import calendar
from datetime import datetime, timedelta
from django.http import HttpResponse
from django.views.generic import TemplateView


class HomeView(TemplateView):
    template_name = 'index.html'

    def get_context_data(self, **kwargs):
        context = super(HomeView, self).get_context_data(**kwargs)
        # context['bills'] = Bill.objects.filter(private=False).order_by('-updated_date')
        # context['other_docs'] = Doc.objects.order_by('-created')
        # context['news'] = Post.objects.all().filter(draft=False).order_by('-publish')
        # context['events'] = PublicEvent.objects.all()
        # context['memoranda'] = Memorandum.objects.all().order_by('-deadline')
        context['page'] = 'home'
        # context['stingo'] = 'latest'
        return context


class AboutView(TemplateView):
    template_name = 'pages/about.html'

    def get_context_data(self, **kwargs):
        context = super(AboutView, self).get_context_data(**kwargs)
        context['page'] = 'home'
        context['stingo'] = 'about'
        return context


class HelpView(TemplateView):
    template_name = 'pages/help.html'

    def get_context_data(self, **kwargs):
        context = super(HelpView, self).get_context_data(**kwargs)
        context['page'] = 'help'
        context['stingo'] = 'help'
        return context


class PrivacyView(TemplateView):
    template_name = 'pages/privacypolicy.html'

    def get_context_data(self, **kwargs):
        context = super(PrivacyView, self).get_context_data(**kwargs)
        context['page'] = 'help'
        context['stingo'] = 'privacy'
        return context


class ContactView(TemplateView):
    template_name = 'pages/contacts.html'

    def get_context_data(self, **kwargs):
        context = super(ContactView, self).get_context_data(**kwargs)
        context['page'] = 'home'
        context['stingo'] = 'contacts'
        return context


class SearchView(TemplateView):
    template_name = 'pages/search.html'

    def get_context_data(self, **kwargs):
        context = super(SearchView, self).get_context_data(**kwargs)
        search_items = []
        context['search_items'] = search_items
        context['page'] = 'help'
        context['stingo'] = 'search'
        return context
