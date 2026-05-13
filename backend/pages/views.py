from django.shortcuts import render
from rest_framework import viewsets
from .models import BermudaPage
from .serializers import BermudaPageSerializer


class BermudaPageViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = BermudaPage.objects.all()
    serializer_class = BermudaPageSerializer
