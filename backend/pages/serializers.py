from rest_framework import serializers 
from .models import BermudaPage, BermudaInfoPage

class BermudaPageSerializer(serializers.ModelSerializer):
    class Meta:
        model = BermudaPage
        fields = '__all__'


class BermudaInfoPageSerializer(serializers.ModelSerializer):
    class Meta:
        model = BermudaInfoPage
        fields = '__all__'