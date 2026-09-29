document.addEventListener('DOMContentLoaded', function () {
    // Production endpoint
    const apiUrl = 'https://sps-backend-service-170236375136.europe-west2.run.app/api/pages/bermuda-info-content/';

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
                updateText('hero-subheading', content.hero_subheader)
                updateText('hero-header', content.hero_header);
                updateText('hero-paragraph-block', content.hero_paragraph_block);

                updateText('realistic-subheading', content.realistic_subheading);
                updateText('realistic-header', content.realistic_header);
                updateText('realistic-paragraph-block-1', content.realistic_paragraph_block_1);
                updateText('realistic-paragraph-block-2', content.realistic_paragraph_block_2);
                updateText('realistic-paragraph-block-3', content.realistic_paragraph_block_3);

                updateText('the-island-header', content.the_island_header);
                updateText('the-island-paragraph-block-1', content.the_island_paragraph_block_1);
                updateText('the-island-paragraph-block-2', content.the_island_paragraph_block_2);

                updateText('working-in-bermuda-header', content.working_in_bermuda_header);
                updateText('working-in-bermuda-paragraph-block-1', content.working_in_bermuda_paragraph_block_1);
                updateText('working-in-bermuda-paragraph-block-2', content.working_in_bermuda_paragraph_block_2);

                updateText('salary-and-tax-header', content.salary_and_tax_header);
                updateText('salary-and-tax-paragraph-block-1', content.salary_and_tax_paragraph_block_1);
                updateText('salary-and-tax-paragraph-block-2', content.salary_and_tax_paragraph_block_2);

                updateText('cost-of-living-header', content.cost_of_living_header);
                updateText('cost-of-living-paragraph-block-1', content.cost_of_living_paragraph_block_1);
                updateText('cost-of-living-paragraph-block-2', content.cost_of_living_paragraph_block_2);

                updateText('day-to-day-practicalities-subheader', content.day_to_day_practicalities_subheader);
                updateText('day-to-day-practicalities-header', content.day_to_day_practicalities_header);
                updateText('day-to-day-practicalities-paragraph-block-1', content.day_to_day_practicalities_paragraph_block_1);
                updateText('day-to-day-practicalities-paragraph-block-2', content.day_to_day_practicalities_paragraph_block_2);
                updateText('day-to-day-practicalities-paragraph-block-3', content.day_to_day_practicalities_paragraph_block_3);
                updateText('day-to-day-practicalities-paragraph-block-4', content.day_to_day_practicalities_paragraph_block_4);
                updateText('day-to-day-practicalities-paragraph-block-5', content.day_to_day_practicalities_paragraph_block_5);
                updateText('day-to-day-practicalities-paragraph-block-6', content.day_to_day_practicalities_paragraph_block_6);
                updateText('day-to-day-practicalities-paragraph-block-7', content.day_to_day_practicalities_paragraph_block_7);
                updateText('day-to-day-practicalities-paragraph-block-8', content.day_to_day_practicalities_paragraph_block_8);
                updateText('day-to-day-practicalities-paragraph-block-9', content.day_to_day_practicalities_paragraph_block_9);

                updateText('housing-subheading', content.housing_subheading);
                updateText('housing-header', content.housing_header);
                updateText('housing-paragraph-block-1', content.housing_paragraph_block_1);
                updateText('housing-paragraph-block-2', content.housing_paragraph_block_2);
                updateText('housing-paragraph-block-3', content.housing_paragraph_block_3);
                updateText('housing-paragraph-block-4', content.housing_paragraph_block_4);

                updateText('lifestyle-subheader', content.lifestyle_subheading);
                updateText('lifestyle-header', content.lifestyle_header);
                updateText('lifestyle-paragraph-block-1', content.lifestyle_paragraph_block_1);
                updateText('lifestyle-paragraph-block-2', content.lifestyle_paragraph_block_2);
                updateText('lifestyle-paragraph-block-3', content.lifestyle_paragraph_block_3);

                updateText('be-realistic-subheader', content.be_realistic_subheading);
                updateText('be-realistic-header', content.be_realistic_header);
                updateText('be-realistic-paragraph-block-1', content.be_realistic_paragraph_block_1);
                updateText('be-realistic-paragraph-block-2', content.be_realistic_paragraph_block_2);
                updateText('be-realistic-paragraph-block-3', content.be_realistic_paragraph_block_3);
                updateText('be-realistic-paragraph-block-4', content.be_realistic_paragraph_block_4);

                updateText('questions-subheader', content.questions_subheading);
                updateText('questions-header', content.questions_header);
                updateText('questions-paragraph-block-1', content.questions_paragraph_block_1);
                updateText('questions-paragraph-block-2', content.questions_paragraph_block_2);
                updateText('questions-paragraph-block-3', content.questions_paragraph_block_3);



            }
        })
        .catch(error => {
            console.error('There was a problem fetching the Bermuda info page content:', error);
        });
});