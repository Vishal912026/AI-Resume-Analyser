# AI Resume Analyser

A simple and powerful web application designed to analyse user resumes and provide instant feedback along with an optimization score. This project is built using HTML, CSS, and vanilla JavaScript.

🔗 **Live Demo:** [vishal912026.github.io/AI-Resume-Analyser](https://vishal912026.github.io/AI-Resume-Analyser/)

## Features
- **User-Friendly UI:** Clean, modern, and fully responsive design.
- **File Upload Support:** Upload your resume in **PDF** format.
- **Instant Feedback (Local Smart-Matching):** Compares your resume against a pasted Job Description and displays a match score, matched keywords, missing keywords, and actionable improvement tips.
- **100% Client-Side & Private:** Your resume is parsed entirely in your browser using PDF.js. The file is never uploaded to any server — nothing leaves your device.
- **Easy Deployment:** Ready to be deployed online on GitHub Pages or Netlify with zero configuration (pure static site, no backend needed).

## Project Structure
- `index.html` - Contains the structure, layout, and core elements of the web app.
- `style.css` - Contains the styling and visual layout to make the app look modern.
- `app.js` - Handles user interaction, PDF text extraction, and the local keyword-matching logic.

## How It Works
1. Paste the Job Description in the text area.
2. Upload your resume (PDF only).
3. Click **Analyze Resume** — the app extracts text from your PDF and compares keywords against the JD, all inside your browser.
4. Get an ATS-style match score along with matched/missing keywords and quick tips.

## Tech Stack
HTML, CSS, Vanilla JavaScript, [PDF.js](https://mozilla.github.io/pdf.js/)