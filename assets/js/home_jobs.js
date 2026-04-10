document.addEventListener('DOMContentLoaded', function () {
    console.log('Home jobs snap-scroll script loaded');

    // 1. Grab the new container ID
    const container = document.getElementById('latest-jobs-container');
    const apiUrl = 'https://sps-backend-service-170236375136.europe-west2.run.app/api/jobs/';

    if (!container) {
        console.error('Error: Could not find "latest-jobs-container" in HTML');
        return;
    }

    // 2. Fetch the data
    fetch(apiUrl, { method: 'GET' })
        .then(response => {
            if (!response.ok) throw new Error('Network response failure');
            return response.json();
        })
        .then(jobs => {
            const latestJobs = jobs.slice(0, 3); // Grab the 3 latest

            if (latestJobs.length === 0) {
                container.innerHTML = '<div class="w-full p-4"><p class="text-white text-center">No current vacancies.</p></div>';
                return;
            }

            // 3. Build the Cards
            latestJobs.forEach((job) => {

                // --- Build The Wrapper ---
                const cardWrapper = document.createElement('div');


                cardWrapper.className = 'w-full flex';


                cardWrapper.innerHTML = `
                <div class="smokey-bg p-8 rounded-lg shadow-sm shadow-black/15 hover:shadow-lg border-2 border-spswhite transition-transform duration-300 ease-in-out flex flex-col justify-between w-full">
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
                    
                    <div class="text-end mt-4">
                        <a href="vacancie_details?id=${job.id}" 
                           class="text-spsaccent border-2 border-spsaccent p-2 font-bold font-sourcesans3 hover:text-spswhite hover:border-spswhite transition-colors duration-300">
                           View Role
                        </a>
                    </div>
                </div>
                `;

                container.appendChild(cardWrapper);
            });
        })
        .catch(error => {
            console.error('Error fetching home jobs:', error);
            container.innerHTML = '<div class="w-full p-4"><p class="text-white text-center">Unable to load latest jobs.</p></div>';
        });
});