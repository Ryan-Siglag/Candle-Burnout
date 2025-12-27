from django.db import models

# Create your models here.

class Category(models.Model):
    name = models.CharField(max_length=255)

class Question(models.Model):
    category = models.ForeignKey(Category, on_delete=models.CASCADE)
    text = models.TextField()
