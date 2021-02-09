"""Modelo Asignacion de cursos para un maestro"""
#django
from django.db import models

#models
from api.models.maestro import Maestro
from api.models.curso import Curso
from api.models.seccion import Seccion
from api.models.grado import Grado
from api.models.ciclo import Ciclo


class Asignacion(models.Model):
    """Modelo Asignacion"""
    maestro = models.ForeignKey(Maestro, related_name='asignacion_maestros', on_delete=models.CASCADE)
    curso = models.ForeignKey(Curso, related_name='asignacion_cursos', on_delete=models.CASCADE)
    seccion = models.ForeignKey(Seccion, related_name='asignacion_secciones', on_delete=models.CASCADE)
    grado = models.ForeignKey(Grado, related_name='asignacion_grados', on_delete=models.CASCADE)
    asignacion_ciclo = models.ForeignKey(Ciclo, related_name='asignacion_ciclos', on_delete=models.CASCADE)
    
    descripcion= models.CharField(max_length=250, blank=True, null=True)
    portada = models.ImageField(upload_to='Portada', null=True, blank=True)

    activo = models.BooleanField(default=True)
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)

    def __unicode__(self):
        return '@{} asignado al grado @{}, seccion @{}. El curso de @{}'.format(
            self.profesor.profile.user.first_name,
            self.grado.nivel,
            self.seccion.nombre,
            self.curso.nombre,
        )

    def delete(self, *args):
        self.activo = False
        self.save()