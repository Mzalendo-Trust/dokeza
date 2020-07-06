import uuid
from urllib.parse import urlparse

from django.conf import settings
from django.contrib.contenttypes.models import ContentType
from django.urls import reverse
from django.db import models

from comments.models import Comment


class Annotation(models.Model):
    """
    Follows the `Annotation format <http://docs.annotatorjs.org/en/v1.2.x/annotation-format.html>`_,
    of ``annotatorjs``.
    """

    id = models.UUIDField(primary_key=True, default=uuid.uuid4)
    annotator_schema_version = models.CharField(max_length=8, default="v1.0")
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    created = models.DateTimeField(auto_now_add=True)
    updated = models.DateTimeField(auto_now=True)
    text = models.TextField()
    quote = models.TextField()
    uri = models.CharField(max_length=4096, blank=True)
    consumer = models.CharField(max_length=64, blank=True, default='Mzalendo Dokeza')

    class Meta:
        ordering = ("created",)

    def get_absolute_url(self):
        return reverse('annotations:read_update_delete', kwargs={'id': self.id})

    def get_delete_url(self):
        return reverse('annotations:read_update_delete', kwargs={'id': self.id})

    def get_bill_slug(self):
        uri = self.uri
        bill_slug = urlparse(uri).path.split('/')[2]
        return bill_slug

    @property
    def comments(self):
        instance = self
        qs = Comment.objects.filter_by_instance(instance)
        return qs

    @property
    def get_content_type(self):
        instance = self
        content_type = ContentType.objects.get_for_model(instance.__class__)
        return content_type


class Range(models.Model):
    """
    Follows the `Annotation format <http://docs.annotatorjs.org/en/v1.2.x/annotation-format.html>`_,
    of ``annotatorjs``.

    :param start: (relative) XPath to start element
    :param end: (relative) XPath to end element
    :param startOffset: character offset within start element
    :param endOffset: character offset within end element
    :param annotation: related ``Annotation``
    """
    start = models.CharField(max_length=128)
    end = models.CharField(max_length=128)
    startOffset = models.IntegerField()
    endOffset = models.IntegerField()
    annotation = models.ForeignKey(Annotation, related_name="ranges", on_delete=models.CASCADE)
