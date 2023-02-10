from datetime import timedelta
from django.utils import timezone

from hitcount.models import Hit


def get_hit_counts():
    hit_counts = []
    days_of_week = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
    today = timezone.now().date()
    for i in range(7):
        date = today - timedelta(days=i)
        day_of_week = days_of_week[date.weekday()]
        count = Hit.objects.filter(created__date=date).count()
        hit_counts.append({"day_of_week": day_of_week, "count": count})

    # @remove it when you after test
    hit_counts = [{'day_of_week': 'Monday', 'count': 30}, {'day_of_week': 'Tuesday', 'count': 25},
                  {'day_of_week': 'Wednesday', 'count': 31}, {'day_of_week': 'Thursday', 'count': 33},
                  {'day_of_week': 'Friday', 'count': 35}, {'day_of_week': 'Saturday', 'count': 32},
                  {'day_of_week': 'Sunday', 'count': 28}]

    return hit_counts
