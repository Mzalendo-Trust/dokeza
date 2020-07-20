# Generated by Django 3.0.8 on 2020-07-20 12:47

import ckeditor.fields
from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion
import hitcount.models
import taggit.managers


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('taggit', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Bill',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('bill_from', models.PositiveSmallIntegerField(blank=True, choices=[(1, 'National Assembly'), (2, 'Senate')], default=1, null=True, verbose_name='Bill from')),
                ('title', models.CharField(default='A bill', max_length=100)),
                ('slug', models.SlugField(unique=True)),
                ('purpose', models.TextField(blank=True, max_length=500, null=True)),
                ('sponsor', models.CharField(blank=True, max_length=500, null=True)),
                ('sponsor_title', models.PositiveSmallIntegerField(blank=True, choices=[(1, 'Member of the National Assembly'), (2, 'Senator'), (3, 'Leader of Majority Party'), (4, 'Leader of Minority Party.'), (5, 'Senate Majority Leader'), (6, 'Senate Majority Whip'), (5, 'Chairperson, Justice and Legal Affairs Committee'), (6, 'Chairperson, Committee on Finance, Planning and Trade'), (7, 'Chairperson, Budget and Appropriations Committee'), (8, 'Chairperson, Committee on Finance, Commerce and Budget'), (9, 'Chairman, Administration and National Security'), (10, 'Chairperson, Committee on Information and Technology'), (11, 'Chairperson, Committee on Education, Research and Technology'), (12, 'Chairperson, National Assembly Committee on Health'), (13, 'Chairperson, Constituency Development Fund Committee'), (14, 'Chairperson, Standing Committee on Energy'), (15, 'Chairman, Standing Committee on Health'), (16, 'Chairman, Standing Committee on Education'), (17, 'Chairperson, Standing Committee on Legal Affairs and Human Rights'), (18, 'Chairman, Standing Committee on Labour and Social Welfare'), (19, 'Chairman, Sessional Committee on Delegated Legislation'), (20, 'Chairman, Senate Ad Hoc Committee on Legislation on Harambee (Voluntary Contribution)'), (21, 'Chairperson, Select Committee on Legislation on Royalties Accruing from Natural Resources in the Counties'), (22, 'Vice Chairperson, Committee on Information and Technology'), (23, 'Member, Committee on Legal Affairs and Human Rights'), (24, 'Member, Committee on Justice and Legal Affairs')], default=1, null=True, verbose_name='Sponsor Title')),
                ('body', ckeditor.fields.RichTextField(blank=True, help_text='Copy the Bill and paste with all its styling. If necessary use the editing tools to style it sufficiently.')),
                ('created', models.DateTimeField(auto_now_add=True, db_index=True)),
                ('pdf', models.FileField(blank=True, help_text='Upload the actual bill here.', null=True, upload_to='bills/')),
                ('bill_pic', models.ImageField(blank=True, help_text='Upload an image of the top stamped page of the bill.', null=True, upload_to='bill_pics/')),
                ('private', models.BooleanField(default=True, help_text='Please click to to make it public.')),
                ('bill_stage', models.PositiveSmallIntegerField(choices=[(1, 'Open for Memoranda'), (2, 'In Committee'), (3, 'Plenary Session'), (4, 'Commentary Closed')], default=1, verbose_name='Bill Stage')),
                ('first_reading', models.DateTimeField(blank=True, null=True)),
                ('second_reading', models.DateTimeField(blank=True, null=True)),
                ('third_reading', models.DateTimeField(blank=True, null=True)),
                ('assented_to', models.BooleanField(default=False)),
                ('assented_date', models.DateTimeField(blank=True, null=True)),
                ('updated_date', models.DateTimeField(auto_now_add=True, null=True)),
                ('law_reference', models.URLField(blank=True, help_text='This should be a link to the Kenya Law Review repository of the bill.', null=True)),
                ('owner', models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
                ('tags', taggit.managers.TaggableManager(blank=True, help_text='A comma-separated list of tags.', through='taggit.TaggedItem', to='taggit.Tag', verbose_name='Tags')),
            ],
            bases=(hitcount.models.HitCountMixin, models.Model),
        ),
    ]
