# Generated by Django 3.1.3 on 2020-12-04 19:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tracker', '0002_billtracker_description'),
    ]

    operations = [
        migrations.AlterField(
            model_name='billtracker',
            name='pub_date',
            field=models.DateField(verbose_name='date published'),
        ),
    ]
