"""Membership permission classes"""

#django Rest Framework
from rest_framework.permissions import BasePermission

#models
from api.models import Profile, User

class IsAdminUser(BasePermission):
    """permite a los usuaios administradores y slolo a los administradores
        permisos para manipular otros usuarios.
    """
    def has_permission(self, request, view):
        """verifica que tenga el rol de Admin para realizar acciones"""
        try:
            Profile.objects.get(
                user=request.user,
                rol__nombre="Admin"
            )
        except Profile.DoesNotExist:
            return False
        return True