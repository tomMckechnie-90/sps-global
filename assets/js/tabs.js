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