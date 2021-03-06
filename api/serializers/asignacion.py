"""Asignacion serializer"""
#django
from rest_framework import serializers

#models
from api.models import Asignacion

#serializer 
from api.serializers.tarea import TareaSerializer
from api.serializers import MaestroSerializer


class AsignacionSerializer(serializers.ModelSerializer):
    curso = serializers.StringRelatedField()
    grado = serializers.StringRelatedField()
    seccion = serializers.StringRelatedField()
    maestro = MaestroSerializer(read_only=True)
    class Meta:
        """Meta class"""
        model = Asignacion
        fields = (
            'id','curso','grado','seccion','descripcion','portada','maestro'
        )


class AsignacionTareaSerializer(serializers.ModelSerializer):
    asignaciones = TareaSerializer(read_only=True)
    curso = serializers.StringRelatedField()

    class Meta:
        """Meta class"""
        model = Asignacion
        fields = (
            'id','curso','asignaciones'
        )


class AsignacionCrearSerializer(serializers.ModelSerializer):
    class Meta:
        """Meta class"""

        model = Asignacion
        fields = (
            'id','maestro', 'asignacion_ciclo', 'curso','grado','seccion','descripcion'
        )