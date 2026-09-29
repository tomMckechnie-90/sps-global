from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import BermudaPageViewSet, BermudaInfoPageViewSet

router = DefaultRouter()
router.register(r'bermuda-content', BermudaPageViewSet, basename='bermuda-content')
router.register(r'bermuda-info-content', BermudaInfoPageViewSet, basename='bermuda-info-content')

urlpatterns = [
    path('', include(router.urls)),
]