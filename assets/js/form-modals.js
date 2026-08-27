const modal = document.getElementById('registration-modal');
const openButtons = document.querySelectorAll('.open-modal-btn');
const closeButton = document.getElementById('close-modal-btn');


// Loop through every "Register for work" button
openButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault(); // stop the link jump '#'
        modal.classList.remove('hidden');
    });
});

function closeModal() {
    modal.classList.add('hidden');
}

closeButton.addEventListener('click', closeModal);


// Close the modal when clicking outside the form on the background
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal();
    }
});

// Close the modal when pressing the ESC key
