from django.shortcuts import render

# Create your views here.
def index(request):
    return render(request, 'highlights/index.html', {
        'stingo': request.path.split("/")[-1], 
        'page': 'highlights',
    })