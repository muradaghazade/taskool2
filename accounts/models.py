from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField(('email adress'), unique=True, null=True)
    password2 = models.CharField(('password2'), max_length=200)
    age = models.IntegerField('Age',blank=True,null=True)
    occupation = models.CharField(max_length=150)
    number = models.CharField(('phone number'), max_length=30, null=True)
    is_teacher = models.BooleanField('is Teacher',default=0)
    is_student = models.BooleanField('is Student',default=1)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'User'
        verbose_name_plural = 'Users'

