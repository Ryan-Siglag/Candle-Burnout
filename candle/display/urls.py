from django.urls import path
from . import views

app_name = 'display'

urlpatterns = [
    path('recent', views.recent, name='recent'),
    path('all', views.all, name='all'),
]