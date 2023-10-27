from rest_framework.mixins import ListModelMixin, RetrieveModelMixin
from rest_framework.viewsets import GenericViewSet
from rest_framework import status
from rest_framework.response import Response
from rest_framework.parsers import FormParser, MultiPartParser, JSONParser
from .models import Complaint, Attachments
from .serializers import (
    ComplaintCreateSerializer,
    ComplaintSerializer,
)


class ComplaintViewSet(GenericViewSet, ListModelMixin, RetrieveModelMixin):
    queryset = Complaint.objects.order_by("-created_at")
    serializer_class = ComplaintSerializer
    parser_classes = [FormParser, MultiPartParser]

    def create(self, request):
        data_copy = request.data.copy()

        serializer = ComplaintCreateSerializer(
            data=data_copy, context={"request": request}
        )
        if serializer.is_valid(raise_exception=True):
            attachments = request.data.getlist("attachments")

            complaint = serializer.save()
            if attachments:
                for file in attachments:
                    Attachments.objects.create(complaint=complaint, file=file)

            serialized_complaint = ComplaintSerializer(
                complaint, context={"request": request}
            )
            return Response(serialized_complaint.data, status=status.HTTP_201_CREATED)
