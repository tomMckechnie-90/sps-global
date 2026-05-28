document.addEventListener('DOMContentLoaded', function () {
    console.log('Contact logic loaded');

    // =================================================
    // 🔴 OPTION 1: LOCAL DEVELOPMENT (Uncomment for local)
    // const apiUrl = 'http://127.0.0.1:8000/api/contact';

    // =================================================
    // 🟢 OPTION 2: GITHUB PAGES / NGROK (Uncomment for remote)
    // Replace with your current ngrok URL
    // const apiUrl = 'https://heteromorphic-amado-deflexed.ngrok-free.dev/api/contact';

    const apiUrl = 'https://sps-backend-service-170236375136.europe-west2.run.app/api/contact';

    // GRAB THE HTML ELEMENTS 
    // The candidate and employer buttons
    const btnEmployer = document.getElementById('btn-employer');
    const btnCandidate = document.getElementById('btn-candidate');
    const btnBack = document.getElementById('btn-back');

    // The sections that need to be shown or hidden
    const choiceSection = document.getElementById('contact-choice');
    const formSection = document.getElementById('contact-form-section');
    const candidateFormSection = document.getElementById('candidate-form-section');
    const btnCandidateBack = document.getElementById('btn-candidate-back');
    const form = document.getElementById('inquiry-form');
    const candidateForm = document.getElementById('candidate-registration-form');
    const categoryInput = document.getElementById('category-input');
    const successMessage = document.getElementById('success-message');

    const attachmentLabel = document.getElementById('attachment-label');

    // DEFINE THE FUNCTION THAT SWITCHES BETWEEN USER SELECTIONS
    function showForm(category) {
        console.log('User selected:', category);

        if (categoryInput) {
            // Save the choice so we send it to the backend later
            categoryInput.value = category;
        }

        if (attachmentLabel) {
            if (category === 'Employer') {
                attachmentLabel.innerText = 'Attach Job Description';
            } else if (category === 'Candidate') {
                attachmentLabel.innerText = 'Attach CV';
            }
        }



        choiceSection.classList.add('hidden');

        // Show the correct form based on the button clicked
        if (category === 'Employer') {
            formSection.classList.remove('hidden');
            formSection.scrollIntoView({ behavior: 'smooth' });
        } else if (category === 'Candidate') {
            candidateFormSection.classList.remove('hidden');
            candidateFormSection.scrollIntoView({ behavior: 'smooth' });
        }
    }

    function hideForm() {
        formSection.classList.add('hidden');
        candidateFormSection.classList.add('hidden');
        choiceSection.classList.remove('hidden');

        // Reset the forms (clear them)
        if (form) form.reset();
        if (candidateForm) candidateForm.reset();

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

    if (btnCandidateBack) {
        btnCandidateBack.addEventListener('click', hideForm);
    }

    // EVENT LISTENER FOR FORM SUBMIT
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault(); // Stope the page from refreshing (default behavior)

            // ==========================================
            //  THE FRONTEND FILE SIZE CHECK
            // ==========================================

            // Grab the file input element
            const fileInput = document.getElementById('attachment');

            // Check if the user actually attached a file
            if (fileInput.isDefaultNamespace.length > 0) {

                // Get the size of the first file in bytes
                const filesSize = fileInput.files[0].size;
                const maxSizeInBytes = 5 * 1024 * 1024;

                // The bounce logic
                if (filesSize > maxSizeInBytes) {
                    alert('Your file is too large! Please ensure it is under 5MB.');
                    return;
                }
            }

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
                body: formData
            })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.json();
                })
                .then(result => {
                    console.log('Success:', result);

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