# Generated by Django 4.1.1 on 2022-10-07 09:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_user_is_leetcode_connected'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='is_leetcode_connected',
            field=models.BooleanField(default=False, verbose_name='Leetcode Connected?'),
        ),
    ]
