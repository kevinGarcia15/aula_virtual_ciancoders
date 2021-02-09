"""Modelo Tarea_Estudinate"""
#django
from django.db import models

#models
from api.models.estudiante import Estudiante
from api.models.tarea import Tarea

class Tarea_Estudinate(models.Model):
    """Modelo Tarea_Estudinate"""
    estudiante = models.ForeignKey(Estudiante, related_name='estudiantes', on_delete=models.CASCADE)
    tarea = models.ForeignKey(Tarea, related_name='tareas', on_delete=models.CASCADE)

    texto = models.CharField(max_length=250, blank=True, null=True)
    archivo = models.FileField(upload_to='tarea_alumnos')
    punteo = models.FloatField(default=0)
    fecha_entregado = models.DateTimeField(auto_now=True)     

    activo = models.BooleanField(default=True)
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)

    def __unicode__(self):
        return 'Alumno: @{}. Tarea: @{}'.format(
            self.estudiante.profile.user.first_name,
            self.tarea.titulo
        )

    def delete(self, *args):
        self.activo = False
        self.save()