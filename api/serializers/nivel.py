"""nivel serializer"""
#django
from rest_framework import serializers

#models
from api.models import Nivel


class NivelSerializer(serializers.ModelSerializer):
    class Meta:
        """Meta class"""
        model = Nivel
        fields = (
            'id','nombre','descripcion'
        )
