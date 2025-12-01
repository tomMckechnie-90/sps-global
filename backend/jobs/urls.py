from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import JobViewSet


# Create a router and register the viewset with it
router = DefaultRouter()
router.register(r'jobs', JobViewSet, basename='job')


urlpatterns = [
    path('', include(router.urls),)
]
