# import os
from ckeditor.fields import RichTextField
from django.conf import settings
from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes.fields import GenericRelation
from django.urls import reverse
from django.db import models
from django.db.models.signals import pre_save

from annotator.models import Annotation
from comments.models import Comment
from slugify import slugify

from dokeza_2_0.users.models import Institution
from taggit.managers import TaggableManager
from hitcount.models import HitCount, HitCountMixin


class DocManager(models.Manager):
    def all(self):
        return self.order_by('-created')

class Doc(HitCountMixin, models.Model):
    """
    This is a document up for discussion.

    Description:
    Every once in a while, the executive arm of the government, a civil society organisation
    or a member of the public would like to have a document discussed in public.
    This may be a Policy document, a proposal for a legislative bill or a proposal for a petition.
    The owner would like the stakeholders to deliberate over the contents and engage with them
    before making a decision on the next steps.

    Dokeza members will be able to highlight sections of the document and comment on them
    as well as comment on the entire document as a whole.
    """

    owner = models.ForeignKey(settings.AUTH_USER_MODEL, default=1, on_delete=models.CASCADE)
    title = models.CharField(max_length=100, default='A document for discussion')
    slug = models.SlugField(unique=True)
    institution = models.ForeignKey(Institution, blank=True, null=True, on_delete=models.CASCADE)
    purpose = models.TextField(max_length=500, blank=True, null=True)
    body = RichTextField(
        blank=True,
        help_text="Copy the document and paste with all its styling. If necessary use the editing tools to style it sufficiently.")
    created = models.DateTimeField(auto_now_add=True, db_index=True)
    pdf = models.FileField(upload_to='Documents/', blank=True, null=True, help_text='Upload the actual document here if necessary.')
    doc_pic = models.ImageField(upload_to='doc_pics/', blank=True, null=True,
                                help_text='Upload an image of the top page of the document.')
    tags = TaggableManager(blank=True)
    hit_count_generic = GenericRelation(
        HitCount, object_id_field='object_pk',
        related_query_name='hit_count_generic_relation')

    objects = DocManager()

    @property
    def comments(self):
        instance = self
        qs = Comment.objects.filter_by_instance(instance)
        return qs

    def annotations(self):
        slug = self.slug
        annotations = [annot for annot in Annotation.objects.all() if annot.get_bill_slug() == slug]
        return annotations

    @property
    def get_content_type(self):
        instance = self
        content_type = ContentType.objects.get_for_model(instance.__class__)
        return content_type

    def get_absolute_url(self):
        return reverse('other_docs:detail', kwargs={'slug': self.slug})

    def __str__(self):
        return self.title


def create_slug(instance, new_slug=None):
    slug = slugify(instance.title.lower())
    if new_slug is not None:
        slug = new_slug
    qs = Doc.objects.filter(slug=slug).order_by("-id")
    exists = qs.exists()
    if exists:
        new_slug = "%s-%s" % (slug, qs.first().id)
        return create_slug(instance, new_slug=new_slug)
    return slug


def pre_save_doc_receiver(sender, instance, *args, **kwargs):
    if not instance.slug:
        instance.slug = create_slug(instance)


pre_save.connect(pre_save_doc_receiver, sender=Doc)
