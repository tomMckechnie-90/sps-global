import requests
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
    
    # -------------------------------------------------------------------------
    # 1. THE TEXT TRUNCATION PATCH
    # -------------------------------------------------------------------------
    name = str(data.get('name', 'Anonymous'))[:100]
    sender_email = str(data.get('email', ''))[:254]
    category = str(data.get('category', 'General'))[:100]
    sector = str(data.get('sector', 'Not Specified'))[:100]
    # Cap the message at 2000 characters to prevent massive text injections
    message = str(data.get('message', ''))[:2000] 

    # Basic missing data validation
    if not sender_email or not message:
        return Response({'error': 'Email and Message are required'}, status=400)

    # -------------------------------------------------------------------------
    # 2. THE FILE BOMB & TYPE PATCH
    # -------------------------------------------------------------------------
    uploaded_file = request.FILES.get('attachment')
    
    MAX_FILE_SIZE = 5 * 1024 * 1024  # 5 Megabytes in bytes
    ALLOWED_TYPES = [
        'application/pdf', 
        'application/msword', 
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ]

    if uploaded_file:
        if uploaded_file.size > MAX_FILE_SIZE:
            return Response({'error': f"Error: {uploaded_file.name} exceeds the 5MB security limit."}, status=400)
        
        if uploaded_file.content_type not in ALLOWED_TYPES:
            return Response({'error': f"Error: {uploaded_file.name} is not a permitted file type. Only PDF and Word documents are allowed."}, status=400)
    
    # -------------------------------------------------------------------------
    # 3. FORMAT AND SEND THE SECURED DATA
    # -------------------------------------------------------------------------
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
    
    try:
        email_msg = EmailMessage(
            subject=subject,
            body=full_body,
            from_email=settings.DEFAULT_FROM_EMAIL, # From
            to=[settings.TARGET_RECIPIENT_EMAIL], # To 
            reply_to=[sender_email]
        )

        if uploaded_file:
            email_msg.attach(uploaded_file.name, uploaded_file.read(), uploaded_file.content_type)
        
        email_msg.send(fail_silently=False)
        return Response({'success': 'Email sent successfully!'})

    except Exception as e:
        # Sanitize error output so we do not expose server architecture to the frontend
        return Response({'error': 'An internal server error occurred while sending the email.'}, status=500)


@api_view(['POST'])
def candidate_registration_email(request):
    """
    Receives candidate registration data from the frontend and sends an email
    """
    data = request.data

    # ==========================================================================
    # THE CLOUDFLARE TURNSTILE CHECK
    # ==========================================================================

    # Get the secret key from cloudflare that the JS FormData sent over
    turnstile_token = data.get('cf-turnstile-response', '')

    # If there is not a token, a bot has bypassed the HTML. Bounce them instantly.
    if not turnstile_token:
        return Response ({'error': 'Security check failed. No Turnstile token provided.'}, status=400)
    
    # Get the secret key from the settings.py
    TURNSTILE_SECRET = settings.TURNSTILE_SECRET_KEY

    # Package up the token and secret kay to send back over to cloudflare
    cloudflare_data = {
        'secret': TURNSTILE_SECRET,
        'response': turnstile_token
    }

    try:
        # Make the call to cloudflare's secure API
        cloudflare_response = requests.post(
            'https://challenges.cloudflare.com/turnstile/v0/siteverify',
            data=cloudflare_data
        )
        outcome = cloudflare_response.json()

        # If outcome is false, the token is fake or expired.
        if outcome.get('success') is False:
            return Response({'error': 'Bot activity detected by Cloudflare Turnstile.'}, status=403)
    except Exception as e:
        # If the cloudflare server is down, handle it here.
        return Response({'error': 'Could not reach security verification servers.'}, status=500)

    
    # -------------------------------------------------------------------------
    # 1. THE TEXT TRUNCATION PATCH
    # We force string conversions and slice them to safe lengths to prevent memory spikes
    # -------------------------------------------------------------------------
    first_name = str(data.get('first_name', 'Anonymous'))[:100]
    last_name = str(data.get('last_name', ''))[:100]
    email = str(data.get('email', ''))[:254] # 254 is the max length of a valid email
    
    nationality = str(data.get('nationality', 'Not specified'))[:100]
    current_country = str(data.get('current_country', 'Not specified'))[:100]
    current_city = str(data.get('current_city', 'Not specified'))[:100]
    location = str(data.get('preferred_location', 'Not specified'))[:100]
    other_location = str(data.get('location_other', ''))[:100]
    
    expertise = str(data.get('expertise', 'Not specified'))[:150]
    # The bio is limited to roughly 300 words (approx 2000 characters)
    bio = str(data.get('bio', ''))[:2000] 
    
    source_page = str(data.get('source_page', 'Unknown'))[:100]
    final_location = other_location if location == 'Other' else location

    # -------------------------------------------------------------------------
    # 2. THE FILE BOMB & TYPE PATCH
    # -------------------------------------------------------------------------
    cv_file = request.FILES.get('cv_file')
    intro_file = request.FILES.get('intro_file')

    MAX_FILE_SIZE = 5 * 1024 * 1024  # 5 Megabytes in bytes
    ALLOWED_TYPES = [
        'application/pdf', 
        'application/msword', 
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ]

    def validate_file(file_obj):
        """Helper function to securely check files before reading them"""
        if not file_obj:
            return None # No file is fine, we just skip it
        if file_obj.size > MAX_FILE_SIZE:
            return f"Error: {file_obj.name} exceeds the 5MB security limit."
        if file_obj.content_type not in ALLOWED_TYPES:
            return f"Error: {file_obj.name} is not a permitted file type. Only PDF and Word documents are allowed."
        return None

    # Run the security checks on both files
    cv_error = validate_file(cv_file)
    if cv_error:
        return Response({'error': cv_error}, status=400)
        
    intro_error = validate_file(intro_file)
    if intro_error:
        return Response({'error': intro_error}, status=400)

    # Basic missing data validation
    if not email or not first_name:
        return Response({'error': 'Name and Email are required'}, status=400)
    
    # -------------------------------------------------------------------------
    # 3. FORMAT AND SEND THE SECURED DATA
    # -------------------------------------------------------------------------
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
    
    try:
        email_msg = EmailMessage(
            subject=subject,
            body=full_body,
            from_email=settings.DEFAULT_FROM_EMAIL,
            to=[settings.TARGET_RECIPIENT_EMAIL],
            reply_to=[email]
        )

        if cv_file:
            email_msg.attach(cv_file.name, cv_file.read(), cv_file.content_type)
            
        if intro_file:
            email_msg.attach(intro_file.name, intro_file.read(), intro_file.content_type)
        
        email_msg.send(fail_silently=False)
        return Response({'success': 'Registration sent successfully!'})

    except Exception as e:
        # Print the actual error to your terminal/logs so the dev can debug!
        print(f"RESEND EMAIL ERROR: {e}") 
        return Response({'error': 'An internal server error occurred while sending the email.'}, status=500)