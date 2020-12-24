from django.db import models
from django.conf import settings
from django.utils.timezone import datetime

class MyBill(models.Model):
    title = models.CharField(max_length=100)
    purpose = models.TextField()
    slug = models.TextField()
    
    class Meta:
        db_table = 'bills_bill'
        managed = False

    def __str__(self):
        return self.title


class BillTracker(models.Model):
    bill = models.ForeignKey(MyBill, on_delete=models.CASCADE)
    createdby = models.ForeignKey(settings.AUTH_USER_MODEL, default=1, on_delete=models.CASCADE)
    createdon = models.DateTimeField(default=datetime.today())
    ## bill_id = models.IntegerField()
    details = models.TextField(null=True)
    stage = models.TextField()
    stage_date = models.DateField('date published')

    class Meta:
        ordering=['-stage_date']

    def __str__(self):
        # return str('kimana')
        return ' - '.join([str(self.bill), str(self.stage_date)])
