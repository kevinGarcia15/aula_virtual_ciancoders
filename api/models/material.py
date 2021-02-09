"""Modelo Material de apoyo para los estudiantes"""
#django
from django.db import models

#models
from api.models.asignacion import Asignacion

class Material(models.Model):
    """Modelo Material"""
    asignacion = models.ForeignKey(Asignacion, related_name='material_asignaciones', on_delete=models.CASCADE)

    titulo = models.CharField(max_length=100)
    descripcion= models.CharField(max_length=250, blank=True, null=True)
    archivo = models.FileField(upload_to='material_apoyo')

    activo = models.BooleanField(default=True)
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)

    def __unicode__(self):
        return self.titulo

    def delete(self, *args):
        self.activo = False
        self.save()