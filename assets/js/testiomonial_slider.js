document.addEventListener('DOMContentLoaded', function () {
    console.log('Automatic testimonial slider script loaded');

    // Grab all the elements and store them in variables 
    const slides = document.querySelectorAll('.testimonial-slide');

    // Timer Settings
    const slideIntervalTime = 5000;
    const fadeTime = 1000;

    // Start at the first slide
    let currentSlideIndex = 0;

    // Animation function
    function nextSlide() {
        // Identify the activeSlide
        const activeSlide = slides[currentSlideIndex];

        // Calculate the index of the next slide
        currentSlideIndex++;
        if (currentSlideIndex >= slides.length) {
            currentSlideIndex = 0;
        }
        const newSlide = slides[currentSlideIndex];

        // start fade out animation
        activeSlide.classList.remove('opacity-100');
        activeSlide.classList.add('opacity-0');

        // wait for the fade out to finish
        setTimeout(() => {
            activeSlide.classList.add('hidden');
            activeSlide.classList.remove('active-slide');

            // prepare the next slide
            newSlide.classList.remove('hidden');
            newSlide.classList.add('active-slide');

            // Small delay (a trick called repaint) to make sure the browser see it's there before fading in
            setTimeout(() => {
                newSlide.classList.remove('opacity-0');
                newSlide.classList.add('opacity-100');
            }, 50);
        }, fadeTime);
    }
    // Start the timer with the timer settings declared above
    setInterval(nextSlide, slideIntervalTime);
});