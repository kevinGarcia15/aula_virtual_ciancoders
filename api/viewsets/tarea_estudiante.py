"""Viewset del modelo tarea_estudiante"""
import json

from rest_framework import viewsets, status
from rest_framework.decorators import action
from django.core.files import File
from rest_framework.response import Response
from rest_framework.settings import api_settings

#modelo
from api.models import Tarea_Estudiante

#serializer 
from api.serializers import TareaEstudianteSerializer, TareaEstudianteReadSerializer

class TareaEstudianteViewset(viewsets.ModelViewSet):
    """Viewset del modelo tarea_estudiante"""
    queryset = Tarea_Estudiante.objects.filter(tarea__asignacion__asignacion_ciclo__anio= "2021")
    serializer_class = TareaEstudianteReadSerializer