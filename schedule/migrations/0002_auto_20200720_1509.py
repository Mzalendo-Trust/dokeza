# Generated by Django 3.0.8 on 2020-07-20 12:09

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('contenttypes', '0002_remove_content_type_name'),
        ('schedule', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='calendar',
            options={'verbose_name': 'calendar', 'verbose_name_plural': 'calendars'},
        ),
        migrations.AddField(
            model_name='event',
            name='color_event',
            field=models.CharField(blank=True, max_length=10, verbose_name='Color event'),
        ),
        migrations.AlterField(
            model_name='calendar',
            name='slug',
            field=models.SlugField(max_length=200, unique=True, verbose_name='slug'),
        ),
        migrations.AlterField(
            model_name='calendarrelation',
            name='object_id',
            field=models.IntegerField(db_index=True),
        ),
        migrations.AlterField(
            model_name='event',
            name='calendar',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='schedule.Calendar', verbose_name='calendar'),
        ),
        migrations.AlterField(
            model_name='event',
            name='creator',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, related_name='creator', to=settings.AUTH_USER_MODEL, verbose_name='creator'),
        ),
        migrations.AlterField(
            model_name='event',
            name='end',
            field=models.DateTimeField(db_index=True, help_text='The end time must be later than the start time.', verbose_name='end'),
        ),
        migrations.AlterField(
            model_name='event',
            name='end_recurring_period',
            field=models.DateTimeField(blank=True, db_index=True, help_text='This date is ignored for one time only events.', null=True, verbose_name='end recurring period'),
        ),
        migrations.AlterField(
            model_name='event',
            name='rule',
            field=models.ForeignKey(blank=True, help_text="Select '----' for a one time only event.", null=True, on_delete=django.db.models.deletion.SET_NULL, to='schedule.Rule', verbose_name='rule'),
        ),
        migrations.AlterField(
            model_name='event',
            name='start',
            field=models.DateTimeField(db_index=True, verbose_name='start'),
        ),
        migrations.AlterField(
            model_name='eventrelation',
            name='object_id',
            field=models.IntegerField(db_index=True),
        ),
        migrations.AlterField(
            model_name='occurrence',
            name='end',
            field=models.DateTimeField(db_index=True, verbose_name='end'),
        ),
        migrations.AlterField(
            model_name='occurrence',
            name='start',
            field=models.DateTimeField(db_index=True, verbose_name='start'),
        ),
        migrations.AlterIndexTogether(
            name='calendarrelation',
            index_together={('content_type', 'object_id')},
        ),
        migrations.AlterIndexTogether(
            name='event',
            index_together={('start', 'end')},
        ),
        migrations.AlterIndexTogether(
            name='eventrelation',
            index_together={('content_type', 'object_id')},
        ),
        migrations.AlterIndexTogether(
            name='occurrence',
            index_together={('start', 'end')},
        ),
    ]
