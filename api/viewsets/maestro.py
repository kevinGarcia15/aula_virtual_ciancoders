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

#permission
from api.permission.admin import IsAdminUser

from api.models import Maestro, Profile, User, Rol, Profesion
from api.serializers import MaestroSerializer ,CrearMaestroSerializer


class MaestroViewset(viewsets.ModelViewSet):
    USUARIO = "Maestro"

    queryset = Maestro.objects.filter(activo=True, maestro_profile__rol__nombre=USUARIO)
    #import pdb; pdb.set_trace()
    serializer_class = MaestroSerializer

    def get_permissions(self):
        """" Define permisos para este recurso """
        permission_classes = [IsAuthenticated]
        if self.action in ['create', 'list']:
            permission_classes.append(IsAdminUser)
        return [permission() for permission in permission_classes]

    def create(self, request):
        try:
            with transaction.atomic():
                data = request.data
                serializerMaestro = CrearMaestroSerializer(data=data)
                if serializerMaestro.is_valid(raise_exception=True):
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
                    maestro_profile = Profile.objects.create(
                        phone = data.get('user').get('profile').get('phone'),
                        address = data.get('user').get('profile').get('address'),
                        rol = rol,
                        user = user
                    )
                   #import pdb; pdb.set_trace()
                    profesion = Profesion.objects.get(pk=data.get('profesion'))
                    maestro = Maestro.objects.create(
                        maestro_profile=maestro_profile,
                        profesion=profesion
                    )        
                    return Response({"success":"data is success"}, status=status.HTTP_201_CREATED)
                else:
                    return Response({"detail": "something is wrong in transaction"}, status=status.HTTP_400_BAD_REQUEST)

        except TypeError as e:
            return Response(e, status=status.HTTP_400_BAD_REQUEST)
    
    def destroy(self, request, pk=None):
        maestro = Maestro.objects.get(pk=pk)
        maestro.activo=False
        profile = Profile.objects.get(id=maestro.maestro_profile_id)
        profile.activo = False
        maestro.save()
        profile.save()
        return Response({"success":"user was deleted success"}, status=status.HTTP_201_CREATED)