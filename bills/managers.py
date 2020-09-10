from django.db import models


class BillQuerySet(models.QuerySet):
    def by_date(self):
        return self.order_by('-updated_date')

    def public_bills(self):
        return self.filter(private=False)
    
    def private_bills(self):
        return self.filter(private=True)

    def assembly_bills(self):
        return self.filter(bill_from=1)

    def senate_bills(self):
        return self.filter(bill_from=2)

    def have_pdfs(self):
        return self.exclude(pdf="")


class BillManager(models.Manager):
    def get_queryset(self):
        return BillQuerySet(self.model, using=self._db) # important

    def all(self):
        return self.get_queryset().public_bills().by_date()

    def private_bills(self):
     	return self.get_queryset().private_bills().by_date()

    def assembly_bills(self):
        return self.get_queryset().assembly_bills().public_bills().by_date()

    def senate_bills(self):
        return self.get_queryset().senate_bills().public_bills().by_date()

    def have_pdfs(self):
        return self.get_queryset().have_pdfs().public_bills().by_date()
