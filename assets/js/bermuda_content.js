document.addEventListener('DOMContentLoaded', function () {
    // Production endpoint
    const apiUrl = 'https://sps-backend-service-170236375136.europe-west2.run.app/api/pages/bermuda-content/';

    // local endpoint for testing
    // const apiUrl = 'http://127.0.0.1:8000/api/pages/bermuda-content/';

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new error('Network response not was ok');
            }
            return response.json();
        })
        .then(data => {
            const content = data[0];

            if (content) {
                const updateText = (elementId, text) => {
                    const element = document.getElementById(elementId);
                    if (element) {
                        element.textContent = text;
                    } else {
                        console.warn(`Element with ID '${elementId}' not found`);
                    }
                };
                // Update each element with the data from the API
                updateText('hero-title', content.hero_title);
                updateText('hero-paragraph', content.hero_paragraph);

                updateText('approach-title', content.approach_title);
                updateText('approach-subtitle', content.approach_subtitle);
                updateText('approach-paragraph', content.approach_paragraph);

                updateText('retention-title', content.retention_title);
                updateText('retention-paragraph', content.retention_paragraph);

                updateText('insight-title', content.insight_title);
                updateText('insight-paragraph', content.insight_paragraph);

                updateText('hiring-title', content.hiring_title);
                updateText('hiring-intro', content.hiring_intro);
                updateText('hiring-paragraph', content.hiring_paragraph);

                updateText('opportunity-title', content.opportunity_title);
                updateText('opportunity-paragraph', content.opportunity_paragraph);
            }
        })
        .catch(error => {
            console.error('There was a problem fetching the Bermuda page content:', error);
        });
});