import json

from django.core.files import File
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status, filters, viewsets
from rest_framework.authtoken.models import Token
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.settings import api_settings

from api.models import Estudiante, Profile, User, Rol
from api.serializers import EstudianteSerializer, UserSerializer,CreateProfileSerializer,EstudianteCrearSerializer


class EstudianteViewset(viewsets.ModelViewSet):
    queryset = Estudiante.objects.filter(activo=True, estudiante_profile__rol__nombre='Estudiante')
    #import pdb; pdb.set_trace()
    serializer_class = EstudianteSerializer

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
        user.set_password(request.data["password"])
        user.save()
        #        import pdb; pdb.set_trace()
        rol = Rol.objects.get(nombre="Estudiante")
        dataProfile={
            "user":user.id,
            "rol":rol.id,
            "phone":request.data['phone'],
            "address":request.data['address'],
        }
        serializerProfile = CreateProfileSerializer(data=dataProfile)
        serializerProfile.is_valid(raise_exception=True)
        profile = serializerProfile.save()

        dataEstudiante={
            "estudiante_profile": profile.id,
            "telefono_contacto": request.data['telefono_contacto'],
            "direccion_contacto": request.data['direccion_contacto'],
        }
        serializerEstudiante = EstudianteCrearSerializer(data=dataEstudiante)
        serializerEstudiante.is_valid(raise_exception=True)
        serializerEstudiante.save()
        return Response(serializerEstudiante.data, status=status.HTTP_201_CREATED)



