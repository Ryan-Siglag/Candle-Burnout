from django.db import models
from django.conf import settings

class Result(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name
    
class Category(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class Question(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    text = models.TextField()

    def __str__(self):
        return self.text

class Res_Cat_Associations(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    result = models.ForeignKey(Result, on_delete=models.CASCADE)
    correlation = models.FloatField()

    def __str__(self):
        return self.category.name + " & " + self.result.name
    

class Type(models.Model):
    type = models.CharField(max_length=255)
    used = models.BooleanField(default=True)

    def __str__(self):
        return self.type


class Type_Cat_Associations(models.Model):
    type = models.ForeignKey(Type, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    def __str__(self):
        return self.type.type + " & " + self.category.name

class Entry(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    date = models.DateTimeField()

    cynicism_score =  models.FloatField(null=True)
    exhaustion_score = models.FloatField(null=True)
    reduced_accomplishment_score = models.FloatField(null=True)
    total_score = models.FloatField(null=True)

class QuestionEntry(models.Model):
    entry = models.ForeignKey(Entry, on_delete=models.CASCADE)
    question = models.ForeignKey(Question, on_delete=models.CASCADE)

    #Corresponding responses and raw scores
    class Agreement(models.IntegerChoices):
        STRONGLY_DISAGREE = 0
        DISAGREE = 1
        SLIGHTLY_DISAGREE = 2
        SLIGHTLY_AGREE = 3
        AGREE = 4
        STRONGLY_AGREE = 5

    score = models.IntegerField(choices=Agreement)