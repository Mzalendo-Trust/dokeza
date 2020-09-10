from django.conf import settings
from rest_framework.routers import DefaultRouter, SimpleRouter

from bills.api.views import BillListAPIView

if settings.DEBUG:
    router = DefaultRouter()
else:
    router = SimpleRouter()

# router.register("bills", BillListAPIView)


app_name = "api"
urlpatterns = router.urls
