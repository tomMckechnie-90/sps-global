document.addEventListener('DOMContentLoaded', function () {
    console.log('Home jobs script loaded');

    const container = document.getElementById('latest-jobs-container');

    // =================================================
    // 🔴 OPTION 1: LOCAL DEVELOPMENT
    // (Uncomment for local testing)
    // =================================================
    // const apiUrl = 'http://127.0.0.1:8000/api/jobs/';

    // =================================================
    // 🟢 OPTION 2: GITHUB PAGES (NGROK TESTING)
    // (Uncomment for GitHub Pages testing)
    // =================================================
    const apiUrl = 'https://heteromorphic-amado-deflexed.ngrok-free.dev/api/jobs/';

    if (!container) {
        console.error('Error: Could not find "latest-jobs-container" in HTML');
        return;
    }

    // 1. Fetch the data
    fetch(apiUrl, {
        method: 'GET',
        headers: {
            'ngrok-skip-browser-warning': 'true', // Needed for ngrok
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response failure');
            }
            return response.json();
        })
        .then(jobs => {
            // 2. The Slice Trick
            // We only want the first 3 jobs.
            // slice(0, 3) starts at 0 and stops before 3.
            const latestJobs = jobs.slice(0, 3);

            if (latestJobs.length === 0) {
                container.innerHTML = '<p class="text-white text-center col-span-3">No current vacancies.</p>';
                return;
            }

            // 3. The Loop
            latestJobs.forEach(job => {
                // Create the card div
                const card = document.createElement('div');

                // Styling: White background, rounded corners, nice shadow
                card.className = 'bg-spswhite p-8 rounded-lg shadow-xl shadow-spsdark hover:-translate-y-2 transition-transform duration-300 ease-in-out flex flex-col justify-between';

                // Create the HTML content for the card
                // We keep it simpler than the main vacancies page
                card.innerHTML = `
                <div>
                    <h3 class="font-playfairdisplay font-bold text-2xl text-spsdark mb-2">
                        ${job.title}
                    </h3>
                    <p class="font-sourcesans3 text-lg text-spsaccent font-bold mb-4">
                        ${job.location}
                    </p>
                    <p class="font-sourcesans3 text-spsdark mb-6 line-clamp-3">
                        ${job.description}
                    </p>
                </div>
                
                <div class="text-end">
                    <a href="vacancie_details.html?id=${job.id}" 
                       class="text-spspurple font-bold font-sourcesans3 hover:text-spsaccent transition-colors duration-300">
                       View Role &rarr;
                    </a>
                </div>
            `;

                // Inject the card into the container
                container.appendChild(card);
            });
        })
        .catch(error => {
            console.error('Error fetching home jobs:', error);
            container.innerHTML = '<p class="text-white text-center col-span-3">Unable to load latest jobs.</p>';
        });
});