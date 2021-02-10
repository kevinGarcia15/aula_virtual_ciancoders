"""Maestro serializer"""
#django
from rest_framework import serializers

#models
from api.models import Maestro
from api.models import User

#serilizer
from api.serializers import ProfileSerializer, ProfileAndUserSerializer

class MaestroSerializer(serializers.ModelSerializer):
    maestro_profile = ProfileAndUserSerializer(read_only=True)
    profesion = serializers.StringRelatedField(read_only=True)

    class Meta:
        """Meta class"""
        model = Maestro
        fields = (
            'id', 'profesion', 'maestro_profile'
        )
