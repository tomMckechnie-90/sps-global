document.addEventListener('DOMContentLoaded', function () {
    const sendClientEmail = document.getElementById('send_client_email');
    const sendClientConfirm = document.getElementById('send_client_confirm_email');
    const sendEmailMatchMsg = document.getElementById('send_client_email_match_msg');

    function checkSendClientEmailMatch() {
        const email = sendClientEmail.value;
        const confirmEmail = sendClientConfirm.value;

        // run the check if both email fields have text in them
        if (email.length > 0 && confirmEmail.length > 0) {
            if (email === confirmEmail) {
                sendEmailMatchMsg.textContent = 'Your emails match';
                sendEmailMatchMsg.className = 'text-xs mt-1 text-green-500 font-bold block';
            } else {
                sendEmailMatchMsg.textContent = 'Your emails do not match';
                sendEmailMatchMsg.className = 'text-xs mt-1 text-red-500 font-bold block';
            }
        } else {
            // message is hidden if text is deleted
            sendEmailMatchMsg.className = 'text-xs mt-1 hidden';
        }
    }

    if (sendClientEmail && sendClientConfirm && sendEmailMatchMsg) {
        sendClientEmail.addEventListener('input', checkSendClientEmailMatch);
        sendClientConfirm.addEventListener('input', checkSendClientEmailMatch);
    }


    // 1. Grab the form 
    const sendInquiryForm = document.getElementById('send-inquiry-form');

    if (sendInquiryForm) {
        sendInquiryForm.addEventListener('submit', async function (e) {
            // Stop the page from refreshing immediately
            e.preventDefault();

            // ==========================================
            //  SAFETY CHECK 1: FILE SIZE
            // ==========================================
            const fileInput = document.getElementById('attachment');

            // If there is a file attached, check its size
            if (fileInput && fileInput.files.length > 0) {
                const maxSizeInBytes = 5 * 1024 * 1024; // 5 Megabytes

                if (fileInput.files[0].size > maxSizeInBytes) {
                    alert('Your file is too large! Please ensure it is under 5MB.');
                    return; // This stops the form dead in its tracks
                }
            }

            // ==========================================
            //  SAFETY CHECK 2: EMAILS MATCH
            // ==========================================
            if (sendClientEmail.value !== sendClientConfirm.value) {
                alert("Please ensure your emails match before submitting.");
                return; // Stops the form again
            }

            // ==========================================
            //  UI UPDATE: SHOW "SENDING..."
            // ==========================================
            const submitBtn = sendInquiryForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerText;
            submitBtn.innerText = 'SENDING...';
            submitBtn.disabled = true; // Prevents the user from clicking it twice

            // ==========================================
            //  PACKAGE AND SEND THE DATA
            // ==========================================
            // This grabs every single input and file automatically!
            const formData = new FormData(sendInquiryForm);

            try {
                // We send it to your existing Client API endpoint
                const apiUrl = 'https://sps-backend-service-170236375136.europe-west2.run.app/api/contact';

                const response = await fetch(apiUrl, {
                    method: 'POST',
                    body: formData
                    // Note: FormData automatically handles the confusing file upload headers for us!
                });

                const result = await response.json();

                if (response.ok) {
                    console.log('Success:', result);
                    // Send them to your thank you page
                    window.location.href = 'thank_you.html';
                } else {
                    console.error('Backend Error:', result.error);
                    alert("Failed to submit: " + result.error);

                    // Reset the button so they can try again
                    submitBtn.innerText = originalText;
                    submitBtn.disabled = false;
                }
            } catch (error) {
                console.error('Network Error:', error);
                alert("Sorry, there was an error connecting to the server. Please try again.");

                // Reset the button so they can try again
                submitBtn.innerText = originalText;
                submitBtn.disabled = false;
            }
        });
    }
});