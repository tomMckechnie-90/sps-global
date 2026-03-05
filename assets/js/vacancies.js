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

    // -------------------------------------------------
    // GRAB FILTER INPUTS
    // -------------------------------------------------
    const filterLocation = document.getElementById('filter-location');
    const filterRole = document.getElementById('filter-role');
    const filterType = document.getElementById('filter-type');
    const filterKeyword = document.getElementById('filter-keyword');
    const btnFilter = document.getElementById('btn-filter');

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
            if (job.is_live) {
                const card = document.createElement('div');
                // YOUR EXACT STYLING
                card.className = 'border border-spswhite border-2 smokey-bg p-4 shadow-sm shadow-black/15 hover:shadow-lg hover:-translate-y-1 transition-transform duration-300 ease-in-out';

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
    // THE SMART DROPDOWNS (New Feature!)
    // =================================================
    function populateDropdowns(jobs) {
        console.log('Building dropdowns based on', jobs.length, 'jobs');

        // Sets to hold unique values removes duplicates
        const locations = new Set();
        const roles = new Set();

        jobs.forEach(job => {
            if (job.location) locations.add(job.location);
            if (job.title) roles.add(job.title);
        });

        // Helper function to fill a <select> element
        const fillSelect = (selectElement, items) => {

            if (!selectElement) return;
            const firstOption = selectElement.firstElementChild;
            selectElement.innerHTML = '';
            if (firstOption) selectElement.appendChild(firstOption);

            // Add new options
            items.sort().forEach(item => {
                const option = document.createElement('option');
                option.value = item;
                option.textContent = item;
                selectElement.appendChild(option);
            });
        };
        // populate the options
        fillSelect(filterLocation, Array.from(locations));
        fillSelect(filterRole, Array.from(roles));
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

        // Reset the filter when switching tabs
        filterLocation.value = "";
        filterRole.value = "";
        filterType.value = "";
        filterKeyword.value = "";


        filterJobs();
    }


    // =================================================
    // FILTER LOGIC (The Brain)
    // =================================================

    function filterJobs() {
        console.log('Filtering jobs for:', currentTab);
        let tabFilteredJobs = allJobs.filter(job => {
            const jobSector = job.sector || 'Private'; // default is private
            return jobSector === currentTab;
        });

        // REBUILD DROPDOWNS based on the Tab results
        // (do this BEFORE applying specific dropdown filters, 
        // so the user sees all available options for this Tab)
        // Note: In a real app, you might want to do this only on tab switch, 
        // but doing it here ensures it's always up to date.
        // We only populate if the filters are empty to avoid resetting user selection while typing
        if (filterLocation.value === "" && filterRole.value === "") {
            populateDropdowns(tabFilteredJobs);
        }

        // Filter by user inputs
        let finalFilteredJobs = tabFilteredJobs.filter(job => {
            // Location
            if (filterLocation.value && job.location !== filterLocation.value) return false;
            // Role
            if (filterRole.value && job.title !== filterRole.value) return false;
            // Type
            if (filterType.value && job.job_type !== filterType.value) return false;

            // Keyword 
            if (filterKeyword && filterKeyword.value) {

                const keyword = filterKeyword.value.toLowerCase();

                const titleMatch = job.title.toLowerCase().includes(keyword);
                const descMatch = job.description.toLowerCase().includes(keyword);
                if (!titleMatch && !descMatch) return false;
            }
            return true;
        });

        renderJobs(finalFilteredJobs);
    }

    // =================================================
    // EVENT LISTENERS
    // =================================================
    if (btnPrivate && btnExecutive) {
        btnPrivate.addEventListener('click', () => switchTab('Private'));
        btnExecutive.addEventListener('click', () => switchTab('Executive'));
    }

    if (btnFilter) {
        btnFilter.addEventListener('click', filterJobs);
    }

    // =================================================
    // THE API URL
    // =================================================

    // 🔴 LOCAL (Uncomment for local)
    // const apiUrl = 'http://127.0.0.1:8000/api/jobs/';

    // 🟢 REMOTE (Uncomment for GitHub)
    // const apiUrl = 'https://heteromorphic-amado-deflexed.ngrok-free.dev/api/jobs/';

    // =================================================
    // 🟢 PRODUCTION (Google Cloud Run)
    const apiUrl = 'https://sps-backend-service-170236375136.europe-west2.run.app/api/jobs/';

    if (!jobsContainer) return;
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
