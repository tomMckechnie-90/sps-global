from django.shortcuts import render
from rest_framework import viewsets
from .models import Job
from .serializers import JobSerializer

"""
the view handles incoming web requests. We are using a special kind of view from the REST framework called a ViewSet. 
A ViewSet is a brilliant shortcut that automatically creates all the logic needed to list, create, view, update, and delete jobs.

class JobViewSet(viewsets.ModelViewSet): We're creating our view and telling it to use the pre-built ModelViewSet functionality.

    Variables:
    queryset = Job.objects.all(): This is the most important part. We are telling the view that the data it is responsible for is all of the objects from our Job model.
    serializer_class = JobSerializer: We are telling the view to use our JobSerializer as the "translator" whenever it needs to send data back to the frontend.
"""


class JobViewSet(viewsets.ModelViewSet):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
