const regModal = document.getElementById('registration-modal');
const openRegButtons = document.querySelectorAll('.open-reg-modal-btn');
const closeRegButton = document.getElementById('close-reg-modal-btn');


// Loop through every "Register for work" button
openRegButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault(); // stop the link jump '#'
        regModal.classList.remove('hidden');
    });
});

function closeRegModal() {
    regModal.classList.add('hidden');
}

closeRegButton.addEventListener('click', closeRegModal);


// Close the reg modal when clicking outside the form on the background
regModal.addEventListener('click', (e) => {
    if (e.target === regModal) {
        closeRegModal();
    }
});

// Close the modal when pressing the ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !regModal.classList.contains('hidden')) {
        closeRegModal();
    }
});