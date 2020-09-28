from django.contrib.contenttypes.models import ContentType
from django.http import HttpResponseForbidden, HttpResponseRedirect
from django.views.generic import View  # Changes in 1.10, removes generic
from django.views.generic import ListView, FormView
from django.views.generic.detail import SingleObjectMixin
from django.views.generic.dates import MonthArchiveView
from taggit.models import Tag

from .models import Post, Memorandum, Petition
from comments.forms import CommentForm
from comments.models import Comment

from hitcount.views import HitCountDetailView

"""
We will be using Class Based Views to run these. Functions would be the
easiest and best for such light work, but these are no longer supported by
django.

We have put the Mzalendo "posted" views here. These are the News and Memoranda views. Petitions are part of the Public Particiapation app because they are a public creation.
"""


class TagMixin(object):
    def get_context_data(self, **kwargs):
        context = super(TagMixin, self).get_context_data(**kwargs)
        context['tags'] = Tag.objects.all()
        return context


class PostListView(ListView):
    model = Post
    template_name = 'analysis/analysis_list.html'

    def get_context_data(self, **kwargs):
        context = super(PostListView, self).get_context_data(**kwargs)
        context["page"] = "home"
        context["stingo"] = "news"
        while Post.objects.all() is not None:
            try:
                posts = Post.objects.all().filter(draft=False)
                context["posts"] = posts
                return context
            except ValueError:
                context["posts"] = posts
                return context


class TagIndexView(TagMixin, ListView):
    template_name = 'analysis/analysis_list.html'
    model = Tag
    paginate_by = '10'
    context_object_name = 'posts'

    def get_queryset(self):
        return Post.objects.filter(tags__slug=self.kwargs.get('slug'))


class PostMonthArchiveView(MonthArchiveView):
    template_name = 'analysis/archive_list.html'
    queryset = Post.objects.all()
    date_field = "publish"
    allow_future = True

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context["page"] = "home"
        context["stingo"] = "news"
        return context


class PostDisplayView(HitCountDetailView):
    model = Post
    template_name = 'analysis/analysis_detail.html'
    count_hit = True

    def get_context_data(self, *args, **kwargs):
        context = super(PostDisplayView, self).get_context_data(**kwargs)
        comments = self.object.comments

        initial_data = {
            "content_type": self.object.get_content_type,
            "object_id": self.object.id,
        }
        context["comment_form"] = CommentForm(initial=initial_data)
        context["comments"] = comments
        context["page"] = "home"
        context["stingo"] = "news"
        return context


class PostCommentView(SingleObjectMixin, FormView):
    model = Post
    form_class = CommentForm
    template_name = 'posts/post_detail.html'

    def post(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return HttpResponseForbidden()
        self.object = self.get_object()

        form = CommentForm(request.POST or None)
        if form.is_valid():
            c_type = form.cleaned_data.get("content_type")
            content_type = ContentType.objects.get(model=c_type)
            obj_id = form.cleaned_data.get('object_id')
            content_data = form.cleaned_data.get("content")
            parent_obj = None
            try:
                parent_id = int(request.POST.get("parent_id"))
            except:
                parent_id = None

            if parent_id:
                parent_qs = Comment.objects.filter(id=parent_id)
                if parent_qs.exists() and parent_qs.count() == 1:
                    parent_obj = parent_qs.first()

            new_comment, created = Comment.objects.get_or_create(
                user=request.user,
                content_type=content_type,
                object_id=obj_id,
                content=content_data,
                parent=parent_obj,
            )
            return HttpResponseRedirect(
                new_comment.content_object.get_absolute_url()
            )
        else:
            return self.form_invalid(form)


class PostDetailView(View):

    def get(self, request, *args, **kwargs):
        view = PostDisplayView.as_view()
        return view(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        view = PostCommentView.as_view()
        return view(request, *args, **kwargs)


class MemorandumListView(ListView):
    model = Memorandum
    template_name = "public_participation/memoranda_list.html"

    def get_context_data(self, **kwargs):
        context = super(MemorandumListView, self).get_context_data(**kwargs)
        memoranda = Memorandum.objects.all()
        context["page"] = "resources"
        context["stingo"] = "memoranda"
        context["memoranda"] = memoranda
        return context


class MemorandumDisplayView(HitCountDetailView):
    model = Memorandum
    count_hit = True
    template_name = "public_participation/memorandum_detail.html"

    def get_context_data(self, *args, **kwargs):
        context = super(MemorandumDisplayView, self).get_context_data(**kwargs)
        comments = self.object.comments

        initial_data = {
            "content_type": self.object.get_content_type,
            "object_id": self.object.id,
        }
        context["comment_form"] = CommentForm(initial=initial_data)
        context["comments"] = comments
        context["page"] = "resources"
        context["stingo"] = "memoranda"
        return context


class MemorandumCommentView(SingleObjectMixin, FormView):
    """docstring for MemorandumCommentView"""
    model = Memorandum
    form_class = CommentForm
    template_name = "public_participation/memorandum_detail.html"

    def post(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return HttpResponseForbidden()
        self.object = self.get_object()

        form = CommentForm(request.POST or None)
        if form.is_valid():
            c_type = form.cleaned_data.get("content_type")
            content_type = ContentType.objects.get(model=c_type)
            obj_id = form.cleaned_data.get('object_id')
            content_data = form.cleaned_data.get("content")
            parent_obj = None
            try:
                parent_id = int(request.POST.get("parent_id"))
            except:
                parent_id = None

            if parent_id:
                parent_qs = Comment.objects.filter(id=parent_id)
                if parent_qs.exists() and parent_qs.count() == 1:
                    parent_obj = parent_qs.first()

            new_comment, created = Comment.objects.get_or_create(
                user=request.user,
                content_type=content_type,
                object_id=obj_id,
                content=content_data,
                parent=parent_obj,
            )
            return HttpResponseRedirect(
                new_comment.content_object.get_absolute_url()
            )
        else:
            return self.form_invalid(form)


class MemorandumDetailView(View):

    def get(self, request, *args, **kwargs):
        view = MemorandumDisplayView.as_view()
        return view(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        view = MemorandumCommentView.as_view()
        return view(request, *args, **kwargs)



class PetitionListView(ListView):
    model = Petition
    template_name = "public_participation/petitions_list.html"

    def get_context_data(self, **kwargs):
        context = super(PetitionListView, self).get_context_data(**kwargs)
        petitions = Petition.objects.filter(draft=False)
        context["page"] = "resources"
        context["stingo"] = "petitions"
        context["petitions"] = petitions
        return context


class PetitionDisplayView(HitCountDetailView):
    model = Petition
    count_hit = True
    template_name = "public_participation/petition_detail.html"

    def get_context_data(self, *args, **kwargs):
        context = super(PetitionDisplayView, self).get_context_data(**kwargs)
        comments = self.object.comments

        initial_data = {
            "content_type": self.object.get_content_type,
            "object_id": self.object.id,
        }
        context["comment_form"] = CommentForm(initial=initial_data)
        context["comments"] = comments
        context["page"] = "resources"
        context["stingo"] = "petitions"
        return context


class PetitionCommentView(SingleObjectMixin, FormView):
    model = Petition
    form_class = CommentForm
    template_name = "public_participation/petition_detail.html"

    def post(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return HttpResponseForbidden()
        self.object = self.get_object()

        form = CommentForm(request.POST or None)
        if form.is_valid():
            c_type = form.cleaned_data.get("content_type")
            content_type = ContentType.objects.get(model=c_type)
            obj_id = form.cleaned_data.get('object_id')
            content_data = form.cleaned_data.get("content")
            parent_obj = None
            try:
                parent_id = int(request.POST.get("parent_id"))
            except ValueError:
                parent_id = None

            if parent_id:
                parent_qs = Comment.objects.filter(id=parent_id)
                if parent_qs.exists() and parent_qs.count() == 1:
                    parent_obj = parent_qs.first()

            new_comment, created = Comment.objects.get_or_create(
                user=request.user,
                content_type=content_type,
                object_id=obj_id,
                content=content_data,
                parent=parent_obj,
            )
            return HttpResponseRedirect(
                new_comment.content_object.get_absolute_url()
            )
        else:
            return self.form_invalid(form)


class PetitionDetailView(View):

    def get(self, request, *args, **kwargs):
        view = PetitionDisplayView.as_view()
        return view(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        view = PetitionCommentView.as_view()
        return view(request, *args, **kwargs)
