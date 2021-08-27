# Generated by Django 3.1.8 on 2021-08-24 10:13

from typing import TYPE_CHECKING, Type

from django.db import migrations
from django.db.models.query_utils import Q
from apps.permissions.constants import PRIMARY_GROUP_NAME, HR_GROUP_NAME

if TYPE_CHECKING:
    from apps.organizations import models
    from apps.permissions.models import ResponsibleGroup


def improve_group_legibility(apps, _):
    Group = apps.get_model("auth", "Group")
    Organization: Type["models.Organization"] = apps.get_model(
        "organizations", "Organization"
    )

    for group in Group.objects.exclude(responsiblegroup=None):
        responsible_group: "ResponsibleGroup" = group.responsiblegroup
        try:
            organization: "models.Organization" = Organization.objects.get(
                Q(primary_group=responsible_group) | Q(hr_group=responsible_group)
            )

            responsible_group_name = responsible_group.name
            if organization.primary_group == responsible_group:
                responsible_group_name = PRIMARY_GROUP_NAME
            elif organization.hr_group == responsible_group:
                responsible_group_name = HR_GROUP_NAME
            if responsible_group.name != responsible_group_name:
                responsible_group.name = responsible_group_name
                responsible_group.save()

            group.name = f"{organization.name}:{responsible_group_name}:{group.name}"
            group.save()
        except Organization.DoesNotExist:
            continue


def reverse_legible_group_names(apps, _):
    Group = apps.get_model("auth", "Group")
    Organization: Type["models.Organization"] = apps.get_model(
        "organizations", "Organization"
    )

    for group in Group.objects.exclude(responsiblegroup=None):
        old_name: str = group.name
        new_name = old_name.split(":")[-1]
        group.name = new_name
        group.save()

        responsible_group = group.responsiblegroup
        try:
            organization = responsible_group.organization
            if organization.primary_group == responsible_group:
                responsible_group.name = organization.name
                responsible_group.save()
        except Organization.DoesNotExist:
            continue


class Migration(migrations.Migration):

    dependencies = [
        ("permissions", "0002_auto_20210422_2020"),
    ]

    operations = [
        migrations.RunPython(improve_group_legibility, reverse_legible_group_names)
    ]