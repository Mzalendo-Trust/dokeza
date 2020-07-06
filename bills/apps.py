from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _


class BillsConfig(AppConfig):
    name = 'bills'
    verbose_name = _("Bills")
