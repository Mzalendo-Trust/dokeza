""" SubmittedIdea Data Model

The SubmittedIdea represent the three types of data that Dokeza revolves around.
The Legislative Bill is the formal document that comes from the August houses of Parliament.
The SubmittedIdea is the informal document that comes from the public and can be taken,
even formally, by a member of Parliament and is developed into a legislative bill.
"""


from ckeditor.fields import RichTextField
from django.contrib.contenttypes.models import ContentType
from django.conf import settings
from django.urls import reverse
from django.db import models
from django.db.models.signals import pre_save
from django.utils.translation import ugettext_lazy as _

from comments.models import Comment
from slugify import slugify
from taggit.managers import TaggableManager


class SubmittedIdea(models.Model):
    """ The SubmittedIdea is the informal document that comes from the public.

    Anyone can submit an idea to the Dokeza platform and it will be reviewed and passed on
    to the relevant person or authority to respond to it. The idea may be taked up
    by an NGO and developed into a policy document or by a member of Parliament and is
    developed into a  legislative bill.
    """
    IDEA_TYPE = (
        (1, 'Bill Opinion'),
        (2, 'Petition'),
        (3, 'Memorandum '),
    )

    HOUSE = (
        (1, 'National Assembly'),
        (2, 'Senate'),
    )

    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    title = models.CharField(max_length=120)
    slug = models.SlugField(unique=True)
    idea_type = models.PositiveSmallIntegerField(
        _('Idea Type'), choices=IDEA_TYPE, default=1, blank=True, null=True)
    submit_to = models.PositiveSmallIntegerField(
        _('Submit to'), choices=HOUSE, default=1, blank=True, null=True)
    content = RichTextField(help_text='What do you have in mind?')
    draft = models.BooleanField(_('Draft'), default=True)
    private = models.BooleanField(_('Private'), default=True)
    publish = models.DateField(auto_now=False, auto_now_add=False)
    tags = TaggableManager(blank=True)

    def get_absolute_url(self):
        return reverse('ideas:detail', kwargs={'slug': self.slug})

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

    class Meta(object):
        verbose_name = _('idea')
        verbose_name_plural = _('ideas')
        ordering = ["-publish"]


def create_slug(instance, new_slug=None):
    slug = slugify(instance.title.lower())
    if new_slug is not None:
        slug = new_slug
    qs = SubmittedIdea.objects.filter(slug=slug).order_by("-id")
    exists = qs.exists()
    if exists:
        new_slug = "%s-%s" % (slug, qs.first().id)
        return create_slug(instance, new_slug=new_slug)
    return slug


def pre_save_idea_receiver(sender, instance, *args, **kwargs):
    if not instance.slug:
        instance.slug = create_slug(instance)


pre_save.connect(pre_save_idea_receiver, sender=SubmittedIdea)
