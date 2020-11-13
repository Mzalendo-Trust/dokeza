from rest_framework import permissions
from rest_framework.authentication import BasicAuthentication, SessionAuthentication
from rest_framework.serializers import ModelSerializer, HyperlinkedIdentityField, SerializerMethodField
from rest_framework_jwt.authentication import JSONWebTokenAuthentication

# from dokeza_2_0.users.api.serializers import UserDetailSerializer
from comments.api.serializers import CommentSerializer
from comments.models import Comment

from bills.models import Bill

bill_detail_url = HyperlinkedIdentityField(
    view_name='bills-api:detail',
    lookup_field='slug',
)
bill_delete_url = HyperlinkedIdentityField(
    view_name='bills-api:delete',
    lookup_field='slug',
)


class BillCreateUpdateSerializer(ModelSerializer):
    class Meta:
        model = Bill
        fields = [
            'title',
            'body',
            'word_doc',
        ]


class BillDetailSerializer(ModelSerializer):
    # owner = UserDetailSerializer(read_only=True)
    word_doc = SerializerMethodField()
    comments = SerializerMethodField()
    # delete_url = bill_delete_url

    class Meta:
        model = Bill
        fields = [
            'owner',
            'title',
            'slug',
            'word_doc',
            'body',
            'created',
            'comments',
            # 'timestamp',
            # 'delete_url',
        ]

    def get_html(self, obj):
        return obj.get_markdown()

    def get_word_doc(self, obj):
        try:
            word_doc = obj.word_doc.url
        except:
            word_doc = None
        return word_doc

    def get_comments(self, obj):
        c_qs = Comment.objects.filter_by_instance(obj)
        comments = CommentSerializer(c_qs, many=True).data
        return comments


class BillListSerializer(ModelSerializer):
    authentication_classes = [BasicAuthentication, SessionAuthentication]
    permission_classes = [permissions.IsAuthenticated, ]
    url = bill_detail_url
    # user = UserDetailSerializer(read_only=True)

    class Meta:
        model = Bill
        fields = [
            'url',
            'owner',
            'title',
            'created',
        ]

