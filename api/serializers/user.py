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
            'profile',
            'password',
            'email'
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
        fields = ('phone', 'address', 'is_first_login','rol','user')