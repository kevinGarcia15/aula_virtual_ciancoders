"""Asignacion serializer"""
#django
from rest_framework import serializers

#models
from api.models import Asignacion

#serializer 
from api.serializers.tarea import TareaSerializer

class AsignacionSerializer(serializers.ModelSerializer):
    curso = serializers.StringRelatedField()
    grado = serializers.StringRelatedField()
    seccion = serializers.StringRelatedField()
    class Meta:
        """Meta class"""

        model = Asignacion
        fields = (
            'id','curso','grado','seccion','descripcion'
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
