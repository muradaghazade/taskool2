from rest_framework.fields import ReadOnlyField
from accounts.models import User
from rest_framework import serializers
from rest_framework.response import Response
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from django.contrib.auth.password_validation import validate_password

class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password2 = serializers.CharField(write_only=True, required=True)
    # token = serializers.SerializerMethodField(read_only = True)
    
    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'email', 'password', 'password2','is_student', 'is_teacher' ,'age', 'number','occupation')

    def validate(self, attrs):
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})

        return attrs

    def create(self, validated_data):
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            is_student=validated_data['is_student'],
            is_teacher=validated_data['is_teacher'],
            age = validated_data['age'],
            number = validated_data['number'],
            occupation = validated_data['occupation']
        )

        
        user.set_password(validated_data['password'])
        user.save()
        return user
        
    # @classmethod
    # def get_token(cls, user):
    #     token = super(cls).get_token(user)

    #     # Add custom claims
    #     print(user.username)
    #     token['first_name'] = user.first_name
    #     token['last_name']= user.last_name
    #     return token


class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ('id', 'username', 'first_name', 'last_name', 'email', 'is_teacher', 'is_student','age', 'number','occupation')


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):

    @classmethod
    def get_token(cls, user):
        token = super(MyTokenObtainPairSerializer, cls).get_token(user)

        # Add custom claims
        print(user.username)
        token['username'] = user.username
        token['email'] = user.email
        print(token['username'])
        print("qwe")
        return token