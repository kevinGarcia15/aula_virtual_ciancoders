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

from api.models import Asignacion, Estudiante
from api.serializers import AsignacionCrearSerializer,AsignacionSerializer,EstudianteSerializer

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

    @action(methods=["get"], detail=False)
    def estudiantes(self, request):
        asignacion_id = request.query_params.get("id")
        asignacion = Asignacion.objects.get(pk=asignacion_id)
        asignacionSerializer = AsignacionSerializer(asignacion)
        estudiantes_asignados = asignacion.estudiante_asignaciones.all()
        serializer = EstudianteSerializer(estudiantes_asignados, many=True)
        return Response(
            {"estudiantes" : serializer.data, 
            "infoCurso":asignacionSerializer.data
            }, 
            status=status.HTTP_200_OK
        )

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
