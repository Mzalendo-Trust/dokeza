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
    template_name = 'bills/bill_detail.html'
    model = Bill

    def get_context_data(self, *args, **kwargs):
        context = super(BillDetailView, self).get_context_data(*args, **kwargs)
        print('bill context', context)
        if self.object.bill_from == 1:
            house = 'assembly'
        else:
            house = 'senate'
        
        filename = request.GET['filename']
        print(f'Bill request', request)
        ext = fileUtils.getFileExt(filename)

        fileUri = docManager.getFileUri(filename, request)
        docKey = docManager.generateFileKey(filename, request)
        fileType = fileUtils.getFileType(filename)
        user = request.user
        if user.is_anonymous:
            edMode = 'review'
            mode = 'view'
        else:
            edMode = 'review'
            mode = 'edit'

        canEdit = docManager.isCanEdit(ext)
        edType = 'desktop'
        lang = request.COOKIES.get('ulang') if request.COOKIES.get('ulang') else 'en'

        storagePath = docManager.getStoragePath(filename, request)
        meta = historyManager.getMeta(storagePath)
        infObj = None

        if (meta):
            infObj = {
                'owner': meta['uname'],
                'created': meta['created']
            }
        else:
            infObj = {
                'owner': 'Me',
                'created': datetime.today().strftime('%d.%m.%Y %H:%M:%S')
            }

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
                'callbackUrl': docManager.getCallbackUrl(filename, request),
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

        hist = historyManager.getHistoryObject(storagePath, filename, docKey, fileUri, request)
        context = {
            'page': 'bills',
            'stingo': house,
            'cfg': json.dumps(edConfig),
            'history': json.dumps(hist['history']) if 'history' in hist else None,
            'historyData': json.dumps(hist['historyData']) if 'historyData' in hist else None,
            'fileType': fileType,
            'apiUrl': doc_config.DOC_SERV_API_URL
        }
        return context
    

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

@csrf_exempt
def edit(request):

    filename = request.GET['filename']
    ext = fileUtils.getFileExt(filename)

    fileUri = docManager.getFileUri(filename, request)
    docKey = docManager.generateFileKey(filename, request)
    fileType = fileUtils.getFileType(filename)
    user = request.user
    print('edit -', filename)
    if user.is_anonymous:
        user.username = 'Mgeni_mzalendo'
        edMode = 'review'
        mode = 'view'
    else:
        if not user.first_name:
            user.first_name = 'Mgeni'
        if not user.username:
            user.username = f'{user.first_name}_{user.last_name}'
        edMode = 'review'
        mode = 'edit'

    house = 'assembly'

    canEdit = docManager.isCanEdit(ext)

    edType = 'desktop'
    lang = request.COOKIES.get('ulang') if request.COOKIES.get('ulang') else 'en'
    
    storagePath = docManager.getStoragePath(filename, request)
    meta = historyManager.getMeta(storagePath)

    infObj = None

    if (meta):
        infObj = {
            'owner': meta['uname'],
            'created': meta['created']
        }
    else:
        infObj = {
            'owner': user.username,
            'created': datetime.today().strftime('%d.%m.%Y %H:%M:%S')
        }

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
            'callbackUrl': docManager.getCallbackUrl(filename, request),
            'user': {
                'id': f'{user.id}',
                'name': f'{user.username}'
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

    hist = historyManager.getHistoryObject(storagePath, filename, docKey, fileUri, request)
    context = {
        'page': 'bills',
        'stingo': house,
        'cfg': json.dumps(edConfig),
        'history': json.dumps(hist['history']) if 'history' in hist else None,
        'historyData': json.dumps(hist['historyData']) if 'historyData' in hist else None,
        'fileType': fileType,
        'apiUrl': doc_config.DOC_SERV_API_URL,
    }
    print('return - context to bill_detail')

    return render(request, 'editor.html', context)


@csrf_exempt
def track(request):
    filename = request.GET['filename']
    usAddr = request.GET['userAddress']
    print(f'track -',request, filename)
    response = {}

    try:
        body = json.loads(request.body)

        if jwtManager.isEnabled():
            token = body.get('token')

            if (not token):
                token = request.headers.get('Authorization')
                if token:
                    token = token[len('Bearer '):]

            if (not token):
                raise Exception('Expected JWT')

            body = jwtManager.decode(token)
            if (body.get('payload')):
                body = body['payload']

        status = body['status']
        download = body.get('url')

        if (status == 2) | (status == 3): # mustsave, corrupted
            path = docManager.getStoragePath(filename, usAddr)
            histDir = historyManager.getHistoryDir(path)
            versionDir = historyManager.getNextVersionDir(histDir)
            changesUri = body.get('changesurl')

            os.rename(path, historyManager.getPrevFilePath(versionDir, fileUtils.getFileExt(filename)))
            docManager.saveFileFromUri(download, path)
            docManager.saveFileFromUri(changesUri, historyManager.getChangesZipPath(versionDir))

            hist = None
            hist = body.get('changeshistory')
            if (not hist) & ('history' in body):
                hist = json.dumps(body.get('history'))
            if hist:
                historyManager.writeFile(historyManager.getChangesHistoryPath(versionDir), hist)

            historyManager.writeFile(historyManager.getKeyPath(versionDir), body.get('key'))

    except Exception as e:
        response.setdefault('error', 1)
        response.setdefault('message', e.args[0])

    response.setdefault('error', 0)
    return HttpResponse(json.dumps(response), content_type='application/json', status=200 if response['error'] == 0 else 500)

