from django.shortcuts import render,redirect ,get_object_or_404
from django.http import HttpResponse
from django.template.response import TemplateResponse
from django.urls import reverse_lazy
from django.views.generic import TemplateView, ListView , DetailView , View, CreateView
from core.models import *
# from django.core.paginator import Paginator
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from django.core.exceptions import PermissionDenied
import json
from types import SimpleNamespace
import jwt
from django.conf import settings

class MainPageView(TemplateView):
    template_name = 'main-page.html'


class CourseListView(ListView):
    model = Course
    template_name = 'course_list.html'

class InternshipListView(ListView):
    model = Course
    template_name = 'internship_list.html'

class BTaskListView(ListView):
    model = Course
    template_name = 'b_task.html'

@method_decorator(csrf_exempt, name='dispatch')
class CourseDetailView(DetailView):
    model = Course
    context_object_name = "course"
    template_name = 'course_detail.html'

    def get_context_data(self, **kwargs):
        context =  super().get_context_data(**kwargs)
        if self.request.user.is_authenticated:
            rating = Rating.objects.filter(course=self.get_object(),author=self.request.user).first()
            if rating:
                context['rating'] = rating
        return context

    def post(self, request, *args, **kwargs):
        self.object = self.get_object()
        print(request.POST)
        response = request.POST['xmlmsg']
        dict_resp = xmltodict.parse(response)
        print(dict_resp['Message']['OrderStatus'])
        order_id = int(dict_resp['Message']['OrderDescription'])
        if dict_resp['Message']['OrderStatus'] == "APPROVED":
            Order.objects.filter(pk=order_id).update(successfuly_paid=True)
        elif dict_resp['Message']['OrderStatus'] == "DECLINED":
            print('declined')
            Order.objects.filter(pk=order_id).delete()
        elif dict_resp['Message']['OrderStatus'] == "CANCELED":
            print('canceled')
            Order.objects.filter(pk=order_id).delete()
        context = self.get_context_data(object=self.object)
        return self.render_to_response(context)

class ProfileView(TemplateView):
    model = Course
    template_name = 'profile.html'

@method_decorator(csrf_exempt, name='dispatch')
class QuestionView(DetailView):
    model = Question
    context_object_name = "question"
    template_name = 'question.html'

    def get(self, request, *args, **kwargs):
        token = request.COOKIES['token']
        decoded = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
        order = Order.objects.filter(user=decoded['user_id']).filter(course=self.get_object().subject.course.id)
        if order.first() == None:
            raise PermissionDenied
        elif order.first().successfuly_paid != True:
            raise PermissionDenied
        self.object = self.get_object()
        context = self.get_context_data(object=self.object)
        context['course'] = self.get_object().subject.course
        context['week_range'] = range(1,int(self.get_object().subject.course.course_deadline)+1)
        return self.render_to_response(context)
    
    # def dispatch(self, request, *args, **kwargs):
    #     print(request.headers.get('The-Token'), 'qwerty')
    #     # token = request.headers.get('The-Token')
    #     # print(type(token), 'murad')
    #     # token = bytes(token, 'utf-8')
    #     # decoded = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
    #     # print(decoded)
    #     headers = {'Content-Type': 'application/json', 'Authorization': f'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjMyNDgwNDQ1LCJqdGkiOiI3YWVlZDA2MjE2Y2M0YjE4OGM1ZDkzZmUxMWQ0NWE1NSIsInVzZXJfaWQiOjI4LCJ1c2VybmFtZSI6InJpYWxydXN0YW1vdiIsImVtYWlsIjoicmlhbEBnbWFpbC5jb20ifQ.MwuDC0SFuEY9r-P971aJ1JxjZUzxkbYpiuK4CgpgObc'}
    #     r = requests.post(
    #         f'http://127.0.0.1:8000/api/v1/user-data/',
    #         headers=headers,
    #     )
    #     resp = r.text
    #     response = json.loads(resp, object_hook=lambda d: SimpleNamespace(**d))
    #     print(response)
    #     order = Order.objects.filter(user=response.id).filter(course=self.get_object().subject.course.id)
    #     print(order.first().successfuly_paid)
    #     if order.first() == None:
    #         raise PermissionDenied
    #     elif order.first().successfuly_paid != True:
    #         raise PermissionDenied
        
    #     return super(QuestionView, self).dispatch(request, *args, **kwargs)


class CreateTaskView(TemplateView):
    model = Course
    template_name = 'create-task.html'


class RegisterView(TemplateView):
    template_name = 'register.html'

class RegChooseView(TemplateView):
    template_name = 'reg-choose.html'

class RegStudentView(TemplateView):
    template_name = 'reg-student.html'

class LoginView(TemplateView):
    template_name = 'login.html'


class CreateCourseView(TemplateView):
    template_name = 'create-course.html'


class CreateSubjectView(TemplateView):
    template_name = 'create-subject.html'


class CreateQuestionView(TemplateView):
    template_name = 'create-question.html'
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['answer_types'] = AnswerType.objects.all()
        return context


class CreateOptionView(TemplateView):
    template_name = 'create-option.html'


class StudentProfileView(TemplateView):
    template_name = 'student_profile.html'


class QuizView(TemplateView):
    template_name = 'quiz.html'


class FeedbackView(TemplateView):
    template_name = 'feedback.html'

class EditCourseView(DetailView):
    model = Course
    context_object_name = "course"
    template_name = 'edit-course.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        course = self.get_object()
        context['subject'] = Subject.objects.filter(course=course.id).first
        return context

    def get(self, request, *args, **kwargs):
        token = request.COOKIES['token']
        decoded = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
        print(decoded, "current user")
        self.object = self.get_object()
        print(self.object.teacher.id, 'teacher')
        if decoded['user_id'] != self.object.teacher.id:
            raise PermissionDenied
        context = self.get_context_data(object=self.object)
        return self.render_to_response(context)

class CourseQuestionView(DetailView):
    model = Course
    context_object_name = "question"
    template_name = 'course-questions.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        course = self.get_object()
        context['subject'] = Subject.objects.filter(course=course.id).first
        return context

class EditQuestionView(DetailView):
    model = Question
    context_object_name = "question"
    template_name = 'edit-question.html'

    def get(self, request, *args, **kwargs):
        token = request.COOKIES['token']
        decoded = jwt.decode(token, settings.SECRET_KEY, algorithms=['HS256'])
        print(decoded, "current user")
        self.object = self.get_object()
        print(self.object.subject.course.teacher.id, 'teacher')
        if decoded['user_id'] != self.object.subject.course.teacher.id:
            raise PermissionDenied
        context = self.get_context_data(object=self.object)
        return self.render_to_response(context)


class EditProfile(TemplateView):
    template_name = 'edit-profile.html'

class CongratsPageView(TemplateView):
    template_name = 'congrats.html'