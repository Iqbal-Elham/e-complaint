from rest_framework.mixins import ListModelMixin, RetrieveModelMixin
from rest_framework.viewsets import GenericViewSet
from rest_framework import status
from rest_framework.response import Response
from rest_framework.parsers import FormParser, MultiPartParser, JSONParser
from rest_framework.permissions import IsAuthenticated, IsAdminUser, AllowAny
from rest_framework.decorators import action
from .models import Complaint, Attachment, Notification, COMPLAINT_STATES
from .serializers import (
    ComplaintCreateSerializer,
    ComplaintSerializer,
    NotificationSerializer,
)


class ComplaintViewSet(GenericViewSet, ListModelMixin, RetrieveModelMixin):
    queryset = Complaint.objects.order_by("-created_at")
    serializer_class = ComplaintSerializer
    parser_classes = [FormParser, MultiPartParser]
    permission_classes = [IsAuthenticated]

    def get_permissions(self):
        if self.action in ["update", "destroy"]:
            permission_classes = [IsAdminUser]
        elif self.action in ["my_complaints"]:
            permission_classes = [IsAuthenticated]
        else:
            permission_classes = [AllowAny]
        return [permission() for permission in permission_classes]

    def create(self, request):
        data_copy = request.data.copy()
        data_copy["user"] = request.user.id
        serializer = ComplaintCreateSerializer(
            data=data_copy, context={"request": request}
        )
        if serializer.is_valid(raise_exception=True):
            attachments = request.data.getlist("attachments")

            complaint = serializer.save()
            if attachments:
                for file in attachments:
                    Attachment.objects.create(complaint=complaint, file=file)

            serialized_complaint = ComplaintSerializer(
                complaint, context={"request": request}
            )
            return Response(serialized_complaint.data, status=status.HTTP_201_CREATED)

    def retrieve(self, request, *args, **kwargs):
        complaint = self.get_object()
        complaint.views += 1
        complaint.save()
        serialized_complaint = ComplaintSerializer(
            complaint, context={"request": request}
        )

        return Response(serialized_complaint.data)

    @action(methods=["get"], detail=False, parser_classes=[JSONParser])
    def my_complaints(self, request):
        user = request.user
        complaints = self.queryset.filter(user=user)
        page = self.paginate_queryset(complaints)
        if page is not None:
            serializer = self.get_serializer(
                page, many=True, context={"request": request}
            )
            return self.get_paginated_response(serializer.data)

        serializer = self.get_serializer(
            complaints, many=True, context={"request": request}
        )
        return Response(serializer.data)

    @action(methods=["post"], detail=True, parser_classes=[JSONParser])
    def update_state(self, request, *args, **kwargs):
        if not request.user.is_staff:
            return Response(
                {"detail": "not_admin"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        try:
            complaint = self.get_object()
            if complaint.state == "received":
                complaint.state = "under_investigation"
            elif complaint.state == "under_investigation":
                complaint.state = "resolved"
            else:
                return Response(
                    {"detail": "not_editable"},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            complaint.save()
            Notification.objects.create(
                user=complaint.user, complaint=complaint, message=complaint.state
            )
            serializer = ComplaintSerializer(
                complaint, many=False, context={"request": request}
            )

            return Response(
                serializer.data,
                status=status.HTTP_202_ACCEPTED,
            )

        except Complaint.DoesNotExist:
            return Response(
                {"detail": "complaint_not_found"}, status=status.HTTP_404_NOT_FOUND
            )


class NotificationViewset(GenericViewSet):
    queryset = Notification.objects.order_by("-created_at")
    serializer_class = NotificationSerializer
    permission_classes = [IsAuthenticated]

    def list(self, request):
        notifications = self.queryset.filter(user=request.user)
        serializer = NotificationSerializer(
            notifications, many=True, context={"request": request}
        )
        return Response(serializer.data)

    @action(methods=["post"], detail=False)
    def mark_as_read(self, request):
        notification_ids = request.data.get("notification_ids", None)
        if not notification_ids:
            return Response(
                {"detail": "notification_ids_required"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        notifications = self.queryset.filter(id__in=notification_ids, user=request.user)
        for notification in notifications:
            notification.read = True

        serializer = NotificationSerializer(
            notifications, many=True, context={"request": request}
        )
        return Response(serializer.data)
