import os

FILE_SIZE_MAX = 5242880
STORAGE_PATH = 'app_data'

DOC_SERV_VIEWED = [".pdf", ".djvu", ".xps"]
DOC_SERV_EDITED = [".docx", ".xlsx", ".csv", ".pptx", ".txt"]
DOC_SERV_CONVERT = [
    ".docm", ".doc", ".dotx", ".dotm", ".dot", ".odt",
    ".fodt", ".ott", ".xlsm", ".xls", ".xltx", ".xltm",
    ".xlt", ".ods", ".fods", ".ots", ".pptm", ".ppt",
    ".ppsx", ".ppsm", ".pps", ".potx", ".potm", ".pot",
    ".odp", ".fodp", ".otp", ".rtf", ".mht", ".html", ".htm", ".epub"
]

DOC_SERV = 'http://192.168.100.82:8082'
DOC_SERV_TIMEOUT = 120000

DOC_SERV_CONVERTER_URL = 'http://192.168.100.82:8082/ConvertService.ashx'
DOC_SERV_API_URL = 'http://192.168.100.82:8082/web-apps/apps/api/documents/api.js'
DOC_SERV_PRELOADER_URL = 'http://192.168.100.82:8082/web-apps/apps/api/documents/cache-scripts.html'

EXAMPLE_DOMAIN = 'http://192.168.100.82:8000/'

DOC_SERV_JWT_SECRET = ''


EXT_SPREADSHEET = [
    ".xls", ".xlsx", ".xlsm",
    ".xlt", ".xltx", ".xltm",
    ".ods", ".fods", ".ots", ".csv"
]

EXT_PRESENTATION = [
    ".pps", ".ppsx", ".ppsm",
    ".ppt", ".pptx", ".pptm",
    ".pot", ".potx", ".potm",
    ".odp", ".fodp", ".otp"
]

EXT_DOCUMENT = [
    ".doc", ".docx", ".docm",
    ".dot", ".dotx", ".dotm",
    ".odt", ".fodt", ".ott", ".rtf", ".txt",
    ".html", ".htm", ".mht",
    ".pdf", ".djvu", ".fb2", ".epub", ".xps"
]


if os.environ.get("EXAMPLE_DOMAIN"):
    EXAMPLE_DOMAIN = os.environ.get("EXAMPLE_DOMAIN")
if os.environ.get("DOC_SERV"):
    base = os.environ.get("DOC_SERV").rstrip('/')
    DOC_SERV_CONVERTER_URL = base + '/ConvertService.ashx'
    DOC_SERV_API_URL = base + '/web-apps/apps/api/documents/api.js'
    DOC_SERV_PRELOADER_URL = base + '/web-apps/apps/api/documents/cache-scripts.html'
