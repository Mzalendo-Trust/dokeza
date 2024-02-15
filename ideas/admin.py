from django.contrib import admin
from django.utils.translation import gettext_lazy as _

from .models import SubmittedIdea


class SubmittedIdeaAdmin(admin.ModelAdmin):
    list_display = ["title", "idea_type", "author", "private", "draft", "publish"]
    prepopulated_fields = {"slug": ("title", )}
    ordering = ('title',)

    fieldsets = (
        (None, {'fields': ('author',)}),
        (_('Idea info'), {'fields': ('title', 'slug', 'idea_type')}),
        (_('Content'), {'fields': ('content', 'draft', 'private')}),
        (_('Important dates'), {'fields': ('publish',)}),
        (_('Other info'), {'fields': ('tags',)}),
    )


admin.site.register(SubmittedIdea, SubmittedIdeaAdmin)
