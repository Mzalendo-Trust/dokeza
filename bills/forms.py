from django import forms
# from django.urls import reverse
# from crispy_forms.bootstrap import Field, InlineRadios, TabHolder, Tab
# from crispy_forms.helper import FormHelper
from ckeditor.widgets import CKEditorWidget

from .models import Bill


class BillForm(forms.ModelForm):
    """
    This form adds the CKEditor widget into the Admin form.
    """

    TARGET_HOUSE = (
        (1, 'National Assembly'),
        (2, 'Senate'),
    )
    title = forms.CharField()
    bill_from = forms.ChoiceField(label='Target House', choices=TARGET_HOUSE)
    body = forms.CharField(widget=CKEditorWidget(config_name='front_ckeditor'))
    updated_date = forms.DateField(widget=forms.SelectDateWidget)

    class Meta:
        model = Bill
        fields = [
            "owner",
            "title",
            "bill_from",
            "body",
            "private",
            "tags",
        ]
