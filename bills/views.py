from django.contrib.contenttypes.models import ContentType
from django.core.paginator import Paginator
from django.http import HttpResponseRedirect, HttpResponseForbidden
from django.views import View
from django.views.generic import ListView, DetailView, FormView, TemplateView
from django.views.generic.detail import SingleObjectMixin
from bs4 import BeautifulSoup

# from dokeza_2_0.users.models import User, Profile
from .models import Bill
from annotator.models import Annotation
from comments.forms import CommentForm, AnnotCommentForm
from comments.models import Comment


class BillListView(ListView):
    """
    The Bill List view lists the all bills and paginates after a certain number is displayed.
    """
    template_name = 'bills/bills_list.html'
    paginate_by = 12
    queryset = Bill.objects.all()

    def get_context_data(self, **kwargs):
        context = super(BillListView, self).get_context_data(**kwargs)
        context['page'] = 'bills'
        context['stingo'] = 'all'
        return context


class PrivateBillListView(ListView):
    """
    This is the Private Bill List view. it lists the private bills that are
    sponsored by members of Parliament, civil society or the public.
    """
    template_name = 'bills/bills_private.html'
    queryset = Bill.objects.private_bills()

    def get_context_data(self, **kwargs):
        context = super(PrivateBillListView, self).get_context_data(**kwargs)
        context['page'] = 'bills'
        context['stingo'] = 'private'
        return context


class AssemblyBillListView(ListView):
    """
    This is the National Assembly Bill List view. it lists the bills only specific to the National Assembly.
    """
    template_name = 'bills/bills_national-assembly.html'
    paginate_by = 12
    paginate_orphans = 3
    queryset = Bill.objects.assembly_bills()

    def get_context_data(self, **kwargs):
        context = super(AssemblyBillListView, self).get_context_data(**kwargs)
        context['page'] = 'bills'
        context['stingo'] = 'assembly'
        return context


class SenateBillListView(ListView):
    """
    This is the Senate Bill List view. it lists the bills only specific to the Senate.
    """
    template_name = 'bills/bills_senate.html'
    paginate_by = 12
    paginate_orphans = 3
    queryset = Bill.objects.senate_bills()

    def get_context_data(self, **kwargs):
        context = super(SenateBillListView, self).get_context_data(**kwargs)
        context['page'] = 'bills'
        context['stingo'] = 'senate'
        return context


class OpenMemoBillListView(ListView):
    template_name = 'bills/open_memo.html'
    paginate_by = 12
    paginate_orphans = 3
    queryset = Bill.objects.filter(bill_stage=1)

    def get_context_data(self, **kwargs):
        context = super(OpenMemoBillListView, self).get_context_data(**kwargs)
        context['page'] = 'open_memo'
        context['stingo'] = 'memos'
        return context


class CommitteeBillListView(ListView):
    template_name = 'bills/committee.html'
    paginate_by = 12
    paginate_orphans = 3
    queryset = Bill.objects.filter(bill_stage=2)

    def get_context_data(self, **kwargs):
        context = super(CommitteeBillListView, self).get_context_data(**kwargs)
        context['page'] = 'committee'
        context['stingo'] = 'meetings'
        return context


class PlenaryBillListView(ListView):
    template_name = 'bills/plenary.html'
    paginate_by = 12
    paginate_orphans = 3
    queryset = Bill.objects.filter(bill_stage=3)

    def get_context_data(self, **kwargs):
        context = super(PlenaryBillListView, self).get_context_data(**kwargs)
        context['page'] = 'plenary'
        context['stingo'] = 'sessions'
        return context


class RegulationListView(ListView):
    pass

class BillDetailView(DetailView):
    """
    This is the view shows the details related to a particular bill.
    It is on this page that annotations are made to the bill. This view has two comment forms, for the Bill and the Annotations.
    """

    model = Bill

    def get_context_data(self, *args, **kwargs):
        context = super(BillDetailView, self).get_context_data(
            *args, **kwargs)
        comments = self.object.comments

        initial_data = {
            "content_type": self.object.get_content_type,
            "object_id": self.object.id,
        }

        if self.object.bill_from == 1:
            house = 'assembly'
        else:
            house = 'senate'

        bill_slug = self.object.slug
        bill_annotations = Annotation.objects.filter(uri__contains=bill_slug)
        if self.request.user.is_authenticated:
            my_annotations = bill_annotations.filter(user=self.request.user)
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

        context["page"] = 'bills'
        context["stingo"] = house
        context["bill_annotations"] = bill_annotations
        context['my_annotations'] = my_annotations
        context["toc"] = toc
        context["comment_form"] = CommentForm(initial=initial_data)
        context["comment_annot_form"] = AnnotCommentForm(initial=initial_annot_data)
        context["comments"] = comments

        return context


class BillCommentView(SingleObjectMixin, FormView):
    """
    This view embedes the Comment form below the bill details.
    """
    model = Bill
    form_class = CommentForm
    template_name = 'bills/bill_detail.html'

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
            except TypeError:
                parent_id = 0

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


class BillDisplayView(View):
    """
    This view combines the Detail "GET" view and the Comment "POST" view.
    """
    def get(self, request, *args, **kwargs):
        view = BillDetailView.as_view()
        return view(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        view = BillCommentView.as_view()
        return view(request, *args, **kwargs)


# BillDraftView() is located in dokeza_2_0.users.views.
