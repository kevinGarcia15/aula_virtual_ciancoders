import json

from django.core.files import File
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status, filters, viewsets
from rest_framework.authtoken.models import Token
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.settings import api_settings

from api.models import Maestro
from api.models import Profile
from api.serializers import MaestroSerializer, ProfileSerializer


class MaestroViewset(viewsets.ModelViewSet):
    queryset = Maestro.objects.filter(activo=True, maestro_profile__rol__nombre='Maestro')
    #import pdb; pdb.set_trace()
    serializer_class = MaestroSerializer

    def get_permissions(self):
        """" Define permisos para este recurso """
        permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

