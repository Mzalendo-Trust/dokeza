from django.contrib.auth import get_user_model
from django.contrib.contenttypes.models import ContentType
from django.db.models import Q
from django.contrib.auth import get_user_model
from rest_framework import serializers

from rest_framework.serializers import (
    CharField,
    EmailField,
    ModelSerializer,
    HyperlinkedIdentityField,
    SerializerMethodField,
    ValidationError
)

User = get_user_model()


user_detail_url = HyperlinkedIdentityField(
    view_name='users-api:detail',
    lookup_field='username',
)


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["username", "email", "url"]

        extra_kwargs = {
            "url": {"view_name": "api:user-detail", "lookup_field": "username"}
        }


class UserCreateSerializer(ModelSerializer):
    email2 = EmailField(label='Confirm Email')

    class Meta:
        model = User
        fields = [
            'username',
            'first_name',
            'last_name',
            'email',
            'email2',
            'password',
        ]
        extra_kwargs = {'password': {'write_only': True}}

    def validate_email2(self, value):
        data = self.get_initial()
        email1 = data.get('email')
        email2 = value
        if email1 != email2:
            raise ValidationError('Emails must match.')
        return value

    def create(self, validated_data):
        username = validated_data['username']
        first_name = validated_data['first_name']
        last_name = validated_data['last_name']
        email = validated_data['email']
        password = validated_data['password']
        user_obj = User(
            username=username,
            first_name=first_name,
            last_name=last_name,
            email=email
        )
        user_obj.set_password(password)
        user_obj.save()
        return validated_data


class UserLoginSerializer(ModelSerializer):
    token = CharField(allow_blank=True, read_only=True)
    username = CharField(required=False, allow_blank=True)
    email = EmailField(label='Email Address', required=False, allow_blank=True)

    class Meta:
        model = User
        fields = [
            'username',
            'email',
            'password',
            'token',
        ]
        extra_kwargs = {'password': {'write_only': True}}

    def validate(self, data):
        user_obj = None
        email = data.get('email', None)
        username = data.get('username', None)
        password = data['password']
        if not email and not username:
            raise ValidationError('A username or an email is required to login.')

        user = User.objects.filter(
            Q(email=email) |
            Q(username=username)
        ).distinct()
        user = user.exclude(email__isnull=True)
        if user.exists() and user.count() == 1:
            user_obj = user.first()
        else:
            raise ValidationError('This username/email is not valid.')

        if user_obj:
            if not user_obj.check_password(password):
                raise ValidationError('Incorrect password. Please try again.')
        data['token'] = 'SOME_RANDOM_TOKEN'
        return data

    def create(self, validated_data):
        username = validated_data['username']
        first_name = validated_data['first_name']
        last_name = validated_data['last_name']
        email = validated_data['email']
        password = validated_data['password']
        user_obj = User(
            username=username,
            first_name=first_name,
            last_name=last_name,
            email=email
        )
        user_obj.set_password(password)
        user_obj.save()
        return validated_data


class UserDetailSerializer(ModelSerializer):
    # profile = SerializerMethodField()
    # image = SerializerMethodField()
    # delete_url = user_delete_url

    class Meta:
        model = User
        fields = [
            'username',
            'first_name',
            'last_name',
        ]

    # def get_image(self, obj):
    #     try:
    #         image = obj.image.url
    #     except:
    #         image = None
    #     return image

    # def get_profile(self, obj):
    #     profile = Profile.objects.filter_by_instance(obj).first()
    #     return profile


class UserListSerializer(ModelSerializer):
    url = user_detail_url
    # user = UserDetailSerializer(read_only=True)

    class Meta:
        model = User
        fields = [
            'username',
            'first_name',
            'url',
        ]


# class VisitorSerializer(ModelSerializer):
#     """docstring for Visitor"""

#     class Meta:
#         model = Visitor
