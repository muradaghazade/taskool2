from rest_framework.generics import ListAPIView, CreateAPIView, ListCreateAPIView, RetrieveUpdateDestroyAPIView, UpdateAPIView
from rest_framework.views import APIView
from rest_framework.viewsets import ModelViewSet
from rest_framework.response import Response
from accounts.models import User
from .serializers import UserRegisterSerializer, MyTokenObtainPairSerializer, UserSerializer
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework import authentication, permissions
from django.shortcuts import get_object_or_404
from rest_framework import status
from django.http import JsonResponse

class RegisterUserAPI(CreateAPIView):
    model = User
    serializer_class = UserRegisterSerializer

class ShowUsersAPI(ListAPIView):
    model = User
    serializer_class = UserRegisterSerializer
    queryset = User.objects.all()

class MyObtainTokenPairView(TokenObtainPairView):
    permission_classes = (AllowAny,)
    serializer_class = MyTokenObtainPairSerializer

class UserDetailAPIView(APIView):
    def get(self, request, *args, **kwargs):
        user = get_object_or_404(User, pk=kwargs['id'])
        serializer = UserSerializer(user)
        return Response(serializer.data)

    def patch(self, request, *args, **kwargs):
        user = get_object_or_404(User, pk=kwargs['id'])
        serializer = UserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            user = serializer.save()
            return Response(UserSerializer(user).data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, *args, **kwargs):
        user = get_object_or_404(User, pk=kwargs['id'])
        user.delete()
        return Response("User deleted", status=status.HTTP_204_NO_CONTENT)

class LogoutAPIView(APIView):
    
    def post(self, request):
        try:
            refresh_token = request.data["token"]
            token = RefreshToken(refresh_token)
            token.blacklist()

            return Response("Token deleted", status=status.HTTP_205_RESET_CONTENT)
        except Exception as e:
            return Response(status=status.HTTP_400_BAD_REQUEST)

class GetUserDataByTokenView(APIView):
    permission_classes = (permissions.IsAuthenticated, )
    def post(self, request, *args, **kwargs):
        user = request.user
        serializer = UserSerializer(user)
        return JsonResponse(serializer.data)