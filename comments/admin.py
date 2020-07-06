from django.contrib import admin

# Register your models here.
from .models import Comment


class CommentAdmin(admin.ModelAdmin):
    list_display = ["user", "content_type", "object_id"]


admin.site.register(Comment, CommentAdmin)
