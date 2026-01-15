document.addEventListener('DOMContentLoaded', function() {
    console.log('Zoom sliders loaded');

    function initSlider(sliderId) {
        const container = document.getElementById(sliderId);
        if (!container) return;

        const slides = container.querySelectorAll('.zoom-slide');
        let currentIndex = 0;

        setInterval(() => {
            const currentSlide = slides[currentIndex];

            currentIndex = (currentIndex + 1) % slides.length;
            const nextSlide = slides[currentIndex];

            // Reset the next slides styles 
            nextSlide.style.transition = 'none';
            nextSlide.classList.remove('scale-110');
            nextSlide.classList.add('scale-100');

            void nextSlide.offsetWidth; // force refresh

            // Turn animation back on
            nextSlide.style.transition = '';

            // Swap slides
            currentSlide.classList.remove('opacity-100', 'scale-110');
            currentSlide.classList.add('opacity-0', 'scale-100');

            nextSlide.classList.remove('opacity-0', 'scale-100');
            nextSlide.classList.add('opacity-100', 'scale-110');

        }, 6000);
    }
    initSlider('exec-slider');
    initSlider('private-slider');
})