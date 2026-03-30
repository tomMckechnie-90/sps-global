from django.shortcuts import render
from rest_framework import viewsets
from .models import Job
from .serializers import JobSerializer
from django.conf import settings
from django.core.mail import EmailMessage
from rest_framework.response import Response
from rest_framework.decorators import api_view

"""
the view handles incoming web requests. We are using a special kind of view from the REST framework called a ViewSet. 
A ViewSet is a brilliant shortcut that automatically creates all the logic needed to list, create, view, update, and delete jobs.

class JobViewSet(viewsets.ModelViewSet): We're creating our view and telling it to use the pre-built ModelViewSet functionality.

    Variables:
    queryset = Job.objects.all(): This is the most important part. We are telling the view that the data it is responsible for is all of the objects from our Job model.
    serializer_class = JobSerializer: We are telling the view to use our JobSerializer as the "translator" whenever it needs to send data back to the frontend.
"""


class JobViewSet(viewsets.ModelViewSet):
    queryset = Job.objects.all()
    serializer_class = JobSerializer
    

@api_view(['POST'])
def contact_email(request):
    """
    Receives JSON data from the frontend and sends an email
    """
    data = request.data
    
    # Get the data from the request
    name = data.get('name', 'Anonymous')
    sender_email = data.get('email', '')
    message = data.get('message', '')
    category = data.get('category', 'General')
    sector = data.get('sector', 'Not Specified')

    # Extract the file
    uploaded_file = request.FILES.get('attachment')
    # Validation
    if not sender_email or not message:
        return Response({'error': 'Email and Message are required'}, status=400)
    
    # Format of the Email content
    subject = f"New Enquiry: {category} from {name}"
    full_body = f"""
    You have received a new enquiry via the website.
    
    Name: {name}
    Email: {sender_email}
    Category: {category}
    Sector Interest: {sector}
    
    Message:
    ------------------------------------
    {message}
    ------------------------------------
    """
    
    # Send the email
    try:
        email = EmailMessage(
            subject=subject,
            body=full_body,
            from_email=settings.DEFAULT_FROM_EMAIL, # From
            to=[settings.TARGET_RECIPIENT_EMAIL], # To (Change later from dummy)
            reply_to=[sender_email]
        )

        if uploaded_file:
            email.attach(uploaded_file.name, uploaded_file.read(), uploaded_file.content_type)
        
        email.send(fail_silently=False)
        return Response({'success': 'Email sent successfully!'})

    except Exception as e:
    # if Gmail decides to reject the email, explain why
        return Response({'error': str(e)}, status=500)


@api_view(['POST'])
def candidate_registration_email(request):
    """
    Receives candidate registration data from the frontend and sends an email
    """
    data = request.data
    
    # 1. Extract EVERY text field matching the HTML 'name' attributes
    first_name = data.get('first_name', 'Anonymous')
    last_name = data.get('last_name', '')
    email = data.get('email', '')
    
    # Geography
    nationality = data.get('nationality', 'Not specified')
    current_country = data.get('current_country', 'Not specified')
    current_city = data.get('current_city', 'Not specified')
    location = data.get('preferred_location', 'Not specified')
    other_location = data.get('location_other', '')
    
    # Professional
    expertise = data.get('expertise', 'Not specified')
    bio = data.get('bio', '')
    
    # Tracking
    source_page = data.get('source_page', 'Unknown')

    # Determine the final location string based on the trapdoor
    final_location = other_location if location == 'Other' else location

    # 2. Extract BOTH files exactly as named in HTML
    cv_file = request.FILES.get('cv_file')
    intro_file = request.FILES.get('intro_file')

    # Validation
    if not email or not first_name:
        return Response({'error': 'Name and Email are required'}, status=400)
    
    # 3. Format the Email content to include everything beautifully
    subject = f"New Candidate Registration: {first_name} {last_name} ({expertise})"
    full_body = f"""
    A new candidate has registered via the website.
    
    --- PERSONAL INFO ---
    Name: {first_name} {last_name}
    Email: {email}
    Source Page: {source_page}
    
    --- GEOGRAPHY ---
    Nationality: {nationality}
    Current Location: {current_city}, {current_country}
    Preferred Placement: {final_location}
    
    --- PROFESSIONAL ---
    Expertise: {expertise}
    
    --- BIO ---
    {bio}
    ------------------------------------
    """
    
    # Send the email
    try:
        email_msg = EmailMessage(
            subject=subject,
            body=full_body,
            from_email=settings.DEFAULT_FROM_EMAIL,
            to=[settings.TARGET_RECIPIENT_EMAIL],
            reply_to=[email]
        )

        # 4. Attach the files if they exist
        if cv_file:
            email_msg.attach(cv_file.name, cv_file.read(), cv_file.content_type)
            
        if intro_file:
            email_msg.attach(intro_file.name, intro_file.read(), intro_file.content_type)
        
        email_msg.send(fail_silently=False)
        return Response({'success': 'Registration sent successfully!'})

    except Exception as e:
        return Response({'error': str(e)}, status=500)