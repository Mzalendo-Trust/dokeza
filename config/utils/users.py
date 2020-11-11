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
from urllib.parse import unquote

DEFAULT_USER = AnonymousUser()

def getUserFromReq(req):
    current_user = req.user
    uid = f'{current_user.id}'
    uname = f'{current_user.first_name} {current_user.last_name}'
    
    if (not uid) | (not uname):
        return DEFAULT_USER
    else:
        return { 'uid': unquote(uid), 'uname': unquote(uname) }

def getNameFromReq(req):
    current_user = req.user
    if current_user.first_name:
        return f'{current_user.first_name}{current_user.last_name}'
    else:
        email_name = re.search(re.search(r'([a-z0-9._%+-]+)', current_user.email))
        return email_name[0]