from django.contrib import admin
from .models import *
# Register your models here.

admin.site.register([Course,Question,Option,Subject,UserAnswer,Order,Category, AnswerType, Promocode])

@admin.register(Rating)
class RatingAdmin(admin.ModelAdmin):
    list_display = ('author','course','rating')
    search_fields = ('author__username','course__title')
    list_filter = ('rating',)

@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ('author','content','created_at')
    search_fields = ('author__username','question__title')