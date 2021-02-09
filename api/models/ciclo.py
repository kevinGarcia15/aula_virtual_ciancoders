"""Modelo ciclo escolar, que contendra el anio del ciclo escolar"""
#django
from django.db import models
from django.core.validators import MinValueValidator


class Ciclo(models.Model):
    """Modelo Ciclo"""
    anio = models.PositiveIntegerField(
        validators=[
            MinValueValidator(1990)
        ]
    )

    activo = models.BooleanField(default=True)
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)

    def __unicode__(self):
        return self.anio

    def delete(self, *args):
        self.activo = False
        self.save()