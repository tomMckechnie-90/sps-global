document.addEventListener('DOMContentLoaded', function() {
    const jobsContainer = document.getElementById('jobs-grid-container');
    // const apiUrl = 'http://127.0.0.1:8000/api/jobs/';
    // const apiUrl = 'https://sps-api-170236375136.europe-west2.run.app/api/jobs/';
    const apiUrl = 'https://heteromorphic-amado-deflexed.ngrok-free.dev -> http://localhost:8000';

    if (!jobsContainer) {
        console.error('Error: Element ID "jobs-grid-container" was not found!');
        return;
    }

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response failure');
            }
            return response.json();
        })
        .then(jobs => {
            jobsContainer.innerHTML = ''; // Removes any existing content

            if (jobs.length === 0) {
                jobsContainer.innerHTML = '<p class="text-spswhite col-span-2">No open vacancies at the moment.</p>';
                return;
            }

            jobs.forEach(job => {
                if (job.is_active) {
                    const card = document.createElement('div');
                    card.className = 'border border-spsdark border-2 bg-spswhite p-4 shadow-xl shadow-spsdark';

                    // shorten the description for the card view
                    const shortDescription = job.description.length > 200
                        ? job.description.substring(0, 200) + '...'
                        : job.description;

                    card.innerHTML = `
                    <div class="flex flex-row justify-between mb-5">
                        <h1 class="md:text-2xl text-xl font-bold font-playfairdisplay">${job.title}</h1>
                    </div>
                    <div class="flex flex-row justify-between mb-3 md:text-lg text-sm">
                        <p><span class="font-bold">Location: ${job.location}</span></p>
                        <p class="font-bold">${job.job_type}</p>
                        <p><span class="font-bold">Salary: ${job.salary}</span></p>
                    </div>
                    <div class="md:text-lg text-sm">
                        <p>${shortDescription}</p>
                    </div>
                    <div class="flex justify-end pt-5">
                        <a href="vacancie_details.html?id=${job.id}" class="bg-spsdark px-6 py-2 font-bold md:text-lg text-sm text-spswhite text-center font-sourcesans3">
                        More Details</a>
                    </div>
                `;
                    jobsContainer.appendChild(card);
                }
            });
        })
        .catch(error => {
            console.error('Error fetching vacancies:', error);
            jobsContainer.innerHTML = '<p class="text-red-500 col-span-2">Sorry, we were unable to load the vacancies.</p>';
        });
});
