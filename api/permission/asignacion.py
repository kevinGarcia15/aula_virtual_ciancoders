"""Asignacion permission classes"""

#django Rest Framework
from rest_framework.permissions import BasePermission

#models
from api.models import Profile, User, Estudiante, Asignacion, Maestro

class IsAsignacionOwner(BasePermission):
    """Verifica que los usuarios tengan permiso de 
        de ver solo sus asignaciones
    """
    def has_object_permission(self, request, view, obj):
        """Permite visualizar las asignaciones si esta asignado a una"""
        try:
            user = request.user
            perfil = Profile.objects.get(user=user)
            if perfil.rol.nombre == "Maestro":
                maestro = Maestro.objects.get(maestro_profile=perfil)
                if obj.maestro.id == maestro.pk:
                    return True
                else:
                    return False
            else:
                estudiante = Estudiante.objects.get(estudiante_profile=perfil)
                obj.estudiante_asignaciones.get(id=estudiante.id)
                return True
        except:
            return False
