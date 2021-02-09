"""Modelo evento"""
#django
from django.db import models

#models
from api.models.ciclo import Ciclo

class Evento(models.Model):
    """Modelo Evento"""
    ciclo_escolar = models.ForeignKey(Ciclo, related_name='ciclos', on_delete=models.CASCADE)

    titulo = models.CharField(max_length=100)
    descripcion= models.CharField(max_length=250, blank=True, null=True)
    fecha = models.DateField(auto_now=False, auto_now_add=False)    
    hora = models.TimeField(auto_now=False, auto_now_add=False)
    
    activo = models.BooleanField(default=True)
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)

    def __unicode__(self):
        return self.titulo

    def delete(self, *args):
        self.activo = False
        self.save()