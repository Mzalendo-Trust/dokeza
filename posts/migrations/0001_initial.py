# Generated by Django 3.0.8 on 2020-07-20 12:25

import ckeditor.fields
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import hitcount.models
import posts.models
import taggit.managers


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('taggit', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Post',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=120)),
                ('slug', models.SlugField(unique=True)),
                ('image', models.ImageField(blank=True, null=True, upload_to=posts.models.upload_location)),
                ('content', ckeditor.fields.RichTextField()),
                ('draft', models.BooleanField(default=False)),
                ('publish', models.DateField()),
                ('updated', models.DateTimeField(auto_now=True)),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
                ('author', models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('tags', taggit.managers.TaggableManager(help_text='A comma-separated list of tags.', through='taggit.TaggedItem', to='taggit.Tag', verbose_name='Tags')),
            ],
            options={
                'ordering': ['-timestamp', '-updated'],
            },
            bases=(hitcount.models.HitCountMixin, models.Model),
        ),
        migrations.CreateModel(
            name='Petition',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=120)),
                ('slug', models.SlugField(unique=True)),
                ('submit_to', models.PositiveSmallIntegerField(blank=True, choices=[(1, 'National Assembly'), (2, 'Senate')], default=1, null=True, verbose_name='Petition for')),
                ('content', ckeditor.fields.RichTextField(help_text='Explain the problem you want solved.')),
                ('image', models.ImageField(blank=True, null=True, upload_to='petitions/')),
                ('draft', models.BooleanField(default=True, verbose_name='Draft')),
                ('publish', models.DateField()),
                ('read_time', models.IntegerField(default=0)),
                ('deadline', models.DateTimeField(blank=True, null=True)),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
                ('author', models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('tags', taggit.managers.TaggableManager(blank=True, help_text='A comma-separated list of tags.', through='taggit.TaggedItem', to='taggit.Tag', verbose_name='Tags')),
            ],
            options={
                'verbose_name': 'petition',
                'verbose_name_plural': 'petitions',
                'ordering': ['-timestamp'],
            },
        ),
        migrations.CreateModel(
            name='Memorandum',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=120)),
                ('slug', models.SlugField(unique=True)),
                ('submit_to', models.PositiveSmallIntegerField(blank=True, choices=[(1, 'National Assembly'), (2, 'Senate')], default=1, null=True, verbose_name='Memorandum for')),
                ('content', ckeditor.fields.RichTextField(blank=True, help_text='Add the intro of the Memorandum.', null=True)),
                ('image', models.ImageField(blank=True, null=True, upload_to='memoranda/')),
                ('publish', models.DateField()),
                ('read_time', models.IntegerField(default=0)),
                ('deadline', models.DateTimeField(blank=True, null=True)),
                ('timestamp', models.DateTimeField(auto_now_add=True)),
                ('author', models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'verbose_name': 'memorandum',
                'verbose_name_plural': 'memoranda',
                'ordering': ['-timestamp'],
            },
        ),
    ]
