import json

from django.core.files import File
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
        if self.action == "create" or self.action == "token" or self.action == "update_password" or self.action == "emailverify":
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
        #import pdb; pdb.set_trace()
        try:
            with transaction.atomic():
                usuario = request.user
                if usuario.check_password(request.data["currentPassword"]):
                    usuario.set_password(request.data["password"])
                    usuario.save()
                    #import pdb; pdb.set_trace()
                    profile = Profile.objects.get(user=usuario)
                    profile.is_first_login = False
                    profile.save()
                    return Response({"password": "change success"}, status=status.HTTP_200_OK)
                return Response({"password": "La contrasenia actual es incorrecta"}, status=status.HTTP_400_BAD_REQUEST)                
        except:
            return Response({"password": "the password is not changed"}, status=status.HTTP_400_BAD_REQUEST)

    @action(methods=["post"], detail=False)
    def emailverify(self, request):
        data =  request.data
        try:
            if User.objects.get(email = data.get("correo")):
                subject, from_email, to = 'Recupera Contrasenia', 'team@aulavirtual.com', 'gkevin@gmail.com'
                content = render_to_string(
                    'emails/users/reset_password.html',
                    {'token': '456897sadsa', 'host':'http://0.0.0.0:8080/#', 'email':data.get("correo") }
                )
                msg = EmailMultiAlternatives(subject, content, from_email, [to])
                msg.attach_alternative(content, "text/html")
                msg.send()

                return Response({"info": "Se le ha enviado un correo electronco, siga las instrucciones para recuperar su contrasenia"}, status=status.HTTP_200_OK)
        except:
            return Response({"info": "Usuario no encontrado"}, status=status.HTTP_400_BAD_REQUEST)


    @action(methods=["put"], detail=False)
    def update_me(self, request, *args, **kwargs):
        data = request.data
        #import pdb; pdb.set_trace()
        try:
            avatar = data.get("avatar")
            data = json.loads(data["data"])
            user = request.user
            user.first_name = data.get("user").get("first_name")
            user.last_name = data.get("user").get("last_name")
            perfil, created = Profile.objects.get_or_create(user=user)
            if avatar is not None:
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
