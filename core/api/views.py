# from typing import final
from django.db.models import query
import requests
from rest_framework import response
from rest_framework.generics import CreateAPIView, ListAPIView, ListCreateAPIView
from core.models import Course, Rating, Subject, Question , Option, Order, UserAnswer, AnswerType, Promocode, Comment
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from .serializers import (
    CourseSerializer,
    RatingSerializer, 
    SubjectSerializer, 
    QuestionSerializer, 
    OptionSerializer, 
    OrderSerializer,
    UserAnswerSerializer,
    CreateCourseSerializer,
    PromocodeSerializer,
    AnswerTypeSerializer,
    CommentSerializer,
    CommentCreateSerializer
)

from rest_framework import serializers, status,permissions
from rest_framework.exceptions import PermissionDenied
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
import os
import xmltodict

BASE_URL = 'https://e-commerce.kapitalbank.az'
PORT='5443'

def postPay(data):
      headers = {'Content-Type': 'application/xml'} 
      r = requests.post(
            f'{BASE_URL}:{PORT}/Exec',
            data=data,
            verify=False,
            headers=headers,
            cert=(CERT_FILE, KEY_FILE)
        )
      print(r.text)
      return r.text

CERT_FILE = os.getenv("KAPITAL_CERT_FILE", "./testmerchant.crt")
KEY_FILE = os.getenv("KAPITAL_KEY_FILE", "./merchant_name.key")

class AnswerTypeDetailAPIView(APIView):
    def get(self, request, *args, **kwargs):
        answer_type = get_object_or_404(AnswerType, pk=kwargs['id'])
        serializer = AnswerTypeSerializer(answer_type)
        return Response(serializer.data)

class CourseAPIView(CreateAPIView):
    model = Course
    serializer_class = CreateCourseSerializer

class PromocodeCreateAPIView(CreateAPIView):
    model = Promocode
    serializer_class = PromocodeSerializer

class GetPromocodeDiscountAPIViev(APIView):
    def post(self, request, *args, **kwargs):
        course_id = self.request.data.get('course')
        code = self.request.data.get('code')
        promocode = Promocode.objects.filter(code=code)
        # course = Course.objects.filter(pk=course_id)[0]
        # discount = course.price * promocode.discount_percent/100
        # new_price = course.price - discount
        print(promocode)
        # course.updat
        
        if len(promocode) == 0:
            response = False
        else:
            response = True
            final_promo = Promocode.objects.filter(code=code)[0]


        if response == True:
            return Response({
            'code_id': final_promo.id,
            'code': code,
            'message': "Promocode activated!"
            })
        else:
            return Response({
            'message': "Promocode is invalid!"
            })
            

class CourseListAPIView(ListAPIView):
    serializer_class = CourseSerializer

    def get_queryset(self):
        title = self.request.data.get('title')
        queryset = Course.objects.order_by('-id')
        print(title)

        if title:
            queryset = queryset.filter(title__icontains=title)

        return queryset

    def post(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)
    
class CourseDetailAPIView(APIView):
    def get(self, request, *args, **kwargs):
        course = get_object_or_404(Course, pk=kwargs['id'])
        serializer = CourseSerializer(course)
        return Response(serializer.data)

    def patch(self, request, *args, **kwargs):
        course = get_object_or_404(Course, pk=kwargs['id'])
        serializer = CourseSerializer(course, data=request.data, partial=True)
        if serializer.is_valid():
            course = serializer.save()
            return Response(CourseSerializer(course).data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, *args, **kwargs):
        course = get_object_or_404(Course, pk=kwargs['id'])
        course.delete()
        return Response("Course deleted", status=status.HTTP_204_NO_CONTENT)

class CreateSubjectAPIView(CreateAPIView):
    model = Subject
    serializer_class = SubjectSerializer

class SubjectListAPIView(ListAPIView):
    serializer_class = SubjectSerializer

    def get_queryset(self):
        queryset = Subject.objects.order_by('id')
        return queryset

class SubjectDetailAPIView(APIView):
    def get(self, request, *args, **kwargs):
        subject = get_object_or_404(Subject, pk=kwargs['id'])
        serializer = SubjectSerializer(subject)
        return Response(serializer.data)

    def patch(self, request, *args, **kwargs):
        subject = get_object_or_404(Subject, pk=kwargs['id'])
        serializer = SubjectSerializer(subject, data=request.data, partial=True)
        if serializer.is_valid():
            subject = serializer.save()
            return Response(SubjectSerializer(subject).data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, *args, **kwargs):
        subject = get_object_or_404(Subject, pk=kwargs['id'])
        subject.delete()
        return Response("Subject deleted", status=status.HTTP_204_NO_CONTENT)


class QuestionCreateAPIView(CreateAPIView):
    model = Question
    serializer_class = QuestionSerializer


class QuestionListAPIView(ListAPIView):
    serializer_class = QuestionSerializer
    def get_queryset(self):
        queryset = Question.objects.order_by('id')
        return queryset


class QuestionDetailAPIView(APIView):

    def get(self, request, *args, **kwargs):
        question = get_object_or_404(Question, pk=kwargs['id'])
        serializer = QuestionSerializer(question)
        return Response(serializer.data)

    def patch(self, request, *args, **kwargs):
        question = get_object_or_404(Question, pk=kwargs['id'])
        serializer = QuestionSerializer(question, data=request.data, partial=True)
        if serializer.is_valid():
            question = serializer.save()
            return Response(QuestionSerializer(question).data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, *args, **kwargs):
        question = get_object_or_404(Question, pk=kwargs['id'])
        question.delete()
        return Response("Question deleted", status=status.HTTP_204_NO_CONTENT)


class OptionCreateAPIView(CreateAPIView):
    model = Option
    serializer_class = OptionSerializer


class OptionListAPIView(ListAPIView):
    serializer_class = OptionSerializer
    def get_queryset(self):
        queryset = Option.objects.order_by('id')
        return queryset


class OptionDetailAPIView(APIView):

    def get(self, request, *args, **kwargs):
        option = get_object_or_404(Option, pk=kwargs['id'])
        serializer = OptionSerializer(option)
        return Response(serializer.data)

    def patch(self, request, *args, **kwargs):
        option = get_object_or_404(Option, pk=kwargs['id'])
        serializer = OptionSerializer(option, data=request.data, partial=True)
        if serializer.is_valid():
            option = serializer.save()
            return Response(OptionSerializer(option).data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, *args, **kwargs):
        option = get_object_or_404(Option, pk=kwargs['id'])
        option.delete()
        return Response("Option deleted", status=status.HTTP_204_NO_CONTENT)


class OrderCreateAPIView(CreateAPIView):
    model = Order
    serializer_class = OrderSerializer


    def perform_create(self, serializer):
        obj = serializer.save()
        return obj.id

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        # print(serializer, 'SERIALIZER')
        serializer.is_valid(raise_exception=True)
        id = self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        # self.object = self.get_object()
        print( Order.objects.filter(pk=id), 'this is id')
        xxx = Order.objects.filter(pk=id)[0]
        print(xxx.promocode)
        course = Course.objects.get(pk=int(request.data['course']))
        price = course.price
        if xxx.promocode != None:
            discount = price * xxx.promocode.discount_percent/100
            price = price - discount
        # Order.objects.filter(pk=id).update(successfuly_paid=1)
        # order = get_object_or_404(Course, pk=request.data['user'])
        
        # 3136323935333336313333323230303030303030
        # 3136323935333431303935373030303030303030
        if price == 0:
            print('This is free!')
            free_resp = {
                'status': 'free',
                'id': id
            }
            return Response(free_resp, status=status.HTTP_201_CREATED, headers=headers)
        else:
            data = f"""<?xml version="1.0" encoding="UTF-8"?>
            <TKKPG>
                <Request>
                        <Operation>CreateOrder</Operation>
                        <Language>RU</Language>
                        <Order>
                                <OrderType>Purchase</OrderType>
                                <Merchant>E1180053</Merchant>
                                <Amount>{price*100}</Amount>
                                <Currency>944</Currency>
                                <Description>{id}</Description>
                                <ApproveURL>https://taskool.com/course/{course.id}/</ApproveURL>
                                <CancelURL>https://taskool.com/course/{course.id}/</CancelURL>
                                <DeclineURL>https://taskool.com/course/{course.id}/</DeclineURL>
                        </Order>
                </Request>
            </TKKPG>"""
        response = postPay(data)
        dict_resp = xmltodict.parse(response)
        url_resp = dict_resp['TKKPG']['Response']['Order']['URL']
        order_id = dict_resp['TKKPG']['Response']['Order']['OrderID']
        session_id = dict_resp['TKKPG']['Response']['Order']['SessionID']
        # print(order_id, 'burdayam braat')
        final_resp = {
            'url': url_resp,
            'order_id': order_id,
            'session_id': session_id
        }
        return Response(final_resp, status=status.HTTP_201_CREATED, headers=headers)
        

    # def post(self, request, *args, **kwargs):
    #     order = self.create(request, *args, **kwargs)
    #     # print(order, "hey")
    #     # serializer = OrderSerializer(order)
    #     return Response("hey",order)
        

class OrderListAPIView(ListAPIView):
    serializer_class = OrderSerializer
    def get_queryset(self):
        queryset = Order.objects.order_by('id')
        return queryset

class OrderDetailAPIView(APIView):

    def get(self, request, *args, **kwargs):
        order = get_object_or_404(Order, pk=kwargs['id'])
        serializer = OrderSerializer(order)
        return Response(serializer.data)

    def patch(self, request, *args, **kwargs):
        order = get_object_or_404(Order, pk=kwargs['id'])
        serializer = OrderSerializer(order, data=request.data, partial=True)
        if serializer.is_valid():
            order = serializer.save()
            return Response(OrderSerializer(order).data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, *args, **kwargs):
        order = get_object_or_404(Order, pk=kwargs['id'])
        order.delete()
        return Response("Order deleted", status=status.HTTP_204_NO_CONTENT)


class UserAnswerCreateAPIView(CreateAPIView):
    model = UserAnswer
    serializer_class = UserAnswerSerializer


class UserAnswerListAPIView(ListAPIView):
    serializer_class = UserAnswerSerializer
    def get_queryset(self):
        queryset = UserAnswer.objects.order_by('id')
        return queryset

class UserAnswerDetailAPIView(APIView):
    def get(self, request, *args, **kwargs):
        user_answer = get_object_or_404(UserAnswer, pk=kwargs['id'])
        serializer = UserAnswerSerializer(user_answer)
        return Response(serializer.data)
    def patch(self, request, *args, **kwargs):
        user_answer = get_object_or_404(UserAnswer, pk=kwargs['id'])
        serializer = UserAnswerSerializer(user_answer, data=request.data, partial=True)
        if serializer.is_valid():
            user_answer = serializer.save()
            return Response(UserAnswerSerializer(user_answer).data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    def delete(self, request, *args, **kwargs):
        user_answer = get_object_or_404(UserAnswer, pk=kwargs['id'])
        user_answer.delete()
        return Response("User Answer deleted", status=status.HTTP_204_NO_CONTENT)
    
class RatingListCreateAPIView(ListCreateAPIView):
    serializer_class = RatingSerializer
    permission_classes = (permissions.IsAuthenticated, )
    queryset = Rating.objects.all()

    def perform_create(self, serializer):
        course = serializer.validated_data['course']
        if not Order.objects.filter(course=course,user=self.request.user,successfuly_paid=True).exists():
            raise PermissionDenied(detail='You must be bought this course')
        rat = Rating.objects.filter(course=course, author=self.request.user).first()
        if not rat:
            serializer.validated_data['author'] = self.request.user
            serializer.save()
        else:
            rat.rating = serializer.validated_data['rating']
            rat.save()

# class WeeksListAPIView(ListCreateAPIView):
#     serializer_class = CourseSerializer
#     def get_queryset(self, request):
#         sub_id = request.data['subject']
#         print(sub_id)
#         queryset = Course.objects.all()
#         return queryset
    # def post(self, request, *args, **kwargs):
    #     subject = Subject.objects.get(sub_id)
    #     # print(subject)
    #     return Response(status=status.HTTP_400_BAD_REQUEST)


class WeeksListAPIView(ListAPIView):
    serializer_class = CourseSerializer

    def get_queryset(self):
        sub = self.request.data.get('subject')
        queryset = Course.objects.filter(subject=sub)
        print(sub)

        # if title:
        #     queryset = queryset.filter(title__icontains=title)

        return queryset

    def post(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)
        
class CommentAPIView(ListCreateAPIView):
    model = Comment
    permission_classes = (IsAuthenticatedOrReadOnly,)
    queryset = Comment.objects.all()
    
    def get_queryset(self):
        queryset = Comment.objects.filter(question = self.kwargs['id'])
        return queryset
    
    def get_serializer_class(self):
        
        if self.request.method == 'POST':
            return CommentCreateSerializer
        elif self.request.method == 'GET':
            return CommentSerializer