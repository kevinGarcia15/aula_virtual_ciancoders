"""Tarea serializer"""
#django
from rest_framework import serializers

#models
from api.models import Tarea


class TareaSerializer(serializers.ModelSerializer):
    class Meta:
        """Meta class"""
        model = Tarea
        fields = ("titulo", "fecha_entrega", "hora_entrega","nota")

class TareaReadSerializer(serializers.ModelSerializer):
    class Meta:
        """Meta class"""
        model = Tarea
        fields = "__all__"