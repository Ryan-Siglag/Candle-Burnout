from django.urls import path
from . import views

app_name = 'questions'

urlpatterns = [
    # path('hello-world', views.hello_world, name='hello-world'),
    path('input', views.submit_question_entries, name='input'),
    path('get', views.get_questions, name="get")
]