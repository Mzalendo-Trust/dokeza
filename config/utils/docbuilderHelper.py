'''
(c) Copyright Red Afro Limited 2020
The MIT License (MIT)
'''
from datetime import datetime
import json
import os
import re
import random
import tempfile
from pathlib import Path

import subprocess


def generate_document(builder_script):
    save_pattern = 'builder\.SaveFile\s*\(.*\)'
    temp_file_pattern = '\/tmp\/.*\..*\.\.*'
    

    builder_script = cut_builder_script(builder_script)
    file_name = get_file_name(builder_script)
    file_format = file_name.split(".")[1]

    temp_file_path = tempfile.mkstemp(suffix='.docbuilder')[1]
    output_file_path = tempfile.mkstemp(suffix=f'.{file_name}')[1]
    replacement = f'builder.SaveFile("{file_format}", "{output_file_path}")'
    
    builder_script = re.sub(save_pattern, replacement, builder_script)
        
    with open(temp_file_path, 'w', newline=None) as write_to_file:
        write_to_file.write(builder_script)

    build_file(temp_file_path, output_file_path)

    return output_file_path


def generate_report(doc_with_comments_path, builder_script):
    print('report generation start')
    # Make sure that this is a `docbuilder` script
    builder_script = cut_builder_script(builder_script)

    # Get the temp builderScript we are building
    temp_file_path = tempfile.mkstemp(suffix='.docbuilder')[1]
    
    # Get the temp name of the report to be saved
    output_file_path = doc_with_comments_path.split("/")[-1].replace(".docx", "-comment-report.docx")

    # Add the bill name and the sample name into the builder script   
    builder_script = builder_script.replace('${InputDocument}', doc_with_comments_path)
    builder_script = builder_script.replace('${OutputFilePath}', output_file_path)

    # Generate report
    with open(temp_file_path, 'w', newline=None) as write_to_file:
        write_to_file.write(builder_script)

    build_file(temp_file_path, output_file_path)
    
    return output_file_path


def cut_builder_script(builder_script):
    openFunction = "builder.OpenFile"
    createFunction = "builder.CreateFile"
    saveFunction = "builder.SaveFile"
    
    if re.search(openFunction, builder_script) == None:
        print(builder_script)
        raise Exception("OpenFile is not available. Is this file in the .docbuilder format?")

    if re.search(createFunction, builder_script) == None:
        print(builder_script)
        raise Exception("CreateFile is not available. Is this file in the .docbuilder format?")
    
    if re.search(saveFunction, builder_script) == None:
        print(builder_script)
        raise Exception("SaveFile is not available. Is this file in the .docbuilder format?")

    return builder_script
    

def get_file_name(builder_script):
    # name_match = re.search(format_pattern, builder_script)
    name_match = re.search(r'builder\.SaveFile\s*\(\s*\"(\w+)\"\s*\,\s*\"\s*(.+\.\w+)\"\s*\)', builder_script)
    
    if not name_match:
        raise Exception("The document does not have a format to be saved in.")

    doc_format = name_match.group(1).lower() or "";
    file_name = name_match.group(2) or ""

    if file_name != "" and re.search(doc_format, file_name.lower()) != None:
        file_name = file_name.split(".")[0]
    
    return file_name + "." + doc_format


def create_document(user_name, company_name, title_name, file_format):
    if file_format == '':
       pass

    temp_file_path = tempfile.mkstemp(suffix='.docbuilder')[1]
    output_file_path = tempfile.mkstemp(suffix=f'.{file_format}')[1]

    template_path = Path(f'dokeza_2_0/static/samples/builder/{file_format}.docbuilder')

    # Try to see that the template file exists

    template_text = 'If this, bado'
    with open(template_path, 'r', newline=None) as read_to_variable:
        template_text = read_to_variable.read()
    
    now = now = datetime.now()
    user_data = template_text.replace('${Name}', user_name)
    user_data = user_data.replace('${Company}', company_name)
    user_data = user_data.replace('${Title}', title_name)
    user_data = user_data.replace('${DateTime}', now.strftime('%m/%d/%Y, %H:%M:%S'))
    user_data = user_data.replace('${OutputFilePath}', output_file_path)

    with open(temp_file_path, 'w', newline=None) as write_to_file:
        write_to_file.write(user_data)

    build_file(temp_file_path, output_file_path)
    
    return output_file_path


def build_file(temp_file_path, output_file_path):
    with open(output_file_path, 'wb') as write_file:
        p1 = subprocess.run(['/usr/bin/documentbuilder', temp_file_path],
                            stdout=write_file, text=True)
        if p1.returncode == 0:
            os.remove(temp_file_path)
            print('Error Code -', f'{p1.returncode}.', 'Files built')
        else:
            print('Error Code -', f'{p1.returncode}.', 'Files were not built.')

