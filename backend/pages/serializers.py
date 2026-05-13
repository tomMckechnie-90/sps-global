from rest_framework import serializers 
from .models import BermudaPage

class BermudaPageSerializer(serializers.ModelSerializer):
    class Meta:
        model = BermudaPage
        fields = '__all__'