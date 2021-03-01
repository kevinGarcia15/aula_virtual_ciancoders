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

from api.models import Asignacion
from api.serializers import AsignacionCrearSerializer,AsignacionSerializer

class AsignacionViewset(viewsets.ModelViewSet):
    """Asignacion Viewset""" 
    queryset = Asignacion.objects.filter(activo=True)
    
    def get_serializer_class(self):
        """Define serializer for API"""
        if self.action == 'list' or self.action == 'retrieve':
            return AsignacionSerializer
        else:
            return AsignacionCrearSerializer

    def get_permissions(self):
        """" Define permisos para este recurso """
        permission_classes = [IsAuthenticated]
        if self.action in ['create', 'update']:
            permission_classes.append(IsAdminUser)
        return [permission() for permission in permission_classes]