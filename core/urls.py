from django.urls import path
from core.views import *
from django.contrib.auth.views import LogoutView

app_name = 'core'

urlpatterns = [
    path('',MainPageView.as_view(),name ='main'),
    path('course-list',CourseListView.as_view(),name = 'course-list'),
    path('internship-list',InternshipListView.as_view(),name = 'internship-list'),
    path('business-task-list',BTaskListView.as_view(),name = 'btask-list'),
    path('course/<int:pk>/',CourseDetailView.as_view(),name = 'course-detail'),
    path('profile',ProfileView.as_view(),name = 'profile'),
    path('student-profile',StudentProfileView.as_view(),name = 'student-profile'),
    path('quiz',QuizView.as_view(),name = 'quiz'),
    path('create-task',CreateTaskView.as_view(),name = 'create-task'),
    path('question/<int:pk>/',QuestionView.as_view(),name = 'question'),
    path('register',RegisterView.as_view(),name = 'register'),
    path('register-type',RegChooseView.as_view(),name = 'register-type'),
    path('register-student',RegStudentView.as_view(),name = 'register-student'),
    path('login',LoginView.as_view(),name = 'login'),
    path('create-course',CreateCourseView.as_view(),name = 'create-course'),
    path('create-subject',CreateSubjectView.as_view(),name = 'create-subject'),
    path('create-question',CreateQuestionView.as_view(),name = 'create-question'),
    path('create-option',CreateOptionView.as_view(),name = 'create-option'),
    path('feedback',FeedbackView.as_view(),name = 'feedback'),
    path('edit-course/<int:pk>',EditCourseView.as_view(),name = 'edit-course'),
    path('edit-question/<int:pk>',EditQuestionView.as_view(),name = 'edit-question'),
    path('course-questions/<int:pk>',CourseQuestionView.as_view(),name = 'course-questions'),
    path('edit-profile',EditProfile.as_view(),name = 'edit-profile'),
    path('congrats',CongratsPageView.as_view(),name = 'congrats'),
    path('log-out', LogoutView.as_view(), name='log-out')
]