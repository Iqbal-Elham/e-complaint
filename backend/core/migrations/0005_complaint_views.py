# Generated by Django 4.2.4 on 2023-10-30 09:51

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0004_remove_complaint_address_remove_complaint_province_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='complaint',
            name='views',
            field=models.IntegerField(default=0),
        ),
    ]
