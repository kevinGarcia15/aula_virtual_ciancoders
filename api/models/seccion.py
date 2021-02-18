"""Modelo Seccion ejemplo A, B, C"""
#django
from django.db import models

class Seccion(models.Model):
    """Modelo Seccion"""
    nombre = models.CharField(max_length=100)

    activo = models.BooleanField(default=True)
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)

    def __unicode__(self):
        return self.nombre

    def __str__(self):
        return self.nombre

    def delete(self, *args):
        self.activo = False
        self.save()