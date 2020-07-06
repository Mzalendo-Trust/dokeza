from django.conf import settings
from django.contrib.contenttypes.models import ContentType
from django.urls import reverse
from django.http import (HttpResponse,
                         HttpResponseForbidden,
                         HttpResponseRedirect,
                         HttpResponseBadRequest)
from django.shortcuts import get_object_or_404
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from django.views.generic import TemplateView, ListView, CreateView, FormView
from django.views.generic.edit import UpdateView
from rest_framework.renderers import JSONRenderer
from rest_framework.parsers import JSONParser

import annotator
from annotator.models import Annotation
from annotator import models, serializers
from comments.forms import AnnotCommentForm
from comments.models import Comment


class JSONResponse(HttpResponse):
    """
    An ``HttpResponse`` that renders its content into JSON.
    """

    def __init__(self, data, **kwargs):
        content = JSONRenderer().render(data)
        kwargs["content_type"] = "application/json"
        super(JSONResponse, self).__init__(content, **kwargs)


def root(request):
    if request.method == "GET":
        return JSONResponse({"name": getattr(settings,
                                             "ANNOTATOR_NAME",
                                             "django-annotator-store"),
                             "version": annotator.__version__})
    else:
        return HttpResponseForbidden()


class AnnotationIndexView(ListView):
    """
    The AnnotationIndexView is for listing list annotations on the platform.
    """

    model = Annotation

    def get(self, request):
        annotations = Annotation.objects.all()
        serializer = serializers.AnnotationSerializer(annotations, many=True)
        return JSONResponse(serializer.data)


class AnnotationCreateView(CreateView):
    """
    docstring for AnnotationCreateView
    """

    model = Annotation

    @method_decorator(csrf_exempt)
    def post(self, request):
        data = JSONParser().parse(request)
        serializer = serializers.AnnotationSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            response = HttpResponse(status=303)
            response["Location"] = reverse("annotations:read_update_delete",
                                           kwargs={"id": serializer.data["id"]})
            return response
        else:
            return HttpResponseForbidden()


class AnnotationUpdateView(UpdateView):
    """
    docstring for AnnotationUpdateView
    """
    model = Annotation

    @method_decorator(csrf_exempt)
    def put(self, request, id):
        annotation = get_object_or_404(Annotation, id=id)
        data = JSONParser().parse(request)
        serializer = serializers.AnnotationSerializer(annotation, data=data)
        if serializer.is_valid():
            serializer.save()
            response = HttpResponse(status=303)
            response["Location"] = reverse("annotations:read_update_delete",
                                           kwargs={"id": serializer.data["id"]})
            return response
        else:
            return HttpResponseBadRequest(content=str(serializer.errors))


class AnnotationCommentView(FormView):
    """
    This view embedes the Comment form below the annotations in the Bill detail page. .
    """
    form_class = AnnotCommentForm
    template_name = 'bills/bill_detail.html'

    def post(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return HttpResponseForbidden()

        form = AnnotCommentForm(request.POST or None)
        if form.is_valid():
            c_type = form.cleaned_data.get("content_type")
            content_type = ContentType.objects.filter(model=c_type).first()
            obj_id = form.cleaned_data.get('object_id')
            content_data = form.cleaned_data.get("content")
            parent_obj = None
            try:
                parent_id = request.POST.get("parent_id")
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
            bill_slug = Annotation.objects.get(pk=obj_id).get_bill_slug()
            return HttpResponseRedirect(reverse("bills:detail", kwargs={"slug": str(bill_slug)}))
        else:
            return self.form_invalid(form)


@csrf_exempt
def index_create(request):
    if request.method == "GET":
        annotations = models.Annotation.objects.all()
        serializer = serializers.AnnotationSerializer(annotations, many=True)
        return JSONResponse(serializer.data)
    elif request.method == "POST":
        data = JSONParser().parse(request)
        serializer = serializers.AnnotationSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            response = HttpResponse(status=303)
            response["Location"] = reverse("annotations:read_update_delete",
                                           kwargs={"id": serializer.data["id"]})
            return response
        else:
            return HttpResponseBadRequest(content=str(serializer.errors))
    else:
        return HttpResponseForbidden()


@csrf_exempt
def read_update_delete(request, id):
    if request.method == "GET":
        annotation = get_object_or_404(Annotation, id=id)
        serializer = serializers.AnnotationSerializer(annotation)
        return JSONResponse(serializer.data, status=200)
    elif request.method == "PUT":
        annotation = get_object_or_404(Annotation, id=id)
        data = JSONParser().parse(request)
        serializer = serializers.AnnotationSerializer(annotation, data=data)
        if serializer.is_valid():
            serializer.save()
            response = HttpResponse(status=303)
            response["Location"] = reverse("annotations:read_update_delete",
                                           kwargs={"id": serializer.data["id"]})
            return response
        else:
            return HttpResponseBadRequest(content=str(serializer.errors))
    elif request.method == "DELETE":
        annotation = get_object_or_404(models.Annotation, id=id)
        annotation.delete()
        return HttpResponse(status=204)
    else:
        return HttpResponseForbidden()


def search(request):
    if request.method == "GET":
        query = {k: v for k, v in request.GET.items()}
        annotations = models.Annotation.objects.filter(**query)
        serializer = serializers.AnnotationSerializer(annotations, many=True)
        return JSONResponse({"total": len(serializer.data), "rows": serializer.data})
    else:
        return HttpResponseForbidden()


class DemoView(TemplateView):
    template_name = "annotator/demo.html"
