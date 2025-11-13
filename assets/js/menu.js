// Waits for the whole HTML document to load
document.addEventListener('DOMContentLoaded', () => { 
    console.log('DOM fully loaded. menu.js is running.');
    // get the HTML element IDs and store it in a variables called 'burgerButton' & 'mobileMenu' to access it
    const burgerButton = document.getElementById('burger-button');
    const mobileMenu = document.getElementById('mobile-menu');

    // This is the if block that will check if the buttons are actually found in the HTML 'if' they are not found then the code will not run preventing errors
    if (burgerButton && mobileMenu) {
        console.log('Successfully found burger button and mobile menu elements.');
        // The event listener for the burger button, listens for clicks and runs the code if clicked.
        burgerButton.addEventListener('click', () => {
            console.log('Burger button clicked!');
            // Then toggle the hidden class in the HTML, if it is clicked remove it when clicked again add hidden back to the HTML
            mobileMenu.classList.toggle('hidden');
        });
    } else {
        // if the above elements are not found, show an error in the console
        console.error('Error: Could not find the burger button or the mobile menu element. Check the IDs in index.html.')
    }
});