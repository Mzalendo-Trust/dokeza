from django.contrib.sitemaps import Sitemap
from posts.models import Post, Petition, Memorandum


class PostSitemap(Sitemap):
    changefreq = "weekly"
    priority = 0.5

    def items(self):
        return Post.objects.filter(draft=False)

    def lastmod(self, obj):
        return obj.updated


class PetitionSitemap(Sitemap):
    changefreq = "monthly"
    priority = 0.5

    def items(self):
        return Petition.objects.filter(draft=False)

    def lastmod(self, obj):
        return obj.deadline


class MemorandumSitemap(Sitemap):
    changefreq = "monthly"
    priority = 0.5

    def items(self):
        return Memorandum.objects.all()

    def lastmod(self, obj):
        return obj.deadline
