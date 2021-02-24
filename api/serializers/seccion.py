""""Seccion serializer"""
#django
from rest_framework import serializers

#models
from api.models import Seccion

class SeccionSerializer(serializers.ModelSerializer):
    """Serializer para crear y actualizar"""
    class Meta:
        """Meta class"""
        model = Seccion
        fields = ("nombre",)


class SeccionReadSerializer(serializers.ModelSerializer):
    """Serializer para leer"""
    class Meta:
        """Meta class"""
        model = Seccion
        fields = "__all__"