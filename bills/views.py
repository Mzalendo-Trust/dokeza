import doc_config
import json
import os
import re

from datetime import datetime
from django.contrib.auth.models import AnonymousUser
from django.contrib.contenttypes.models import ContentType
from django.core.paginator import Paginator
from django.http import HttpResponseRedirect, HttpResponseForbidden
from django.shortcuts import render, redirect
from django.views import View
from django.views.decorators.csrf import csrf_protect, csrf_exempt, ensure_csrf_cookie
from django.views.generic import ListView, DetailView, FormView, TemplateView
from django.views.generic.detail import SingleObjectMixin
from bs4 import BeautifulSoup

from config.utils import docManager, fileUtils, serviceConverter, users, jwtManager, historyManager

# from dokeza_2_0.users.models import User, Profile
from .models import Bill


class BillListView(ListView):
    """
    The Bill List view lists the all bills and paginates after a certain number is displayed.
    """
    template_name = 'bills/bills_list.html'
    paginate_by = 12
    queryset = Bill.objects.have_pdfs()

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
    On this page, there is an embedded MS Word engine that displays a Bill.
    Annotations on comments and the comments on them can be made as it happens in a
    Word document. Document level comments can also be done.
    """
    template_name = 'bills/bill_detail.html'
    model = Bill

    def get_context_data(self, *args, **kwargs):
        context = super(BillDetailView, self).get_context_data(*args, **kwargs)
        if self.object.bill_from == 1:
            house = 'assembly'
        else:
            house = 'senate'
        
        filename = str(self.object.pdf)
        ext = fileUtils.getFileExt(filename)

        fileUri = docManager.getFileUri(filename, self.request)
        docKey = docManager.generateFileKey(filename, self.request)
        fileType = fileUtils.getFileType(filename)
        
        user = self.request.user
        if user.is_anonymous:
            edMode = 'review'
            mode = 'view'
        else:
            edMode = 'review'
            mode = 'edit'

        canEdit = docManager.isCanEdit(ext)
        edType = 'desktop'
        lang = self.request.COOKIES.get('ulang') if self.request.COOKIES.get('ulang') else 'en'

        storagePath = docManager.getStoragePath(filename, self.request)
        meta = historyManager.getMeta(storagePath)
        infObj = None

        edConfig = {
            'type': edType,
            'documentType': fileType,
            'document': {
                'title': filename,
                'url': fileUri,
                'fileType': ext[1:],
                'key': docKey,
                'info': infObj,
                'permissions': {
                    'comment': True,
                    'download': False,
                    'edit': False,
                    'fillForms': False,
                    'modifyFilter': edMode != 'filter',
                    'modifyContentControl': False,
                    'review': False
                }
            },
            'editorConfig': {
                'mode': mode,
                'lang': lang,
                'callbackUrl': docManager.getCallbackUrl(filename, self.request),
                'user': {
                    'id': '1',
                    'name': 'Dokeza'
                },
                'embedded': {
                    'saveUrl': fileUri,
                    'embedUrl': fileUri,
                    'shareUrl': fileUri,
                    'toolbarDocked': 'top'
                },
                'customization': {
                    'about': True,
                    'customer': {
                        'address': 'P.O. Box 21765 — 00505 Nairobi, Kenya',
                        'logo': doc_config.EXAMPLE_DOMAIN + 'static/images/dokeza-logo-banner.png',
                        'email':'mzalendo.devops@gmail.com'
                    },
                    'compactHeader': False,
                    'comments': True,
                    'commentAuthorOnly': True,
                    'goback': {
                        'url': doc_config.EXAMPLE_DOMAIN + 'bills/'
                    }
                }
            }
        }

        if jwtManager.isEnabled():
            edConfig['token'] = jwtManager.encode(edConfig)

        hist = historyManager.getHistoryObject(storagePath, filename, docKey, fileUri, self.request)

        context['page'] = 'bills'
        context['stingo'] = house
        context['cfg'] = json.dumps(edConfig)
        context['history'] = json.dumps(hist['history']) if 'history' in hist else None
        context['historyData'] = json.dumps(hist['historyData']) if 'historyData' in hist else None
        context['fileType'] = fileType
        context['apiUrl'] = doc_config.DOC_SERV_API_URL
        print('user', self.request.user)
        return context
    