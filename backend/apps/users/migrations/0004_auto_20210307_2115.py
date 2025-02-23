# Generated by Django 3.1.2 on 2021-03-07 20:15

from django.db import migrations, models
import phonenumber_field.modelfields


class Migration(migrations.Migration):
    dependencies = [
        ("users", "0003_user_id_token"),
    ]

    operations = [
        migrations.AddField(
            model_name="user",
            name="allergies",
            field=models.CharField(blank=True, default="", max_length=1000),
        ),
        migrations.AddField(
            model_name="user",
            name="feide_email",
            field=models.CharField(default="", max_length=100),
        ),
        migrations.AddField(
            model_name="user",
            name="first_login",
            field=models.BooleanField(default=True),
        ),
        migrations.AddField(
            model_name="user",
            name="phone_number",
            field=phonenumber_field.modelfields.PhoneNumberField(blank=True, max_length=128, region=None),
        ),
        migrations.AlterField(
            model_name="user",
            name="id_token",
            field=models.CharField(blank=True, default="", max_length=1000),
        ),
    ]
