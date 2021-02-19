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

from api.models import Evento
from api.serializers import EventoSerializer

class EventoViewset(viewsets.ModelViewSet):
    now = datetime.now()
    fechaActual = now.strftime("%Y-%m-%d")
    anio = now.strftime("%Y")
    queryset = Evento.objects.filter(ciclo_escolar__anio=anio, fecha__gte=fechaActual).order_by('fecha','hora')
    serializer_class =  EventoSerializer

    def get_permissions(self):
        """" Define permisos para este recurso """
        permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]