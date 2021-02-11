import json

from django.core.files import File
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status, filters, viewsets
from rest_framework.authtoken.models import Token
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.settings import api_settings

from api.models import Maestro, Profile, User, Rol
from api.serializers import MaestroSerializer, CreateProfileSerializer, UserSerializer ,CrearMaestroSerializer


class MaestroViewset(viewsets.ModelViewSet):
    queryset = Maestro.objects.filter(activo=True, maestro_profile__rol__nombre='Maestro')
    #import pdb; pdb.set_trace()
    serializer_class = MaestroSerializer

    def get_permissions(self):
        """" Define permisos para este recurso """
        permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    def create(self, request, *args, **kwargs):
        dataUser={
            "username":request.data['username'],
            "password":request.data['password'],
            "email":request.data['email'],
            "first_name":request.data['first_name'],
            "last_name":request.data['last_name']
        }
        serializer = UserSerializer(data=dataUser)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        #        import pdb; pdb.set_trace()
        rol = Rol.objects.get(nombre="Maestro")
        dataProfile={
            "user":user.id,
            "rol":rol.id,
            "address":request.data['address'],
        }
        serializerProfile = CreateProfileSerializer(data=dataProfile)
        serializerProfile.is_valid(raise_exception=True)
        profile = serializerProfile.save()

        dataMaestro={
            "maestro_profile": profile.id,
            "profesion": request.data['profesion']
        }
        serializerMaestro = CrearMaestroSerializer(data=dataMaestro)
        serializerMaestro.is_valid(raise_exception=True)
        serializerMaestro.save()
        return Response(serializerMaestro.data, status=status.HTTP_201_CREATED)

