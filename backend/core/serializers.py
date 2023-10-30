from rest_framework import serializers
from .models import Complaint, Attachments


class ComplaintSerializer(serializers.ModelSerializer):
    attachments = serializers.SerializerMethodField("get_attachments")

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

    def get_attachments(self, object):
        attachments = Attachments.objects.filter(complaint=object)
        serializer = AttachmentSerializer(
            attachments, many=True, context={"request": self.context["request"]}
        )

        return serializer.data


class ComplaintCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Complaint
        fields = (
            "name",
            "email",
            "phone_number",
            "description",
            "complaint_type",
        )


class AttachmentSerializer(serializers.ModelSerializer):
    file = serializers.FileField(use_url=True)

    class Meta:
        model = Attachments
        fields = (
            "id",
            "file",
        )
