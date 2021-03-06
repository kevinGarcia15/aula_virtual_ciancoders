import json

from django.core.files import File
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status, filters, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.settings import api_settings

from api.models import Nivel
from api.serializers import NivelSerializer

class NivelViewset(viewsets.ModelViewSet):
    queryset = Nivel.objects.all()
    serializer_class =  NivelSerializer
    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("nombre",)
    search_fields = ("nombre",)
    ordering_fields = ("nombre",)

    def get_permissions(self):
        """" Define permisos para este recurso """
        permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]
