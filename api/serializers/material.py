"""Serializador para el modelo material de apoyo"""
from rest_framework import serializers

#modelo
from api.models import Material

class MaterialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Material
        fields = ("titulo", "descripcion")

class MaterialReadSerializer(serializers.ModelSerializer):
    class Meta:
        model = Material
        fields = ("id","titulo", "descripcion", "archivo","activo")