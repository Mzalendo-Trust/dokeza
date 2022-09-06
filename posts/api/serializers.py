from rest_framework.serializers import ModelSerializer, HyperlinkedIdentityField, SerializerMethodField

from dokeza_2_0.users.api.serializers import UserDetailSerializer

from posts.models import Post

post_detail_url = HyperlinkedIdentityField(
    view_name='posts-api:detail',
    lookup_field='slug',
)
post_delete_url = HyperlinkedIdentityField(
    view_name='posts-api:delete',
    lookup_field='slug',
)


class PostCreateUpdateSerializer(ModelSerializer):
    class Meta:
        model = Post
        fields = [
            # 'id',
            'title',
            # 'slug',
            'content',
            'publish',
        ]


class PostDetailSerializer(ModelSerializer):
    user = UserDetailSerializer(read_only=True)
    image = SerializerMethodField()
    html = SerializerMethodField()
    delete_url = post_delete_url

    class Meta:
        model = Post
        fields = [
            'user',
            'title',
            'slug',
            'image',
            'html',
            'content',
            'publish',
            'timestamp',
            'delete_url',
        ]

    def get_html(self, obj):
        return obj.get_markdown()

    def get_image(self, obj):
        try:
            image = obj.image.url
        except:
            image = None
        return image    


class PostListSerializer(ModelSerializer):
    url = post_detail_url
    user = UserDetailSerializer(read_only=True)

    class Meta:
        model = Post
        fields = [
            'url',
            'user',
            'title',
            'publish',
        ]

