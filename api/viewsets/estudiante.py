import json

from django.core.files import File
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status, filters, viewsets
from rest_framework.authtoken.models import Token
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.settings import api_settings
from django.db import transaction


from api.models import Estudiante, Profile, User, Rol
from api.serializers import EstudianteSerializer,EstudianteCrearSerializer


class EstudianteViewset(viewsets.ModelViewSet):
    USUARIO = "Estudiante"

    queryset = Estudiante.objects.filter(activo=True, estudiante_profile__rol__nombre=USUARIO)
    #import pdb; pdb.set_trace()
    serializer_class = EstudianteSerializer

    def get_permissions(self):
        """" Define permisos para este recurso """
        permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    def create(self, request):
        try:
            with transaction.atomic():
                data = request.data
                serializerEstudiante = EstudianteCrearSerializer(data=data)
                if serializerEstudiante.is_valid(raise_exception=True):
                    #import pdb; pdb.set_trace()
                    user = User.objects.create(
                        username = data.get('user').get('username'),
                        password = data.get('user').get('password'),                        
                        first_name = data.get('user').get('first_name'),                        
                        last_name = data.get('user').get('last_name'),
                        email = data.get('user').get('email')                        
                    )
                    
                    user.set_password(data.get('user').get('password'))
                    user.save()
                    rol = Rol.objects.get(nombre=self.USUARIO)

                    #import pdb; pdb.set_trace()
                    estudiante_profile = Profile.objects.create(
                        phone = data.get('user').get('profile').get('phone'),
                        address = data.get('user').get('profile').get('address'),
                        rol = rol,
                        user = user
                    )
                    #import pdb; pdb.set_trace()
                    Estudiante.objects.create(
                        estudiante_profile=estudiante_profile,
                        telefono_contacto=data.get('telefono_contacto'),
                        direccion_contacto=data.get('direccion_contacto')
                    )        
                    return Response({"success":"data is success"}, status=status.HTTP_201_CREATED)
                else:
                    return Response({"detail": "something is wrong in transaction"}, status=status.HTTP_400_BAD_REQUEST)
        except TypeError as e:
            return Response(e, status=status.HTTP_400_BAD_REQUEST)


