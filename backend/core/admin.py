from django.contrib import admin
from django.contrib.admin.decorators import register
from .models import Complaint, Attachment, Notification


@register(Complaint)
class ComplaintAdmin(admin.ModelAdmin):
    list_display = ("name", "description")


@register(Attachment)
class AttachmentAdmin(admin.ModelAdmin):
    list_display = ("complaint", "file")


@register(Notification)
class NotificationAdmin(admin.ModelAdmin):
    list_display = ("complaint", "user", "message")
