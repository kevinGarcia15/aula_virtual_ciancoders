"""Viewset del modelo tarea_estudiante"""
import json
from rest_framework import status, filters, viewsets
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework.decorators import action
from django.core.files import File
from rest_framework.response import Response
from rest_framework.settings import api_settings
from rest_framework.permissions import AllowAny, IsAuthenticated
from datetime import date, time, datetime
#permisos
from api.permission.maestro import IsMaestroUser

#modelo
from api.models import Tarea_Estudiante, Tarea, Profile, Estudiante

#serializer 
from api.serializers import (
    TareaEstudianteSerializer, 
    TareaEstudianteReadSerializer,
    TareaReadSerializer,
    TareaEstudianteMisNotasSerializer
)                           

class TareaEstudianteViewset(viewsets.ModelViewSet):
    """Viewset del modelo tarea_estudiante"""
    now = datetime.now()
    anio = now.strftime("%Y")
    queryset = Tarea_Estudiante.objects.filter(tarea__asignacion__asignacion_ciclo__anio=anio)
    serializer_class = TareaEstudianteReadSerializer

    def get_permissions(self):
        """" Define permisos para este recurso """
        permission_classes = [IsAuthenticated]
        if self.action in ['entregados', 'update']:
            permission_classes.append(IsMaestroUser)
        return [permission() for permission in permission_classes]

    def create(self, request):
        try:

            data = request.data
            archivo = data.get('archivo')
            data = json.loads(data["data"])
            serializer = TareaEstudianteSerializer(data=data)
            if serializer.is_valid(raise_exception=True):
                user = request.user
                perfil = Profile.objects.get(user=user)
                estudiante = Estudiante.objects.get(estudiante_profile=perfil)
                tarea = Tarea.objects.get(pk=data.get("tarea"))

                date_and_time = datetime.combine(tarea.fecha_entrega,tarea.hora_entrega)
                today = datetime.now()
                if today <= date_and_time:   
                    if archivo is not None and tarea.permitir_archivo is True:
                        obj, created = Tarea_Estudiante.objects.get_or_create(
                            estudiante=estudiante,
                            tarea=tarea, 
                            defaults={'archivo':File(archivo)},
                        )
                        return Response({"detail": created}, status=status.HTTP_201_CREATED)
                    else:
                        obj, created = Tarea_Estudiante.objects.get_or_create(
                            estudiante=estudiante,
                            tarea=tarea, 
                            defaults={'texto':data.get("texto")},
                        )
                        return Response({"detail": created}, status=status.HTTP_201_CREATED)
                else:
                    return Response({"detail": "tiempo de entrega expirado"}, status=status.HTTP_400_BAD_REQUEST)
        except TypeError as e:
            return Response(e, status=status.HTTP_400_BAD_REQUEST)


    @action(methods=['get'], detail=False)
    def entregados(self, request):
        """obtiene todas las tareas que han enviados los estudiantes a un curso"""
        tarea_id = request.query_params.get("id")
        tareas = Tarea_Estudiante.objects.filter(tarea_id=tarea_id
        ).order_by('estudiante__estudiante_profile__user__first_name')
        serializer = TareaEstudianteReadSerializer(tareas, many=True)

        tarea = Tarea.objects.get(pk=tarea_id)
        tareaSerializer =  TareaReadSerializer(tarea, many=False)
        return Response(
            {"tarea": tareaSerializer.data, "entregas":serializer.data}, 
            status=status.HTTP_200_OK
        )

    @action(methods=['get'], detail=False)
    def misnotas(self, request):
        id_asignacion = request.query_params.get("id_asignacion")
        user = request.user
        perfil = Profile.objects.get(user=user)
        estudiante = Estudiante.objects.get(estudiante_profile=perfil)
        mis_notas = Tarea_Estudiante.objects.filter(estudiante=estudiante,tarea__asignacion_id = id_asignacion)
        serializer = TareaEstudianteMisNotasSerializer(mis_notas, many=True)
        return Response(
            serializer.data, 
            status=status.HTTP_200_OK
        )

    def update(self, request, pk):
        try:
            data = request.data
            tarea = Tarea.objects.get(pk=data.get("id_tarea"))
            nota_maxima = tarea.nota
            if float(data.get("punteo")) > nota_maxima:
                return Response({"detail": "La nota es mayor a lo establecido"}, status=status.HTTP_400_BAD_REQUEST)
            tarea_estudiante = Tarea_Estudiante.objects.get(pk=pk)
            tarea_estudiante.punteo = data.get("punteo")
            tarea_estudiante.save()
            return Response('Actualizado exitosamente', status=status.HTTP_201_CREATED)
        except TypeError as e:
            return Response(e, status=status.HTTP_400_BAD_REQUEST)
