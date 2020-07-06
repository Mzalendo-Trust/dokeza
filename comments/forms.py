from django import forms
from crispy_forms.helper import FormHelper
from crispy_forms.layout import Layout, Fieldset, Field, Hidden, HTML, MultiField, Div, ButtonHolder, Submit


class CommentForm(forms.Form):
    content_type = forms.CharField(widget=forms.HiddenInput)
    object_id = forms.IntegerField(widget=forms.HiddenInput)
    # parent_id = forms.IntegerField(widget=forms.HiddenInput, required=False)
    content = forms.CharField(label='', widget=forms.Textarea)


class AnnotCommentForm(forms.Form):
    content_type = forms.CharField()
    object_id = forms.CharField()
    # parent_id = forms.IntegerField(widget=forms.HiddenInput, required=False)
    content = forms.CharField(label='',)

    def __init__(self, *args, **kwargs):
        self.helper = FormHelper()
        self.helper.form_tag = False  # This is the default. If 'false', put form tags in the HTML
        self.helper.layout = Layout(
            Hidden('content_type', 'annotation'),
            Hidden('object_id', '{{ annot.id }}'),
            Field('content', ),
            ButtonHolder(
                Submit('submit', 'Submit', css_class='btn btn-annotation')
            )
        )
        super(AnnotCommentForm, self).__init__(*args, **kwargs)

# class AnnotCommentForm(forms.Form):
#     content_type = forms.CharField(widget=forms.HiddenInput)
#     object_id = forms.IntegerField(widget=forms.HiddenInput)
#     # parent_id = forms.IntegerField(widget=forms.HiddenInput, required=False)
#     content = forms.CharField(label='', widget=forms.Textarea)
