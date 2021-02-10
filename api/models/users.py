"""Users model"""

#django
from django.db import models
from django.contrib.auth.models import AbstractUser

class User(AbstractUser):
    """
    Extends from Django's Abstract User, Change the username 
    field for loggin to email for loggin in the app
     and add some extra fields
    """
    
    email = models.EmailField(
        "email addres", 
        max_length=254, 
        unique = True,
        error_messages={
            'unique':'El email que ingreso ya existe'
        })


    USERNAME_FIELD = 'email' #indica que email sera nuestro filed para loggin
    REQUIRED_FIELDS = ['first_name', 'last_name','username']#Campos requeridos u obligatorios

    def __str__(self):
        """
        Return Username
        """
        return self.email

    
    def __get_short_name(self):
        """
        Return Username
        """
        return self.username