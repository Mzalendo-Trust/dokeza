# Generated by Django 3.0.8 on 2020-07-20 12:47

import ckeditor.fields
import ckeditor_uploader.fields
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('schedule', '0002_auto_20200720_1509'),
    ]

    operations = [
        migrations.CreateModel(
            name='EventLocation',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(default='Uhuru Park', max_length=200, unique=True, verbose_name='name')),
                ('slug', models.SlugField(max_length=200, unique=True, verbose_name='slug')),
                ('description', models.TextField(blank=True, null=True, verbose_name='description')),
            ],
            options={
                'verbose_name': 'Event Location',
                'verbose_name_plural': 'Event Locations',
            },
        ),
        migrations.CreateModel(
            name='PublicEvent',
            fields=[
                ('event_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='schedule.Event')),
                ('slug', models.SlugField(max_length=200, unique=True, verbose_name='slug')),
                ('event_description', ckeditor_uploader.fields.RichTextUploadingField(blank=True, max_length=5000, verbose_name='Event Description')),
                ('expected_outcomes', ckeditor.fields.RichTextField(blank=True, max_length=1000, verbose_name='Expected Outcomes')),
                ('house', models.PositiveSmallIntegerField(blank=True, choices=[(1, 'National Assembly'), (2, 'Senate'), (3, 'County')], default=1, null=True, verbose_name='Assembly related to')),
                ('event_location', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to='public_participation.EventLocation', verbose_name='Event Location')),
            ],
            options={
                'verbose_name': 'Public Event',
                'verbose_name_plural': 'Public Events',
            },
            bases=('schedule.event',),
        ),
    ]
