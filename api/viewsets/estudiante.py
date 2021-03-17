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
from datetime import datetime

#permission
from api.permission.admin import IsAdminUser

from api.models import Estudiante, Profile, User, Rol,Asignacion,Tarea
from api.serializers import EstudianteSerializer,EstudianteCrearSerializer,AsignacionSerializer,AsignacionTareaSerializer


class EstudianteViewset(viewsets.ModelViewSet):
    USUARIO = "Estudiante"

    queryset = Estudiante.objects.filter(activo=True, estudiante_profile__rol__nombre=USUARIO)
    serializer_class = EstudianteSerializer

    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("estudiante_profile__user__first_name",)
    search_fields = ("estudiante_profile__user__first_name",)
    ordering_fields = ("estudiante_profile__user__first_name",)

    def get_permissions(self):
        """" Define permisos para este recurso """
        permission_classes = [IsAuthenticated]
        if self.action in ['create', 'update']:
            permission_classes.append(IsAdminUser)
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


    def destroy(self, request, pk=None):
        estudiante = Estudiante.objects.get(pk=pk)
        estudiante.activo = False
        profile = Profile.objects.get(id=estudiante.estudiante_profile_id)
        profile.activo = False
        estudiante.save()
        profile.save()
        return Response({"success":"user was deleted success"}, status=status.HTTP_201_CREATED)

    @action(methods=["get"], detail=False)
    def cursos_estudiante(self, request):
        now = datetime.now()
        anio = now.strftime("%Y")
        user = request.user
        profile = Profile.objects.get(user=user)
        estudiante = Estudiante.objects.get(estudiante_profile=profile)

        cursos = Asignacion.objects.filter(estudiante_asignaciones=estudiante, asignacion_ciclo__anio=anio).order_by('grado__nombre','seccion__nombre')
        cursos_asignados = AsignacionSerializer(cursos, many=True)
        return Response({"estudiante":cursos_asignados.data}, status=status.HTTP_200_OK)

    @action(methods=["get"], detail=False)
    def tareas_entregar(self, request):
        now = datetime.now()
        fechaActual = now.strftime("%Y-%m-%d")
        anio = now.strftime("%Y")
        user = request.user
        profile = Profile.objects.get(user=user)
        estudiante = Estudiante.objects.get(estudiante_profile=profile)

        asignaciones = Asignacion.objects.filter(estudiante_asignaciones=estudiante, asignacion_ciclo__anio=anio)
        tareas_enregar = []
        for asignacion in asignaciones:
            tareas = Tarea.objects.filter(asignacion=asignacion, fecha_entrega__gt=now).order_by("fecha_entrega")
            for tarea in tareas:
                tareas_asignacion={}
                tareas_asignacion["id"]=tarea.id
                tareas_asignacion["curso"] = asignacion.curso.nombre
                tareas_asignacion["titulo"] = tarea.titulo
                tareas_asignacion["fecha_entrega"]=tarea.fecha_entrega
                tareas_asignacion["hora_entrega"]=tarea.hora_entrega
                tareas_enregar.append(tareas_asignacion)

        return Response({"tareas_entregar":tareas_enregar}, status=status.HTTP_200_OK)

