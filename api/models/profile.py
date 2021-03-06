"""profile model"""
#django
from django.db import models

#models
from api.models.users import User
from api.models.rol import Rol

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profiles")
    rol = models.ForeignKey(Rol, related_name='roles', on_delete=models.CASCADE)
  
    phone = models.CharField(max_length=15, null=True, blank=True)

    address = models.CharField(max_length=250, null=True, blank=True)
    avatar = models.ImageField(upload_to='Avatar', null=True, blank=True)
    is_first_login = models.BooleanField(
    "first_login",
    default=True,
    help_text='Verifica si es la primera vez que se logueo en la aplicaion'
)

    activo = models.BooleanField(default=True)
    creado = models.DateTimeField(auto_now_add=True)
    modificado = models.DateTimeField(auto_now=True)

    def __unicode__(self):
        return self.user.email

    def __str__(self):
            return self.user.email

    def delete(self, *args):
        self.activo = False
        self.save()
        return True
