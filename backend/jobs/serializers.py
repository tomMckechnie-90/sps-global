from rest_framework import serializers  # Import the tools needed from the Django REST Framework
from .models import Job   # import the job data model

"""
A serializer is a translator. It takes the Job data from the Django database (which is a complex Python object) and translates it into the simple JSON format that our frontend needs.

class JobSerializer(...): We define our translator. By using ModelSerializer, we're telling it to automatically create a serializer based on the Job model.

    class Meta: This is a standard inner class where we configure the serializer.

        Variables:
        model = Job: We tell it which model to use as the source.
        fields = '__all__': This is a shortcut that tells the serializer to include all the fields from our Job model in the translation (title, location, description, etc.).
"""


class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = '__all__'
