from django.contrib import admin
from django.contrib.admin.decorators import register
from .models import Complaint, Attachments


@register(Complaint)
class ComplaintAdmin(admin.ModelAdmin):
    list_display = ("name", "description")


@register(Attachments)
class AttachmentsAdmin(admin.ModelAdmin):
    list_display = ("complaint", "file")
