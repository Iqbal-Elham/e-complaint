from django.db import models
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.hashers import make_password
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.contrib.auth.models import UserManager
from django.utils import timezone


class CustomUser(AbstractUser):
    phone_number = models.CharField(max_length=12, blank=True)

    def __str__(self) -> str:
        return self.username
