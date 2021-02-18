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

from api.models import Maestro, Profile, User, Rol, Profesion, Asignacion, Tarea, Tarea_Estudinate
from api.serializers import MaestroSerializer ,CrearMaestroSerializer, AsignacionSerializer


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
        return Response({"success":"user was deleted success"}, status=status.HTTP_200_OK)

    @action(methods=["get"], detail=False)
    def cursos_maestro(self, request):
        anio = "2021"
        user = request.user
        profile = Profile.objects.get(user=user)
        maestro = Maestro.objects.get(maestro_profile=profile)
        cursos = Asignacion.objects.filter(maestro=maestro, asignacion_ciclo__anio=anio)
        cursos_asignados = AsignacionSerializer(cursos, many=True)
        return Response({"maestro":cursos_asignados.data}, status=status.HTTP_200_OK)


    @action(methods=["get"], detail=False)
    def total_tareas(self, request):
        #import pdb; pdb.set_trace()
        anio="2021"
        user = request.user
        profile = Profile.objects.get(user=user)
        maestro = Maestro.objects.get(maestro_profile=profile)
        asignacion_maestro = Asignacion.objects.filter(maestro=maestro, asignacion_ciclo__anio=anio)
        #codigo para mostrar las tareas totales que el maestro tiene pendientes tanto
        #por curso como el total
        tareas_sin_calificar = 0
        tareas_por_curso = {}
        for asignacion in asignacion_maestro: 
            tarea = Tarea.objects.filter(asignacion=asignacion)
            for item in tarea:
                tarea_estudiante = Tarea_Estudinate.objects.filter(tarea=item, punteo=0)
                count_items = tarea_estudiante.count()
                count_flag = 0
                for item2 in tarea_estudiante:
                    tareas_sin_calificar+=1
                    count_flag +=1
                    if count_items == count_flag:
                        tareas_por_curso[asignacion.curso.nombre] = count_flag
        
        print(tareas_por_curso)
        data = {
            "tareasSinCalificar":tareas_sin_calificar,
            "tareasPorCurso":[tareas_por_curso]
        }
        #cursos_asignados = AsignacionSerializer(cursos, many=True)
        return Response(data, status=status.HTTP_200_OK)
