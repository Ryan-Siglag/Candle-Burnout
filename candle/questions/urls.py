from django.urls import path
from . import views

app_name = 'questions'

urlpatterns = [
    # path('hello-world', views.hello_world, name='hello-world'),
    path('inputs', views.inputs, name='inputs'),
]