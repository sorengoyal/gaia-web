from django.shortcuts import render
from django.http import JsonResponse
import json
def index(request):
    return render(request, 'map_inspector/base.html')

def polygon(request):
    if(request.method != 'POST'):
        return JsonResponse("Should be a Post request")
    body = json.loads(request.body)

    return JsonResponse({"message": "Received the Path:" + json.dumps(body)})