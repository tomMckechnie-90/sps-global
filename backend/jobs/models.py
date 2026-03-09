from django.db import models

""" 
A model is the blueprint for the information you want to save in your database. This will tell Django what information 
makes an SPS global job vacancy.

class Job(models.Model):   defining a blueprint called Job.

Every piece of information (variable) will become a column in the database

Variables:

title = models.CharField(...): A job will have a title, which is a short piece of text (a "character field").
location, job_type, salary: These are also short text fields. blank=True on salary means it's optional.
description = models.TextField(): This is for the main job description, which can be a large block of text.
is_active = models.BooleanField(default=True): This is a simple true/false field to easily control if a job is visible on the website.


def __str__(self):       This is a helper that tells Django to use the job's title as its name, which is useful in the admin area.

"""


class Job(models.Model):
    title = models.CharField(max_length=200)
    location = models.CharField(max_length=100)
    job_type = models.CharField(max_length=50, default='Full Time')
    salary = models.CharField(max_length=100, blank=True)
    description = models.TextField()
    is_live = models.BooleanField(default=True)

    SECTOR_CHOICES = [
        ('Private', 'Private Jobs'),
        ('Executive', 'Executive Jobs'),
    ]
    sector = models.CharField(
        max_length=20,
        choices=SECTOR_CHOICES,
        default='Private')
    
    contact_email = models.EmailField(default="london@simplyprivatestaff.com")
    reference_number = models.CharField(max_length=40, blank=True, null=True, help_text="Enter Unique Job Ref. (Max 40 chars.)")

    # SEO Meta Fields
    meta_title = models.CharField (
        max_length=60,
        blank=True,
        null=True,
        help_text="SEO Title (e.g., 'Palliative Care Nursing Jobs in Bermuda'). Max 60 chars. Overrides default title."
    )
    meta_description = models.CharField(
        max_length=160,
        blank=True,
        null=True,
        help_text="SEO Description to attract users. Max 160 chars."
    )

    def __str__(self):
        return self.title
    
    class Meta: 
        ordering = ['-id']

