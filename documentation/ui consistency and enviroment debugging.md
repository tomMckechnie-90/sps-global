# Technical Report: UI Consistency & Environment Debugging

Date: January 06, 2026
Project: SPS Global Recruitment (Frontend)
Topic: Resolving Visual Discrepancies between Localhost and GitHub Pages

1. ## The Challenge

We observed a visual bug on the Vacancies Page that only appeared in the Production environment (GitHub Pages).

Localhost: The "Apply Filters" button was rendered correctly on a single line.

GitHub Pages: The same button text was wrapping onto two lines, breaking the grid layout.

Visual Difference: All buttons (Nav and Filter) appeared significantly larger on the live site compared to the local development server.

The Problem: Determining why identical code was rendering differently across two environments.

2. ## The Investigation Path

We followed a systematic process to isolate the variable causing the layout break.

### Phase 1: CSS & Layout Constraints

Assumption: The Grid container or Flexbox settings were too constrained on the live site, forcing the text to wrap.

Action 1 (Robustness): Added whitespace-nowrap to the button class to forcibly prevent text wrapping.

Action 2 (Typo Fix): Discovered a typo in the parent container (class="gird" instead of grid). Corrected it to restore proper CSS Grid behavior.

Action 3 (Alignment): Added self-end to align the button with the bottom of the input fields.

Result: The button improved structurally, but the size discrepancy persisted.

## Phase 2: Font Rendering

Assumption: The custom font (Source Sans 3) was failing to load on GitHub Pages, causing the browser to fall back to a wider default system font (like Arial).

Investigation: We inspected the "Computed" styles in the browser developer tools.

Result: The browser confirmed Source Sans 3 was rendering correctly. The font file path was not the issue.

Phase 3: The Environment Check (Root Cause)

Assumption: External environmental factors (Browser Settings) were affecting the display.

Investigation: We compared the "Computed" width of the elements.

Discovery: The browser tab viewing GitHub Pages was set to Zoom Level 100%, while Localhost was at 90%.

The Fix: Reset Browser Zoom (Ctrl + 0).

## 3. The "Battle Log" (Steps Taken)


| Symptom | The "Why" (Theory) | The Fix / Action |
| :--- | :--- | :--- |
| **Text Wrapping** | Container too small for text content. | Applied `whitespace-nowrap` and `inline-block`. |
| **Grid Misalignment** | CSS Typo (`gird`). | Corrected to `grid` and removed excess margins. |
| **Vertical Misalignment** | Button floating above inputs. | Applied `place-self-end` to align to bottom of row. |
| **Element Size Discrepancy** | Font missing or Environment Zoom. | **Reset Browser Zoom.** |

## 4. Key Takeaways & "Golden Rules"

Rule #1 of UI Debugging: Check Browser Zoom (Ctrl + 0) before changing a single line of CSS.

Robust Code: Even though the root cause was zoom, the code changes (whitespace-nowrap) were valuable. They made the UI "defensive," ensuring it won't break even if a user does zoom in the future.

Typos Happen: The gird typo was a silent bug that only revealed itself when we looked closely at the layout behavior.

Logged by: Tom McKechnie & Gemini