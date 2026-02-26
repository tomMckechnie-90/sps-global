from django.contrib import admin
from .models import Job   # Imported SPS globals job blueprint from models.py

class JobAdmin(admin.ModelAdmin):
    # this protects the reference number so it cannot be changed manually
    readonly_fields = ('reference_number',)




admin.site.register(Job)   # This will let SPS staff manage the jobs database from the admin panel