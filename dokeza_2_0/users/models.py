from django_countries.fields import CountryField
from datetime import datetime
from django.contrib.auth.models import AbstractUser, AnonymousUser
from django.db.models import CharField
from django.urls import reverse
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.utils.translation import ugettext_lazy as _

from .boundaries import KENYAN_CONSTITUENCIES, KENYAN_COUNTIES


class User(AbstractUser):

    # We have added required fields =>
    first_name = models.CharField(_('first name'), max_length=30)
    last_name = models.CharField(_('last name'), max_length=30)
    email = models.EmailField(_('email address'), unique=True)

    def __str__(self):
        if self.get_full_name():
            return self.get_full_name()
        else:
            return self.email

    def get_profile(self):
        instance = self
        qs = Profile.objects.filter_by_instance(instance)
        return qs

    def full_name(self):
        return self.get_full_name()

    def get_absolute_url(self):
        return reverse('users:detail', kwargs={'email': self.email})


class Institution(models.Model):
    """
    The Institution class allows for any user to be grouped
    into a corporate organisation. The default is Mzalendo Trust.
    """
    name = models.CharField(max_length=100)

    class Meta:
        verbose_name = _('Institution')
        verbose_name_plural = _('Institutions')

    def __str__(self):
        return self.name


class ProfileManager(models.Manager):

    def filter_by_instance(self, instance):
        qs = super(ProfileManager, self).get(user_id=instance.id)
        return qs


class Profile(models.Model):
    """
    This is the extension of each user's profile.
    It incudes all the requirements for all types of users.
    """
    GENDER_CHOICES = (
        (1, 'Male'),
        (2, 'Female'),
    )

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    designation = models.CharField(max_length=500, blank=True, null=True)
    gender = models.PositiveSmallIntegerField(
        _('gender'), choices=GENDER_CHOICES, blank=True, null=True)
    picture = models.ImageField(upload_to='profile_pics/',
                                null=True,
                                blank=True,
                                width_field="width_field",
                                height_field="height_field")
    bio = models.TextField(max_length=500, blank=True, null=True)
    county_residence = models.PositiveSmallIntegerField(
        _('County of Residence'), choices=KENYAN_COUNTIES, default=5)
    country = CountryField(default='KE', help_text=_('If you are in the Diaspora, what country are you in?'))
    county_interest = models.PositiveSmallIntegerField(_('County of Interest'), choices=KENYAN_COUNTIES, blank=True, null=True, help_text=_('Many Kenyans live in one county and are interested in another.'))
    # These setting will appear in the Admin, not in the Signup page
    institution = models.ForeignKey(Institution, blank=True, null=True, on_delete=models.CASCADE)
    is_editor = models.BooleanField(
        _('editor status'),
        default=False,
        help_text=_(
            'Designates whether the user can create, draft and edit bills.'),)
    is_member_of_parliament = models.BooleanField(
        _('Member of Parliament'), default=False,
        help_text=_('Designates whether the user as an MP in Kenya.'),)
    national_assembly = models.BooleanField(_('National Assembly'),
                                            default=False,)
    constituency = models.PositiveSmallIntegerField(
        _('Constituency'), choices=KENYAN_CONSTITUENCIES,
        blank=True, null=True)
    senate = models.BooleanField(_('Senate'), default=False,)
    county = models.PositiveSmallIntegerField(_('County'),
                                              choices=KENYAN_COUNTIES,
                                              blank=True, null=True
                                              )
    nominated = models.BooleanField(_('Nominated'), default=False,)
    joined = models.DateTimeField(db_index=True, default=datetime.now)
    last_seen = models.DateTimeField(auto_now_add=True, blank=True, null=True)
    facebook = models.URLField(blank=True, null=True)
    twitter = models.URLField(blank=True, null=True)
    # User Mobile Contacts
    mobile = models.PositiveIntegerField(blank=True, null=True, help_text=_('Your local mobile number'))
    view_contacts = models.BooleanField(_('Mobile contacts'), default=False, help_text=_('Set this to allow others to see your contacts.'))

    objects = ProfileManager()

    class Meta:
        verbose_name = _('Profile')
        verbose_name_plural = _('Profiles')

    def __str__(self):
        try:
            full_name = self.user.get_full_name()
            return full_name
        except ValueError:
            self.user.email


class Visitor(AnonymousUser):
    """
    The Visitor can only view pages open to the public by default.
    """

    def __str__(self):
        return 'Visitor'


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profile.objects.create(user=instance)


@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    instance.profile.save()


# class FileManager(models.Manager):
#     def all(self):
#         return self.order_by('-created')


# class UserDocuments(models.Model):
#     user = models.OneToOneField(User, on_delete=models.CASCADE)
#     title = models.CharField(max_length=100, default='A bill')
#     slug = models.SlugField(unique=True)
#     file = models.FileField(upload_to='my_files/', blank=True, null=True, help_text='Upload your file here.')

#     objects = fileManager()

#     def get_absolute_url(self):
#         return reverse('other_docs:detail', kwargs={'slug': self.slug})

#     def __str__(self):
#         return self.title
