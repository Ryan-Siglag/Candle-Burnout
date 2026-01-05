from django.urls import path
from . import views

from users.views import CreateUserView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

app_name = 'users'

urlpatterns = [

    path('api/register', CreateUserView.as_view(), name='api-register'),
    path('api/token', TokenObtainPairView.as_view(), name='get-token'),
    path('api/token/refresh', TokenRefreshView.as_view(), name='refresh-token'),

    path('register/', views.register, name='register'),
    path('login/', views.login, name='login'),
    path('logout/', views.logout, name='logout'),
]