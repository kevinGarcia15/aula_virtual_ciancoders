""""Grado serializer"""
#django
from rest_framework import serializers

#models
from api.models import Grado

class GradoSerializer(serializers.ModelSerializer):
    """Serializer para crear y actualizar"""
    class Meta:
        """Meta class"""
        model = Grado
        fields = ("nombre", "descripcion", "nivel")


class GradoReadSerializer(serializers.ModelSerializer):
    """Serializer para leer"""
    class Meta:
        """Meta class"""
        model = Grado
        fields = "__all__"
        depth=1