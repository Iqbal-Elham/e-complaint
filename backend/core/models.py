from django.db import models
from django.contrib.auth import get_user_model

LEGAL_COMPLAINT_TYPES = (
    ("bribe_given", "Bribe Given"),
    ("bribe_taken", "Bribe Taken"),
)


class Complaint(models.Model):
    name = models.CharField(max_length=255, null=True, blank=True)
    email = models.EmailField(blank=True, null=True)
    complaint_type = models.CharField(max_length=55, choices=LEGAL_COMPLAINT_TYPES)
    phone_number = models.CharField(max_length=12, blank=True)
    description = models.TextField(null=False, blank=False)
    created_at = models.DateTimeField(auto_now_add=True)
    views = models.IntegerField(default=0)

    def __str__(self) -> str:
        return self.title


class Attachments(models.Model):
    complaint = models.ForeignKey(
        Complaint, on_delete=models.CASCADE, related_name="attachments"
    )
    file = models.FileField(upload_to="attachments")
