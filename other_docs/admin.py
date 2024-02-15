from django.contrib import admin
from django.utils.translation import gettext_lazy as _

from .models import Doc


class DocAdmin(admin.ModelAdmin):
    list_display = ["title", "institution", "owner", "created"]
    prepopulated_fields = {"slug": ("title", )}
    ordering = ('title',)

    fieldsets = (
        (None, {'fields': ('owner', 'word_doc',)}),
        (_('Document info'), {'fields': ('title', 'slug', 'purpose', 'institution', 'body',)}),
        (_('Other info'), {'fields': ('tags',)}),
    )


admin.site.register(Doc, DocAdmin)
