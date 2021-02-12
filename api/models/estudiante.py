"""Modelo estudinate que tiene relacion con profile model """
#django
from django.db import models

#models
from api.models.profile import Profile
from api.models.asignacion import Asignacion


class Estudiante(models.Model):
    """Modelo estudiante"""
    estudiante_profile = models.OneToOneField(Profile, on_delete=models.CASCADE, related_name="profiles")
    asignacion_estudiante =  models.ManyToManyField(Asignacion, related_name="estudiante_asignaciones")

    telefono_contacto = models.CharField(max_length=15, null=True, blank=True)
    direccion_contacto = models.CharField(max_length=250, null=True, blank=True)

    activo = models.BooleanField(default=True)
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)

    def __unicode__(self):
        return self.estudiante_profile.user.email

    def delete(self, *args):
        self.activo = False
        self.save()
        return True
