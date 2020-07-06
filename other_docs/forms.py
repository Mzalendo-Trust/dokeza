from django import forms
from ckeditor.widgets import CKEditorWidget

from .models import Doc


class DocForm(forms.ModelForm):
    """
    This form is for adding the CKEditor widget into the Admin forms.
    """

    title = forms.CharField()
    body = forms.CharField(widget=CKEditorWidget(config_name='front_ckeditor'))
    publish = forms.DateField(widget=forms.SelectDateWidget)

    class Meta:
        model = Doc
        fields = [
            "owner",
            "title",
            "institution",
            "purpose",
            "body",
            "tags",
        ]
