"""Viewset del modelo material de aprendizaje"""
import json

from rest_framework import viewsets, status, filters
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.settings import api_settings
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from datetime import datetime
from django.core.files import File
from django_filters.rest_framework import DjangoFilterBackend

#modelo
from api.models import Material

#permisos
from api.permission.maestro import IsMaestroUser

#Serializers
from api.serializers import MaterialSerializer, MaterialReadSerializer


class MaterialViewset(viewsets.ModelViewSet):
    now = datetime.now()
    anio = now.strftime("%Y")
    queryset = Material.objects.filter(activo=True, asignacion__asignacion_ciclo__anio=anio)

    def get_serializer_class(self):
        """Usa el serializer segun la acciona realizar"""
        if self.action == "list" or self.action == "retrieve":
            return MaterialReadSerializer
        else:
            return MaterialSerializer
            
    def get_permissions(self):
        """" Define permisos para este recurso """
        permission_classes = [IsAuthenticated]
        if self.action not in ['asignacion', 'retrieve']:
            permission_classes.append(IsMaestroUser)
        return [permission() for permission in permission_classes]


    @action(methods=['get'], detail=False)
    def asignacion(self, request):
        asignacion_id = request.query_params.get("id")
        material = Material.objects.filter(activo=True, asignacion_id=asignacion_id)
        serializer = MaterialReadSerializer(material, many=True)
        return Response(
            {"material" : serializer.data,}, 
            status=status.HTTP_200_OK
        )

    def create(self, request):
            try:
                data = request.data
                archivo = data.get("archivo")
                data = json.loads(data["data"])
                serializer =  MaterialSerializer(data=data)
                #import pdb; pdb.set_trace()
                if serializer.is_valid(raise_exception=True):
                    Material.objects.create(
                    titulo=data.get("titulo"),
                    descripcion=data.get("descripcion"),
                    archivo=File(archivo),
                    asignacion_id=data.get("asignacion")
                )
                return Response('Registro creado exitosamente', status=status.HTTP_201_CREATED)
            except TypeError as e:
                return Response(e, status=status.HTTP_400_BAD_REQUEST)


    def update(self, request, pk):
        try:
            data =  request.data
            archivo = data.get("archivo")
            data = json.loads(data["data"])
            #import pdb; pdb.set_trace()

            serializer =  MaterialSerializer(data=data)
            if serializer.is_valid(raise_exception=True):
                material =  Material.objects.get(pk=pk)
                if archivo is not None: 
                    if material.archivo is not None:
                        material.archivo.delete()
                        material.archivo=File(archivo)

                material.titulo=data.get("titulo")
                material.descripcion=data.get("descripcion")
                material.save()
                return Response('Datos actualizados exitosamente', status=status.HTTP_201_CREATED)
   
        except TypeError as e:
            return Response(e, status=status.HTTP_400_BAD_REQUEST)

    def destroy(self, request, pk):
        material = Material.objects.get(pk=pk)
        material.archivo.delete()
        material.delete()
        return Response({"success":"user was deleted success"}, status=status.HTTP_200_OK)
