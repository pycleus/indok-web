# Generated by Django 3.2.5 on 2021-10-28 15:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("cabins", "0018_auto_20211007_1740"),
    ]

    operations = [
        migrations.CreateModel(
            name="BookingSemester",
            fields=[
                ("id", models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name="ID")),
                ("fall_start_date", models.DateField()),
                ("fall_end_date", models.DateField()),
                ("spring_start_date", models.DateField()),
                ("spring_end_date", models.DateField()),
            ],
        ),
    ]