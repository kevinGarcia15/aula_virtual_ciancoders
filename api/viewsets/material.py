"""Viewset del modelo material de aprendizaje"""
import json

from rest_framework import viewsets, status, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.settings import api_settings
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from datetime import datetime

#modelo
from api.models import Material

#permisos
from api.permission.maestro import IsMaestroUser

#Serializers
from api.serializers import MaterialSerializer, MaterialReadSerializer
class MaterialViewset(viewsets.ModelViewSet):
    now = datetime.now()
    anio = now.strftime("%Y")
    queryset = Material.objects.filter(activo=True, asignacion__asignacion_ciclo__anio=anio)

    def get_serializer_class(self):
        """Usa el serializer segun la acciona realizar"""
        if self.action == "list" or self.action == "retrieve":
            return MaterialReadSerializer
        else:
            return MaterialSerializer

    def get_permissions(self):
        """" Define permisos para este recurso """
        permission_classes = [IsAuthenticated, IsMaestroUser]
        if self.action == "list":
            permission_classes.append(IsAdminUser)
        return [permission() for permission in permission_classes]

    @action(methods=['get'], detail=False)
    def asignacion(self, request):
        asignacion_id = request.query_params.get("id")
        material = Material.objects.filter(activo=True, asignacion_id=asignacion_id)
        serializer = MaterialReadSerializer(material, many=True)
        return Response(
            {"material" : serializer.data,}, 
            status=status.HTTP_200_OK
        )