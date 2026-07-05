// PDF.js worker load karna (PDF read karne ke liye)
pdfjsLib.GlobalWorkerOptions.workerSrc = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js';

let extractedText = "";

// Jab user PDF select karega
document.getElementById('resume-file').addEventListener('change', async function(e) {
    const file = e.target.files[0];
    if (file) {
        document.getElementById('file-label').innerText = `Selected: ${file.name}`;
        extractedText = await extractTextFromPDF(file);
    }
});

// PDF reading function
async function extractTextFromPDF(file) {
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let text = "";
    for (let i = 1; i <= pdf.numPages; i++) {
        const page = await pdf.getPage(i);
        const content = await page.getTextContent();
        text += content.items.map(item => item.str).join(" ") + "\n";
    }
    return text;
}

// Analyze button click event (Smart Local matching algorithm)
document.getElementById('analyze-btn').addEventListener('click', () => {
    const jobDesc = document.getElementById('job-desc').value.trim();
    
    if (!jobDesc || !extractedText) {
        alert("Please paste Job Description and upload Resume PDF!");
        return;
    }

    // Loading spinner dikhana aur purana result chupana
    document.getElementById('loading').classList.remove('hidden');
    document.getElementById('result-section').classList.add('hidden');

    // Choti si delay real-AI simulation ke liye taaki achha lage
    setTimeout(() => {
        // Dono text ko lowercase (chote aksharon) me badalna comparison ke liye
        const jdWords = jobDesc.toLowerCase().match(/\b\w+\b/g) || [];
        const resumeTextLower = extractedText.toLowerCase();

        // Important technical keywords ki list filter karna jo 4 akshar se bade hain
        const stopWords = ['this', 'that', 'with', 'from', 'have', 'your', 'their', 'about'];
        const uniqueJdKeywords = [...new Set(jdWords)].filter(word => word.length > 3 && !stopWords.includes(word));

        let matchedKeywords = [];
        let missingKeywords = [];

        // Keywords check karna
        uniqueJdKeywords.forEach(word => {
            if (resumeTextLower.includes(word)) {
                matchedKeywords.push(word);
            } else {
                missingKeywords.push(word);
            }
        });

        // Smart Score Calculation
        let score = 0;
        if (uniqueJdKeywords.length > 0) {
            score = Math.round((matchedKeywords.length / uniqueJdKeywords.length) * 100);
        }
        
        // Base score adjustment taaki agar bilkul kam ho tab bhi standard format dikhe
        if (score < 40 && matchedKeywords.length > 0) score += 30;
        if (score > 95) score = 95; // 100% ideal ATS optimization rare hoti hai

        // Feedback content ready karna
        let feedbackHTML = `
<strong>✅ Key Strengths (Matched Skills):</strong><br>
${matchedKeywords.slice(0, 8).map(w => '• ' + w.toUpperCase()).join('<br>') || '• Basic formatting matched'}<br><br>

<strong>❌ Missing Keywords / Skills to Add:</strong><br>
${missingKeywords.slice(0, 6).map(w => '• ' + w.toUpperCase()).join('<br>') || '• No major missing keywords found!'}<br><br>

<strong>💡 Quick Improvement Tips:</strong><br>
• Try to add missing technical terms like "${missingKeywords[0] || 'frameworks'}" directly into your project descriptions.<br>
• Customize your resume headline to target "${jobDesc.split(' ').slice(0, 3).join(' ')}".<br>
• Quantify your results (use percentages or numbers) in your experience section.
        `;

        // UI update karna
        document.getElementById('ats-score').innerText = `${score}%`;
        document.getElementById('ai-feedback').innerHTML = feedbackHTML;

        // Display results
        document.getElementById('loading').classList.add('hidden');
        document.getElementById('result-section').classList.remove('hidden');

    }, 1500); // 1.5 seconds ka buffer time
});