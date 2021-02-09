"""profile model"""
#django
from django.db import models
from django.core.validators import RegexValidator

#models
from api.models.users import User


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profiles")

    phone_regex =  RegexValidator(
        regex = r'\+?1?d{8,15}$',
        message="El numero de telefono tiene que tener el siguiete formato +50277668444"
    ) 
    phone = models.CharField(validators=[phone_regex], max_length=15, null=True, blank=True)

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

    def delete(self, *args):
        self.activo = False
        self.save()
        return True
