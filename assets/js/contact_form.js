document.addEventListener('DOMContentLoaded', function () {
    console.log('Contact logic loaded');

    // =================================================
    // 🔴 OPTION 1: LOCAL DEVELOPMENT (Uncomment for local)
    // const apiUrl = 'http://127.0.0.1:8000/api/contact';

    // =================================================
    // 🟢 OPTION 2: GITHUB PAGES / NGROK (Uncomment for remote)
    // Replace with your current ngrok URL
    // const apiUrl = 'https://heteromorphic-amado-deflexed.ngrok-free.dev/api/contact';

    const apiUrl = 'https://sps-backend-service-170236375136.europe-west2.run.app/api/contact/';

    // GRAB THE HTML ELEMENTS 
    // The candidate and employer buttons
    const btnEmployer = document.getElementById('btn-employer');
    const btnCandidate = document.getElementById('btn-candidate');
    const btnBack = document.getElementById('btn-back');

    // The sections that need to be shown or hidden
    const choiceSection = document.getElementById('contact-choice');
    const formSection = document.getElementById('contact-form-section');
    const form = document.getElementById('inquiry-form');
    const categoryInput = document.getElementById('category-input');
    const successMessage = document.getElementById('success-message');

    // DEFINE THE FUNCTION THAT SWITCHES BETWEEN USER SELECTIONS
    function showForm(category) {
        console.log('User selected:', category);

        if (categoryInput) {
            // Save the choice so we send it to the backend later
            categoryInput.value = category;
        }



        // Visual switch: hide buttons then show the form using simple fade-out/in logic by toggling 'hidden'
        choiceSection.classList.add('hidden');
        formSection.classList.remove('hidden');

        // add a slight scroll to make sure the form comes into view (UX decision)
        formSection.scrollIntoView({ behavior: 'smooth' });
    }

    function hideForm() {
        formSection.classList.add('hidden');
        choiceSection.classList.remove('hidden');

        // Reset the form (clear it)
        if (form) form.reset();

        // Hide the success message if it was shown
        // if (successMessage) successMessage.classList.add('hidden');
        if (form) form.classList.remove('hidden');
    }

    // EVENT LISTENERS FOR EMPLOYER, CANDIDATE AND BACK BUTTONS
    if (btnEmployer) {
        btnEmployer.addEventListener('click', () => showForm('Employer'));
    }
    if (btnCandidate) {
        btnCandidate.addEventListener('click', () => showForm('Candidate'));
    }
    if (btnBack) {
        btnBack.addEventListener('click', hideForm);
    }

    // EVENT LISTENER FOR FORM SUBMIT
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault(); // Stope the page from refreshing (default behavior)

            // Change the button text to indicate loading, enhances UI/UX
            const submitBtn = form.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerText;
            submitBtn.innerText = 'SENDING...';
            submitBtn.disabled = true;

            // Grab the data that has been inputted by the user
            const formData = new FormData(form);
            const data = Object.fromEntries(formData.entries());


            console.log('Sending data:', data);

            // Send the gathered data to Django (API)
            fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'ngrok-skip-browser-warning': 'true',
                },
                body: JSON.stringify(data)
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(result => {
                    console.log('Success:', result);
                    // show the success message
                    successMessage.classList.remove('hidden');
                    formSection.classList.add('hidden');

                    successMessage.scrollIntoView({ behavior: 'smooth', block: 'center' });

                    submitBtn.innerText = originalText;
                    submitBtn.disabled = false;
                    form.reset();
                })
                .catch(error => {
                    console.error('Error', error);
                    alert('Sorry, there was an error sending your message. Please try again.');

                    // Reset the text of the submit button back to original state
                    submitBtn.innerText = originalText;
                    submitBtn.disabled = false;
                })
        })
    }
});