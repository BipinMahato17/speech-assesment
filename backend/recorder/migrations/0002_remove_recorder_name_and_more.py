# Generated by Django 5.0.2 on 2024-03-01 15:46

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('recorder', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='recorder',
            name='name',
        ),
        migrations.RemoveField(
            model_name='recorder',
            name='transcribed_text',
        ),
    ]