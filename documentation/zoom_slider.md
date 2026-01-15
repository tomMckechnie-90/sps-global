Technical Report: "Living Frames" (Ken Burns Slider)

Date: January 15, 2026
Project: SPS Global Recruitment (Homepage)
Topic: Implementing a high-end, slow-zoom image slider for the "Who We Hire" section.

1. The Challenge

The static images for "Executive Staff" and "Private Staff" were professional but lacked the "luxury" feel required for the brand.

Goal: Create movement and visual interest without distracting the user from the text.

Constraint: Must be lightweight, performant on mobile, and support multiple independent sliders on one page.

2. The Solution: The "Ken Burns" Effect

I implemented a Slow Zoom + Crossfade effect using CSS Transitions and JavaScript.

The Architecture:

The Stack: Instead of swapping the src of a single image, we stacked 3 images on top of each other using position: absolute.

The Choreography (CSS): We used CSS transition to handle the heavy lifting.

Opacity: Fades from 0 to 100.

Transform: Scales from 100% to 110% over 7 seconds.

The Conductor (JS): A JavaScript loop triggers the class changes every 6 seconds.

3. Implementation Details

A. HTML Structure (The Stack)

We used a relative container with overflow-hidden to crop the zooming images.

<div id="exec-slider" class="relative w-full aspect-[4/3] overflow-hidden...">
    <!-- Active Slide -->
    <img class="zoom-slide active-slide absolute inset-0 ... opacity-100 scale-110" ...>
    <!-- Hidden Slide -->
    <img class="zoom-slide absolute inset-0 ... opacity-0 scale-100" ...>
</div>


B. JavaScript Logic (The Loop)

We created a reusable initSlider function that can be applied to any ID (exec-slider, private-slider).

Mechanism: setInterval runs every 6000ms.

The Trick: Before showing a new slide, we quickly reset its scale to 100% (without animation) so it can start the slow zoom fresh.

4. The "Battle Log" (Debugging & Refinement)

Symptom

The "Why" (Theory)

The Fix

Naming Confusion

Started with ken-burns-slide but switched to zoom-slide mid-dev.

Standardized naming convention across HTML and JS to zoom-slide.

Console Error: nextSlide.classList.remove is not a function

Syntax Error (Assignment vs. Invocation). usage of = instead of ().

Changed classList.remove = 'class' to classList.remove('class').

Slides Not Found

JavaScript ran before HTML existed or IDs didn't match.

Added Safety Checks (if (!container) return) to prevent crashes.

Deep Dive: The Syntax Error

This was the critical learning moment of the session.

The Bug: nextSlide.classList.add = 'scale-100'

What happened: I tried to assign a string value to a function, effectively deleting the function.

The Fix: nextSlide.classList.add('scale-100')

The Logic: add is a method (a tool). We must use parentheses () to use the tool.

5. Key Takeaways

Typing code builds muscle memory: Manually typing the logic highlighted the difference between properties (style.transition =) and methods (classList.add()).

CSS does the heavy lifting: By offloading the zoom animation to CSS (duration-[7000ms]), the JavaScript remains simple and the animation is smooth (60fps).

by: Tom McKechnie