document.addEventListener('DOMContentLoaded', function () {
    console.log('Sectors slider loaded');
    const track = document.getElementById('slider-track');
    const slideIntervalTime = 3000;

    let currentIndex = 0;

    const totalSlides = 6;

    function moveSlider() {
        currentIndex = currentIndex + 2;

        // If there are no slides left, reset index.
        if (currentIndex => totalSlides) {
            currentIndex = 0;
        }

        track.style.transform = `translateX(-${currentIndex * 50}%)`;
    }
    setInterval(moveSlider, slideIntervalTime);
});



