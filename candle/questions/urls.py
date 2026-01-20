from django.urls import path
from . import views

app_name = 'questions'

urlpatterns = [
    path('input', views.submit_question_entries, name='input'),
    path('get', views.get_questions, name="get")
]