import json

from django.core.files import File
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status, filters, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.settings import api_settings
from datetime import datetime

#permisos
from api.permission.maestro import IsMaestroUser

#models
from api.models import Tarea

#serializer
from api.serializers import TareaSerializer, TareaReadSerializer

class TareaViewset(viewsets.ModelViewSet):
    """Viewset de tareas"""
    now = datetime.now()
    anio = now.strftime("%Y")
    queryset = Tarea.objects.filter(activo=True, asignacion__asignacion_ciclo__anio = anio)

    def get_serializer_class(self):
        """Define el serializador a utilizar"""
        if self.action == "list" or self.action == "retrieve":
            return TareaReadSerializer
        else:
            return TareaSerializer

    def get_permissions(self):
        """" Define permisos para este recurso """
        permission_classes = [IsAuthenticated, IsMaestroUser]
        return [permission() for permission in permission_classes]

    @action(methods=['get'], detail=False)
    def asignacion(self, request):
        asignacion_id = request.query_params.get("id")
        tareas = Tarea.objects.filter(asignacion_id=asignacion_id)
        serializer = TareaReadSerializer(tareas, many=True)
        return Response(
            {"tareas" : serializer.data, 
            }, 
            status=status.HTTP_200_OK
        )
