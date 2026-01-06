# Technical Report: Hybrid Development Environment Setup

Date: January 06, 2026
Project: SPS Global Recruitment (Headless CMS)
Topic: Connecting GitHub Pages (Public Frontend) to Local Django (Private Backend)

## 1. The Challenge

We needed to test the "Headless" architecture of the site.

The "Head" (Frontend): Was deployed live on GitHub Pages (Public Internet).

The "Body" (Backend): Was running locally on a development laptop (Localhost:8000).

The Problem: A website on the public internet (GitHub) cannot access a local server (127.0.0.1) because localhost refers to the user's computer, not the developer's server.

## 2. The Solution: Tunnelling with Ngrok

I implemented Ngrok to create a secure tunnel. This exposes a specific port on the local machine (Port 8000) to a public URL (https://....ngrok-free.dev).

Architecture Flow:

Browser Request: User visits GitHub Pages -> JS triggers fetch().

The Tunnel: Request hits the public Ngrok URL.

The Forwarding: Ngrok forwards the request securely through the internet firewall to the local laptop.

The Backend: Django processes the request and returns JSON data back through the tunnel to the browser.

## 3. Implementation Steps

A. Frontend (JavaScript)

I Updated vacancies.js to handle two environments using a "comment-out" strategy.

Local Mode: Points to http://127.0.0.1:8000.

GitHub Mode: Points to the Ngrok URL.

Key Modification: Added a custom header to bypass Ngrok's security warning page.

headers: { 'ngrok-skip-browser-warning': 'true' }


## B. Backend (Django Settings)

We modified settings.py to trust the incoming tunnel traffic.

ALLOWED_HOSTS: Added .ngrok-free.dev so Django doesn't reject the domain name.

CORS_ALLOWED_ORIGINS: Added the GitHub Pages URL so browsers allow the cross-origin request.

CORS_ALLOW_HEADERS: Explicitly whitelisted the ngrok-skip-browser-warning header.

## 4. The Debugging Path: A Step-by-Step Resolution

We didn't solve the connection in one go. Instead, we peeled back the layers of security one by one. Here is the chronological path of errors we encountered and resolved:

### Phase 1: Establishing the Link

#### Obstacle 1: The Local Barrier

Error: fetch('http://127.0.0.1:8000') failed (Connection Refused).

Diagnosis: The live site on GitHub cannot "see" my laptop's localhost.

Fix: Installed Ngrok to create a public tunnel.

#### Obstacle 2: Execution Policy

Error: ngrok : The term 'ngrok' is not recognized.

Diagnosis: PowerShell didn't know where the downloaded file was.

Fix: Moved ngrok.exe to the project root and ran it with .\ngrok.

#### Obstacle 3: Tunnel Auth

Error: ERR_NGROK_4018 (Authentication failed).

Diagnosis: Ngrok now requires a free account to prevent abuse.

Fix: Created an account and ran .\ngrok config add-authtoken ....

### Phase 2: Configuring the Request (Frontend)

#### Obstacle 4: The Copy-Paste Trap

Error: Failed to parse URL.

Diagnosis: I accidentally pasted terminal output (-> http://localhost) into the JS string.

Fix: Cleaned the apiUrl variable in vacancies.js.

#### Obstacle 5: The "HTML in JSON's Clothing"

Error: SyntaxError: Unexpected token <.

Diagnosis: Ngrok served an HTML "Warning" page instead of JSON API data. The JS tried to parse <DOCTYPE html> as JSON and crashed.

Fix: Added the ngrok-skip-browser-warning: true header to the fetch request.

### Phase 3: Unlocking the Server (Backend)

#### Obstacle 6: The Header Guard (CORS)

Error: Request header field ... is not allowed by Access-Control-Allow-Headers.

Diagnosis: Django received the request but rejected our custom Ngrok header as "unknown/unsafe."

Fix: Updated CORS_ALLOW_HEADERS in settings.py to whitelist the custom header.

#### Obstacle 7: The Hostname Guard

Error: 400 Bad Request.

Diagnosis: Django validates the Host header. It saw the request coming from a .dev domain (Ngrok) which wasn't on the approved guest list.

Fix: Added .ngrok-free.dev to ALLOWED_HOSTS in settings.py.

Result: 🟢 Status 200 OK. Live data received.

## 5. Why We Took This Approach

Instead of deploying the backend to Google Cloud (Production) immediately, we used this hybrid approach because:

Speed: We can debug backend code instantly on the laptop without waiting for a 5-minute Cloud deployment.

Cost: We avoid Cloud Run costs during the heavy testing phase.

Realism: It proves the "Headless" concept works over the real internet, not just on a local machine.

Logged by: Tom McKechnie & Gemini (assisted in the debugging process).