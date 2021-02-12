from rest_framework import serializers
from api.models import User
from api.models import Profile


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'


class UserSerializer(serializers.ModelSerializer):

    profile = ProfileSerializer(required=False)

    class Meta:
        model = User
        fields = (
            'username',
            'first_name',
            'last_name',
            'password',
            'email',
            'profile',
        )


class UserReadSerializer(serializers.ModelSerializer):
    profile = ProfileSerializer(required=False)

    class Meta:
        model = User
        fields = (
            'username',
            'first_name',
            'last_name',
            'is_superuser',
            'is_staff',
            'email',
            'profile',
        )

class ProfileAndUserSerializer(serializers.ModelSerializer):
    user = UserReadSerializer(read_only=True)
    rol = serializers.StringRelatedField()
    class Meta:
        model = Profile
        fields = ('phone', 'address', 'is_first_login','rol','user', 'avatar')    


class ProfileCreateSerializer(serializers.ModelSerializer):
    """verifica los datos al crear un perfil"""
    class Meta:
        model = Profile
        fields = ('phone', 'address','avatar')

class CreateProfileSerializer(serializers.ModelSerializer):
    """verifica los datos al crear un usuario"""

    profile = ProfileCreateSerializer(required=True)

    class Meta:
        model = User
        fields = (
            'username',
            'first_name',
            'last_name',
            'password',
            'email',
            'profile',
        )      

class TokenProfileSerializer(serializers.ModelSerializer):
    """retorna los datos del perfil para usarlo en la autenticacion"""
    rol = serializers.StringRelatedField()
    class Meta:
        model = Profile
        fields = ('is_first_login','rol', 'avatar') 