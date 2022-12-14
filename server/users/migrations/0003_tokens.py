# Generated by Django 4.1.1 on 2022-10-15 14:47

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ("users", "0002_user_is_verified"),
    ]

    operations = [
        migrations.CreateModel(
            name="Tokens",
            fields=[
                (
                    "id",
                    models.BigAutoField(
                        auto_created=True,
                        primary_key=True,
                        serialize=False,
                        verbose_name="ID",
                    ),
                ),
                (
                    "verify_email_token",
                    models.CharField(max_length=512, verbose_name="Verify Email Token"),
                ),
                (
                    "user",
                    models.ForeignKey(
                        on_delete=django.db.models.deletion.CASCADE,
                        to=settings.AUTH_USER_MODEL,
                    ),
                ),
            ],
            options={"verbose_name": "Tokens", "verbose_name_plural": "Tokens",},
        ),
    ]
