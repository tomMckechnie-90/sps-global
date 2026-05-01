document.addEventListener('DOMContentLoaded', function () {
    console.log('Sectors slider loaded');
    const track = document.getElementById('slider-track');
    const slideIntervalTime = 3000;


    function moveSlider() {
        track.style.transform = 'translateX(-100%)'
        
        setTimeout(function(){
            sliderTrack();
        }, 500);
    }

    function sliderTrack() {
        track.style.transition = 'none';

        track.appendChild(track.firstElementChild);
        track.appendChild(track.firstElementChild);
        track.appendChild(track.firstElementChild);

        track.style.transform = 'translateX(0)';

        setTimeout(function() {
            track.style.transition = 'transform 500ms ease-in-out';
        }, 20);
    }

    setInterval(moveSlider, slideIntervalTime);
});


