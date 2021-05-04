from django.contrib.auth import forms, get_user_model
from django.core.exceptions import ValidationError
from django.utils.translation import ugettext_lazy as _

User = get_user_model()


class UserChangeForm(forms.UserChangeForm):
    class Meta(forms.UserChangeForm.Meta):
        model = User
        fields = ['first_name', 'last_name', 'email', 'is_subscribed_tracker']
        labels={
            'first_name': 'First Name',
            'last_name': 'last_name',
            'email': 'Email Address',
            'is_subscribed_tracker': 'Subscribe to monthly Bill Tracking?'
        }


class UserCreationForm(forms.UserCreationForm):

    error_message = forms.UserCreationForm.error_messages.update(
        {"duplicate_username": _("This username has already been taken.")}
    )

    class Meta(forms.UserCreationForm.Meta):
        model = User
        fields = ['first_name', 'last_name', 'email', 'is_subscribed_tracker']
        labels={
            'first_name': 'First Name',
            'last_name': 'last_name',
            'email': 'Email Address',
            'is_subscribed_tracker': 'Subscribe to monthly Bill Tracking?'
        }

    def clean_username(self):
        username = self.cleaned_data["username"]

        try:
            User.objects.get(username=username)
        except User.DoesNotExist:
            return username

        raise ValidationError(self.error_messages["duplicate_username"])
