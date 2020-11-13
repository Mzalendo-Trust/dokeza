from django.contrib import admin

# Register your models here.

from .models import EventLocation, PublicEvent


class EventLocationAdmin(admin.ModelAdmin):

    list_display = ('name',)
    prepopulated_fields = {"slug": ("name",)}
    ordering = ('name',)


class PublicEventAdmin(admin.ModelAdmin):
    prepopulated_fields = {"slug": ("title",)}
    list_display = ('title', 'start', 'end')
    list_filter = ('start',)
    ordering = ('-start',)
    date_hierarchy = 'start'
    search_fields = ('title', 'description')
    fieldsets = (
        (None, {
            'fields': [
                ('title', 'slug'),
                ('event_description'),
                ('expected_outcomes'),
                ('house', 'status'),
                ('start', 'end'),
                ('event_location'),
            ]
        }),
    )


admin.site.register(EventLocation, EventLocationAdmin)
admin.site.register(PublicEvent, PublicEventAdmin)
