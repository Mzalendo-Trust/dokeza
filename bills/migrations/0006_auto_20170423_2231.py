# -*- coding: utf-8 -*-
# Generated by Django 1.10.5 on 2017-04-23 19:31
from __future__ import unicode_literals

from django.db import migrations
import taggit.managers


class Migration(migrations.Migration):

    dependencies = [
        ('bills', '0005_auto_20170324_2040'),
    ]

    operations = [
        migrations.AlterField(
            model_name='bill',
            name='tags',
            field=taggit.managers.TaggableManager(blank=True, help_text='A comma-separated list of tags.', through='taggit.TaggedItem', to='taggit.Tag', verbose_name='Tags'),
        ),
    ]