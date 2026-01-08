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

            if (mobileMenu.classList.contains('max-h-0')){
            mobileMenu.classList.remove('max-h-0', 'opacity-0');
            mobileMenu.classList.add('max-h-screen', 'opacity-100');
            } else {
                mobileMenu.classList.remove('max-h-screen', 'opacity-100');
                mobileMenu.classList.add('max-h-0', 'opacity-0');
            }

        });
    } else {
        // if the above elements are not found, show an error in the console
        console.error('Error: Could not find the burger button or the mobile menu element. Check the IDs in index.html.')
    }
});