# Generated by Django 3.1.6 on 2021-04-09 14:29

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('permissions', '0001_initial'),
        ('organizations', '0019_merge_20210315_1439'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='organization',
            name='group',
        ),
        migrations.AddField(
            model_name='organization',
            name='responsible_group',
            field=models.OneToOneField(null=True, on_delete=django.db.models.deletion.CASCADE, to='permissions.responsiblegroup'),
        ),
    ]