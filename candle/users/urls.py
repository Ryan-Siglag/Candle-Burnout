from django.urls import path
from . import views

from users.views import CreateUserView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


app_name = 'users'

urlpatterns = [
    path('', CreateUserView.as_view(), name='api-register'),

    path('register', CreateUserView.as_view(), name='api-register'),
    path("token", TokenObtainPairView.as_view(), name="get_token"),
    path('token/refresh', TokenRefreshView.as_view(), name='refresh-token'),

    # path('old/register', views.register, name='register'),
    # path('old/login', views.login, name='login'),
    # path('old/logout', views.logout, name='logout'),
]