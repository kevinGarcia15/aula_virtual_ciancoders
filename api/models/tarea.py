"""Modelo Tarea"""
#django
from django.db import models

#models
from api.models.asignacion import Asignacion

class Tarea(models.Model):
    """Modelo Tarea"""
    asignacion = models.ForeignKey(Asignacion, related_name='asignaciones', on_delete=models.CASCADE)

    titulo = models.CharField(max_length=100)
    descripcion= models.CharField(max_length=250, blank=True, null=True)
    fecha_entrega = models.DateField(auto_now=False, auto_now_add=False)    
    hora_entrega = models.TimeField(auto_now=False, auto_now_add=False)
    nota = models.FloatField(default=0)
    archivo = models.FileField(upload_to='tarea_maestros')
    permitir_archivo = models.BooleanField(default=True)

    activo = models.BooleanField(default=True)
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)

    def __unicode__(self):
        return self.titulo

    def delete(self, *args):
        self.activo = False
        self.save()