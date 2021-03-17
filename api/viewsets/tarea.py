import json

from django.core.files import File
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status, filters, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.settings import api_settings
from datetime import datetime
from django.db.models import Sum

#permisos
from api.permission.maestro import IsMaestroUser

#models
from api.models import Tarea

#serializer
from api.serializers import TareaSerializer, TareaReadSerializer

class TareaViewset(viewsets.ModelViewSet):
    """Viewset de tareas"""
    now = datetime.now()
    anio = now.strftime("%Y")
    queryset = Tarea.objects.filter(activo=True, asignacion__asignacion_ciclo__anio = anio)

    def get_serializer_class(self):
        """Define el serializador a utilizar"""
        if self.action == "list" or self.action == "retrieve":
            return TareaReadSerializer
        else:
            return TareaSerializer

    def get_permissions(self):
        """" Define permisos para este recurso """
        permission_classes = [IsAuthenticated]
        if self.action not in ['asignacion', 'retrieve']:
            permission_classes.append(IsMaestroUser)
        return [permission() for permission in permission_classes]

    def create(self, request):
        try:
            data = request.data
            archivo = data.get("archivo")
            data = json.loads(data["data"])
            serializer =  TareaSerializer(data=data)
            #import pdb; pdb.set_trace()
            if serializer.is_valid(raise_exception=True):
                #verifica que el punteo total de nota no exceda de 100pts
                max_nota = 100
                suma_nota = Tarea.objects.filter(
                    asignacion_id=data.get("asignacion"), 
                    asignacion__asignacion_ciclo__anio=self.anio).aggregate(Sum('nota')
                    )
                suma_total = suma_nota.get('nota__sum')
                if not suma_total:
                    suma_total=0

                if (suma_total + float(data.get("nota"))) > max_nota:
                    return Response(
                        {"detail":"Se ha excedido el valor de la nota total de este curso"}, 
                        status=status.HTTP_400_BAD_REQUEST
                    )

                if not data.get("permitir_archivo"):
                    permitir_archivo = False
                else:
                    permitir_archivo = True

                Tarea.objects.create(
                titulo=data.get("titulo"),
                descripcion=data.get("descripcion"),
                fecha_entrega=data.get("fecha_entrega"),
                hora_entrega=data.get("hora_entrega"),
                nota=data.get("nota"),
                permitir_archivo=permitir_archivo,
                archivo=File(archivo),
                asignacion_id=data.get("asignacion")
            )
            return Response('todo anda bien', status=status.HTTP_201_CREATED)
        except TypeError as e:
            return Response(e, status=status.HTTP_400_BAD_REQUEST)

    def update(self, request, pk):
        try:
            data =  request.data
            archivo = data.get("archivo")
            data = json.loads(data["data"])
            #import pdb; pdb.set_trace()

            serializer =  TareaSerializer(data=data)
            if serializer.is_valid(raise_exception=True):
                if not data.get("permitir_archivo"):
                    permitir_archivo = False
                else:
                    permitir_archivo = True

                verificacion = self.verificarNota(
                    data.get("asignacion"), 
                    data.get("nota")
                )
                if verificacion == False:
                    tarea =  Tarea.objects.get(pk=pk)

                    if archivo is not None: 
                        if tarea.archivo is not None:
                            tarea.archivo.delete()
                            tarea.archivo=File(archivo)

                    tarea.titulo=data.get("titulo")
                    tarea.descripcion=data.get("descripcion")
                    tarea.fecha_entrega=data.get("fecha_entrega")
                    tarea.hora_entrega=data.get("hora_entrega")
                    tarea.nota=data.get("nota")
                    tarea.permitir_archivo=permitir_archivo
                    tarea.save()
                    return Response('todo anda bien', status=status.HTTP_201_CREATED)
                else:                
                    return Response('Se ha superado el limite total de la nota del curso', status=status.HTTP_400_BAD_REQUEST)

        except TypeError as e:
            return Response(e, status=status.HTTP_400_BAD_REQUEST)

    def verificarNota(self, asignacion, notaForm):
        """Verifica que la suma de las notas del curso no supere los 100 puntos"""
        max_nota = 100
        suma_nota = Tarea.objects.filter(
            asignacion_id=asignacion, 
            asignacion__asignacion_ciclo__anio=self.anio).aggregate(Sum('nota')
            )
        suma_total = suma_nota.get('nota__sum')
        if not suma_total:
            suma_total=0

        if (suma_total + float(notaForm)) > max_nota:
            return True
        else:
            return False

    def destroy(self, request, pk):
        tarea = Tarea.objects.get(pk=pk)
        tarea.archivo.delete()
        tarea.delete()
        return Response({"success":"user was deleted success"}, status=status.HTTP_200_OK)


    @action(methods=['get'], detail=False)
    def asignacion(self, request):
        asignacion_id = request.query_params.get("id")
        rol = request.query_params.get("rol")
        if rol == "Maestro":
            tareas = Tarea.objects.filter(
                activo=True,
                asignacion_id=asignacion_id
            ).order_by("-fecha_entrega")
        else:
            today = datetime.now()
            tareas = Tarea.objects.filter(
                activo=True,
                fecha_entrega__gte=today,
                asignacion_id=asignacion_id
            ).order_by("fecha_entrega")

        serializer = TareaReadSerializer(tareas, many=True)
        return Response(
            {"tareas" : serializer.data,}, 
            status=status.HTTP_200_OK
        )
