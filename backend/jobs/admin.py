from django.contrib import admin
from .models import Job   # Imported SPS globals job blueprint from models.py

@admin.register(Job)
class JobAdmin(admin.ModelAdmin):
    # this protects the reference number so it cannot be changed manually
    list_display = ('title', 'reference_number', 'location', 'is_live')
    list_filter = ('sector', 'is_live')
    search_fields = ('title', 'reference_number', 'location')
    readonly_fields = ('reference_number',)

    fieldsets = (
        ('Core Job Details', {
            'fields': ('title', 'sector', 'location', 'job_type', 'salary', 'description')
        }),
        ('SEO & Search Discovery', {
            'fields': ('meta_title', 'meta_description'),
            'description': 'Use these fields to target specific Candidate keywords (e.g., "Radiography jobs abroad").'
        }),
        ('Admin Data', {
            'fields': ('contact_email', 'is_live', 'reference_number')
        }),
    )

## admin.site.register(Job, JobAdmin)