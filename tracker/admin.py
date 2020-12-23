from django.contrib import admin
from .models import MyBill, BillTracker

admin.site.register(MyBill)
admin.site.register(BillTracker)
