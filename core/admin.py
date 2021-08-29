from django.contrib import admin
from .models import *
# Register your models here.

admin.site.register([Course,Question,Option,Subject,UserAnswer,Order,Category, AnswerType])