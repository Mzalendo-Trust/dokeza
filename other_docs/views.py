from django.contrib.contenttypes.models import ContentType
from django.http import HttpResponseRedirect, HttpResponseForbidden
from django.views import View
from django.views.generic import ListView, DetailView, FormView
from django.views.generic.detail import SingleObjectMixin
from bs4 import BeautifulSoup

from .models import Doc
from annotator.models import Annotation
from comments.forms import CommentForm, AnnotCommentForm
from comments.models import Comment


class DocsListView(ListView):
    """
    The Documents List view lists the all other documents that do not fall under bills
    and paginates after a certain number is displayed.
    """
    template_name = 'other_docs/docs_list.html'
    paginate_by = 12
    paginate_orphans = 3
    queryset = Doc.objects.all()

    def get_context_data(self, **kwargs):
        context = super(DocsListView, self).get_context_data(**kwargs)
        context['page'] = 'regulations'
        context['stingo'] = 'all'
        return context


class DocDetailView(DetailView):
    """
    This is the view shows the details related to a particular bill.
    It is on this page that annotations are made to the bill. This view has two comment forms, for the Bill and the Annotations.
    """

    model = Doc

    def get_context_data(self, *args, **kwargs):
        context = super(DocDetailView, self).get_context_data(
            *args, **kwargs)
        comments = self.object.comments

        initial_data = {
            "content_type": self.object.get_content_type,
            "object_id": self.object.id,
        }

        doc_slug = self.object.slug
        doc_annotations = Annotation.objects.filter(uri__contains=doc_slug)
        if self.request.user.is_authenticated:
            my_annotations = doc_annotations.filter(user=self.request.user)
        else:
            my_annotations = []

        initial_annot_data = {
            # We should get the Annotation model. And from that
            # we need to get the instance id for the annotation.
            "content_type": ContentType.objects.get(app_label="annotator", model="annotation"),
        }

        content = self.object.body
        soup = BeautifulSoup(content, 'html.parser')
        anchors = soup.find_all(lambda tag: tag.name == "a" and len(tag.attrs) == 2)
        toc = []
        for anchor in anchors:
            href = '<a href="#' + anchor.attrs['id'] + '">' + anchor.attrs['name'] + '</a>'
            toc.append('<li>' + href + '</li>')

        context["page"] = 'regulations'
        context["stingo"] = 'all'
        context["toc"] = toc
        context["comment_form"] = CommentForm(initial=initial_data)
        context["comment_annot_form"] = AnnotCommentForm(initial=initial_annot_data)
        context["comments"] = comments

        return context


class DocCommentView(SingleObjectMixin, FormView):
    """
    This view embedes the Comment form below the Doc details.
    """
    model = Doc
    form_class = CommentForm
    template_name = 'other_docs/doc_detail.html'

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


class DocDisplayView(View):
    """
    This view combines the Detail "GET" view and the Comment "POST" view.
    """
    def get(self, request, *args, **kwargs):
        view = DocDetailView.as_view()
        return view(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        view = DocCommentView.as_view()
        return view(request, *args, **kwargs)
