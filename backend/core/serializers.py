from rest_framework import serializers
from authentication.serializers import UserSerializer
from .models import Complaint, Attachment, Notification


class ComplaintSerializer(serializers.ModelSerializer):
    attachments = serializers.SerializerMethodField("get_attachments")
    name = serializers.SerializerMethodField()
    email = serializers.SerializerMethodField()
    phone_number = serializers.SerializerMethodField()

    class Meta:
        model = Complaint
        fields = (
            "id",
            "name",
            "email",
            "phone_number",
            "description",
            "complaint_type",
            "attachments",
            "created_at",
            "views",
        )

    def get_name(self, obj):
        return obj.user.get_full_name() if obj.user else ""

    def get_email(self, obj):
        return obj.user.email if obj.user else ""

    def get_phone_number(self, obj):
        return obj.user.phone_number if obj.user else ""

    def get_attachments(self, object):
        attachments = Attachment.objects.filter(complaint=object)
        serializer = AttachmentSerializer(
            attachments, many=True, context={"request": self.context["request"]}
        )

        return serializer.data


class ComplaintCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Complaint
        fields = (
            "user",
            "description",
            "complaint_type",
        )


class AttachmentSerializer(serializers.ModelSerializer):
    file = serializers.FileField(use_url=True)

    class Meta:
        model = Attachment
        fields = (
            "id",
            "file",
        )


class NotificationSerializer(serializers.ModelSerializer):
    user = UserSerializer(many=False, read_only=True)
    complaint = ComplaintSerializer(many=False, read_only=True)

    class Meta:
        model = Notification
        fields = ("id", "user", "complaint", "message", "read")
