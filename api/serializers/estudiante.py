"""Estudiante serializer"""
#django
from rest_framework import serializers

#models
from api.models import Estudiante, User, Profile

#serilizer
from api.serializers import ProfileAndUserSerializer,CreateProfileSerializer

class EstudianteSerializer(serializers.ModelSerializer):
    estudiante_profile = ProfileAndUserSerializer()

    class Meta:
        """Meta class"""
        model = Estudiante
        fields = (
            'id','direccion_contacto','telefono_contacto', 'estudiante_profile'
        )

class EstudianteCrearSerializer(serializers.ModelSerializer):
    """Serializer para crear maestros"""
    user = CreateProfileSerializer(required=True)
    class Meta:
        """Meta class"""
        model = Estudiante
        fields = ('direccion_contacto','telefono_contacto','user')

