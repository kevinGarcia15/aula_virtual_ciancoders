import json

from django.core.files import File
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status, filters, viewsets
from rest_framework.authtoken.models import Token
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.settings import api_settings
from datetime import datetime

#permission
from api.permission.admin import IsAdminUser
from api.models import Evento, Ciclo
from api.serializers import EventoSerializer, EventoReadSerializer

class EventoViewset(viewsets.ModelViewSet):
    now = datetime.now()
    fechaActual = now.strftime("%Y-%m-%d")
    anio = now.strftime("%Y")
    queryset = Evento.objects.filter(ciclo_escolar__anio=anio, fecha__gte=fechaActual, activo=True).order_by('fecha','hora')

    def get_serializer_class(self):
        """Define serializer for API"""
        if self.action == 'list' or self.action == 'retrieve':
            return EventoReadSerializer
        else:
            return EventoSerializer
            
    def get_permissions(self):
        """" Define permisos para este recurso """
        if self.action == "list" or self.action == "retrieve":
            permission_classes = [IsAuthenticated]
        else:
            permission_classes = [IsAuthenticated,IsAdminUser]
        return [permission() for permission in permission_classes]

    def create(self, request):
        try:
            data = request.data
            serializer = EventoSerializer(data=data)
            if serializer.is_valid(raise_exception=True):
                ciclo = Ciclo.objects.get(anio=self.anio)                
                Evento.objects.create(
                    ciclo_escolar=ciclo,
                    titulo = data.get("titulo"),
                    descripcion = data.get("descripcion"),
                    fecha = data.get("fecha"),
                    hora = data.get("hora"),
                )
            return Response({"success":"data is success"}, status=status.HTTP_201_CREATED)
        except TypeError as e:
            return Response(e, status=status.HTTP_400_BAD_REQUEST)
    