from django.contrib.sitemaps import Sitemap
from bills.models import Bill


class BillSitemap(Sitemap):
    changefreq = "weekly"
    priority = 0.5

    def items(self):
        return Bill.objects.filter(private=False)

    def lastmod(self, obj):
        return obj.updated_date
