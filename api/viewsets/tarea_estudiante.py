"""Viewset del modelo tarea_estudiante"""
import json

from rest_framework import viewsets, status
from rest_framework.decorators import action
from django.core.files import File
from rest_framework.response import Response
from rest_framework.settings import api_settings

#modelo
from api.models import Tarea_Estudiante, Tarea

#serializer 
from api.serializers import (
    TareaEstudianteSerializer, 
    TareaEstudianteReadSerializer,
    TareaReadSerializer
)                           

class TareaEstudianteViewset(viewsets.ModelViewSet):
    """Viewset del modelo tarea_estudiante"""
    queryset = Tarea_Estudiante.objects.filter(tarea__asignacion__asignacion_ciclo__anio= "2021")
    serializer_class = TareaEstudianteReadSerializer

    @action(methods=['get'], detail=False)
    def entregados(self, request):
        tarea_id = request.query_params.get("id")
        tareas = Tarea_Estudiante.objects.filter(tarea_id=tarea_id)
        serializer = TareaEstudianteReadSerializer(tareas, many=True)

        tarea = Tarea.objects.get(pk=tarea_id)
        tareaSerializer =  TareaReadSerializer(tarea, many=False)
        return Response(
            {"tarea": tareaSerializer.data, "entregas":serializer.data}, 
            status=status.HTTP_200_OK
        )

    def update(self, request, pk):
        try:
            #import pdb; pdb.set_trace()
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
