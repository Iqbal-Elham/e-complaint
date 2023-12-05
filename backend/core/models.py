from django.db import models
from django.contrib.auth import get_user_model

LEGAL_COMPLAINT_TYPES = (
    ("bribe_given", "Bribe Given"),
    ("bribe_taken", "Bribe Taken"),
)


COMPLAINT_STATES = [
    ("received", "Received"),
    ("under_investigation", "Under Investigation"),
    ("resolved", "Resolved"),
]


class Complaint(models.Model):
    User = get_user_model()
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)
    name = models.CharField(max_length=255, null=True, blank=True)
    email = models.EmailField(blank=True, null=True)
    phone_number = models.CharField(max_length=12, blank=True)
    complaint_type = models.CharField(max_length=55, choices=LEGAL_COMPLAINT_TYPES)
    description = models.TextField(null=False, blank=False)
    created_at = models.DateTimeField(auto_now_add=True)
    views = models.IntegerField(default=0)
    state = models.CharField(
        max_length=55, choices=COMPLAINT_STATES, default="received"
    )

    def __str__(self) -> str:
        return self.complaint_type


class Attachment(models.Model):
    complaint = models.ForeignKey(
        Complaint, on_delete=models.CASCADE, related_name="attachments"
    )
    file = models.FileField(upload_to="attachments")


class Notification(models.Model):
    User = get_user_model()

    NOTIFICATION_TYPE = [
        ("received", "Your complaint was submitted successfully"),
        ("under_investigation", "Your complaint is under investigation"),
        ("resolved", "Your complaint has been resolved"),
    ]

    user = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name="notifications"
    )
    complaint = models.ForeignKey(
        Complaint, on_delete=models.CASCADE, related_name="notifications"
    )
    message = models.CharField(max_length=55, choices=NOTIFICATION_TYPE)
    read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
