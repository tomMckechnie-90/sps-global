from django.db import models

class BermudaPage(models.Model):
    
    class Meta:
        verbose_name = "Bermuda Page Content"
        verbose_name_plural = "Bermuda Page Content"

    # Hero Section
    hero_title = models.CharField(max_length=200, help_text="Main title in the hero section")
    hero_paragraph = models.TextField(help_text="Paragraph in the hero section")

    # Approach Section
    approach_title = models.CharField(max_length=200, help_text="Title for the 'Approach' section")
    approach_subtitle = models.TextField(help_text="Subtitle/intro paragraph for the 'Approach' section")
    approach_paragraph = models.TextField(help_text="Main paragraph for the 'Approach' section")

    # Retention Section
    retention_title = models.CharField(max_length=200, help_text="Title for the 'Why Clients Retain Us' section")
    retention_paragraph = models.TextField(help_text="Paragraph for 'Why Clients Retain Us' section")

    # Insight Section
    insight_title = models.CharField(max_length=200, help_text="Title for the 'Honest Insight' section")
    insight_paragraph = models.TextField(help_text="Paragraph for the 'Honest Insight' section")

    # Hiring Section
    hiring_tile = models.CharField(max_length=200, help_text="Title for the 'Built for Bermuda Hiring' section")
    hiring_intro = models.TextField(help_text="Intro paragraph for the 'Hiring' section")
    hiring_paragraph = models.TextField(help_text="Main paragraph for the 'Hiring' section")

    # Opportunity Section
    
    opportunity_paragraph = models.TextField(help_text="Paragraph for 'The Bermuda Opportunity' section")

    def __str__(self):
        return "Bermuda Page Content"
    


