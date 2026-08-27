const modal = document.getElementById('registration-modal');
const openRegButtons = document.querySelectorAll('.open-reg-modal-btn');
const closeRegButton = document.getElementById('close-reg-modal-btn');


// Loop through every "Register for work" button
openRegButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault(); // stop the link jump '#'
        modal.classList.remove('hidden');
    });
});

function closeRegModal() {
    modal.classList.add('hidden');
}

closeRegButton.addEventListener('click', closeRegModal);


// Close the modal when clicking outside the form on the background
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeRegModal();
    }
});

// Close the modal when pressing the ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
        closeRegModal();
    }
});