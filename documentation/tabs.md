# Documentation: About Page Interactive Tabs

## Overview
This feature allows users to switch between the "For Employers" and "For Candidates" sections on the About page without reloading the page. It utilizes JavaScript to toggle visibility classes and update the visual styling of the tab headers.

## Files Involved
1.  **HTML:** `about.html`
2.  **JavaScript:** `assets/js/tabs.js`
3.  **CSS:** `assets/css/output.css` (Tailwind classes)

## HTML Requirements
The JavaScript logic relies on specific IDs existing in the DOM. Ensure the following elements exist in `about.html`:

* **Triggers (Buttons):**
    * `id="employersTab"`
    * `id="candidatesTab"`
* **Content Containers:**
    * `id="forEmployers"`
    * `id="forCandidates"`

**Initial State:**
* The "For Candidates" container (`#forCandidates`) should have the class `hidden` added in the HTML so it is invisible on page load.

## JavaScript Logic Breakdown

### 1. Element Selection
The script waits for `DOMContentLoaded` and then selects the four required elements by ID. If the elements are not found (e.g., on a different page), the script exits early to prevent errors.

### 2. State Management
The state is managed using two sets of Tailwind CSS classes defined in the `styles` object:

* **Active State (`styles.active`):** * `font-bold`, `border-b-2`, `border-spswhite`, `opacity-100`
    * Applied to the currently selected tab.
* **Inactive State (`styles.inactive`):** * `text-spswhite/60`, `hover:text-spswhite`
    * Applied to the unselected tab.

### 3. Switching Logic (`switchTab` function)
When a tab is clicked, the `switchTab` function:
1.  **Toggles Content:** Adds `hidden` to the unselected content ID and removes it from the selected content ID.
2.  **Updates Styles:** Adds `active` classes to the clicked tab and `inactive` classes to the other tab (and vice versa).

## Source Code Reference

```javascript
/**
 * ABOUT PAGE TAB FUNCTIONALITY
 */
document.addEventListener('DOMContentLoaded', function () {
    // Create four variables to hold the reference to tabs and content

    // Get the buttons the user will click
    const employersTab = document.getElementById('employersTab');
    const candidatesTab = document.getElementById('candidatesTab');

    // Get the content that needs to be visible or not visible depending on click
    const employersContent = document.getElementById('forEmployers');
    const candidatesContent = document.getElementById('forCandidates');

    // Event Listeners, These will listen for a mouse click (the ears)

    // Give the Employers Tab some "ears"
    employersTab.addEventListener('click', () => {
        switchTab('employers');
    });

    // Give the Candidates Tab some "ears"
    candidatesTab.addEventListener('click', () => {
        switchTab('candidates');
    });

    // Set active and Inactive classes for tabs (Tailwind)
    const activeClasses = ['font-bold', 'border-b-2', 'border-spswhite', 'opacity-100'];
    const inactiveClasses = ['text-spswhite/60', 'hover:text-spswhite'];
    // The brain, switchTab instruction

    function switchTab(clicked) {

        // If the employers tab is clicked
        if (clicked === 'employers') {
            employersContent.classList.remove('hidden');
            candidatesContent.classList.add('hidden');

            // Update the tab styles when clicked (activeClasses & inactiveClasses)
            // Make employers tab active
            employersTab.classList.add(...activeClasses);
            employersTab.classList.remove(...inactiveClasses);

            // Make candidates tab inactive
            candidatesTab.classList.remove(...activeClasses);
            candidatesTab.classList.add(...inactiveClasses);
        }
        // If the candidates button is clicked 
        else if (clicked === 'candidates') {
            candidatesContent.classList.remove('hidden');
            employersContent.classList.add('hidden');

            // Update the tab styles when clicked (activeClasses & inactiveClasses)
            // Make candidates tab active
            candidatesTab.classList.add(...activeClasses);
            candidatesTab.classList.remove(...inactiveClasses);

            // Make employers tab inactive
            employersTab.classList.remove(...activeClasses);
            employersTab.classList.add(...inactiveClasses);
        }
    }
});