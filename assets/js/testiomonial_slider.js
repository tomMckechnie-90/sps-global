document.addEventListener('DOMContentLoaded', function () {
    const slidesContainer = document.getElementById('testimonial-slides-container');
    const ratingSummary = document.getElementById('google-rating-summary');

    const isLocal = window.location.hostname === '127.0.0.1' || window.location.hostname === 'localhost';
    const API_URL = isLocal
        ? 'http://127.0.0.1:8000/api/reviews/'
        : 'https://sps-backend-service-170236375136.europe-west2.run.app/api/reviews/';

    let slides = document.querySelectorAll('.testimonial-slide');

    function startSlider() {
        if (slides.length <= 1) return;

        const slideIntervalTime = 5000;
        const fadeTime = 1000;
        let currentSlideIndex = 0;

        function nextSlide() {
            const activeSlide = slides[currentSlideIndex];

            currentSlideIndex++;
            if (currentSlideIndex >= slides.length) {
                currentSlideIndex = 0;
            }
            const newSlide = slides[currentSlideIndex];

            activeSlide.classList.remove('opacity-100');
            activeSlide.classList.add('opacity-0');

            setTimeout(() => {
                activeSlide.classList.add('hidden');
                activeSlide.classList.remove('active-slide');

                newSlide.classList.remove('hidden');
                newSlide.classList.add('active-slide');

                setTimeout(() => {
                    newSlide.classList.remove('opacity-0');
                    newSlide.classList.add('opacity-100');
                }, 50);
            }, fadeTime);
        }

        setInterval(nextSlide, slideIntervalTime);
    }

    function createSlideElement(review, isFirst) {
        const slide = document.createElement('div');
        slide.className = isFirst
            ? 'testimonial-slide active-slide w-full transition-opacity duration-1000 ease-in-out opacity-100'
            : 'testimonial-slide hidden w-full transition-opacity duration-1000 ease-in-out opacity-0';

        const heading = document.createElement('h3');
        heading.className = 'text-3xl font-playfairdisplay text-spsaccent font-bold mb-4';
        heading.textContent = review.authorAttribution?.displayName || 'Verified Client';

        const rawText = review.text?.text || '';
        const shortText = rawText.length > 280
            ? rawText.slice(0, 280).trimEnd() + '...'
            : rawText;

        const quote = document.createElement('p');
        quote.className = 'font-sourcesans3 text-lg lg:text-xl italic leading-relaxed';
        quote.textContent = `"${shortText}"`;

        slide.appendChild(heading);
        slide.appendChild(quote);
        return slide;
    }

    fetch(API_URL)
        .then((response) => {
            if (!response.ok) throw new Error('Failed to load reviews');
            return response.json();
        })
        .then((data) => {
            if (data.rating && data.total_reviews && ratingSummary) {
                ratingSummary.textContent = ` ${data.rating} ★ · Based on ${data.total_reviews} Google Reviews`;
                ratingSummary.classList.remove('hidden');
            }

            if (Array.isArray(data.reviews) && data.reviews.length > 0 && slidesContainer) {
                slidesContainer.innerHTML = '';
                data.reviews.forEach((review, index) => {
                    const slideElement = createSlideElement(review, index === 0);
                    slidesContainer.appendChild(slideElement);
                });
                slides = document.querySelectorAll('.testimonial-slide');
            }
        })
        .catch((error) => {
            console.warn('Using fallback testimonials:', error);
        })
        .finally(() => {
            startSlider();
        });
});