document.addEventListener('DOMContentLoaded', function () {
    console.log('Vacancies script loaded');

    // =================================================
    // THE MEMORY BOXES (Variables)
    // =================================================

    // This box will hold ALL the jobs we get from the API
    let allJobs = [];

    // This says which button is currently "ON".
    // Default is 'Private' because that is the first button.
    let currentTab = 'Private';

    // GRAB HTML ELEMENTS
    const jobsContainer = document.getElementById('jobs-grid-container');
    const btnPrivate = document.getElementById('tab-private');
    const btnExecutive = document.getElementById('tab-executive');

    // =================================================
    // THE CARD FACTORY (Your Design)
    // =================================================
    // This function takes a list of jobs and draws them on the screen
    // using YOUR exact styling.
    function renderJobs(jobsToRender) {

        // 1. Clear the container (Wipe the board clean)
        jobsContainer.innerHTML = '';

        // 2. Check if box is empty
        if (jobsToRender.length === 0) {
            jobsContainer.innerHTML = '<p class="text-spswhite col-span-2">No vacancies found matching your criteria.</p>';
            return;
        }

        // 3. Loop through and build cards
        jobsToRender.forEach(job => {
            if (job.is_active) {
                const card = document.createElement('div');
                // YOUR EXACT STYLING
                card.className = 'border border-spswhite border-2 smokey-bg p-4 shadow-lg shadow-spsdark hover:-translate-y-2 transition-transform duration-300 ease-in-out';

                // Shorten description
                const shortDescription = job.description.length > 200
                    ? job.description.substring(0, 200) + '...'
                    : job.description;

                // YOUR EXACT HTML
                card.innerHTML = `
                    <div class="flex flex-row justify-between mb-5">
                        <h1 class="md:text-2xl text-xl font-bold font-playfairdisplay text-spswhite">${job.title}</h1>
                    </div>
                    <div class="flex flex-row justify-between mb-3 md:text-lg text-sm text-spsaccent">
                        <p><span class="font-bold">Location: ${job.location}</span></p>
                        <p class="font-bold">${job.job_type}</p>
                        <p><span class="font-bold">Salary: ${job.salary}</span></p>
                    </div>
                    <div class="md:text-lg text-sm text-spswhite">
                        <p>${shortDescription}</p>
                    </div>
                    <div class="flex justify-end pt-5">
                        <a href="vacancie_details.html?id=${job.id}" class="text-spsaccent border-2 border-spsaccent p-2 font-bold font-sourcesans3 hover:text-spswhite hover:border-spswhite transition-colors duration-300">
                        More Details</a>
                    </div>
                `;
                jobsContainer.appendChild(card);
            }
        });
    }

    // =================================================
    // TAB LOGIC (The Switch)
    // =================================================
    function switchTab(selectedTab) {
        currentTab = selectedTab;
        console.log('Switched tab to:', currentTab);

        // Visual Switch 
        if (selectedTab === 'Private') {

            btnPrivate.classList.add('bg-spsaccent');
            btnPrivate.classList.remove('smokey-bg');


            btnExecutive.classList.add('smokey-bg');
            btnExecutive.classList.remove('bg-spsaccent');
        } else {
            btnExecutive.classList.add('bg-spsaccent');
            btnExecutive.classList.remove('smokey-bg');

            btnPrivate.classList.add('smokey-bg');
            btnPrivate.classList.remove('bg-spsaccent');
        }
        filterJobs();
    }


    // =================================================
    // FILTER LOGIC (The Brain)
    // =================================================

    function filterJobs() {
        console.log('Filtering jobs for:', currentTab);
        // TODO: In the next step, we will actually filter the list here.
        // For now, we just verify the flow works by rendering everything.
        renderJobs(allJobs);
    }

    // =================================================
    // EVENT LISTENERS
    // =================================================
    if (btnPrivate && btnExecutive) {
        btnPrivate.addEventListener('click', () => switchTab('Private'));
        btnExecutive.addEventListener('click', () => switchTab('Executive'));
    }

    // =================================================
    // THE API URL
    // =================================================

    // 🔴 LOCAL (Uncomment for local)
    // const apiUrl = 'http://127.0.0.1:8000/api/jobs/';

    // 🟢 REMOTE (Uncomment for GitHub)
    const apiUrl = 'https://heteromorphic-amado-deflexed.ngrok-free.dev/api/jobs/';

    // =================================================
    // 4. FETCH THE JOBS
    // =================================================

    fetch(apiUrl, {
        method: 'GET',
        headers: {
            'ngrok-skip-browser-warning': 'true',
        }
    })
        .then(response => {
            if (!response.ok) throw new Error('Network response was not ok');
            return response.json();
        })
        .then(data => {
            // SUCCESS!
            // Instead of drawing them on screen immediately, we put them in the box.
            allJobs = data;

            console.log('I have saved', allJobs.length, 'jobs in the Memory Box.');
            console.log('The current tab is:', currentTab);
            // We simulate clicking the default tab to set everything up
            switchTab(currentTab);

            // TODO: Next step, we will call a function here to actually draw them
        })
        .catch(error => {
            console.error('Error fetching vacancies', error);
            jobsContainer.innerHTML = '<p class="text-red-500 col-span-2">Sorry, we were unable to load the vacancies.</p>';
        })
})
