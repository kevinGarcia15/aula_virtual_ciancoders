"""Profesion serializer"""
#django
from rest_framework import serializers

#models
from api.models import Profesion


class ProfesionSerializer(serializers.ModelSerializer):
    class Meta:
        """Meta class"""
        model = Profesion
        fields = (
            'id','nombre','descripcion'
        )
