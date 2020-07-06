
from django.contrib import admin
from annotator.models import Annotation


class AnnotationAdmin(admin.ModelAdmin):
    list_display = ["user", "uri", "created", "id"]
    exclude = ('annotator_schema_version',)


admin.site.register(Annotation, AnnotationAdmin)
