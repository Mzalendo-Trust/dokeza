from django import forms
from django.contrib.admin.widgets import AdminDateWidget


from .models import Bill


class BillForm(forms.ModelForm):
   
    TARGET_HOUSE = (
        (1, 'National Assembly'),
        (2, 'Senate'),
    )
    title = forms.CharField()
    slug = forms.CharField()
    bill_from = forms.ChoiceField(label='Target House', choices=TARGET_HOUSE)
    first_reading = forms.DateField(widget=AdminDateWidget())
    second_reading = forms.DateField(widget=AdminDateWidget())
    third_reading = forms.DateField(widget=AdminDateWidget())
    assented_date = forms.DateField(widget=AdminDateWidget())

    class Meta:
        model = Bill
        fields = [
            "owner",
            "title",
            "bill_from",
            "private",
            "tags",
        ]
