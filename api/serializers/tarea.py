"""Tarea serializer"""
#django
from rest_framework import serializers

#models
from api.models import Tarea


class TareaSerializer(serializers.ModelSerializer):
    class Meta:
        """Meta class"""
        model = Tarea
        fields = ("id",)