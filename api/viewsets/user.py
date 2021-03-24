import json
import jwt

from django.conf import settings
from django.core.files import File
from django.utils import timezone
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import status, filters, viewsets
from rest_framework.authtoken.models import Token
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.settings import api_settings
from django.db import transaction
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string

#utilities
from datetime import timedelta

from api.models import User, Profile, Rol
from api.serializers import UserSerializer, UserReadSerializer, TokenProfileSerializer


class UserViewset(viewsets.ModelViewSet):
    queryset = User.objects.filter(is_active=True)

    filter_backends = (DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter)
    filter_fields = ("username", "first_name")
    search_fields = ("username", "first_name")
    ordering_fields = ("username", "first_name")

    def get_serializer_class(self):
        """Define serializer for API"""
        if self.action == 'list' or self.action == 'retrieve':
            return UserReadSerializer
        else:
            return UserSerializer

    def get_permissions(self):
        """" Define permisos para este recurso """
        if (
            self.action == "create" 
            or self.action == "token" 
            or self.action == "update_password" 
            or self.action == "emailverify" 
            or self.action == "verificar_token_reset_pass"
            or self.action == "reset_password"):
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        usuario = User.objects.get(username=request.data["username"])
        usuario.set_password(request.data["password"])
        usuario.save()
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)

    def perform_create(self, serializer):
        serializer.save()

    def get_success_headers(self, data):
        try:
            return {'Location': str(data[api_settings.URL_FIELD_NAME])}
        except (TypeError, KeyError):
            return {}

    @action(methods=["put"], detail=False)
    def update_password(self, request):
        try:
            with transaction.atomic():
                usuario = request.user
                if usuario.check_password(request.data["currentPassword"]):
                    if not request.data["currentPassword"] == request.data["password"]:
                        usuario.set_password(request.data["password"])
                        usuario.save()
                        profile = Profile.objects.get(user=usuario)
                        profile.is_first_login = False
                        profile.save()
                        return Response({"password": "change success"}, status=status.HTTP_200_OK)
                    else:
                        return Response({"password": "La nueva Contraseña es igual a la anterior"}, status=status.HTTP_400_BAD_REQUEST)                
                return Response({"password": "La contrasenia actual es incorrecta"}, status=status.HTTP_400_BAD_REQUEST)                
        except:
            return Response({"password": "the password is not changed"}, status=status.HTTP_400_BAD_REQUEST)

    @action(methods=["post"], detail=False)
    def emailverify(self, request):
        """Verifica si el email que ingreso existe en la BD,
        si existe, envia un email al correo para reestablecer la contrasenia
        """
        data =  request.data
        try:
            profile = Profile.objects.get(user__email=data.get("correo"))
            if profile.activo is False:
                return Response({"info": "Usuario inactivo"}, status=status.HTTP_400_BAD_REQUEST)

            if User.objects.get(email = data.get("correo")):
                #generacion de token
                exp_date =  timezone.now() + timedelta(minutes=15)
                payload = {
                    "email": data.get("correo"),
                    "exp": int(exp_date.timestamp()),
                    "type":"reset_password"
                }
                token =  jwt.encode(payload, settings.SECRET_KEY, algorithm='HS256')
                #correo de prueba gkevin@gmail.com
                subject, from_email, to = 'Recupera Contrasenia', 'team@aulavirtual.com', 'gkevin@gmail.com'
  
                content = render_to_string(
                    'emails/users/reset_password.html',
                    {'token': token, 'host':'http://0.0.0.0:8080/#', 'email':data.get("correo") }
                )
                msg = EmailMultiAlternatives(subject, content, from_email, [to])
                msg.attach_alternative(content, "text/html")
                msg.send()

                return Response({"info": "Se le ha enviado un correo electronco, siga las instrucciones para recuperar su contrasenia"}, status=status.HTTP_200_OK)
        except:
            return Response({"info": "Usuario no encontrado"}, status=status.HTTP_400_BAD_REQUEST)
 

    @action(methods=["post"], detail=False)
    def verificar_token_reset_pass(self, request):
        """Verifica si el token es valido y no ha caducado"""
        try:
            token = request.data.get("token")
            secret_key = settings.SECRET_KEY
            jwt.decode(token, secret_key, algorithms=["HS256"])
            return Response({"info": "Token valido"}, status=status.HTTP_200_OK)
        except:
            return Response({"info": "Token caducado o no valido"}, status=status.HTTP_400_BAD_REQUEST)


    @action(methods=["put"], detail=False)
    def reset_password(self, request):
        """Resetea el password"""
        try:
            data = request.data
            token = data.get("token")
            secret_key = settings.SECRET_KEY
            decode = jwt.decode(token, secret_key, algorithms=["HS256"])
            usuario = User.objects.get(email=decode.get("email"))
            with transaction.atomic():
                usuario.set_password(data.get("password"))
                usuario.save()
                return Response({"password": "change success"}, status=status.HTTP_200_OK)
        except:
            return Response({"password": "the password is not changed"}, status=status.HTTP_400_BAD_REQUEST)


    @action(methods=["put"], detail=False)
    def update_me(self, request, *args, **kwargs):
        data = request.data
        try:
            avatar = data.get("avatar")
            data = json.loads(data["data"])
            user = request.user
            user.first_name = data.get("user").get("first_name")
            user.last_name = data.get("user").get("last_name")
            perfil, created = Profile.objects.get_or_create(user=user)
            if avatar is not None:
                perfil.avatar.delete()
                perfil.avatar = File(avatar)
            profile = data.get("profile")
            if profile is not None:
                perfil.phone = profile.get("phone", perfil.phone)
                perfil.address = profile.get("address", perfil.address)
            user.save()
            perfil.save()
            serializer = UserReadSerializer(user)
            return Response(serializer.data, status=status.HTTP_200_OK)
        except KeyError as e:
            return Response({"detail": "{} is a required field".format(str(e))}, status=status.HTTP_400_BAD_REQUEST)

    @action(methods=["get"], detail=False)
    def me(self, request, *args, **kwargs):
        user = request.user
        profile = Profile.objects.get(user=user)
        profileSerializer = TokenProfileSerializer(profile)
        serializer = UserReadSerializer(user)
        return Response({"user":serializer.data, "profile":profileSerializer.data}, status=status.HTTP_200_OK)

    @action(methods=["post"], detail=False)
    def token(self, request, *args, **kwargs):
        data = request.data
        try:
            user = User.objects.get(email=data["username"])
            profile = Profile.objects.get(user=user)
            if profile.activo == False:
                return Response({"detail": "El usuario esta inactivo"}, status=status.HTTP_400_BAD_REQUEST)
            if user.check_password(data["password"]):
                token, created = Token.objects.get_or_create(user=user)
                try:
                    profile = Profile.objects.get(user=user)
                    profileSerializer = TokenProfileSerializer(profile)
                    serializer = UserReadSerializer(user)
                    return Response({"user": serializer.data, "token": token.key, "profile":profileSerializer.data}, status=status.HTTP_200_OK)
                except: 
                    profile = "Admin"
                    serializer = UserReadSerializer(user)
                    return Response({"user": serializer.data, "token": token.key, "rol":profile}, status=status.HTTP_200_OK)
            return Response({"detail": "Contrasenia incorrecta"}, status=status.HTTP_400_BAD_REQUEST)
        except User.DoesNotExist:
            return Response({"detail": "Usuario no encontrado"}, status=status.HTTP_404_NOT_FOUND)
        except KeyError as e:
            return Response({"detail": "{} es un campo obligatorio".format(str(e))}, status=status.HTTP_400_BAD_REQUEST)

    @action(methods=["post"], detail=False)
    def logout(self, request, *args, **kwargs):
        try:
            token = Token.objects.get(user=request.user)
            token.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Token.DoesNotExist:
            return Response({"detail": "session not found"}, status=status.HTTP_404_NOT_FOUND)
