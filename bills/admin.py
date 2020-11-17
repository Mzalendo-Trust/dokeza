from django.contrib import admin
from django.urls import reverse
from django.utils.html import format_html
from django.utils.translation import ugettext_lazy as _
from django.urls import path


from .models import Bill
from docbuilder.views import report

class BillAdmin(admin.ModelAdmin):
    list_display = ["title", "bill_from", "owner", "private", "updated_date", "generate_memorandum"]
    prepopulated_fields = {"slug": ("title", )}
    ordering = ('updated_date',)
    change_form_template = 'admin/bills/comment_button.html'

    fieldsets = (
        (None, {'fields': ('owner', 'word_doc', 'bill_pic', 'law_reference')}),
        (_('Bill info'), {'fields': ('bill_from', 'title', 'slug')}),
        (_('Content'), {'fields': ('purpose', 'sponsor',
                        'sponsor_title', 'private')}),
        (_('Important dates'), {'fields': ('bill_stage', 'first_reading', 
                                           'second_reading', 'third_reading',
                                           'assented_to', 'assented_date')}),
        (_('Other info'), {'fields': ('tags',)}),
    )
    
    def get_urls(self):
        urls = super().get_urls()

        custom_urls = [
            path('generate-memo/<int:object_id>/<str:mode>', report,
                name='generate-memorandum')
        ]
        return custom_urls + urls

    def generate_memorandum(self, obj):
        return format_html(
            '<a class="memo" href="{}">Generate Memorandum</a>',
            reverse('admin:generate-memorandum', args=[obj.pk, 'memorandum']),
        )
    generate_memorandum.short_description = 'Generate Memorandum'
    generate_memorandum.allow_tags = True

    def save_model(self, request, obj, form, change):
        obj.owner = request.user
        obj.save()

admin.site.register(Bill, BillAdmin)
