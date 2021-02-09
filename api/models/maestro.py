"""Modelo catedratico que tiene relacion con profile model """
#django
from django.db import models

#models
from api.models.profile import Profile
from api.models.profesion import Profesion


class Maestro(models.Model):
    """Modelo Maestro"""
    maestro_profile = models.OneToOneField(Profile, on_delete=models.CASCADE, related_name="maestros_profiles")
    profesion = models.ForeignKey(Profesion, related_name="profesiones", on_delete=models.CASCADE)

    activo = models.BooleanField(default=True)
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)

    def __unicode__(self):
        return self.maestro_profile.user.email

    def delete(self, *args):
        self.activo = False
        self.save()
        return True
