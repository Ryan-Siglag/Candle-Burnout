from django.shortcuts import render, redirect
from django.http import HttpResponse
from random import choice
from .models import *
from .forms import *
from django.forms import formset_factory
from django.contrib.auth.decorators import login_required
from datetime import datetime
from candle.utils import entry_this_week
from .utils import shift_range

from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from .serializers import QuestionSerializer, QuestionEntrySerializer
from rest_framework.permissions import IsAuthenticated

@api_view(['GET'])
@permission_classes([IsAuthenticated]) 
def get_questions(request):
    """
    GET endpoint to retrieve all questions
    """
    print("**********GET RQEUQSTRs")
    print(request.user)
    if entry_this_week(request.user):
        return Response(
            # {
            #     'redirect': '/already-submitted',  # or any route you want
            #     # 'message': 'You have already submitted a response this week'
            # },
            status=status.HTTP_403_FORBIDDEN
        )
    print(request.user)
    questions = Question.objects.all() #TODO: Restrict


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

    # return questions


    # print(get_questions(request))
    serializer = QuestionSerializer(questions, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def submit_question_entries(request):
    """
    POST endpoint to submit multiple question entries
    Expected format: {
        "entries": [
            {"question": 1, "answer": 3, "user": {...}},
            {"question": 2, "answer": "Another answer"}
        ]
    }
    """
    entries_data = request.data.get('entries', [])
    
    if not entries_data:
        return Response(
            {"error": "No entries provided"}, 
            status=status.HTTP_400_BAD_REQUEST
        )
    
    created_entries = []
    errors = []

    print(request.user.id)
    new_entry = Entry(user=request.user, date=datetime.now())
    new_entry.save()

    result_scores = { # 0-Numerator 1-Denomenator 2-Calculated
        "Reduced accomplishment": [0, 0, 0],
        "Emotional exhaustion": [0, 0, 0],
        "Cynicism": [0, 0, 0],
    }

    def update_scores(score, category):
        associations = Res_Cat_Associations.objects.filter(category=category.pk)

        for association in associations:
            name = association.result.name
            result_scores[name][0] += score*association.correlation
            result_scores[name][1] += abs(association.correlation)
            result_scores[name][2] = result_scores[name][0] / result_scores[name][1]

        print(result_scores)

    for entry_data in entries_data:
        print(entry_data)
        serializer = QuestionEntrySerializer(data=entry_data)
        if serializer.is_valid():
            question_entry = serializer.save(entry=new_entry)
            question = Question.objects.filter(pk=question_entry.question.pk).first()
            category = Category.objects.filter(pk=question.category.pk).first()

            raw_score = question_entry.score
            score = shift_range(raw_score, 0, 5, -1, 1)
            # score = (((raw_score) * 2) / (5)) - 1 #Converts 0-5 range to -1-1 range
            print(score)
            update_scores(score, category)

            created_entries.append(serializer.data)
        else:
            errors.append({
                "data": entry_data,
                "errors": serializer.errors
            })
            
    new_entry.reduced_accomplishment_score = shift_range(result_scores['Reduced accomplishment'][2], -1, 1, 0, 100)
    new_entry.cynicism_score = shift_range(result_scores['Cynicism'][2], -1, 1, 0, 100)
    new_entry.exhaustion_score = shift_range(result_scores['Emotional exhaustion'][2], -1, 1, 0, 100)

    new_entry.total_score = shift_range((result_scores['Reduced accomplishment'][2]+result_scores['Cynicism'][2]+result_scores['Emotional exhaustion'][2]) / 3, -1, 1, 0, 100)

    new_entry.save()

    if errors:
        return Response(
            {
                "created": created_entries,
                "errors": errors
            },
            status=status.HTTP_207_MULTI_STATUS
        )
    return Response(
        {"created": created_entries},
        status=status.HTTP_201_CREATED
    )


#Non React:

# def hello_world(request):
#     return render(request, 'hello_world.html')

@login_required(login_url="/users/login")
def inputs(request):

    recent_entry = entry_this_week(request.user)

    #Prevents multiple entries in one week
    # if recent_entry:
    #     return redirect('/display/recent')

    QuestionFormSet = formset_factory(SingleQuestionForm, extra=Type.objects.filter(used=True).count())

    if request.method == 'POST':
        question_forms = QuestionFormSet(request.POST)

        if question_forms.is_valid():
            new_entry = Entry(user=request.user, date=datetime.now())
            new_entry.save()
            
            # ** Must match names to results in db (which shouldn't change) **
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