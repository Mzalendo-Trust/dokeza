from datetime import timedelta
from ckeditor.fields import RichTextField
from ckeditor_uploader.fields import RichTextUploadingField
from django.urls import reverse
from django.db import models
from django.template.defaultfilters import slugify
from schedule.models import Event, Calendar

from django.utils.translation import ugettext, ugettext_lazy as _

try:
    from notification import models as notification
except ImportError:
    notification = None

HOUSE_RELATED = (
    (1, 'National Assembly'),
    (2, 'Senate'),
    (3, 'County')
)

EVENT_STATUS = (
    (1, 'Bill: Open for Memoranda'),
    (2, 'Bill: In Committee'),
    (3, 'Bill: Plenary Session'),
    (4, 'Public Participation Meeting')
  )


class EventLocation(models.Model):

    name = models.CharField(_('name'), unique=True, max_length=200, default='Uhuru Park')
    slug = models.SlugField(_('slug'), unique=True, max_length=200)
    description = models.TextField(_('description'), null=True, blank=True)

    class Meta:
        verbose_name = _('Event Location')
        verbose_name_plural = _('Event Locations')

    def __str__(self):
        return self.name


class PublicEvent(Event):

    slug = models.SlugField(_('slug'), unique=True, max_length=200)
    event_description = RichTextUploadingField(_('Event Description'), max_length=5000, blank=True)
    expected_outcomes = RichTextField(_('Expected Outcomes'), max_length=1000, blank=True)
    house = models.PositiveSmallIntegerField(
        _('Assembly related to'), choices=HOUSE_RELATED, default=1, blank=True, null=True)
    status = models.PositiveSmallIntegerField(
        _('Event Agenda'), choices=EVENT_STATUS, default=1, blank=True, null=True)
    event_location = models.ForeignKey(
        EventLocation,
        on_delete=models.CASCADE,
        null=True,
        blank=True,
        verbose_name=_('Event Location'))

    class Meta(object):
        verbose_name = _('Public Event')
        verbose_name_plural = _('Public Events')
        app_label = 'public_participation'

    def title(self):
        self.title = self.title + self.pk
        return self.title

    def start_date(self):
        return self.start.date()

    def start_time(self):
        anza = self.start + timedelta(hours=3)
        return anza.time()

    def end_time(self):
        isha = self.end + timedelta(hours=3)
        return isha.time()

    def common_timestamp(self):
        return self.start

    def common_description(self):
        return self.title

    def event_days(self):
        event_calendar = self.end - self.start
        actual_days = event_calendar + timedelta(days=1)
        return str(actual_days)[:6]

    def event_dates(self):
        start_date = self.start.date()
        end_date = self.end.date()
        return start_date.strftime('%d') + ' - ' + end_date.strftime('%d %B, %Y')

    def dates_summary(self):
        start_date = self.start.date()
        end_date = self.end.date()
        return start_date.strftime('%b %Y: %d') + ' - ' + end_date.strftime('%d')

    def save(self):
        self.slug = slugify(self.title)
        super(PublicEvent, self).save()

    def get_absolute_url(self):
        return reverse('public_participation:event', kwargs={'slug': self.slug})
