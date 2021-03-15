"""Membership permission classes"""

#django Rest Framework
from rest_framework.permissions import BasePermission

#models
from api.models import Profile, User, Estudiante, Asignacion

class IsAsignacionOwner(BasePermission):
    """Verifica que los usuarios estudiantes tengan permiso de 
        de ver solo sus asignaciones
    """
    def has_object_permission(self, request, view, obj):
        """Verify requesting user is the ride creator."""
        try:
            user = request.user
            perfil = Profile.objects.get(user=user)
            estudiante = Estudiante.objects.get(estudiante_profile=perfil)
            obj.estudiante_asignaciones.get(id=estudiante.id)
        except:
            return False
        return True
