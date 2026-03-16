
# SPS Global Search: Master Technical Manual

## Project Overview & Audience

Welcome to the SPS Global Search technical documentation. This manual is designed to serve both incoming developers responsible for maintaining the codebase and non-technical stakeholders requiring a clear understanding of the platform's infrastructure.

This document outlines the day-to-day maintenance, architectural decisions, and the comprehensive file structure of the SPS Global Headless CMS platform.

## Architectural Deep Dive: The Headless Model

The SPS Global platform utilizes a "Headless" architecture. This means the frontend user interface (what the client sees) is completely decoupled from the backend database (where the data is stored).

### Frontend Hosting: GitHub Pages

We elected to host the frontend via GitHub Pages rather than a traditional server or AWS S3 bucket.
The "Why": GitHub Pages provides an enterprise-grade Global Content Delivery Network (CDN) entirely free of charge. By serving static HTML, CSS, and JavaScript files directly from the repository, we eliminate server-side rendering times. This ensures the site loads near-instantly for users anywhere in the world, while also removing the vulnerability of frontend server crashes.

### Backend API & Database: Google Cloud Run & Cloud SQL

The backend API is built on Django (Python) and hosted on Google Cloud Run, connected to a PostgreSQL database hosted on Google Cloud SQL.
The "Why": Traditional servers (like standard EC2 instances or WordPress hosts) charge a flat monthly fee for 24/7 uptime, regardless of traffic. Google Cloud Run operates on a serverless container model. The Django environment only spins up and consumes compute resources when a user actively interacts with the site (e.g., loading the vacancies grid or submitting a contact form). By combining this with a highly optimized db-f1-micro database instance, we bypassed massive cloud provisioning fees, creating a highly scalable backend that costs a fraction of traditional hosting.

## Exhaustive System File Tree

The repository is split into two distinct environments: the root-level frontend and the isolated backend directory.

### Frontend Directory Structure

/ (Root Directory)

index.html: The primary landing page featuring the hero slider and core sector breakdowns.

about.html: The company history and team grid.

vacancies.html: The core job board containing the JavaScript filtering logic.

vacancie_details.html: The dynamic template page that populates specific job data via API parameters.

contact.html: The dynamic contact form supporting multi-part file uploads (CVs and JDs).


/assets/

/css/

input.css: The raw Tailwind CSS directives.

output.css: The compiled, minified CSS used by the browser.

/icons/: SVG and lightweight PNG iconography (e.g., LinkedIn icons).

/images/: Compressed .webp visual assets divided by page (e.g., /staff/, /slider/).

/js/

contact_form.js: Handles DOM manipulation for dynamic form labels and executes the multipart fetch POST request.

home_jobs.js: Fetches and slices the top 3 active jobs for the index page.

image_sliders.js: Executes the CSS class toggling for the slow-zoom Ken Burns effects.

menu.js: Controls the mobile navigation breakpoint logic.

slider.js: Controls the auto-fading testimonial slider.

vacancies.js: Contains the core client-side filtering algorithms (Location, Role, Type, Keyword) and tab-switching logic.

vacancie_details.js: Extracts the URL parameter, fetches the specific job, and dynamically injects SEO metadata into the Document Object Model (DOM).

### Backend Directory Structure

/backend/

Dockerfile: The exact configuration instructions Google Cloud Build uses to assemble the server container.

requirements.txt: The explicit list of Python dependencies required for the environment.

/sps_project/ (Project Configuration)

settings.py: The master configuration file. This contains critical environment variable routing, distinguishing between local SQLite development and production PostgreSQL connections.

urls.py: The master API routing table.

/jobs/ (Core Application)

models.py: Defines the PostgreSQL database schema for the Job object, including automated reference number generation.

views.py: Contains the Python logic for incoming API requests, including the contact_email function which utilizes EmailMessage to parse and forward binary file attachments.

admin.py: Configures the Django Admin UI, dictating search fields, read-only parameters, and fieldsets.

serializers.py: Transforms Python database objects into standard JSON format for the frontend to consume.

## Day-to-Day Maintenance & Operational Procedures

This section details the standard operating procedures for developing, managing, and deploying updates to the SPS Global platform.

### Local Development Environment

When modifying the frontend user interface, developers must ensure the JavaScript files are pointing to the correct API endpoint to receive data.

Open the relevant JavaScript file (e.g., assets/js/vacancies.js).

Locate the apiUrl variable declarations at the top of the file.

Comment out the Production URL and uncomment the Local Development URL (http://127.0.0.1:8000/api/...).

WARNING (CORS Policy Error): If the browser console throws a "CORS policy" or "Cross-Origin Request Blocked" error during local testing, verify that the Django backend is currently running (python manage.py runserver). Additionally, check backend/sps_project/settings.py to ensure CORS_ALLOWED_ORIGINS explicitly includes your local testing address (e.g., http://127.0.0.1:5500 if using VS Code Live Server).

### Job Board Management (Django Admin)

Non-technical stakeholders can manage the active job roster via the secure Django Administration panel.

Navigate to the secure administrative URL (configured in Cloud Run).

Authenticate using the provided superuser credentials.

Select the Jobs table to view the active database.

When adding a new job, the Sector field strictly dictates which tab the vacancy will appear under on the frontend (Private Household vs. Executive Search).

Ensure the SEO Meta fields (meta_title and meta_description) are populated to ensure optimal search engine indexing for individual vacancy detail pages.

Reference Numbers: The reference_number field is fully editable. The team can manually input their own custom reference numbers based on their internal tracking preferences when posting a new job.

### Deploying Backend Updates

The backend infrastructure utilizes Continuous Integration/Continuous Deployment (CI/CD) via Google Cloud Build.

Commit and push any changes within the /backend/ directory to the main branch of the GitHub repository.

Google Cloud Build will automatically detect the push, parse the Dockerfile, and deploy a new container image to Google Cloud Run.

WARNING (Database Schema Migrations): Pushing code changes to models.py will update the Cloud Run container, but it will not automatically alter the Cloud SQL database columns. If you add or remove a field in the database model, you must manually execute the pre-configured django-migrate Job within the Google Cloud Console to apply the schema changes, otherwise the API will return a 500 Server Error due to missing columns.

### Deploying Frontend Updates

Because the frontend is decoupled and hosted on GitHub Pages, deploying UI updates is immediate and requires no server compilation.

Ensure all apiUrl variables in the JavaScript files are reverted to point to the production Cloud Run URLs.

Commit and push the HTML, CSS, or JS changes to the main branch.

GitHub Pages will invalidate its cache and serve the updated static files globally within approximately two minutes.

WARNING (Browser Caching): If changes are not immediately visible on the live domain, instruct stakeholders to perform a "Hard Refresh" (Ctrl+F5 or Cmd+Shift+R) or view the site in an Incognito window to bypass localized browser caching protocols.

## API Endpoints & Data Flow

The platform relies on two primary REST API endpoints exposed by the Django Cloud Run service.

### The Jobs Endpoint (GET Request)

Endpoint: /api/jobs/

Function: Retrieves a serialized JSON array containing all active job records from the PostgreSQL database.

Frontend Usage: vacancies.js executes a fetch() request to this endpoint on page load. The returned JSON array is stored in memory (allJobs), allowing the client-side JavaScript to perform instantaneous, zero-latency filtering without querying the database a second time.

### The Contact Submission Endpoint (POST Request)

Endpoint: /api/contact/

Function: Receives user inquiry data and parses file attachments before securely routing the payload via SMTP.

Data Structure Requirement: Because this endpoint handles binary file uploads (CVs and Job Descriptions), it must receive a raw FormData object rather than a standard JSON payload.

WARNING (Content-Type Header): When executing the fetch() POST request in contact_form.js, developers must explicitly omit the 'Content-Type': 'application/json' header. Providing no Content-Type header allows the browser to automatically calculate and append the correct multipart/form-data boundary strings required for the binary attachment to successfully reach Django.

## Dynamic SEO Architecture

Because the platform utilizes a single HTML template (vacancie_details.html) to display hundreds of different jobs, traditional static SEO meta tags are insufficient for indexing.

To resolve this, the platform utilizes JavaScript DOM Manipulation upon successful API retrieval.

When a user navigates to a specific job (e.g., ?id=42), vacancie_details.js extracts the ID from the URL parameter.

A dedicated API request is made to /api/jobs/42/.

Upon returning the data, the JavaScript engine targets document.title and the <meta name="description"> node within the <head>.

It injects the specific meta_title and meta_description defined in the Django database directly into the DOM. This allows Google's JavaScript-enabled crawlers to index every individual job as a unique, highly relevant search result.

## Edge Routing & Multi-Domain Architecture

The platform employs a multi-domain strategy consolidated through Cloudflare's edge network. The primary operational domain is spsglobalsearch.com, acting as the single source of truth for all global traffic.

### The Satellite Domain Strategy

Legacy domains (simplyprivatestaff.com and spsexecutivesearch.com) and regional variants (spsglobalsearch.co.uk) act as "satellite" domains.
The "Why": Rather than hosting duplicate codebases (which incurs SEO "duplicate content" penalties and complicates maintenance), these satellite domains are strictly utilized as traffic funnels. They capture existing backlinks, legacy SEO equity, and localized search traffic, seamlessly forwarding users to the primary .com hub.

### Cloudflare Redirect Infrastructure

Domain routing and 301 Permanent Redirects are handled entirely at the DNS level using Cloudflare's Redirect Rules engine.

DNS Proxying: Satellite domains must have their A-records and CNAMEs set to "Proxied" (Orange Cloud) within Cloudflare to intercept HTTP/HTTPS traffic before it reaches a physical server.

Redirect Rules: Cloudflare evaluates incoming traffic against predefined routes. Specific legacy URLs (e.g., /job-search/) are mapped to their exact modern equivalents (e.g., /vacancies.html) to preserve Search Engine Results Page (SERP) rankings.

Catch-All Forwarding: Any URL that does not match a highly specific mapping rule triggers a fallback 301 redirect, automatically forwarding the user to the root spsglobalsearch.com domain.

### Email Routing Independence

WARNING (Mail Exchange Disruption): While HTTP/HTTPS web traffic is heavily proxied through Cloudflare, all Mail Exchange (MX) records and associated TXT (SPF/DKIM) records must remain explicitly unproxied ("DNS Only" / Grey Cloud). Proxying email records will instantly sever the Microsoft 365 Exchange connection, preventing the client from sending or receiving corporate communications.

## Summary

The SPS Global Search platform represents a modern, highly optimized Headless CMS architecture. By decoupling the frontend (GitHub Pages) from the backend (Google Cloud Run and PostgreSQL), the system achieves near-instantaneous global load times, robust security, and significantly reduced hosting overhead. Combined with a strategic edge-routing setup via Cloudflare and dynamic JavaScript-based SEO injection, the platform is engineered for long-term scalability, minimal maintenance, and maximum search engine visibility.