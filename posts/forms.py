from django import forms
from ckeditor.widgets import CKEditorWidget

from .models import Petition


class PetitionForm(forms.ModelForm):
    """
    docstring for PetitionForm
    """
    title = forms.CharField()
    content = forms.CharField(widget=CKEditorWidget(config_name='front_ckeditor'))
    publish = forms.DateField(widget=forms.SelectDateWidget)

    class Meta:
        model = Petition
        fields = [
            "title",
            "content",
            "image",
            "draft",
            "publish",
            "tags",
        ]
