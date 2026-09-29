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
    opportunity_title = models.CharField(max_length=200, help_text="Title for 'The Bermuda Opportunity' section")
    opportunity_paragraph = models.TextField(help_text="Paragraph for 'The Bermuda Opportunity' section")

    def __str__(self):
        return "Bermuda Page Content"
    


class BermudaInfoPage(models.Model):
    
    class Meta:
        verbose_name = "Bermuda Info Page Content"
        verbose_name_plural = "Bermuda Info Page Content"

    # Hero Section
    hero_subheader = models.CharField(max_length=200, help_text="Sub title above the main header in the hero section")
    hero_header = models.CharField(max_length=200, help_text="Header in the hero section")
    hero_paragraph_block = models.TextField(help_text="Paragraph block below the header in the hero section")

    # A realistic view Section
    realistic_subheading = models.CharField(max_length=200, help_text="Sub title above the realistic header")
    realistic_header = models.CharField(max_length=200, help_text="Realistic Header")
    realistic_paragraph_block_1 = models.TextField(help_text="Realistic paragraph block 1")
    realistic_paragraph_block_2 = models.TextField(help_text="Realistic paragraph block 2")
    realistic_paragraph_block_3 = models.TextField(help_text="Realistic paragraph block 3")

    # Cards Section
    the_island_header = models.CharField(max_length=200, help_text="Header for the island card")
    the_island_paragraph_block_1 = models.TextField(help_text="The island paragraph block 1")
    the_island_paragraph_block_2 = models.TextField(help_text="The island paragraph block 2")

    working_in_bermuda_header = models.CharField(max_length=200, help_text="Header for the working in Bermuda card")
    working_in_bermuda_paragraph_block_1 = models.TextField(help_text="Working in Bermuda paragraph block 1")
    working_in_bermuda_paragraph_block_2 = models.TextField(help_text="Working in Bermuda block 2")

    salary_and_tax_header = models.CharField(max_length=200, help_text="Header for the salary and tax card")
    salary_and_tax_paragraph_block_1 = models.TextField(help_text="Salary and tax paragraph block 1")
    salary_and_tax_paragraph_block_2 = models.TextField(help_text="Salary and tax paragraph block 2")

    cost_of_living_header = models.CharField(max_length=200, help_text="Header for the cost of living card")
    cost_of_living_paragraph_block_1 = models.TextField(help_text="Cost of living paragraph block 1")
    cost_of_living_paragraph_block_2 = models.TextField(help_text="Cost of living paragraph block 2")

    # Day-to-day Practicalities
    day_to_day_practicalities_subheader = models.CharField(max_length=200, help_text="Sub title above the Day to day practicalities header")
    day_to_day_practicalities_header = models.CharField(max_length=200, help_text="Day to day practicalities header")
    day_to_day_practicalities_paragraph_block_1 = models.TextField(help_text="Day to day practicalities paragraph block 1")
    day_to_day_practicalities_paragraph_block_2 = models.TextField(help_text="Day to day practicalities paragraph block 2")
    day_to_day_practicalities_paragraph_block_3 = models.TextField(help_text="Day to day practicalities paragraph block 3")
    day_to_day_practicalities_paragraph_block_4 = models.TextField(help_text="Day to day practicalities paragraph block 3")
    day_to_day_practicalities_paragraph_block_5 = models.TextField(help_text="Day to day practicalities paragraph block 5")
    day_to_day_practicalities_paragraph_block_6 = models.TextField(help_text="Day to day practicalities paragraph block 6")
    day_to_day_practicalities_paragraph_block_7 = models.TextField(help_text="Day to day practicalities paragraph block 7")
    day_to_day_practicalities_paragraph_block_8 = models.TextField(help_text="Day to day practicalities paragraph block 8")
    day_to_day_practicalities_paragraph_block_9 = models.TextField(help_text="Day to day practicalities paragraph block 9")

    # Housing Section
    housing_subheading = models.CharField(max_length=200, help_text="Sub title above the housing header")
    housing_header = models.CharField(max_length=200, help_text="Realistic Header")
    housing_paragraph_block_1 = models.TextField(help_text="Realistic paragraph block 1")
    housing_paragraph_block_2 = models.TextField(help_text="Realistic paragraph block 2")
    housing_paragraph_block_3 = models.TextField(help_text="Realistic paragraph block 3")
    housing_paragraph_block_4 = models.TextField(help_text="Realistic paragraph block 4")

    # Lifestyle Section
    lifestyle_subheading = models.CharField(max_length=200, help_text="Sub title above the lifestyle header")
    lifestyle_header = models.CharField(max_length=200, help_text="Lifestyle Header")
    lifestyle_paragraph_block_1 = models.TextField(help_text="Lifestyle paragraph block 1")
    lifestyle_paragraph_block_2 = models.TextField(help_text="Lifestyle paragraph block 2")
    lifestyle_paragraph_block_3 = models.TextField(help_text="Lifestyle paragraph block 3")

    # Be realistic Section
    be_realistic_subheading = models.CharField(max_length=200, help_text="Sub title above the be realistic header")
    be_realistic_header = models.CharField(max_length=200, help_text="be realistic Header")
    be_realistic_paragraph_block_1 = models.TextField(help_text="be realistic paragraph block 1")
    be_realistic_paragraph_block_2 = models.TextField(help_text="be realistic paragraph block 2")
    be_realistic_paragraph_block_3 = models.TextField(help_text="be realistic paragraph block 3")
    be_realistic_paragraph_block_4 = models.TextField(help_text="be realistic paragraph block 4")

    # Ask the questions that matter
    questions_subheading = models.CharField(max_length=200, help_text="Sub title above the be questions header")
    questions_header = models.CharField(max_length=200, help_text="questions Header")
    questions_paragraph_block_1 = models.TextField(help_text="questions paragraph block 1")
    questions_paragraph_block_2 = models.TextField(help_text="questions paragraph block 2")
    questions_paragraph_block_3 = models.TextField(help_text="questions paragraph block 3")


    def __str__(self):
        return "Bermuda Info Page Content"
    