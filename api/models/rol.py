"""Modelo Rol"""
#django
from django.db import models

class Rol(models.Model):
    """Modelo Rol"""
    nombre = models.CharField(max_length=100)
    descripcion= models.CharField(max_length=250, blank=True, null=True)

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
        return True
