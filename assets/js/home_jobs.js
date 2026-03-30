document.addEventListener('DOMContentLoaded', function () {
    // 1. The Setup & The Elements
    //    Wake up the Javascript and grabbing the HTML elements that need manipulation
    //    Also Grab the API URL (Django REST)
    console.log('Home jobs slider script loaded');

    const track = document.getElementById('latest-jobs-track');
    const dotsContainer = document.getElementById('job-slider-dots');

    const apiUrl = 'https://sps-backend-service-170236375136.europe-west2.run.app/api/jobs/';

    if (!track) {
        console.error('Error: Could not find "latest-jobs-track" in HTML');
        return;
    }

    // 2. The State Variables
    //    Before fetching the data, set up some empty containers (variables)
    //    to keep track of what the jobs slider is doing

    // The slider variables
    let currentSlide = 0;
    let totalSlides = 0;
    let slideInterval;

    // 3. The Network Request
    //    Call the Django Server on Google Cloud Run

    // Fetch the data
    fetch(apiUrl, {
        method: 'GET'
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response failure');
            }
            return response.json(); // if the response was a 200 success code, convert the raw data into a clean JSON object for the script to read.
        })
        // 4. Processing the data
        //    The data as been fetched now it needs to be sliced and make sure it is not empty
        .then(jobs => {
            const latestJobs = jobs.slice(0, 3); // chops the list down so it only uses the first 3 (Latest Jobs)
            totalSlides = latestJobs.length;

            if (totalSlides === 0) {
                track.innerHTML = '<div class="w-full flex items-center justify-center"><p class="text-white text-center">No current vacancies.</p></div>';
                return;
            }

            // 5. Building the slides (The loop)
            //    loop through the 3 latest jobs and build the HTML for each on the fly

            // Build the Slides and Dots
            latestJobs.forEach((job, index) => {

                // --- Build The Slide ---
                const slide = document.createElement('div');
                slide.className = 'w-full h-full flex-shrink-0 p-4';

                slide.innerHTML = `
                <div class="smokey-bg p-8 rounded-lg shadow-sm shadow-black/15 hover:shadow-lg border-2 border-spswhite transition-transform duration-300 ease-in-out flex flex-col justify-between">
                    <div>
                        <h3 class="font-playfairdisplay font-bold text-3xl text-spswhite mb-3 leading-tight">
                            ${job.title}
                        </h3>
                                            <p class="font-sourcesans3 text-lg text-spsaccent font-bold mb-4">
                        ${job.location}
                    </p>
                    <p class="font-sourcesans3 text-spswhite mb-6 line-clamp-3">
                        ${job.description}
                    </p>
                </div>
                
                <div class="text-end">
                    <a href="vacancie_details?id=${job.id}" 
                       class="text-spsaccent border-2 border-spsaccent p-2 font-bold font-sourcesans3 hover:text-spswhite hover:border-spswhite transition-colors duration-300">
                       View Role
                    </a>
                    </div>
                </div>
                `;
                track.appendChild(slide);

                // --- Build The Dot ---
                if (dotsContainer) {
                    const dot = document.createElement('button');
                    dot.className = `w-3 h-3 rounded-full transition-colors duration-300 ${index === 0 ? 'bg-spsaccent' : 'bg-gray-400'}`;
                    dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
                    dot.addEventListener('click', () => goToSlide(index));
                    dotsContainer.appendChild(dot);
                }
            });
            // 7. Starting the Engine
            //    Start the clock

            // start the auto-slider
            if (totalSlides > 1) {
                startSlider();
            }
        })
        .catch(error => {
            console.error('Error fetching home jobs:', error);
            track.innerHTML = '<div class="w-full flex items-center justify-center"><p class="text-white text-center">Unable to load latest jobs.</p></div>';
        });
    // 8. The Slider Logic Functions
    //    utility functions that actually do the moving.

    // --- Slider Logic Functions ---

    function updateSlider() {
        track.style.transform = `translateX(-${currentSlide * 100}%)`;

        if (dotsContainer) {
            const dots = dotsContainer.children;
            for (let i = 0; i < dots.length; i++) {
                if (i === currentSlide) {
                    dots[i].classList.replace('bg-gray-400', 'bg-spsaccent');
                } else {
                    dots[i].classList.replace('bg-spsaccent', 'bg-gray-400');
                }
            }
        }
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlider();
    }

    function goToSlide(index) {
        currentSlide = index;
        updateSlider();
        resetInterval();
    }

    function startSlider() {
        slideInterval = setInterval(nextSlide, 5000);
    }

    function resetInterval() {
        clearInterval(slideInterval);
        startSlider();
    }
});