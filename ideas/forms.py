from django import forms
from django.contrib.admin.widgets import AdminSplitDateTime
from django.urls import reverse
from crispy_forms.bootstrap import Field, InlineRadios, TabHolder, Tab
from crispy_forms.helper import FormHelper
from ckeditor.widgets import CKEditorWidget

from .models import SubmittedIdea


class SubmitIdeaForm(forms.ModelForm):
    """
    This form adds the CKEditor widget to the "Submit an Idea" form for the user.
    """

    IDEA_TYPE = (
        (1, 'Bill Opinion'),
        (2, 'Petition'),
        (3, 'Memorandum '),
    )

    title = forms.CharField()
    idea_type = forms.ChoiceField(label='Idea Type', choices=IDEA_TYPE)
    content = forms.CharField(widget=CKEditorWidget(config_name='front_ckeditor'))
    publish = forms.DateField(widget=AdminSplitDateTime())

    class Meta:
        model = SubmittedIdea
        fields = [
            "title",
            "slug",
            "idea_type",
            "submit_to",
            "content",
            "draft",
            "private",
            "publish",
            "tags",
        ]
        exclude = ("slug",)


# Error - Exception Value:  'list' object has no attribute 'strip' 
# Cripsy forms are getting in the way!