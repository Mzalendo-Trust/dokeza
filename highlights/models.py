from django.db import models
from django.utils.timezone import datetime
from django.conf import settings
import uuid


class Timeline(models.Model):
    title = models.CharField(max_length=100)
    uuid = models.UUIDField(unique=True, default=uuid.uuid4)
    data = models.JSONField()
    is_highlighted = models.BooleanField(default=False);
    createdby = models.ForeignKey(settings.AUTH_USER_MODEL, default=1, on_delete=models.CASCADE)
    createdon = models.DateTimeField(default=datetime.today())

    def __str__(self):
        return self.title

class TimelineImage(models.Model):    
    name=models.TextField(max_length=100)
    image = models.ImageField(max_length=100, upload_to="timeline/")
    timestamp = models.DateTimeField(auto_now_add=True)
    timeline = models.ForeignKey(Timeline, related_name='timelineimages', on_delete=models.CASCADE)

    # class Meta:
    #     managed = False

    def __str__(self):
        return self.name