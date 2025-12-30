from django.shortcuts import render, redirect
from django.http import HttpResponse
from random import choice
from .models import *
from .forms import *
from django.forms import formset_factory
from django.contrib.auth.decorators import login_required
from datetime import datetime

# def hello_world(request):
#     return render(request, 'hello_world.html')

@login_required(login_url="/users/login")
def inputs(request):

    QuestionFormSet = formset_factory(SingleQuestionForm, extra=Type.objects.filter(used=True).count())

    if request.method == 'POST':
        question_forms = QuestionFormSet(request.POST)

        if question_forms.is_valid():
            new_entry = Entry(user=request.user, date=datetime.now())
            new_entry.save()
            
            #Must matchc names to results in db (which shouldn't change)
            result_scores = { # 0-Numerator 1-Denomenator 2-Calculated
                "Reduced accomplishment": [0, 0, 0],
                "Emotional exhaustion": [0, 0, 0],
                "Cynicism": [0, 0, 0],
            }
            
            #Dynamic option:
            # result_scores = {}
            # results = Result.objects.all()
            # for res in results:
            #     print(res)
            #     result_scores[res.name] = [0,0,0]
            # print (result_scores)

            def update_scores(score, category):
                associations = Res_Cat_Associations.objects.filter(category=category.pk)

                for association in associations:
                    name = association.result.name
                    result_scores[name][0] += score*association.correlation
                    result_scores[name][1] += abs(association.correlation)
                    result_scores[name][2] = result_scores[name][0] / result_scores[name][1]

                print(result_scores)

            for form in question_forms:
                ques_entry = form.save(commit=False)
                ques_entry.user = request.user
                ques_entry.entry = new_entry
                ques_entry.save()

                question = Question.objects.filter(pk=ques_entry.question.pk).first()
                category = Category.objects.filter(pk=question.category.pk).first()

                raw_score = ques_entry.score
                score = (((raw_score) * 2) / (5)) - 1 #Converts 0-5 range to -1-1 range
                print(score)
                update_scores(score, category)

            new_entry.reduced_accomplishment_score = result_scores['Reduced accomplishment'][2]
            new_entry.cynicism_score = result_scores['Cynicism'][2]
            new_entry.exhaustion_score = result_scores['Emotional exhaustion'][2]

            new_entry.total_score = (result_scores['Reduced accomplishment'][2]+result_scores['Cynicism'][2]+result_scores['Emotional exhaustion'][2]) / 3

            new_entry.save()

            return redirect('/display/recent')

        else:
            for form in question_forms:
                form.label_suffix = "\n" + form.cleaned_data['question'].text

    else: 
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
            new_ques = Question.objects.filter(pk=select_question(question_type)).first()
            questions.append(new_ques)

        question_forms = QuestionFormSet()

        for i, form in enumerate(question_forms):
            form.label_suffix = "\n" + questions[i].text
            form.initial = {
                "question": questions[i]
            }

    return render(request, 'questions.html', {'question_forms': question_forms})