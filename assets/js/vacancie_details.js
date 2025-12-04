document.addEventListener('DOMContentLoaded', function () {
    const jobDetailContainer = document.getElementById('job-detail-container');
    // Get the Job ID from the URL query parameter
    const urlParams = new URLSearchParams(window.location.search);
    const jobId = urlParams.get('id');

    if (!jobId) {
        jobDetailContainer.innerHTML = '<p class="text-red-500">No job ID provided. Please go back to the vacancies page and select a job.</p>'
        return;
    }

    const apiUrl = `http://127.0.0.1:8000/api/jobs/${jobId}/`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Job not found.');
            }
            return response.json();
        })
        .then(job => {
            // Update the page title in the tab
            document.title = `SPS Global Recruitment | ${job.title}`;

            // Inject the job details written to the database to vacancie_details.html
            jobDetailContainer.innerHTML = `
                <div class="flex md:flex-col md:items-center flex-row md:mb-20 md:pt-15 sm:text-center text-left mb-8 pt-4">
                    <h1 class="md:text-5xl text-3xl font-bold font-playfairdisplay">${job.title}</h1>
                </div>
                <div class="flex flex-row justify-around items-center lg:mb-10 mb-6 md:text-xl text-sm font-sourcesans3">
                    <p><strong>Location:</strong> ${job.location}</p>
                    <p><strong>Job Type:</strong> ${job.job_type}</p>
                    <p><strong>Salary:</strong> ${job.salary}</p>
                </div>
                <div class="prose prose-lg text-spsdark max-w-none">
                    ${job.description.replace(/\n/g, '<br>')}
                </div>
                <div class="flex justify-center p-10">
                        <a href="mailto:london@spsglobal.com"
                            class="bg-spsdark px-10 py-4 font-bold md:text-2xl text-lg text-spswhite text-center font-sourcesans3">Apply
                            Now</a>
                    </div>
                    <div class="flex justify-center mb-3">
                        <a href="vacancies.html"
                            class="bg-spswhite px-6 py-2 font-bold md:text-xl text-lg text-spsdark text-center font-sourcesans3 hover:underline">Back
                            to Vacancies</a>
                    </div>
        `
        })
})