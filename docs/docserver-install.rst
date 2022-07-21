Document Server
================

Installation
------------

How it works
------------

**Opening a file**

1. The user views the browser-based **document manager** to select a document for viewing or editing. The document manager receives the list of all documents available to the user from the **document storage service**.

The document manager is a HTML page (or mobile view) that receives a list of documents processed by a **ListView** class, talking to a **storage.py** that manages a storage space. The storage space can be a remote S3 location or an 'local' Nginx static web server.

2. The **document identifier** is a HTML link on the document manager identifying the document on the **document storage service**. A click on the link launches the **document editor** that is created by **DetailView** and calls to the **document storage service** using the **JavaScript API**.
::
  <div class="document-details">
    <div class="form">{% csrf_token %}
      <div id="iframeEditor">
      </div>
    </div>
  </div>
  <script type="text/javascript" src="https://documentserver/web-apps/apps/api/documents/api.js"></script>

3. The document editor forms a request to the **document editing service** for document opening. The document editor uses the document identifier and its link received from the document manager (at step 2).
::
  <script type="text/javascript" language="javascript">
    var docEditor;
     
    var innerAlert = function (message) {
        if (console && console.log)
            console.log(message);
    };
    var onAppReady = function () {
        innerAlert("Document editor ready");
    };
    var onDocumentStateChange = function (event) {
        var title = document.title.replace(/\*$/g, "");
        document.title = title + (event.data ? "*" : "");
    };
    ...
    var onError = function (event) {
        if (event)
            innerAlert(event.data);
    };
    ...
    var connectEditor = function () {
      config = {{ cfg | safe }}
      config.width = "100%";
      config.height = "100%";
      config.events = {
        'onAppReady': onAppReady,
        'onDocumentStateChange': onDocumentStateChange,
        'onRequestEditRights': onRequestEditRights,
        'onError': onError,
        'onOutdatedVersion': onOutdatedVersion,
      };
      {% if history and historyData %}
        config.events['onRequestHistory'] = function () {
            docEditor.refreshHistory({{ history | safe }});
            };
            config.events['onRequestHistoryData'] = function (event) {
                var ver = event.data;
                var histData = {{ historyData | safe }};
                docEditor.setHistoryData(histData[ver]);
            };
            config.events['onRequestHistoryClose'] = function () {
                document.location.reload();
            };
        {% endif %}
        console.log('config - ', config) // We are logging the config as it goes the the DocEditor
        docEditor = new DocsAPI.DocEditor("iframeEditor", config);
        fixSize();
    };
    ...
  </script> 

The *'request'*:
::
  /* 'config -' */
  
  {
    'type': 'desktop', 
    'documentType': 'word', 
    'document': {
      'title': 'bills/The_Salaries_and_Remuneration_Commission_Amendment_Bill_2020.docx', 
      'url': 'https://dokeza.mzalendo.com/media/bills/The_Salaries_and_Remuneration_Commission_Amendment_Bill_2020.docx', 
      'fileType': 'docx', 
      'key': '-3533976571113772940', 
      'info': None, 'permissions': {
        'comment': True, 
        'download': False, 
        'edit': False, 
        'fillForms': False, 
        'modifyFilter': True,
        'modifyContentControl': False,
        'review': False
      } 
    }, 
    'editorConfig': {
      'mode': 'edit',
      'lang': 'en',
      'callbackUrl': 'https://dokeza.mzalendo.com/bills/track?filename=bills/
      The_Salaries_and_Remuneration_Commission_Amendment_Bill_2020.docx&userAddress=bills',
      'user': {
        'id': '512',
        'name': 'JImmyGitonga'
    },
    'embedded': {
      'saveUrl': 'https://dokeza.mzalendo.com/media/bills/The_Salaries_and_Remuneration_Commission_Amendment_Bill_2020.docx',
        'embedUrl': 'https://dokeza.mzalendo.com/media/bills/The_Salaries_and_Remuneration_Commission_Amendment_Bill_2020.docx',
        'shareUrl': 'https://dokeza.mzalendo.com/media/bills/The_Salaries_and_Remuneration_Commission_Amendment_Bill_2020.docx',
        'toolbarDocked': 'top'
      }, 
      'customization': {
        'about': True,
        'customer': {
          'address': 'P.O. Box 21765 — 00505 Nairobi, Kenya',
          'logo': 'https://dokeza.mzalendo.com/static/images/dokeza-logo-banner.png',
           'email': 'mzalendo.devops@gmail.com'
        },
        'compactHeader': False,
        'goback': {
          'url': 'https://dokeza.mzalendo.com/bills/'
        }
      }
    }
  }
  hist - {}

4. The **document editor** loads a mask and a spinner as the **document editing service** downloads the document file from the document storage service using the ID and link provided above.
::
  <div class="asc-loadmask"></div>
    <div id="" class="asc-loadmask-body " role="presentation" tabindex="-1">
      <i id="loadmask-spinner" class="asc-loadmask-image"></i>
      <div class="asc-loadmask-title">Loading document</div>
    </div>
  </div>

At this step the conversion of the file into **Office Open XML** format is also performed so that the document editor can have better performance and formats compatibility.

When ready the **document editing service** transfers the document file to the browser-based document editor.
The document editor displays the document file and/or (in case the appropriate rights are provided) allows its editing.

After the editing is finished, the **document saving** process takes place.

**Saving a file**

1. The user edits the document in the **document editor**.
2. The **document editor** sends the changes to the **document editing service**.
3. The user closes the **document editor**.
4. The **document editing service** watches the end of work with the document and collects the changes sent from the **document editor** into one document.
5. The **document editing service** informs the **document storage service** about the end of the document editing using the callbackUrl from JavaScript API and returns the link to the modified document.
6. The **document storage service** downloads the document file with all the saved changes from the **document editing service** and stores it.

**How this can be done in practice**

• Create a callback handler to save the document from document editing service.
• Create an html file to Open the document.

In the configuration script for Document Editor initialization specify the URL to the file with the Callback handler in the parameter line.
::
  new DocsAPI.DocEditor("iframeEditor", {
    "document": {
      'title': 'bills/The_Salaries_and_Remuneration_Commission_Amendment_Bill_2020.docx', 
      'url': 'https://dokeza.mzalendo.com/media/bills/The_Salaries_and_Remuneration_Commission_Amendment_Bill_2020.docx', 
      'fileType': 'docx', 
      'key': '-3533976571113772940',
      ...
    },
    "documentType": "word",
    ...
    "editorConfig": {
        'callbackUrl': 'https://dokeza.mzalendo.com/bills/track?filename=bills
    ...
    }
  });
Where the *dokeza.mzalendo.com* is the name of the server where **document manager** and **document storage service** are installed.
Open your html file in the browser and edit your document.

Close the Document Editor. Check out your document in about 10 seconds. All changes should be saved, meaning the configuration is correct.
Save delay
Once the document editing is finished, the document editing service informs the document storage service about it. The time before this is done is calculated using the conversion time of the edited file into the Office Open XML format (which depends on the file size, complexity and the computer power, and can be performed rather a long time), and conversion start delay time (which is equal to 5 seconds by default). In most common cases the time is about 10 seconds after the editing is finished.

The conversion start delay is necessary to allow to return to the file editing session without the file saving, e.g. when reloading the browser page with the file opened for editing. The default conversion start delay time is defined in Document Server configuration file, which can be found at the following path:

For Linux - /etc/onlyoffice/documentserver/default.json.
For Windows - %ProgramFiles%\ONLYOFFICE\DocumentServer\config\default.json.
If you want to change it, you can use the local.json file, where all the edited parameters should be stored. This file is located in the same directory as the default.json file and the whole object structure for the necessary parameter must be retained (see the examples below).