from django.urls import path
from .views import RegisterUserAPI, ShowUsersAPI, MyObtainTokenPairView, UserDetailAPIView, LogoutAPIView, GetUserDataByTokenView
from rest_framework_simplejwt.views import TokenRefreshView

app_name = 'register_api'

urlpatterns = [
    path('register/', RegisterUserAPI.as_view(), name='register'),
    path('show-users/', ShowUsersAPI.as_view(), name='user-list'),
    path('edit-user/<int:id>/', UserDetailAPIView.as_view(), name='user-profile'),
    path('login/', MyObtainTokenPairView.as_view(), name='token_obtain_pair'),
    path('user-data/', GetUserDataByTokenView.as_view(), name='user-data'),
    path('login/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('logout/', LogoutAPIView.as_view(), name='logout'),
    
]