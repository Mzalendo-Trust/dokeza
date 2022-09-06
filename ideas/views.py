from django.contrib.auth.mixins import LoginRequiredMixin
from django.contrib.contenttypes.models import ContentType
from django.shortcuts import redirect
from django.views import View
from django.views.generic import ListView, DetailView, CreateView, FormView, UpdateView
from django.views.generic.detail import SingleObjectMixin


# from dokeza_2_0.users.models import User, Profile
from .models import SubmittedIdea
from .forms import SubmitIdeaForm


class IdeasListView(ListView):
    """
    This ListView shows a Users' submitted ideas. .
    """
    model = SubmittedIdea
    template_name = 'ideas/all_ideas.html'

    def get_context_data(self, **kwargs):
        context = super(IdeasListView, self).get_context_data(**kwargs)
        while SubmittedIdea.objects.all() is not None:
            all_ideas = SubmittedIdea.objects.filter(private=False).order_by('-publish')
            context['all_ideas'] = all_ideas
            context['page'] = 'bills'
            context['stingo'] = 'idea'
            context['mpango'] = 'all_ideas'
            return context


class MyIdeasListView(LoginRequiredMixin, ListView):
    """docstring for MyIdeasList"""
    model = SubmittedIdea
    template_name = 'ideas/my_ideas.html'
    
    def get_context_data(self, **kwargs):
        context = super(MyIdeasListView, self).get_context_data(**kwargs)
        while SubmittedIdea.objects.all() is not None:
            my_ideas = SubmittedIdea.objects.filter(author=self.request.user).order_by('-publish')
            context['my_ideas'] = my_ideas
            context['page'] = 'bills'
            context['stingo'] = 'idea'
            context['mpango'] = 'my_ideas'
            return context


class SubmitIdeaView(LoginRequiredMixin, CreateView):
    """
    A logged in user wants to submit an idea. Once the idea is submitted, it will appear in the User's profile under submited Ideas.
    TO DO: Create and confirm Submitted ideas in the Profile
    """

    model = SubmittedIdea
    template_name = 'ideas/submit_idea.html'
    form_class = SubmitIdeaForm

    def get_context_data(self, **kwargs):
        context = super(SubmitIdeaView, self).get_context_data(**kwargs)
        context['page'] = 'bills'
        context['stingo'] = 'idea'
        context['mpango'] = 'submit_idea'
        return context

    def post(self, request, *args, **kwargs):
        print(dir(self))
        form = SubmitIdeaForm(request.POST or None)
        if form.is_valid():
            form.save()
            return redirect('ideas:my_ideas')
        else:
            return self.form_invalid(form)


class IdeaDetailView(DetailView):
    """
    This is the view shows an Idea It is on this page that annotations are made to the Ideas
    This view has two forms, for the Comments and the Voting.
    """

    model = SubmittedIdea
    template_name = 'ideas/idea_detail.html'
    
    def get_context_data(self, *args, **kwargs):
        context = super(IdeaDetailView, self).get_context_data(
            *args, **kwargs)

        initial_data = {
            "content_type": self.object.get_content_type,
            "object_id": self.object.id,
        }

        idea_slug = self.object.slug

        context["page"] = 'bills'
        context["stingo"] = 'idea'
        context['mpango'] = 'my_ideas'

        return context

class IdeaUpdateView(UpdateView):
    model = SubmittedIdea
    form_class = SubmitIdeaForm
    template_name = 'ideas/edit_idea.html'
    
    def get_context_data(self, *args, **kwargs):
        context = super(IdeaUpdateView, self).get_context_data(
            *args, **kwargs)
        comments = self.object.comments
        
        context["page"] = 'bills'
        context["stingo"] = 'idea'
        context['mpango'] = 'my_ideas'
        
        return context

class IdeaVoteView(SingleObjectMixin, FormView):
    """docstring for IdeaVoteView"""
    def __init__(self, arg):
        super(IdeaVoteView,SingleObj).__init__()
        self.arg = arg
        

class IdeaCommentView(SingleObjectMixin, FormView):
    """
    This view embedes the Comment form below the Idea content.
    """
    model = SubmittedIdea
    form_class = CommentForm
    template_name = 'ideas/idea_detail.html'

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


class IdeaDisplayView(View):
    """
    This view combines the Detail "GET" view and the Comment "POST" view.
    """
    def get(self, request, *args, **kwargs):
        view = IdeaDetailView.as_view()
        return view(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        view = IdeaCommentView.as_view()
        return view(request, *args, **kwargs)