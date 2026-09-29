from django.shortcuts import render
from rest_framework import viewsets
from .models import BermudaPage, BermudaInfoPage
from .serializers import BermudaPageSerializer, BermudaInfoPageSerializer


class BermudaPageViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = BermudaPage.objects.all()
    serializer_class = BermudaPageSerializer

class BermudaInfoPageViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = BermudaInfoPage.objects.all()
    serializer_class = BermudaInfoPageSerializer
