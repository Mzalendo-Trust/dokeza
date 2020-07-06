from django.contrib import admin

# Register your models here.
from .models import Post, Memorandum, Petition


class PostModelAdmin(admin.ModelAdmin):
    list_display = ["title", "updated", "timestamp"]
    list_filter = ["updated", "timestamp"]
    search_fields = ["title", "content"]
    prepopulated_fields = {"slug": ("title", )}

    class Meta:
        model = Post


class MemorandumModelAdmin(admin.ModelAdmin):
    list_display = ["title", "timestamp", "deadline"]
    list_filter = ["deadline"]
    search_fields = ["title", "content"]
    prepopulated_fields = {"slug": ("title", )}

    class Meta:
        model = Memorandum


class PetitionModelAdmin(admin.ModelAdmin):
    list_display = ["title", "timestamp", "deadline"]
    list_filter = ["deadline"]
    search_fields = ["title", "content"]
    prepopulated_fields = {"slug": ("title", )}

    class Meta:
        model = Petition


admin.site.register(Post, PostModelAdmin)
admin.site.register(Memorandum, MemorandumModelAdmin)
admin.site.register(Petition, PetitionModelAdmin)
