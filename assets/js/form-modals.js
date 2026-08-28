// Reg model
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


// Client model
const clientModal = document.getElementById('client-modal');
const openClientButtons = document.querySelectorAll('.open-client-modal-btn');
const closeClientButtons = document.getElementById('close-client-modal-btn');


// Loop through every "Discuss staffing needs button" button
openClientButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault(); // stop the link jump '#'
        clientModal.classList.remove('hidden');
    });
});

function closeClientModal() {
    clientModal.classList.add('hidden');
}

closeClientButtons.addEventListener('click', closeClientModal);


// Close the reg modal when clicking outside the form on the background
clientModal.addEventListener('click', (e) => {
    if (e.target === clientModal) {
        closeClientModal();
    }
});

// Close the modal when pressing the ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !clientModal.classList.contains('hidden')) {
        closeClientModal();
    }
});

// SEND Client modal
const sendModal = document.getElementById('send-client-modal');
const openSendButton = document.querySelectorAll('.open-send-client-modal');
const closeSendButton = document.getElementById('close-send-client-modal-btn');


// Loop through every "SEND support button" button
openSendButton.forEach(button => {
    button.addEventListener('click', (e) => {
        e.preventDefault(); // stop the link jump '#'
        sendModal.classList.remove('hidden');
    });
});

function closeSendModal() {
    sendModal.classList.add('hidden');
}

closeSendButton.addEventListener('click', closeSendModal);


// Close the reg modal when clicking outside the form on the background
sendModal.addEventListener('click', (e) => {
    if (e.target === sendModal) {
        closeSendModal();
    }
});

// Close the modal when pressing the ESC key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !sendModal.classList.contains('hidden')) {
        closeSendModal();
    }
});