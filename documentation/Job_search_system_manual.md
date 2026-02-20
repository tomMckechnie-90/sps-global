# System Manual: How the Job Board Works


#### 1. The Concept: The Digital Recruitment Office

To understand how the "Vacancies" page works, imagine your website acts exactly like a physical recruitment office. It doesn't just show a static picture; it actively sorts, files, and displays information the moment a visitor arrives.

Here is the breakdown of the invisible staff running your office.

The Delivery Truck (The API)

Technical Term: fetch(apiUrl)

Every time a user loads the page, a digital "Delivery Truck" drives from your Database (the warehouse) to the User's Browser (the office).

What it does: It carries a stack of every single active job file you have created.

Why it's smart: It only makes one trip. Once the files are in the office (the browser), we don't need to call the truck again. This makes the sorting instant.

The Filing Cabinet (State Variables)

Technical Term: let allJobs = []

Once the truck arrives, we don't dump the files on the floor. We put them into a secure "Filing Cabinet" in the computer's memory.

The Master Copy: We keep the original stack of jobs safe here.

The Working Copy: When a user filters for "Nannies," we don't throw away the "CEO" jobs; we just leave them in the cabinet and only show the Nanny jobs on the desk. This allows the user to clear their filter and see everything again instantly.

#### 2. The Staff (The Logic Functions)

Your website has three "Digital Assistants" who work together to show the right jobs to the right people.

Assistant 1: The Artist (The Card Factory)

Technical Term: renderJobs()

This assistant's only job is to draw.

They take a stack of job files.

They verify the information (Is it active? What is the salary?).

They draw a beautiful "Job Card" for each one—adding the Gold border, the shadows, and the "More Details" button.

If the stack is empty, they hang a polite sign saying: "No vacancies found matching your criteria."

Assistant 2: The Sorter (The Filter Logic)

Technical Term: filterJobs()

This is the smartest assistant. They stand between the Filing Cabinet and the Artist.
When a user clicks "Executive Search" or selects "Dubai," the Sorter runs a strict checklist:

Check the Tab: "The user wants Executive. Discard all Private jobs."

Check the Location: "The user selected Dubai. Discard London and Zurich."

Check the Role: "The user selected CEO. Discard CFOs."

The Result: They hand the remaining small stack of files to The Artist to draw.

Assistant 3: The Clerk (The Dropdown Builder)

Technical Term: populateDropdowns()

This assistant ensures the menus never show dead ends.

The Problem: If you select "Executive Search," you shouldn't see "Nanny" in the Job Role dropdown. It confuses people.

The Solution: Every time the Tab changes, The Clerk reads through the current stack of jobs. They write down every unique Location and Job Role on a fresh list and update the dropdown menus.

The Result: The menus are always 100% accurate to the jobs currently available.

#### 3. The User Experience (The Flow)

Here is what happens, millisecond-by-millisecond, when a user visits the page:

Arrival: The Delivery Truck arrives with 50 job files.

Filing: The files are stored in the Filing Cabinet (allJobs).

Initial Sort: The system checks the default tab ("Private Household").

Clerk Work: The Clerk reads the Private jobs and fills the dropdowns with "London, Zurich, Nanny, Butler."

Artist Work: The Artist draws the Private Job cards on the screen.

When the user clicks "Executive Search":

The Switch: The desk is cleared.

Clerk Work: The Clerk reads the Executive jobs and changes the dropdowns to "New York, CEO, CFO."

Artist Work: The Artist draws the Executive Job cards.

#### 4. Why I Built It This Way

Speed: Because the logic lives in the user's browser, filtering is instant. No waiting for pages to reload.

Accuracy: Users can never select a filter combination that doesn't exist (e.g., "Nanny" in "Executive Search") because The Clerk prevents it.

Scalability: You can add 5 jobs or 500 jobs; the system automatically organizes them without you needing to change a single line of code.