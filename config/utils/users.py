"""

 (c) Copyright Ascensio System SIA 2020
 *
 The MIT License (MIT)

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated documentation files (the "Software"), to deal
 in the Software without restriction, including without limitation the rights
 to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 copies of the Software, and to permit persons to whom the Software is
 furnished to do so, subject to the following conditions:

 The above copyright notice and this permission notice shall be included in all
 copies or substantial portions of the Software.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 SOFTWARE.

"""
from django.contrib.auth import get_user_model
from django.contrib.auth.models import AnonymousUser
# from dokeza_2_0.users.models import Visitor
from urllib.parse import unquote

USERS = [
    {
        'uid': 'uid-1',
        'uname': 'mgeni'
    },
]

DEFAULT_USER = USERS[0]

def getNameFromReq(req):
    current_user = req.user

    if current_user == AnonymousUser():
        return DEFAULT_USER['uname']
    elif current_user.first_name:
        return f'{current_user.first_name} {current_user.last_name}'
    elif not current_user.first_name:
        return f'{current_user.email}'

def getIdFromReq(req):
    current_user = req.user

    if current_user.id:
        return f'{current_user.id}'
    else:
        return DEFAULT_USER['uid']
