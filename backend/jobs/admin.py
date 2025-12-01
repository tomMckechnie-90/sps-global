from django.contrib import admin
from .models import Job   # Imported SPS globals job blueprint from models.py


admin.site.register(Job)   # This will let SPS staff manage the jobs database from the admin panel