# Generated by Django 3.2.15 on 2023-01-16 19:07

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('highlights', '0005_auto_20210426_1601'),
    ]

    operations = [
        migrations.AlterField(
            model_name='timeline',
            name='createdon',
            field=models.DateTimeField(default=datetime.datetime(2023, 1, 16, 22, 7, 15, 993705)),
        ),
    ]
