from django.db import models
import random 
import string

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
    is_active = models.BooleanField(default=True)

    SECTOR_CHOICES = [
        ('Private', 'Private Household'),
        ('Executive', 'Executive Search'),
    ]
    sector = models.CharField(
        max_length=20,
        choices=SECTOR_CHOICES,
        default='Private')
    
    contact_email = models.EmailField(default="london@simplyprivatestaff.com")
    reference_number = models.CharField(max_length=20, blank=True, null=True)

    def __str__(self):
        return self.title
    
    class Meta: 
        ordering = ['-id']
    
    # This intercepts the "Save" button right before it hits the database.

    def save(self, *args, **kwargs):
        # If the job does not include a ref number
        if not self.reference_number:
            # generate a random 6 uppercase letters and numbers
            random_string = ''.join(random.choices(string.ascii_uppercase + string.digits, k=6))
            # Stick "SPS" on the front of it
            self.reference_number = f"SPS-{random_string}"

            super().save(*args, **kwargs)



