"""Maestro serializer"""
#django
from rest_framework import serializers

#models
from api.models import Maestro, User, Profile

#serilizer
from api.serializers import ProfileSerializer, ProfileAndUserSerializer, CreateProfileSerializer

class MaestroSerializer(serializers.ModelSerializer):
    maestro_profile = ProfileAndUserSerializer(read_only=True)

    class Meta:
        """Meta class"""
        model = Maestro
        fields = (
            'id', 'profesion', 'maestro_profile'
        )
        depth=1

class CrearMaestroSerializer(serializers.ModelSerializer):
    """Serializer para crear maestros"""
    user = CreateProfileSerializer(required=True)
    class Meta:
        """Meta class"""
        model = Maestro
        fields = (
            'profesion','user'
        )

