""""Ciclo serializer"""
#django
from rest_framework import serializers

#models
from api.models import Ciclo

class CicloSerializer(serializers.ModelSerializer):
    """Serializer para crear y actualizar"""
    class Meta:
        """Meta class"""
        model = Ciclo
        fields = ("anio",)


class CicloReadSerializer(serializers.ModelSerializer):
    """Serializer para leer"""
    class Meta:
        """Meta class"""
        model = Ciclo
        fields = "__all__"
