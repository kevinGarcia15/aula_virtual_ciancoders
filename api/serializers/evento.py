"""Evento serializer"""
#django
from rest_framework import serializers

#models
from api.models import Evento


class EventoSerializer(serializers.ModelSerializer):
    class Meta:
        """Meta class"""
        model = Evento
        fields = "__all__"
