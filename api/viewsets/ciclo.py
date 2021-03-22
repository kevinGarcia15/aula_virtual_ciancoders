import json

from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status, filters, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.settings import api_settings

from api.models import Ciclo
from api.serializers import CicloSerializer, CicloReadSerializer

class CicloViewset(viewsets.ModelViewSet):
    """Ciclo viewSet"""
    queryset = Ciclo.objects.filter(activo=True).order_by("-anio")
    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("anio",)
    search_fields = ("anio",)
    ordering_fields = ("anio",)

    def get_serializer_class(self):
        """Define serializer for API"""
        if self.action == 'list' or self.action == 'retrieve':
            return CicloReadSerializer
        else:
            return CicloSerializer

    def get_permissions(self):
        """" Define permisos para este reCiclo """
        permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]
