# Generated by Django 3.2.12 on 2022-03-10 17:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("cabins", "0024_auto_20220308_0929"),
    ]

    operations = [
        migrations.AlterField(
            model_name="booking",
            name="decline_reason",
            field=models.CharField(blank=True, default="", max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name="booking",
            name="extra_info",
            field=models.CharField(blank=True, default="", max_length=100, null=True),
        ),
    ]