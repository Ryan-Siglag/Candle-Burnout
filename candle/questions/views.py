from django.shortcuts import render, redirect
from django.http import HttpResponse
from random import choice
from .models import *
from .forms import *
from django.forms import formset_factory

def hello_world(request):
    return render(request, 'hello_world.html')

def inputs(request):

    if request.method == 'POST':
        print(request.POST)

    question_pks = []

    def select_question(question_type):
        association = Type_Cat_Associations.objects.filter(type=question_type).values_list('category', flat=True)
        valid_questions = Question.objects.exclude(pk__in=question_pks).filter(category__in=association)

        pks = valid_questions.values_list('pk', flat=True)
        rand_pk = choice(pks)
        question_pks.append(rand_pk)

        return rand_pk

    questions = []
    for question_type in Type.objects.filter(used=True):
        new_ques = Question.objects.get(pk=select_question(question_type))
        questions.append(new_ques)

    QuestionFormSet = formset_factory(SingleQuestionForm, extra=len(questions))
    question_forms = QuestionFormSet()

    for i, form in enumerate(question_forms):
        form.label_suffix = "\n" + questions[i].text
        form.initial = {
            "question": questions[i].pk
        }

    return render(request, 'questions.html', {'question_forms': question_forms})