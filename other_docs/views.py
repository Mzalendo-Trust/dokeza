from django.contrib.contenttypes.models import ContentType
from django.http import HttpResponseRedirect, HttpResponseForbidden
from django.views import View
from django.views.generic import ListView, DetailView, FormView
from django.views.generic.detail import SingleObjectMixin
from bs4 import BeautifulSoup

from .models import Doc


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

        initial_data = {
            "content_type": self.object.get_content_type,
            "object_id": self.object.id,
        }

        doc_slug = self.object.slug
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

        return context


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
