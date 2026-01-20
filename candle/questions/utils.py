# from random import choice
# from .models import Type_Cat_Associations, Question, Type

# from rest_framework.decorators import api_view, permission_classes
# from rest_framework.response import Response
# from rest_framework import status
# from rest_framework.permissions import IsAuthenticated

# @api_view(['GET'])
# @permission_classes([IsAuthenticated]) 
# def get_questions():
#     question_pks = []
#     def select_question(question_type):
#         association = Type_Cat_Associations.objects.filter(type=question_type).values_list('category', flat=True)
#         valid_questions = Question.objects.exclude(pk__in=question_pks).filter(category__in=association)

#         pks = valid_questions.values_list('pk', flat=True)
#         rand_pk = choice(pks)
#         question_pks.append(rand_pk)

#         return rand_pk

#     questions = []
#     for question_type in Type.objects.filter(used=True):
#         new_ques = Question.objects.filter(pk=select_question(question_type)).first()
#         questions.append(new_ques)

#     return questions

#     # question_forms = QuestionFormSet()

#     # for i, form in enumerate(question_forms):
#     #     form.label_suffix = "\n" + questions[i].text
#     #     form.initial = {
#     #         "question": questions[i]
#     #     }

# # return render(request, 'questions.html', {'question_forms': question_forms})

def shift_range(number, old_low, old_high, new_low, new_high):
    return (((number - old_low) * (new_high - new_low)) / (old_high - old_low)) + new_low