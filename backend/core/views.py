from rest_framework.mixins import ListModelMixin, RetrieveModelMixin
from rest_framework.viewsets import GenericViewSet
from rest_framework import status
from rest_framework.response import Response
from rest_framework.parsers import FormParser, MultiPartParser, JSONParser
from rest_framework.permissions import IsAuthenticated
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

    def create(self, request):
        data_copy = request.data.copy()
        data_copy["user"] = request.user
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

    @action(methods=["post"], detail=True, parser_classes=[JSONParser])
    def update_state(self, request):
        if not request.user.is_staff:
            return Response(
                {"detail": "not_admin"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        complaint_id = request.data.get("complaint_id")
        new_state = request.data.get("new_state")
        if not (complaint_id and new_state):
            return Response(
                {"detail": "complaint_id_new_state_required"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        try:
            complaint = self.get_object()
            valid_states = [value for value, _ in COMPLAINT_STATES]
            error = None

            if new_state not in valid_states:
                error = "invalid_complaint_state"
            elif (
                new_state == "under_investigation" and not complaint.state == "received"
            ):
                error = "invalid_complaint_state_selected"
            elif (
                new_state == "resolved" and not complaint.state == "under_investigation"
            ):
                error = "invalid_complaint_state_selected"
            elif new_state == "received":
                error = "invalid_complaint_state_selected"
            if error:
                return Response(
                    {"detail": error},
                    status=status.HTTP_400_BAD_REQUEST,
                )
            else:
                complaint.state = new_state
                complaint.save()
                Notification.objects.create(
                    user=complaint.user, complaint=complaint, message=new_state
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
