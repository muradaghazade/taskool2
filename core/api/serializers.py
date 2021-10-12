from django.db import models
from core.models import Course, Option, Rating, Subject, Question, Order,UserAnswer, AnswerType, Promocode, Comment
from accounts.api.serializers import UserSerializer
from rest_framework import serializers
from drf_extra_fields.fields import Base64ImageField, Base64FileField

class PDFBase64FileField(Base64FileField):
    ALLOWED_TYPES = ['mp4']

    def get_file_extension(self, filename, decoded_file):
        return 'mp4'

class PromocodeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Promocode
        fields = ('id', 'code', 'discount_percent')

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ('id', 'title', 'teacher', 'price', 'image', 'description', 'course_deadline', 'minimum_age', 'is_shared', 'category', 'video', 'youtube_video_url','get_avg_rating')


    def create(self, validated_data):
        course = Course.objects.create(
            title=validated_data['title'],
            teacher=validated_data['teacher'],
            price=validated_data['price'],
            image=validated_data['image'],
            description=validated_data['description'],
            course_deadline=validated_data['course_deadline'],
            minimum_age=validated_data['minimum_age'],
            is_shared=validated_data['is_shared'],
            category=validated_data['category'],
            video=validated_data['video'],
            youtube_video_url=validated_data['youtube_video_url']
        )

        course.save()

        return course

class CreateCourseSerializer(serializers.ModelSerializer):
    image = Base64ImageField(required=False)
    video = PDFBase64FileField(required=False, )

    class Meta:
        model = Course
        fields = ('id', 'title', 'teacher', 'price', 'image', 'description', 'course_deadline', 'minimum_age', 'is_shared', 'category', 'video', 'youtube_video_url')


class SubjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subject
        fields = ('id', 'title', 'deadline', 'course')


    # def create(self, validated_data):
    #     subject = Subject.objects.create(
    #         title=validated_data['title'],
    #         deadline=validated_data['deadline'],
    #         course=validated_data['course']
    #     )

    #     subject.save()

    #     return subject


class QuestionSerializer(serializers.ModelSerializer):

    image = Base64ImageField(required=False)
    # video = PDFBase64FileField(required=False, )

    class Meta:
        model = Question
        fields = ('id', 'title', 'description', 'image', 'correct_answer','video','is_auto','is_success','subject', 'answer_type','week' )

    # def create(self, validated_data):
    #     question = Question.objects.create(
    #         title=validated_data['title'],
    #         description=validated_data['description'],
    #         correct_answer=validated_data['correct_answer'],
    #         # question_type=validated_data['question_type'],
    #         is_auto=validated_data['is_auto'],
    #         is_success=validated_data['is_success'],
    #         subject=validated_data['subject']
    #     )
    #     question.save()
    #     return question


class OptionSerializer(serializers.ModelSerializer):

    class Meta:
        model = Option
        fields = ('id', 'content', 'question')

    def create(self, validated_data):
        option = Option.objects.create(
            content=validated_data['content'],
            question=validated_data['question']
        )
        option.save()
        return option


class OrderSerializer(serializers.ModelSerializer):

    class Meta:
        model = Order
        fields = ('id', 'user', 'course', 'successfuly_paid', 'promocode')


class UserAnswerSerializer(serializers.ModelSerializer):
    image = Base64ImageField(required=False)
    video = PDFBase64FileField(required=False)

    class Meta:
        model = UserAnswer
        fields = ('id', 'user', 'feedback', 'question', 'answer', 'video', 'image')

class AnswerTypeSerializer(serializers.ModelSerializer):

    class Meta:
        model = AnswerType
        fields = ('id', 'title')
    # def create(self, validated_data):
    #     useranswer = UserAnswer.objects.create(
    #         user=validated_data['user'],
    #         feedback=validated_data['feedback'],
    #         question=validated_data['question']
    #     )
    #     useranswer.save()
    #     return useranswer

class RatingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Rating
        fields = ('author','course','rating')
        read_only_fields = ('author',)

class CommentSerializer(serializers.ModelSerializer):
    author = UserSerializer()
    class Meta:
        model = Comment
        fields = ('author','question','content','created_at')
        
class CommentCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = ('author','question','content','created_at')