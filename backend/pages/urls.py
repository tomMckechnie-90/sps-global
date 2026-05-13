from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BermudaPageViewSet

router = DefaultRouter()
router.register(r'bermuda-content', BermudaPageViewSet, basename='bermuda-content')

urlpatterns = [
    path('', include(router.urls)),
]