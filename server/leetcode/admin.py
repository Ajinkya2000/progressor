from django.contrib import admin

from .models import LeetcodeInitialData, LeetcodeUpdatedData, LeetcodeDailyData

admin.site.register(LeetcodeInitialData)
admin.site.register(LeetcodeUpdatedData)
admin.site.register(LeetcodeDailyData)
