from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _


class UsersConfig(AppConfig):
    name = "dokeza_2_0.users"
    verbose_name = _("Dokeza Users")

    def ready(self):
        try:
            import dokeza_2_0.users.signals  # noqa F401
        except ImportError:
            pass
