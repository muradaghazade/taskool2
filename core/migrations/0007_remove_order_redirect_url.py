# Generated by Django 3.2.3 on 2021-08-18 06:49

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0006_alter_order_redirect_url'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='order',
            name='redirect_url',
        ),
    ]
