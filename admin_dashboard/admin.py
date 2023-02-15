from django.contrib.admin import AdminSite, site
from django.contrib.auth import REDIRECT_FIELD_NAME
from django.http import HttpResponseRedirect
from django.urls import reverse, path
from django.utils.translation import gettext as _
from django.views.decorators.cache import never_cache

from admin_dashboard.views import DashboardFrameView


class DashboardAdminSite(AdminSite):

    def __init__(self, *args, **kwargs):
        super(DashboardAdminSite, self).__init__(*args, **kwargs)
        self._registry.update(site._registry)

    def get_urls(self):
        urls = super().get_urls()
        dashboard_urls = [
            path('dashboard/', self.admin_view(DashboardFrameView.as_view()), name='dashboard_view'),
         ]
        return dashboard_urls + urls

    def get_app_list(self, request):
        app_list = super().get_app_list(request)
        app_list.insert(0, {
            'name': 'Dashboard',
            'app_label': 'dashboard',
            'models': [{
                'name': 'View Dashboard',
                'admin_url': reverse('admin:dashboard_view', args=[]),
            }],
        })
        return app_list

    @never_cache
    def login(self, request, extra_context=None):
        """
        Display the login form for the given HttpRequest.
        """
        if request.method == 'GET' and self.has_permission(request):
            # Already logged-in, redirect to admin index
            index_path = reverse('admin:dashboard_view', current_app=self.name)
            return HttpResponseRedirect(index_path)

        # Since this module gets imported in the application's root package,
        # it cannot import models from other applications at the module level,
        # and django.contrib.admin.forms eventually imports User.
        from django.contrib.admin.forms import AdminAuthenticationForm
        from django.contrib.auth.views import LoginView
        context = {
            **self.each_context(request),
            'title': _('Log in'),
            'app_path': request.get_full_path(),
            'username': request.user.get_username(),
        }
        if (REDIRECT_FIELD_NAME not in request.GET and
                REDIRECT_FIELD_NAME not in request.POST) or \
                request.GET.get(REDIRECT_FIELD_NAME) == '/admin/':
            context[REDIRECT_FIELD_NAME] = reverse('admin:dashboard_view', current_app=self.name)

        context.update(extra_context or {})

        defaults = {
            'extra_context': context,
            'authentication_form': self.login_form or AdminAuthenticationForm,
            'template_name': self.login_template or 'admin/login.html',
        }
        request.current_app = self.name
        return LoginView.as_view(**defaults)(request)


dashboard_admin_site = DashboardAdminSite(name='dashboard_admin')

