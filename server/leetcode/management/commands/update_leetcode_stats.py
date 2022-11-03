from django.core.management.base import BaseCommand

from leetcode.tasks import update_leetcode_stats_all_users
from leetcode.models import LeetcodeUpdatedData
from leetcode.serializers import LeetcodeUpdatedDataSerializer

class Command(BaseCommand):
    help = 'Updates Leetcode Stats of all users'

    def handle(self, *args, **kwargs):
        self.stdout.write(self.style.NOTICE('Updating Leetcode Stats...'))

        queryset = LeetcodeUpdatedData.objects.all()
        serializer = LeetcodeUpdatedDataSerializer(queryset, many=True)
        for leetcode_obj in serializer.data:
            update_leetcode_stats_all_users.delay(leetcode_obj)
            


