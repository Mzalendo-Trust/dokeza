"""
These 'actions' process the calls made on the page links.

"""

import json
import os
import re

from datetime import datetime
from django.conf import settings
from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.shortcuts import redirect
from django.urls import reverse
from django.views.decorators.csrf import csrf_protect, csrf_exempt, ensure_csrf_cookie

from config.doc_views import index, actions
from config.utils import docManager, fileUtils, serviceConverter, users, jwtManager, historyManager


@csrf_protect
def upload(request):
    response = {}

    try:
        fileInfo = request.FILES['uploadedFile']

        if fileInfo.size > settings.FILE_SIZE_MAX:
            raise Exception('File size is too big')

        curExt = fileUtils.getFileExt(fileInfo.name)
        if not docManager.isSupportedExt(curExt):
            raise Exception('File type is not supported')

        name = docManager.getCorrectName(fileInfo.name, request)
        # If the file is being uploaded by a user, get the current address
        # and add it to the file path.
        path = docManager.getStoragePath(name, request)

        docManager.createFile(fileInfo.file, path, request, True)

        response.setdefault('filename', name)

    except Exception as e:
        response.setdefault('error', f'{e}')
    return HttpResponse(json.dumps(response), content_type='application/json')


def convert(request):
    response = {}

    try:
        filename = request.GET['filename']
        fileUri = docManager.getFileUri(filename, request)
        fileExt = fileUtils.getFileExt(filename)
        fileType = fileUtils.getFileType(filename)
        newExt = docManager.getInternalExtension(fileType)

        if docManager.isCanConvert(fileExt):
            key = docManager.generateFileKey(filename, request)

            newUri = serviceConverter.getConverterUri(fileUri, fileExt, newExt, key, True)

            if not newUri:
                response.setdefault('step', '0')
                response.setdefault('filename', filename)
            else:
                correctName = docManager.getCorrectName(fileUtils.getFileNameWithoutExt(filename) + newExt, request)
                path = docManager.getStoragePath(correctName, request)
                docManager.saveFileFromUri(newUri, path, request, True)
                docManager.removeFile(filename, request)
                response.setdefault('filename', correctName)
        else:
            response.setdefault('filename', filename)

    except Exception as e:
        response.setdefault('error', e.args[0])

    return HttpResponse(json.dumps(response), content_type='application/json')


def createNew(request):
    response = {}
    try:
        fileType = request.GET['fileType']
        sample = request.GET.get('sample', False)

        # new.docx = docManager.createSample(document, none, GET '/users/~documents/create/?fileType=text')
        filename = docManager.createSample(fileType, sample, request)

        # url = '/users/~documents/edit?filename=new.docx' on the new windo with
        # editor.html =>  path("~documents/edit", actions.edit, name="document-edit"),
        return HttpResponseRedirect(f'/users/~documents/edit?filename={filename}')

    except Exception as e:
        response.setdefault('error', f'details - {e}')
    return HttpResponse(json.dumps(response), content_type='application/json')


@csrf_exempt
def edit(request):
    filename = request.GET['filename']
    print("edit - ", request)
    ext = fileUtils.getFileExt(filename)

    fileUri = docManager.getFileUri(filename, request)
    docKey = docManager.generateFileKey(filename, request)
    fileType = fileUtils.getFileType(filename)

    edMode = request.GET.get('mode') if request.GET.get('mode') else 'edit'
    canEdit = docManager.isCanEdit(ext)
    mode = 'edit' if canEdit & (edMode != 'view') else 'view'

    edType = request.GET.get('type') if request.GET.get('type') else 'desktop'
    lang = request.COOKIES.get('ulang') if request.COOKIES.get('ulang') else 'en'

    storagePath = docManager.getStoragePath(filename, request)
    meta = historyManager.getMeta(storagePath)
    infObj = None

    if (meta):
        infObj = {
            'author': meta['uname'],
            'created': meta['created']
        }
    else:
        infObj = {
            'author': 'Me',
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
                'comment': (edMode != 'view') & (edMode != 'fillForms') & (edMode != 'embedded') & (edMode != "blockcontent"),
                'download': True,
                'edit': canEdit & ((edMode == 'edit') | (edMode == 'filter') | (edMode == "blockcontent")),
                'fillForms': (edMode != 'view') & (edMode != 'comment') & (edMode != 'embedded') & (edMode != "blockcontent"),
                'modifyFilter': edMode != 'filter',
                'modifyContentControl': edMode != "blockcontent",
                'review': (edMode == 'edit') | (edMode == 'review')
            }
        },
        'editorConfig': {
            'mode': mode,
            'lang': lang,
            'callbackUrl': docManager.getCallbackUrl(filename, request),
            'user': {
                'id': users.getIdFromReq(request),
                'name': users.getNameFromReq(request)
            },
            'embedded': {
                'saveUrl': fileUri,
                'embedUrl': fileUri,
                'shareUrl': fileUri,
                'toolbarDocked': 'top'
            },
            'customization': {
                'about': True,
                'feedback': True,

                'goback': {
                    'url': settings.SITE_DOMAIN + '/users/~documents/'
                }
            }
        }
    }

    if jwtManager.isEnabled():
        edConfig['token'] = jwtManager.encode(edConfig)

    hist = historyManager.getHistoryObject(storagePath, filename, docKey, fileUri, request)
    context = {
        'cfg': json.dumps(edConfig),
        'history': json.dumps(hist['history']) if 'history' in hist else None,
        'historyData': json.dumps(hist['historyData']) if 'historyData' in hist else None,
        'fileType': fileType,
        'apiUrl': settings.DOC_SERV_API_URL
    }
    return render(request, 'editor.html', context)


@csrf_exempt
def track(request):
    filename = request.GET['filename']
    print("uDoc track - ", request)
    usAddr = request.GET['userAddress']
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
        if (status == 2) | (status == 3):  # mustsave, corrupted
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


def remove(request):
    filename = request.GET['filename']

    response = {}

    docManager.removeFile(filename, request)

    response.setdefault('success', True)
    return HttpResponse(json.dumps(response), content_type='application/json')
