from django.contrib import admin
from .models import *

admin.site.register([Result, Category, Question, Res_Cat_Associations, Type, Type_Cat_Associations])