import json

from django.core.files import File
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status, filters, viewsets
from rest_framework.authtoken.models import Token
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.settings import api_settings
from django.db import transaction

#permission
from api.permission.admin import IsAdminUser

from api.models import Profile, Asignacion, Estudiante
from api.serializers import ProfileAndUserSerializer

class AdminViewset(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class =  ProfileAndUserSerializer

    def get_permissions(self):
        """" Define permisos para este recurso """
        permission_classes = [IsAuthenticated, IsAdminUser]
        return [permission() for permission in permission_classes]

    @action(methods=["get"], detail=False)
    def count_user(self, request):
        usuarios_totales = Profile.objects.all().count()

        catedraticos_totales = Profile.objects.filter(rol__nombre="Maestro").count()
        catedraticos_activos = Profile.objects.filter(rol__nombre="Maestro", activo=True).count()
        catedraticos_inactivos = Profile.objects.filter(rol__nombre="Maestro", activo=False).count()

        estudiantes_totales = Profile.objects.filter(rol__nombre="Estudiante").count()
        estudiantes_activos = Profile.objects.filter(rol__nombre="Estudiante", activo=True).count()
        estudiantes_inactivos = Profile.objects.filter(rol__nombre="Estudiante", activo=False).count()
        data ={
            "usuariosTotales":usuarios_totales,
            "totalMaestros": catedraticos_totales,
            "maestrosActivos": catedraticos_activos,
            "maestrosInactivos": catedraticos_inactivos,
            "totalEstudiantes":estudiantes_totales,
            "estudiantesActivos": estudiantes_activos,
            "estudiantesInactivos": estudiantes_inactivos,
        }
        return Response(data, status=status.HTTP_200_OK)
    
    @action(methods=["get"], detail=False)
    def ciclo(self, request):
        anio = "2021"
        maestros_asignados = Asignacion.objects.filter(
            asignacion_ciclo__anio=anio
            ).values('maestro'
            ).distinct().count()

        grados = Asignacion.objects.filter(
            asignacion_ciclo__anio=anio
            ).values('grado').distinct().count()
        secciones = Asignacion.objects.filter(
            asignacion_ciclo__anio=anio
            ).values('seccion').distinct().count()
        estudiantes_asignados = Asignacion.objects.filter(asignacion_ciclo__anio=anio
            ).values('estudiante_asignaciones').distinct().count()
        data = {
            "ciclo" : anio,
            "maestrosAsignados" : maestros_asignados,
            "grados":grados,
            "secciones": secciones,
            "estudiantesAsignados":estudiantes_asignados
        }
        return Response(data, status=status.HTTP_200_OK)        

