"""Estudiante serializer"""
#django
from rest_framework import serializers

#models
from api.models import Estudiante, User, Profile

#serilizer
from api.serializers import ProfileAndUserSerializer

class EstudianteSerializer(serializers.ModelSerializer):
    estudiante_profile = ProfileAndUserSerializer()

    class Meta:
        """Meta class"""
        model = Estudiante
        fields = (
            'id', 'estudiante_profile'
        )

class EstudianteCrearSerializer(serializers.ModelSerializer):

    class Meta:
        """Meta class"""
        model = Estudiante
        fields = ('direccion_contacto','estudiante_profile')

