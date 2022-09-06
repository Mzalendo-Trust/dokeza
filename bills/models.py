""" Bill Data Model

The Bill and SubmittedIdea represent the two sets of data that Dokeza revolves around.
The Bill is the formal document that comes to the public from the August houses of Parliament.
The SubmittedIdea is the informal document that comes from the public and can be taken,
even formally, by a member of Parliament and is developed into a legislative bill.
"""

from ckeditor.fields import RichTextField
from django.conf import settings
from django.contrib.contenttypes.models import ContentType
from django.contrib.contenttypes.fields import GenericRelation
from django.urls import reverse
from django.db import models
from django.db.models.signals import pre_save, post_save
from django.dispatch import receiver
from django.utils.translation import ugettext_lazy as _

from slugify import slugify

from .managers import BillManager
from taggit.managers import TaggableManager
from hitcount.models import HitCount, HitCountMixin



class Bill(HitCountMixin, models.Model):
    """ This is the legislative bill.

    Description:
    Kenya has two houses in the Parliament, the National Assembly and the Senate.
    Both houses are sources of bills that the Kenyan public are expected to
    engage with during the Public Participation period.

    A bill on this platform has an owner. That could be a member of
    Parliament, or an institutional representative or a member of the public.

    In one case, the owner would like to develop the bill and later open
    it up privately to stakeholders and engage with them before the bill
    is presented to a house.

    In the second case, a bill has been presented to a house of
    Parliament for the first reading and is then put on this platform to open
    it up to Public Participation. This bill instance would be owned by the
    Dokeza Platform administrator, in this case, Mzalendo Trust.
    """

    BILL_TYPE = (
        (1, 'National Assembly'),
        (2, 'Senate'),
    )

    BILL_STAGE = (
        (1, 'Open for Memoranda'),
        (2, 'In Committee'),
        (3, 'Plenary Session'),
        (4, 'Commentary Closed'),
    )

    SPONSOR_TITLE = (
        (1, 'Member of the National Assembly'),
        (2, 'Senator'),
        (3, 'Leader of Majority Party'),
        (4, 'Leader of Minority Party.'),
        (5, 'Senate Majority Leader'),
        (6, 'Senate Majority Whip'),
        (5, 'Chairperson, Justice and Legal Affairs Committee'),
        (6, 'Chairperson, Committee on Finance, Planning and Trade'),
        (7, 'Chairperson, Budget and Appropriations Committee'),
        (8, 'Chairperson, Committee on Finance, Commerce and Budget'),
        (9, 'Chairman, Administration and National Security'),
        (10, 'Chairperson, Committee on Information and Technology'),
        (11, 'Chairperson, Committee on Education, Research and Technology'),
        (12, 'Chairperson, National Assembly Committee on Health'),
        (13, 'Chairperson, Constituency Development Fund Committee'),
        (14, 'Chairperson, Standing Committee on Energy'),
        (15, 'Chairman, Standing Committee on Health'),
        (16, 'Chairman, Standing Committee on Education'),
        (17, 'Chairperson, Standing Committee on Legal Affairs and Human Rights'),
        (18, 'Chairman, Standing Committee on Labour and Social Welfare'),
        (19, 'Chairman, Sessional Committee on Delegated Legislation'),
        (20, 'Chairman, Senate Ad Hoc Committee on Legislation on Harambee (Voluntary Contribution)'),
        (21, 'Chairperson, Select Committee on Legislation on Royalties Accruing from Natural Resources in the Counties'),
        (22, 'Vice Chairperson, Committee on Information and Technology'),
        (23, 'Member, Committee on Legal Affairs and Human Rights'),
        (24, 'Member, Committee on Justice and Legal Affairs'),
    )
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, default=1, on_delete=models.CASCADE)
    bill_from = models.PositiveSmallIntegerField(
        _('Bill from'), choices=BILL_TYPE, default=1, blank=True, null=True)
    title = models.CharField(max_length=100, default='A bill')
    slug = models.SlugField(unique=True)
    purpose = models.TextField(max_length=500, blank=True, null=True)
    sponsor = models.CharField(max_length=500, blank=True, null=True)
    sponsor_title = models.PositiveSmallIntegerField(_('Sponsor Title'), choices=SPONSOR_TITLE, default=1, blank=True, null=True)
    created = models.DateTimeField(auto_now_add=True, db_index=True)
    word_doc = models.FileField(upload_to='bills/', blank=True, null=True, help_text='Upload the actual bill here.')
    bill_pic = models.ImageField(upload_to='bill_pics/', blank=True, null=True,
                                 help_text='Upload an image of the top stamped page of the bill.')
    private = models.BooleanField(default=True, help_text='Please click to to make it public.')
    bill_stage = models.PositiveSmallIntegerField(_('Bill Stage'), choices=BILL_STAGE, default=1)
    first_reading = models.DateTimeField(auto_now_add=False,
                                         blank=True, null=True)
    second_reading = models.DateTimeField(auto_now_add=False,
                                          blank=True, null=True)
    third_reading = models.DateTimeField(auto_now_add=False,
                                         blank=True, null=True)
    assented_to = models.BooleanField(default=False)
    assented_date = models.DateTimeField(auto_now_add=False,
                                         blank=True, null=True)
    updated_date = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    law_reference = models.URLField(blank=True, null=True, help_text="This should be a link to the Kenya Law Review repository of the bill.")
    tags = TaggableManager(blank=True)
    hit_count_generic = GenericRelation(HitCount, object_id_field='object_pk',
        related_query_name='hit_count_generic_relation')
    
    objects = BillManager()

    @property
    def get_content_type(self):
        instance = self
        content_type = ContentType.objects.get_for_model(instance.__class__)
        return content_type

    def get_absolute_url(self):
        return reverse('bills:detail', kwargs={'slug': self.slug})

    def __str__(self):
        return self.title


def create_slug(instance, new_slug=None):
    slug = slugify(instance.title.lower())
    if new_slug is not None:
        slug = new_slug
    qs = Bill.objects.filter(slug=slug).order_by("-id")
    exists = qs.exists()
    if exists:
        new_slug = "%s-%s" % (slug, qs.first().id)
        return create_slug(instance, new_slug=new_slug)
    return slug


def pre_save_bill_receiver(sender, instance, *args, **kwargs):
    if not instance.slug:
        instance.slug = create_slug(instance)


pre_save.connect(pre_save_bill_receiver, sender=Bill)


@receiver(post_save, sender=Bill)
def convert_to_img(sender, instance, **kwargs):
    print('Images saved')

    # instance.convert_to_png(630, 891)
