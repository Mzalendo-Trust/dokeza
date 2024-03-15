import json
import os
import re

from datetime import datetime
from django.conf import settings
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
from .models import Bill


class BillListView(ListView):
    """
    The Bill List view lists the all bills and paginates after a certain number is displayed.
    """
    template_name = 'bills/bills_list.html'
    paginate_by = 12
    queryset = Bill.objects.have_word_docs()

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


class BillDetailView(DetailView):
    """
    This is the view shows the details related to a particular bill.
    On this page, there is an embedded MS Word engine that displays a Bill.
    Comments on annotated text  and the comments on the full bills can be made in
    the bill using MS Word highlights and comments.
    """
    template_name = 'bills/bill_detail.html'
    model = Bill

    '''
    def get_context_data(self, *args, **kwargs):
        context = super(BillDetailView, self).get_context_data(*args, **kwargs)
        if self.object.bill_from == 1:
            house = 'assembly'
        else:
            house = 'senate'

        filename = str(self.object.word_doc)
        ext = fileUtils.getFileExt(filename)

        fileUri = docManager.getFileUri(filename, self.request)
        docKey = docManager.generateFileKey(filename, self.request)
        fileType = fileUtils.getFileType(filename)

        user = self.request.user
        if user.is_anonymous:
            user.first_name = 'Mgeni'
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
                    'id': users.getIdFromReq(self.request),
                    'name': users.getNameFromReq(self.request)
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
                        'logo': settings.SITE_DOMAIN + '/static/images/dokeza-logo-banner.png',
                        'email': 'mzalendo.devops@gmail.com'
                    },
                    'compactHeader': False,
                    'goback': {
                        'url': settings.SITE_DOMAIN + '/bills/'
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
        context['apiUrl'] = settings.DOC_SERV_API_URL
        print('cfg -', edConfig, 'hist -', hist)
        return context
    '''

    def get_context_data(self, *args, **kwargs):
        context = super(BillDetailView, self).get_context_data(*args, **kwargs)
        if self.object.bill_from == 1:
            house = 'assembly'
        else:
            house = 'senate'

        request = self.request

        filename = fileUtils.getFileName(request.GET['filename'])
        isEnableDirectUrl = request.GET['directUrl'].lower() in (
            "true") if 'directUrl' in request.GET else False

        ext = fileUtils.getFileExt(filename)

        fileUri = docManager.getFileUri(filename, True, request)
        fileUriUser = docManager.getDownloadUrl(filename, request) + "&dmode=emb"
        directUrl = docManager.getDownloadUrl(filename, request, False)
        docKey = docManager.generateFileKey(filename, request)
        fileType = fileUtils.getFileType(filename)
        user = users.getUserFromReq(request)  # get user

        # get the editor mode: view/edit/review/comment/fillForms/embedded (the default mode is edit)
        edMode = request.GET.get('mode') if request.GET.get('mode') else 'edit'
        # check if the file with this extension can be edited
        canEdit = docManager.isCanEdit(ext)

        if (((not canEdit) and edMode == 'edit') or edMode == 'fillForms') and docManager.isCanFillForms(ext):
            edMode = 'fillForms'
            canEdit = True
        # if the Submit form button is displayed or hidden
        submitForm = edMode == 'fillForms' and user.id == 'uid-1' and False
        # if the file can't be edited, the mode is view
        mode = 'edit' if canEdit & (edMode != 'view') else 'view'

        types = ['desktop', 'mobile', 'embedded']
        # get the editor type: embedded/mobile/desktop (the default type is desktop)
        edType = request.GET.get('type') if request.GET.get(
            'type') in types else 'desktop'
        # get the editor language (the default language is English)
        lang = request.COOKIES.get(
            'ulang') if request.COOKIES.get('ulang') else 'en'

        storagePath = docManager.getStoragePath(filename, request)
        meta = historyManager.getMeta(storagePath)  # get the document meta data
        infObj = None

        # get the action data that will be scrolled to (comment or bookmark)
        actionData = request.GET.get('actionLink')
        actionLink = json.loads(actionData) if actionData else None

        # templates image url in the "From Template" section
        templatesImageUrl = docManager.getTemplateImageUrl(fileType, request)
        createUrl = docManager.getCreateUrl(edType, request)
        templates = [
            {
                'image': '',
                'title': 'Blank',
                'url': createUrl
            },
            {
                'image': templatesImageUrl,
                'title': 'With sample content',
                'url': createUrl + '&sample=true'
            }
        ]

        if (meta):  # if the document meta data exists,
            infObj = {  # write author and creation time parameters to the information object
                'owner': meta['uname'],
                'uploaded': meta['created']
            }
        else:  # otherwise, write current meta information to this object
            infObj = {
                'owner': 'Me',
                'uploaded': datetime.today().strftime('%d.%m.%Y %H:%M:%S')
            }
        infObj['favorite'] = user.favorite
        # specify the document config
        edConfig = {
            'type': edType,
            'documentType': fileType,
            'document': {
                'title': filename,
                'url': docManager.getDownloadUrl(filename, request),
                'directUrl': directUrl if isEnableDirectUrl else "",
                'fileType': ext[1:],
                'key': docKey,
                'info': infObj,
                'permissions': {  # the permission for the document to be edited and downloaded or not
                    'comment': (edMode != 'view') & (edMode != 'fillForms') & (edMode != 'embedded') & (edMode != "blockcontent"),
                    'copy': 'copy' not in user.deniedPermissions,
                    'download': 'download' not in user.deniedPermissions,
                    'edit': canEdit & ((edMode == 'edit') | (edMode == 'view') | (edMode == 'filter') | (edMode == "blockcontent")),
                    'print': 'print' not in user.deniedPermissions,
                    'fillForms': (edMode != 'view') & (edMode != 'comment') & (edMode != 'embedded') & (edMode != "blockcontent"),
                    'modifyFilter': edMode != 'filter',
                    'modifyContentControl': edMode != "blockcontent",
                    'review': canEdit & ((edMode == 'edit') | (edMode == 'review')),
                    'chat': user.id != 'uid-0',
                    'reviewGroups': user.reviewGroups,
                    'commentGroups': user.commentGroups,
                    'userInfoGroups': user.userInfoGroups,
                    'protect': 'protect' not in user.deniedPermissions
                },
                'referenceData': {
                    'instanceId': docManager.getServerUrl(False, request),
                    'fileKey': json.dumps({'fileName': filename, 'userAddress': request.META['REMOTE_ADDR']}) if user.id != 'uid-0' else None
                }
            },
            'editorConfig': {
                'actionLink': actionLink,
                'mode': mode,
                'lang': lang,
                # absolute URL to the document storage service
                'callbackUrl': docManager.getCallbackUrl(filename, request),
                'coEditing': {
                    "mode": "strict",
                    "change": False
                }
                if edMode == 'view' and user.id == 'uid-0' else None,
                'createUrl': createUrl if user.id != 'uid-0' else None,
                'templates': templates if user.templates else None,
                'user': {  # the user currently viewing or editing the document
                    'id': user.id if user.id != 'uid-0' else None,
                    'name': user.name,
                    'group': user.group
                },
                'embedded': {  # the parameters for the embedded document type
                    # the absolute URL that will allow the document to be saved onto the user personal computer
                    'saveUrl': directUrl,
                    # the absolute URL to the document serving as a source file for the document embedded into the web page
                    'embedUrl': directUrl,
                    # the absolute URL that will allow other users to share this document
                    'shareUrl': directUrl,
                    # the place for the embedded viewer toolbar (top or bottom)
                    'toolbarDocked': 'top'
                },
                'customization': {  # the parameters for the editor interface
                    'about': True,  # the About section display
                    'comments': True,
                    'feedback': True,  # the Feedback & Support menu button display
                    'forcesave': False,  # adds the request for the forced file saving to the callback handler
                    'submitForm': submitForm,  # if the Submit form button is displayed or not
                    'goback': {  # settings for the Open file location menu button and upper right corner button
                        # the absolute URL to the website address which will be opened when clicking the Open file location menu button
                        'url': docManager.getServerUrl(False, request)
                    }
                }
            }
        }

        # an image which will be inserted into the document
        dataInsertImage = {
            'fileType': 'png',
            'url': docManager.getServerUrl(True, request) + '/static/images/logo.png',
            'directUrl': docManager.getServerUrl(False, request) + '/static/images/logo.png'
        } if isEnableDirectUrl else {
            'fileType': 'png',
            'url': docManager.getServerUrl(True, request) + '/static/images/logo.png'
        }

        # a document which will be compared with the current document
        dataCompareFile = {
            'fileType': 'docx',
            'url': docManager.getServerUrl(True, request) + '/static/sample.docx',
            'directUrl': docManager.getServerUrl(False, request) + '/static/sample.docx'
        } if isEnableDirectUrl else {
            'fileType': 'docx',
            'url': docManager.getServerUrl(True, request) + '/static/sample.docx'
        }

        # recipient data for mail merging
        dataMailMergeRecipients = {
            'fileType': 'csv',
            'url': docManager.getServerUrl(True, request) + '/csv',
            'directUrl': docManager.getServerUrl(False, request) + '/csv'
        } if isEnableDirectUrl else {
            'fileType': 'csv',
            'url': docManager.getServerUrl(True, request) + '/csv'
        }

        # users data for mentions
        usersForMentions = users.getUsersForMentions(user.id)

        if jwtManager.isEnabled():  # if the secret key to generate token exists
            # encode the edConfig object into a token
            edConfig['token'] = jwtManager.encode(edConfig)
            # encode the dataInsertImage object into a token
            dataInsertImage['token'] = jwtManager.encode(dataInsertImage)
            # encode the dataCompareFile object into a token
            dataCompareFile['token'] = jwtManager.encode(dataCompareFile)
            # encode the dataMailMergeRecipients object into a token
            dataMailMergeRecipients['token'] = jwtManager.encode(
                dataMailMergeRecipients)

        hist = historyManager.getHistoryObject(
            # get the document history
            storagePath, filename, docKey, fileUri, isEnableDirectUrl, request)

        context = {  # the data that will be passed to the template
            'cfg': json.dumps(edConfig),  # the document config in json format
            # the information about the current version
            'history': json.dumps(hist['history']) if 'history' in hist else None,
            # the information about the previous document versions if they exist
            'historyData': json.dumps(hist['historyData']) if 'historyData' in hist else None,
            # the file type of the document (text, spreadsheet or presentation)
            'fileType': fileType,
            # the absolute URL to the api
            'apiUrl': config_manager.document_server_api_url().geturl(),
            # the image which will be inserted into the document
            'dataInsertImage': json.dumps(dataInsertImage)[1: len(json.dumps(dataInsertImage)) - 1],
            # document which will be compared with the current document
            'dataCompareFile': dataCompareFile,
            # recipient data for mail merging
            'dataMailMergeRecipients': json.dumps(dataMailMergeRecipients),
            'usersForMentions': json.dumps(usersForMentions) if user.id != 'uid-0' else None
        }
        # execute the "editor.html" template with context data
        return render(request, template_name, context)
