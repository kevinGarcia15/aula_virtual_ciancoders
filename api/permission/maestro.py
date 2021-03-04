"""Membership permission classes"""

#django Rest Framework
from rest_framework.permissions import BasePermission

#models
from api.models import Profile, User

class IsMaestroUser(BasePermission):
    """permite a los usuaios Maestros y solo a los Maestros
        Realizar acciones propios de su rol
    """
    def has_permission(self, request, view):
        """verifica que tenga el rol de Maestro para realizar acciones"""
        try:
            Profile.objects.get(
                user=request.user,
                rol__nombre="Maestro"
            )
        except Profile.DoesNotExist:
            return False
        return True