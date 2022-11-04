from django.core.management.base import BaseCommand

from celery import chain
from leetcode.tasks import update_leetcode_stats_all_users
from leetcode.models import LeetcodeUpdatedData
from leetcode.serializers import LeetcodeUpdatedDataSerializer

class Command(BaseCommand):
    help = 'Updates Leetcode Stats of all users'

    def handle(self, *args, **kwargs):
        self.stdout.write(self.style.NOTICE('Updating Leetcode Stats...'))

        queryset = LeetcodeUpdatedData.objects.all()
        serializer = LeetcodeUpdatedDataSerializer(queryset, many=True)
        update_tasks = []

        for leetcode_obj in serializer.data:
            update_tasks.append(update_leetcode_stats_all_users.si(leetcode_obj=leetcode_obj))
        
        chain(*update_tasks).apply_async()


