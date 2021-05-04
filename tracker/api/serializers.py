# todo/serializers.py

from rest_framework import serializers
from tracker.models import BillTracker, MyBill


class BillSerializer(serializers.ModelSerializer):
    # billstracked = BillTrackerSerializer(many=True, read_only=True)
    class Meta:
        model = MyBill
        # fields = '__all__'
        fields = ('id', 'title', 'purpose', 'slug')


class BillTrackerSerializer(serializers.ModelSerializer):
    # parentbill = BillSerializer(read_only=True)
    bill_name = serializers.CharField(read_only=True, source='bill.title')
    bill_slug = serializers.CharField(read_only=True, source='bill.slug')
    bill_sponsor = serializers.CharField(read_only=True, source='bill.sponsor')
    bill_purpose = serializers.CharField(read_only=True, source='bill.purpose')
    # parentbill = BillTracker.objects.bill;

    class Meta:
        model = BillTracker
        fields = ('uuid', 'bill', 'details', 'stage_date', 'stage',
                  'bill_name', 'bill_slug', 'bill_sponsor', 'bill_purpose')
        # fields='__all__'
