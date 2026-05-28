document.addEventListener('DOMContentLoaded', function () {
    console.log('Candidate form script loaded');
    // 1. The email matcher

    // Grab the HTML elements, the two input boxes and the <p> tag that will show the match message.
    const emailInput = document.getElementById('reg_email');
    const confirmEmailInput = document.getElementById('reg_confirm_email');
    const emailMatchMsg = document.getElementById('email_match_msg');
    const successMessage = document.getElementById('success-message');
    const closeBtn = document.getElementById('close-message-btn');

    // Matcher function
    // This logic will compare the text in the email inputs
    function checkEmailMatch() {
        const email = emailInput.value;
        const confirmEmail = confirmEmailInput.value;

        // Run the check if both fields have actually been filled in
        if (email.length > 0 && confirmEmail.length > 0) {
            // ITS A MATCH, now inject the text and apply the TW green class
            if (email === confirmEmail) {
                emailMatchMsg.textContent = 'Your emails match.';
                emailMatchMsg.className = 'text-xs mt-1 text-green-500 font-bold block';
            } else {
                // NOT A MATCH, now inject the text and apply the TW red class
                emailMatchMsg.textContent = 'Your Emails do not match.';
                emailMatchMsg.className = 'text-xs mt-1 text-red-500 font-bold block';
            }
        } else {
            // // If they delete their text and the boxes are empty, hide the message again
            emailMatchMsg.className = 'text-xs mt-1 hidden';
        }
    }
    // The Listeners
    // 'input' means it fires every single time a key is pressed or deleted
    if (emailInput && confirmEmailInput && emailMatchMsg) {
        emailInput.addEventListener('input', checkEmailMatch);
        confirmEmailInput.addEventListener('input', checkEmailMatch);
    }


    // 2. The bio word counter 

    // Grab the HTML Elements
    const bioInput = document.getElementById('reg_bio');
    const bioCounter = document.getElementById('bio_word_counter');
    const maxWords = 250;

    function updateWordCounter() {
        // .trim() removes extra spaces at the beginning and end
        // .split(/\s+/) splits the text into an array of words based on spaces
        let text = bioInput.value.trim();

        // If the box is completely empty, the word count is 0

        let wordCount = text === '' ? 0 : text.split(/\s+/).length;
        // If the users types past 250 words, we slice the array to exactly 250 words
        // and instantly force that chopped text back into the input box
        if (wordCount > maxWords) {
            const choppedWords = text.split(/\s+/).slice(0, maxWords);
            bioInput.value = choppedWords.join(' ');
            wordCount = maxWords;
        }

        // The Hard Stop Lock
        if (wordCount === maxWords) {
            bioInput.setAttribute('maxlength', bioInput.value.length);
        } else {
            bioInput.removeAttribute('maxlength');
        }

        // update the word counter text
        bioCounter.textContent = `${wordCount} / ${maxWords} words`;

        // Turn the word counter text red when they hit the limit
        if (wordCount === maxWords) {
            bioCounter.className = 'text-xs font-bold text-red-500';
        } else {
            bioCounter.className = 'text-xs text-spsaccent font-bold';
        }
    }
    if (bioInput && bioCounter) {
        bioInput.addEventListener('input', updateWordCounter);
    }

    // 3. The other location logic

    // grab the dropdown and hidden container
    const locationDropdown = document.getElementById('reg_preferred_location');
    const otherLocationContainer = document.getElementById('location_other_container');
    const otherLocationInput = document.getElementById('reg_location_other');

    function toggleOtherLocation() {
        if (locationDropdown.value === 'Other') {
            otherLocationContainer.classList.remove('hidden');
            otherLocationInput.required = true;
        } else {
            otherLocationContainer.classList.add('hidden');
            otherLocationInput.required = false;
            otherLocationInput.value = '';
        }
    }

    if (locationDropdown && otherLocationContainer) {
        locationDropdown.addEventListener('change', toggleOtherLocation);
    }

    // 4. Submit / Fetch request 

    const candidateForm = document.getElementById('candidate-registration-form');

    if (closeBtn) {
        closeBtn.addEventListener('click', successMessage.classList.add('hidden'));
    }

    if (candidateForm) {
        candidateForm.addEventListener('submit', async function (e) {
            // Stop the page from refreshing immediately
            e.preventDefault();

            // ==========================================
            // THE FRONTEND FILE SIZE CHECK (DUAL FILES)
            // ==========================================

            const maxSizeInBytes = 5 * 1024 * 1024;

            // Check the CV file
            const cvInput = document.getElementById('cv_file');
            if (cvInput && cvInput.files.length > 0) {
                if (cvInput.files[0].size > maxSizeInBytes) {
                    alert('Your CV file is too large! Please keep it under 5MB.');
                    return;
                }
            }

            // Check the cover letter 
            const introInput = document.getElementById('intro_file');
            if (introInput && introInput.files.length > 0) {
                if (introInput.files[0].size > maxSizeInBytes) {
                    alert('Your Cover letter is too large! Please keep it under 5MB.');
                    return;
                }
            }

            // Run one final check to ensure emails match before sending
            if (emailInput.value !== confirmEmailInput.value) {
                alert("Please ensure your emails match before submitting.");
                return;
            }

            // Package up all inputs, text, and files automatically
            const formData = new FormData(candidateForm);

            try {
                // Update this URL to your active local/ngrok domain
                const response = await fetch('https://sps-backend-service-170236375136.europe-west2.run.app/api/register', {
                    method: 'POST',
                    body: formData,
                    // NOTE: Never manually set 'Content-Type' to JSON here. 
                    // By passing formData, the browser automatically sets the correct headers for file uploads.
                });

                const data = await response.json();

                if (response.ok) {
                    console.log('Success:', data.success);
                    // Redirect to thank you page
                    window.location.href = 'thank_you.html';
                } else {
                    console.error('Backend Error:', data.error);
                    alert("Failed to submit: " + data.error);
                }
            } catch (error) {
                console.error('Network Error:', error);
                alert("A network error occurred.");
            }
        });
    }
});