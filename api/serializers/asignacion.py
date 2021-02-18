"""Asignacion serializer"""
#django
from rest_framework import serializers

#models
from api.models import Asignacion


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
