from django.conf import settings
from django.contrib.auth.views import LoginView
from django.shortcuts import redirect
from django.utils.http import url_has_allowed_host_and_scheme
from django.views.decorators.debug import sensitive_post_parameters
from django.views.generic import TemplateView

from admin_dashboard.utils import get_hit_counts
from bills.models import Bill
from django.contrib.auth import get_user_model
from django.utils.decorators import method_decorator
from django.views.decorators.cache import never_cache
from django.views.decorators.csrf import csrf_protect
from hitcount.models import Hit
from schedule.models import Event

User = get_user_model()


# Create your views here.

class DashboardView(TemplateView):
    template_name = "admin/dashboard_index.html"

    def get_context_data(self, **kwargs):
        context = super().get_context_data()
        context['bills_sum'] = Bill.objects.count()
        context['users_sum'] = User.objects.count()
        context['hits_sum'] = Hit.objects.all().count()
        context['events_sum'] = Event.objects.all().count()
        context['hit_counts'] = get_hit_counts()
        return context


class DashboardFrameView(TemplateView):
    template_name = "admin/dashboard_index_frame.html"
