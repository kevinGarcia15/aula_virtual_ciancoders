""""Curso serializer"""
#django
from rest_framework import serializers

#models
from api.models import Curso

class CursoSerializer(serializers.ModelSerializer):
    """Serializer para crear y actualizar"""
    class Meta:
        """Meta class"""
        model = Curso
        fields = ("nombre", "descripcion")


class CursoReadSerializer(serializers.ModelSerializer):
    """Serializer para leer"""
    class Meta:
        """Meta class"""
        model = Curso
        fields = "__all__"
