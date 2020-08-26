from django.contrib import admin
from django.utils.translation import ugettext_lazy as _

from .models import Bill


class BillAdmin(admin.ModelAdmin):
    list_display = ["title", "bill_from", "owner", "private", "updated_date"]
    prepopulated_fields = {"slug": ("title", )}
    ordering = ('updated_date',)

    fieldsets = (
        (None, {'fields': ('owner', 'pdf', 'bill_pic', 'law_reference')}),
        (_('Bill info'), {'fields': ('bill_from', 'title', 'slug')}),
        (_('Content'), {'fields': ('purpose', 'sponsor',
                        'sponsor_title', 'private')}),
        (_('Important dates'), {'fields': ('bill_stage', 'first_reading', 
                                           'second_reading', 'third_reading',
                                           'assented_to', 'assented_date')}),
        (_('Other info'), {'fields': ('tags',)}),
    )

    def save_model(self, request, obj, form, change):
        obj.owner = request.user
        obj.save()

admin.site.register(Bill, BillAdmin)
