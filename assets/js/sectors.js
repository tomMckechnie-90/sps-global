document.addEventListener('DOMContentLoaded', function () {
    console.log('Sectors slider loaded');
    const track = document.getElementById('slider-track');
    const slideIntervalTime = 3000;

    // Define the breakpoint for smaller screens
    const breakpoint = 768; // e.g., for tablets and below

    function getSlidesToMove() {
        return window.innerWidth < breakpoint ? 1 : 3;
    }

    function moveSlider() {
        const slidesToMove = getSlidesToMove();
        // Adjust the translation based on the number of slides to move.
        // This assumes each slide takes up 1/3 of the container width on larger screens.
        // If only one slide is shown, it should be 100%.
        const percentageToMove = window.innerWidth < breakpoint ? 100 / 1 : 100;
        track.style.transform = `translateX(-${percentageToMove}%)`;
        
        setTimeout(function(){
            sliderTrack();
        }, 500);
    }

    function sliderTrack() {
        track.style.transition = 'none';

        const slidesToMove = getSlidesToMove();
        for (let i = 0; i < slidesToMove; i++) {
            if (track.firstElementChild) {
                track.appendChild(track.firstElementChild);
            }
        }

        track.style.transform = 'translateX(0)';

        setTimeout(function() {
            track.style.transition = 'transform 500ms ease-in-out';
        }, 20);
    }

    setInterval(moveSlider, slideIntervalTime);
});


