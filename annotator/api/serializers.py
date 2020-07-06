from rest_framework import permissions
from rest_framework.authentication import BasicAuthentication, SessionAuthentication
from rest_framework.serializers import ModelSerializer, HyperlinkedIdentityField, SerializerMethodField
from rest_framework_jwt.authentication import JSONWebTokenAuthentication

# from dokeza.users.api.serializers import UserDetailSerializer
from comments.api.serializers import CommentSerializer
from comments.models import Comment
from dokeza.users.api.serializers import UserDetailSerializer

from annotator.models import Annotation

annotation_detail_url = HyperlinkedIdentityField(
    view_name='annotations-api:detail',
    lookup_field='id',
)
annotation_delete_url = HyperlinkedIdentityField(
    view_name='annotations-api:delete',
    lookup_field='id',
)


class AnnotationListSerializer(ModelSerializer):
    authentication_classes = [BasicAuthentication, SessionAuthentication, JSONWebTokenAuthentication]
    permission_classes = [permissions.IsAuthenticated, ]
    user = UserDetailSerializer(read_only=True)
    url = annotation_detail_url

    class Meta:
        model = Annotation
        fields = [
            'uri',
            'user',
            'id',
            'created',
            'url',
        ]


class AnnotationCreateUpdateSerializer(ModelSerializer):
    # authentication_classes = [BasicAuthentication, SessionAuthentication]
    # permission_classes = [permissions.IsAuthenticated, ]

    class Meta:
        model = Annotation
        fields = [
            'user',
            'uri',
            'id',
            'guid',
            'data',
        ]


class AnnotationDetailSerializer(ModelSerializer):
    authentication_classes = [BasicAuthentication, SessionAuthentication, JSONWebTokenAuthentication]
    permission_classes = [permissions.IsAuthenticated, ]
    # comments = SerializerMethodField()
    # delete_url = annotation_delete_url

    class Meta:
        model = Annotation
        fields = [
            'user',
            'uri',
            'id',
            'text',
            'created',
            'updated',
            # 'comments',
            # 'timestamp',
            # 'delete_url',
        ]

    def get_html(self, obj):
        return obj.get_markdown()

    def get_pdf(self, obj):
        try:
            pdf = obj.pdf.url
        except:
            pdf = None
        return pdf

    def get_comments(self, obj):
        c_qs = Comment.objects.filter_by_instance(obj)
        comments = CommentSerializer(c_qs, many=True).data
        return comments



"""
from annotator.models import Annotation
from annotator.api.serializers import AnnotationDetailSerializer

data = {
    "title": "A serious Annotation",
    "id": "1",
    "content": "Distinctively strategize viral imperatives without vertical technology. Assertively promote top-line models whereas tactical action items. Appropriately benchmark B2C.",
    "publish": "2016-12-27",
}

obj = Annotation.objects.get(pk=2)
new_item = AnnotationDetailSerializer(obj, data=data)
if new_item.is_valid():
    new_item.save()
else:
    print(new_item.errors)


"""
