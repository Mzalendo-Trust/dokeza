import os
import re
from django.contrib.auth.models import AnonymousUser
from django.core.files.storage import FileSystemStorage
from django.http import HttpResponse, FileResponse
from django.shortcuts import render, redirect
from django.views import View
from django.views.decorators.csrf import csrf_protect, csrf_exempt, ensure_csrf_cookie
from django.views.generic import ListView, DetailView, FormView, TemplateView

from config.utils import docbuilderHelper
from bills.models import Bill


default_script = 'If you see this, you do not have the "buildScript"'
with open('dokeza_2_0/static/samples/builder/sample.docbuilder', 'r') as read_file:
    default_script = read_file.read()


def index(request):
    context = {
        'predefined_script': default_script,
        'error_messagee': ''
    }
    return render(request, 'docbuilder/index.html', context)


def generate(request):
    # Get the builder_script
    builder_script = default_script

    response = {}
    
    # get output_file_path be given to the generated 'builder_script' document
    output_file_path = docbuilderHelper.generate_document(builder_script)
    
    # Use the SampleText name in the temporary name
    temp_name = os.path.abspath(output_file_path) or 'output..docx'
    filename = re.search(r'SampleText\.\w+', temp_name)
    
    return FileResponse(open(output_file_path, 'rb'), as_attachment=True, filename=filename.group())


def upload(request):
    if request.method == 'POST' and request.FILES['document']:
        uploaded_file = request.FILES['document']
        fs = FileSystemStorage()
        filename = fs.save(uploaded_file.name, uploaded_file)
        uploaded_file_url = fs.url(filename)
        return render(request, 'docbuilder/index.html', {
            'uploaded_file_url': uploaded_file_url
        })
    return render(request, 'docbuilder/index.html')
   

def report(request, object_id, mode):
    # Get the report builder_script
    
    bill = Bill.objects.get(id=object_id)
    print('path', bill.pdf)

    print('request contents', object_id, mode)

    if mode == 'comments': 
        with open('dokeza_2_0/static/samples/builder/commentReport.docbuilder', 'r') as read_file:
            builder_script = read_file.read()
            doc_with_comments_path = os.path.join('media', f'{bill.pdf}')
    elif mode == 'memorandum':
        with open('dokeza_2_0/static/samples/builder/memorandumReport.docbuilder', 'r') as read_file:
            builder_script = read_file.read()
            doc_with_comments_path = os.path.join('media', f'{bill.pdf}')

    response = {}
    
    # get input_file_path be given to the generated 'builder_script' document
    

    # get output_file_path be given to the generated 'builder_script' document
    output_file_path = docbuilderHelper.generate_report(doc_with_comments_path, builder_script)
    
    # Use the SampleText name in the temporary name
    filename = os.path.abspath(output_file_path) or 'report..docx'
        
    return FileResponse(open(output_file_path, 'rb'), as_attachment=True, filename=filename)

def create(request):
    post_dict = list(request.POST)

    user_name = request.POST['NameText']
    if user_name =='':
        user_name = 'Mkenya Mzalendo'

    company_name = request.POST['CompanyText']
    if company_name == '':
        company_name = 'Mzalendo'

    title_name = request.POST['TitleText']
    if title_name =='':
        title_name = 'Committed Kenyan'
    
    file_format = post_dict[1]

    output_file_path = docbuilderHelper.create_document(user_name, company_name, title_name, file_format)
    
    temp_name = os.path.abspath(output_file_path) or f'output.{file_format}'
    filename = re.sub(r'.*\.', 'My_file.', temp_name)
    
    return FileResponse(open(output_file_path, 'rb'), as_attachment=True, filename=filename)
    