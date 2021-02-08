from django.db import models

class Empresa(models.Model):
    nombre = models.CharField(max_length=15, null=True, blank=True)
    lugar = models.CharField(max_length=15, null=True, blank=True)

    activo = models.BooleanField(default=True)
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)

    def delete(self, *args):
        self.activo = False
        self.save()
        return True
