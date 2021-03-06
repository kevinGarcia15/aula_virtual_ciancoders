import json

from django.core.files import File
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status, filters, viewsets
from rest_framework.decorators import action, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.settings import api_settings
from datetime import datetime
from rest_framework.pagination import PageNumberPagination


#permission
from api.permission.admin import IsAdminUser
from api.permission.maestro import IsMaestroUser
from api.permission.asignacion import IsAsignacionOwner
 
from api.models import Asignacion, Estudiante
from api.serializers import (
    AsignacionCrearSerializer,
    AsignacionSerializer,
    EstudianteSerializer
)
class AsignacionPageNumberPagination(PageNumberPagination):
    page_size=10


class AsignacionViewset(viewsets.ModelViewSet):
    """Asignacion Viewset""" 
    now = datetime.now()
    anio = now.strftime("%Y")
    queryset = Asignacion.objects.filter(asignacion_ciclo__anio=anio)
    pagination_class=AsignacionPageNumberPagination

    
    def get_serializer_class(self):
        """Define serializer for API"""
        if self.action == 'list' or self.action == 'retrieve':
            return AsignacionSerializer
        else:
            return AsignacionCrearSerializer

    def get_permissions(self):
        """" Define permisos para este recurso """
        permission_classes = [IsAuthenticated]

        if self.action in ['estudiantes', 'estudiante_asignar','elimiar_alumno','actualizar_portada']:
            permission_classes.append(IsMaestroUser)
        if self.action in ['create', 'update', 'list']:
            permission_classes.append(IsAdminUser)
        if self.action == 'retrieve':
            permission_classes.append(IsAsignacionOwner)
        return [permission() for permission in permission_classes]

    @action(methods=["get"], detail=False)
    def estudiantes(self, request):
        asignacion_id = request.query_params.get("id")
        asignacion = Asignacion.objects.get(pk=asignacion_id)
        #asignacionSerializer = AsignacionSerializer(asignacion)
        estudiantes_asignados = asignacion.estudiante_asignaciones.all().order_by('estudiante_profile__user__first_name')
        
        page = self.paginate_queryset(estudiantes_asignados)
        if page is not None:
            serializer = EstudianteSerializer(page, many=True)
            return self.get_paginated_response(serializer.data)
        serializer = EstudianteSerializer(estudiantes_asignados, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(methods=["post"], detail=False)
    def estudiante_asignar(self, request):
        data = request.data
        try:
            asignacion = Asignacion.objects.get(pk=data.get("asignatura"))
            estudiante = Estudiante.objects.get(pk=data.get("estudiante"))
            nueva_asignacion = estudiante.asignacion_estudiante.add(asignacion)
            serializer = EstudianteSerializer(nueva_asignacion)

            return Response(serializer.data, status=status.HTTP_200_OK)
        except TypeError as e:
            return Response(e, status=status.HTTP_400_BAD_REQUEST)

    @action(methods=["post"], detail=False)
    def elimiar_alumno(self, request):
        data = request.data
        try:
            asignacion = Asignacion.objects.get(pk=data.get("id_asignacion"))
            estudiante = Estudiante.objects.get(pk=data.get("id_estudiante"))
            estudiante.asignacion_estudiante.remove(asignacion)
            return Response("eliminacion satisfactoria", status=status.HTTP_200_OK)
        except TypeError as e:
            return Response(e, status=status.HTTP_400_BAD_REQUEST)        


    @action(methods=["put"], detail=False)
    def actualizar_portada(self, request,*args, **kwargs):
        data = request.data
        try:
            portada = data.get("portada")
            data = json.loads(data["data"])
            id_asignacion = data.get("asignacion")
            asignacion = Asignacion.objects.get(pk=id_asignacion)
            asignacion.portada = File(portada)
            asignacion.save()
            return Response("Portada actualizada exitosamente", status=status.HTTP_200_OK)
        except TypeError as e:
            return Response(e, status=status.HTTP_400_BAD_REQUEST)
