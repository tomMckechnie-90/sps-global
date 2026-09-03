// 1. Grab candidate email inputs and message label
const sendCandidateEmail = document.getElementById('send_candidate_email');
const sendCandidateConfirm = document.getElementById('send_candidate_confirm_email');
const sendCandEmailMatchMsg = document.getElementById('candidate_email_match_msg');

// 2. Email comparison logic
function checkSendCandEmailMatch() {
    const email = sendCandidateEmail.value;
    const confirmEmail = sendCandidateConfirm.value;

    if (email.length > 0 && confirmEmail.length > 0) {
        if (email === confirmEmail) {
            sendCandEmailMatchMsg.textContent = 'Your emails match.';
            sendCandEmailMatchMsg.className = 'text-xs mt-1 text-green-500 font-bold block';
        } else {
            sendCandEmailMatchMsg.textContent = 'Your emails do not match.';
            sendCandEmailMatchMsg.className = 'text-xs mt-1 text-red-500 font-bold block';
        }
    } else {
        sendCandEmailMatchMsg.className = 'text-xs mt-1 hidden';
    }
}

// 3. Real-time typing listeners
if (sendCandidateEmail && sendCandidateConfirm && sendCandEmailMatchMsg) {
    sendCandidateEmail.addEventListener('input', checkSendCandEmailMatch);
    sendCandidateConfirm.addEventListener('input', checkSendCandEmailMatch);
}

const sendCandidateForm = document.getElementById('send-candidate-form');

if (sendCandidateForm) {
    sendCandidateForm.addEventListener('submit', async function (e) {
        e.preventDefault();

        // 1. Check file sizes (Max 5MB each)
        const cvInput = document.getElementById('send_reg_cv');
        const introInput = document.getElementById('send_reg_intro');
        const maxBytes = 5 * 1024 * 1024; // 5MB

        if (cvInput && cvInput.files.length > 0) {
            if (cvInput.files[0].size > maxBytes) {
                alert('Your CV exceeds the 5MB limit. Please upload a smaller file.');
                return;
            }
        }

        if (introInput && introInput.files.length > 0) {
            if (introInput.files[0].size > maxBytes) {
                alert('Your Cover Letter exceeds the 5MB limit. Please upload a smaller file.');
                return;
            }
        }

        // 2. Validate email confirmation
        if (sendCandidateEmail.value !== sendCandidateConfirm.value) {
            alert('Please ensure your email addresses match before submitting.');
            return;
        }

        // 3. UI state
        const submitBtn = sendCandidateForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerText;
        submitBtn.innerText = 'REGISTERING...';
        submitBtn.disabled = true;

        // 4. Gather data
        const formData = new FormData(sendCandidateForm);

        try {
            // Dedicated candidate endpoint
            const apiUrl = 'https://sps-backend-service-170236375136.europe-west2.run.app/api/send-candidate-contact-email/';

            const response = await fetch(apiUrl, {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            if (response.ok) {
                window.location.href = 'thank_you.html';
            } else {
                alert('Submission failed: ' + (result.error || 'Unknown error'));
                submitBtn.innerText = originalText;
                submitBtn.disabled = false;
            }
        } catch (error) {
            console.error('Candidate Submission Error:', error);
            alert('A network error occurred while submitting your registration. Please try again.');
            submitBtn.innerText = originalText;
            submitBtn.disabled = false;
        }
    });
}