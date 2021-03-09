"""Serializer del modelo tarea_estudiante"""
from rest_framework import serializers

#model
from api.models import Tarea_Estudiante

class TareaEstudianteSerializer(serializers.ModelSerializer):
    """Serializer para crear y actualizar el modelo"""
    class Meta:
        models = Tarea_Estudiante
        fields = ("texto", "archivo", "punteo")

class TareaEstudianteReadSerializer(serializers.ModelSerializer):
    """Serializer de solo lectura"""
    class Meta:
        models = Tarea_Estudiante
        fields = ("texto", "archivo", "punteo", "creado")
