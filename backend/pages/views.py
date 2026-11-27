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


import requests
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from .reviews import get_google_reviews

class GoogleReviewsView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        try:
            data = get_google_reviews()
            return Response(
                {
                    "rating": data.get("rating"),
                    "total_reviews": data.get("userRatingCount"),
                    "reviews": data.get("reviews", []),
                },
                status=status.HTTP_200_OK,
            )
        except requests.HTTPError as e:
            print("Google API Error Status:", e.response.status_code)
            print("Google API Error Body:", e.response.text)
            return Response (
                {"error": "Reviews are temporarily unavailable."},
                status=status.HTTP_503_SERVICE_UNAVAILABLE,
            )
        except requests.RequestException:
            return Response(
                {"error": "Reviews are temporarily unavailable."},
                status=status.HTTP_503_SERVICE_UNAVAILABLE,
            )