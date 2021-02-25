import json

from django.core.files import File
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status, filters, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.settings import api_settings

#permission
from api.permission.admin import IsAdminUser

from api.models import Curso
from api.serializers import CursoSerializer, CursoReadSerializer

class CursoViewset(viewsets.ModelViewSet):
    """Curso viewSet"""
    queryset = Curso.objects.filter(activo=True)
    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("nombre",)
    search_fields = ("nombre",)
    ordering_fields = ("nombre",)

    def get_serializer_class(self):
        """Define serializer for API"""
        if self.action == 'list' or self.action == 'retrieve':
            return CursoReadSerializer
        else:
            return CursoSerializer

    def get_permissions(self):
        """" Define permisos para este recurso """
        if self.action == "list" or self.action == "retrieve":
            permission_classes = [IsAuthenticated]
        else:
            permission_classes = [IsAuthenticated,IsAdminUser]
        return [permission() for permission in permission_classes]
