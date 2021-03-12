"""Serializer del modelo tarea_estudiante"""
from rest_framework import serializers

#model
from api.models import Tarea_Estudiante

#serializer
from api.serializers import EstudianteSerializer, TareaSerializer

class TareaEstudianteSerializer(serializers.ModelSerializer):
    """Serializer para crear y actualizar el modelo"""
    class Meta:
        model = Tarea_Estudiante
        fields = ("texto", "archivo", "punteo")

class TareaEstudianteReadSerializer(serializers.ModelSerializer):
    """Serializer de solo lectura"""
    estudiante = EstudianteSerializer()
    class Meta:
        model = Tarea_Estudiante
        fields = ("id","texto", "archivo", "punteo", "creado","estudiante")

class TareaEstudianteMisNotasSerializer(serializers.ModelSerializer):
    """Serializer de solo lectura"""
    tarea = TareaSerializer()
    class Meta:
        model = Tarea_Estudiante
        fields = ("id","texto", "archivo", "punteo", "creado","tarea")