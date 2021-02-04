from django.shortcuts import render

def index(request):
    return render(request, 'tracker/index.html', {
        'upath': request.path.split("/")[-1], 'page': 'tracker',
    })
