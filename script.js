// --- Tutor Dashboard Script (Revised for Functionality) ---

// --- EOC Chapters Data ---
const eocChaptersFull = { 
    reading: ["Vocabulary in Context", "Making the Leap", "The Big Picture", "Literal Comprehension", "Reading for Function", "Supporting & Undermining", "Graphs & Charts", "Paired Passages"],
    writing: ["Transitions", "Specific Focus", "Sentences & Fragments", "Joining & Separating Sentences", "Non-Essential & Essential Clauses", "Verbs Agreements and Tense", "Pronouns", "Modification", "Parallel Structure"],
    math: ["Exponents & Radicals", "Percent", "Rates", "Ratio & Proportion", "Expressions", "Constructing Models", "Manipulating & Solving Equations", "Systems of Equations", "Inequalities", "Lines", "Functions", "Quadratics", "Angles", "Triangles", "Circles", "Trigonometry", "Probability", "Statistics 1"]
};
const allEocChaptersList = [].concat(...Object.values(eocChaptersFull));

// --- CB Skills Data (Generic for Structure) ---
const genericCbSkills = {
    reading: [
        { category: "Information and Ideas", skills: [
            { name: "Central Ideas & Details", key: "reading_central_ideas", score: 0, classAvg: 0, attempted: false },
            { name: "Command of Evidence (Textual)", key: "reading_evidence_textual", score: 0, classAvg: 0, attempted: false },
            { name: "Command of Evidence (Quantitative)", key: "reading_evidence_quant", score: 0, classAvg: 0, attempted: false },
            { name: "Inferences", key: "reading_inferences", score: 0, classAvg: 0, attempted: false },
        ]},
        { category: "Craft and Structure", skills: [
            { name: "Words in Context", key: "reading_vocab", score: 0, classAvg: 0, attempted: false },
            { name: "Text Structure & Purpose", key: "reading_purpose", score: 0, classAvg: 0, attempted: false },
            { name: "Cross-Text Connections", key: "reading_cross_text", score: 0, classAvg: 0, attempted: false },
        ]}
    ],
    writing: [
        { category: "Expression of Ideas", skills: [
            { name: "Rhetorical Synthesis", key: "writing_rhetoric", score: 0, classAvg: 0, attempted: false },
            { name: "Transitions", key: "writing_transitions", score: 0, classAvg: 0, attempted: false },
        ]},
        { category: "Standard English Conventions", skills: [
            { name: "Boundaries (Sentence Structure)", key: "writing_boundaries", score: 0, classAvg: 0, attempted: false },
            { name: "Form, Structure, and Sense", key: "writing_form_sense", score: 0, classAvg: 0, attempted: false },
        ]}
    ],
    math: [
        { category: "Algebra", skills: [
            { name: "Linear Equations & Inequalities", key: "math_algebra_linear", score: 0, classAvg: 0, attempted: false },
            { name: "Linear Functions", key: "math_algebra_functions", score: 0, classAvg: 0, attempted: false },
            { name: "Systems of Equations", key: "math_algebra_systems", score: 0, classAvg: 0, attempted: false },
        ]},
        { category: "Advanced Math", skills: [
            { name: "Nonlinear Expressions", key: "math_advanced_expressions", score: 0, classAvg: 0, attempted: false },
            { name: "Quadratic Equations", key: "math_advanced_quadratics", score: 0, classAvg: 0, attempted: false },
        ]},
        { category: "Problem-Solving and Data Analysis", skills: [
            { name: "Ratios, Rates, Proportions", key: "math_psda_ratios", score: 0, classAvg: 0, attempted: false },
            { name: "Percentages", key: "math_psda_percentages", score: 0, classAvg: 0, attempted: false },
            { name: "Probability & Statistics", key: "math_psda_prob_stats", score: 0, classAvg: 0, attempted: false },
        ]},
        { category: "Geometry and Trigonometry", skills: [
            { name: "Lines, Angles, Triangles", key: "math_geom_angles_triangles", score: 0, classAvg: 0, attempted: false },
            { name: "Circles", key: "math_geom_circles", score: 0, classAvg: 0, attempted: false },
            { name: "Trigonometry", key: "math_geom_trig", score: 0, classAvg: 0, attempted: false },
        ]}
    ]
};
const allCbSkillsList = [].concat(...Object.values(genericCbSkills).map(catArray => catArray.map(cat => cat.skills.map(s => s.key))).flat(2));

// --- Date Formatting Helper ---
function formatDate(dateString) { 
    if (!dateString || dateString === "N/A" || dateString === "Not Attempted") return dateString;
    try {
        const date = new Date(dateString + 'T00:00:00Z');
        const day = date.getUTCDate();
        const month = date.toLocaleString('default', { month: 'short', timeZone: 'UTC' });
        const year = date.getUTCFullYear();
        return `${day} ${month}, ${year}`;
    } catch (e) {
        console.warn("Could not format date:", dateString, e);
        return dateString; 
    }
}

// --- Dummy Student Data Generation ---
const students = [];
const firstNames = ["Alice", "Bob", "Charlie", "Diana", "Edward", "Fiona", "George", "Hannah", "Ian", "Julia"];
const lastNames = ["Smith", "Jones", "Williams", "Brown", "Davis", "Miller", "Wilson", "Moore", "Taylor", "Anderson"];

for (let i = 0; i < 10; i++) { 
    const latestTotalScore = 950 + Math.floor(Math.random() * 500); 
    const previousTotalScore = latestTotalScore - (Math.floor(Math.random() * 100) - 30); 
    const activityScore = 50 + Math.floor(Math.random() * 50); 

    const student = { 
        id: `student${String(i+1).padStart(3,'0')}`, name: `${firstNames[i]} ${lastNames[i]}`,
        targetScore: 1300 + Math.floor(Math.random() * 6) * 50, 
        cbPracticeTests: [], 
        eocQuizzes: { reading: [], writing: [], math: [] }, 
        khanAcademyPractice: { reading: [], writing: [], math: [] }, 
        skills: { reading: [], writing: [], math: [] }, 
        activityMetrics: {
            avgTimePerModuleCB: 25 + Math.floor(Math.random() * 20),
            eocAttempts: 10 + Math.floor(Math.random() * activityScore / 3), 
            khanActivitiesCompleted: 5 + Math.floor(Math.random() * activityScore / 5), 
            pagesViewed: 80 + Math.floor(Math.random() * activityScore * 1.5), 
            latestTotalScore: latestTotalScore,
            previousTotalScore: previousTotalScore, 
            activityScore: activityScore 
        },
        scoreHistory: [previousTotalScore - Math.floor(Math.random()*50), previousTotalScore, latestTotalScore] 
    };
    
    const testNames = ["Diagnostic Test", "Official Practice Test 1", "Official Practice Test 2", "Official Practice Test 3"];
    let currentScoreForHistory = student.activityMetrics.previousTotalScore - 50; 
    testNames.forEach((name, idx) => {
        let rw, math, total;
        if (idx === testNames.length -1) { 
            total = student.activityMetrics.latestTotalScore;
            rw = Math.floor(total * (0.45 + Math.random() * 0.1)); 
            math = total - rw;
        } else {
            currentScoreForHistory += Math.floor(Math.random()*70 - 10); 
            total = Math.max(900, Math.min(1550, currentScoreForHistory)); 
            rw = Math.floor(total * (0.45 + Math.random() * 0.1));
            math = total - rw;
        }
        student.cbPracticeTests.push({ name, date: `2024-0${idx+3}-10`, rw, math, total });
    });
    for(let j=4; j<=7; j++) student.cbPracticeTests.push({ name: `Official Practice Test ${j}`, date: "Not Attempted", rw: "-", math: "-", total: "-" });

    Object.keys(eocChaptersFull).forEach(subject => {
        eocChaptersFull[subject].forEach(chapterName => {
            const scoreNum = Math.floor(Math.random() * 50 + 50);
            student.eocQuizzes[subject].push({ name: chapterName, latestScore: `${scoreNum}%`, classAvg: `${Math.floor(Math.random() * 20 + 65)}%`, date: `2024-05-${Math.floor(Math.random()*20+1).toString().padStart(2,'0')}` });
        });
    });
    
    Object.keys(genericCbSkills).forEach(subject => { 
        genericCbSkills[subject].forEach(category => {
            category.skills.slice(0, Math.floor(Math.random()*2)+1).forEach(skill => { 
                 student.khanAcademyPractice[subject].push({ name: `Khan Academy Practice: ${skill.name}`, score: `<span class="math-inline">\{Math\.floor\(Math\.random\(\)\*5\+5\)\}/10 \(</span>{Math.floor(Math.random()*50+50)}%)`, pointsPossible: "10", classAvg: `${Math.floor(Math.random()*20+60)}%`, date: `2024-05-${Math.floor(Math.random()*20+1).toString().padStart(2,'0')}` });
            });
        });
    });
    
    Object.keys(genericCbSkills).forEach(subject => { 
        student.skills[subject] = genericCbSkills[subject].map(category => ({
            category: category.category,
            skills: category.skills.map(skillInfo => {
                const attempted = Math.random() > 0.2; 
                return {
                    name: skillInfo.name,
                    key: skillInfo.key,
                    score: attempted ? Math.floor(Math.random() * 60 + 40) : 0, 
                    classAvg: Math.floor(Math.random() * 20 + 65),
                    attempted: attempted
                };
            })
        }));
    });
    students.push(student);
}
        
const classAverages = { 
    totalScaledScore: students.reduce((sum, s) => sum + s.activityMetrics.latestTotalScore, 0) / students.length,
    rwScore: students.reduce((sum, s) => sum + (s.cbPracticeTests.find(t=>t.total === s.activityMetrics.latestTotalScore)?.rw || 0), 0) / students.length,
    mathScore: students.reduce((sum, s) => sum + (s.cbPracticeTests.find(t=>t.total === s.activityMetrics.latestTotalScore)?.math || 0), 0) / students.length,
    eocOverallPercentage: students.reduce((sum, s) => { let ts=0,c=0; Object.values(s.eocQuizzes).flat().forEach(e=>{ts+=parseInt(e.latestScore);c++;}); return sum+(c>0?ts/c:0);},0)/students.length,
    avgActivityScore: students.reduce((sum, s) => sum + s.activityMetrics.activityScore, 0) / students.length,
    avgTimePerModuleCB: students.reduce((sum, s) => sum + s.activityMetrics.avgTimePerModuleCB, 0) / students.length,
    eocAttempts: students.reduce((sum, s) => sum + s.activityMetrics.eocAttempts, 0) / students.length,
    khanActivitiesCompleted: students.reduce((sum, s) => sum + s.activityMetrics.khanActivitiesCompleted, 0) / students.length,
    skills: {}, 
    eocChapters: {}
};
allCbSkillsList.forEach(key => { classAverages.skills[key] = Math.round(students.reduce((s,std)=>s+ (Object.values(std.skills).flat().flatMap(cat => cat.skills).find(sk=>sk.key===key)?.score || 0),0)/students.length) || 0; });
allEocChaptersList.forEach(name => { classAverages.eocChapters[name] = Math.round(students.reduce((s,std)=>s+ (Object.values(std.eocQuizzes).flat().find(e=>e.name===name)? parseInt(Object.values(std.eocQuizzes).flat().find(e=>e.name===name).latestScore) :0),0)/students.length) || 0; });

let classScoreDistributionChartInstance, classSkillPerformanceChartInstance;
let studentScoreTrendChartInstance, studentOverallSkillChartInstance;
let modalDonutChartInstance, modalLineChartInstance;
        
let tutorTabs, tutorTabContents, studentSelector, replicatedStudentDashboardDiv, selectedStudentNameHeader, studentSelectionPrompt, modal, modalQuestionDetailsContainer, tutorHamburgerButton, tutorMobileMenu;
let studentMobileNavButton, studentMobileNavMenu; // For replicated student nav

const CHART_PRIMARY_COLOR = '#2a5266'; 
const CHART_SECONDARY_COLOR = '#757575'; 
const CHART_PRIMARY_BG_BAR = 'rgba(42, 82, 102, 0.8)'; 
const CHART_PRIMARY_BG_RADAR = 'rgba(42, 82, 102, 0.3)';

document.addEventListener('DOMContentLoaded', function () {
    console.log("Tutor Dashboard DOMContentLoaded: Initializing script...");

    tutorTabs = document.querySelectorAll('.main-nav-button');
    tutorTabContents = document.querySelectorAll('.tutor-tab-content');
    studentSelector = document.getElementById('studentSelector');
    replicatedStudentDashboardDiv = document.getElementById('replicatedStudentDashboard');
    selectedStudentNameHeader = document.getElementById('selectedStudentNameHeader');
    studentSelectionPrompt = document.getElementById('studentSelectionPrompt');
    modal = document.getElementById('detailModal');
    modalQuestionDetailsContainer = document.getElementById('modalQuestionDetails');
    tutorHamburgerButton = document.getElementById('tutorHamburgerButton');
    tutorMobileMenu = document.getElementById('tutorMobileMenu');
    studentMobileNavButton = document.getElementById('studentMobileNavButton');
    studentMobileNavMenu = document.getElementById('studentMobileNavMenu');


    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    if (studentSelector) {
        students.forEach(student => { const opt = document.createElement('option'); opt.value = student.id; opt.textContent = student.name; studentSelector.appendChild(opt); });
        studentSelector.value = ""; 
    } else { console.error("Student selector element not found!"); }

    if (tutorHamburgerButton && tutorMobileMenu) {
        tutorHamburgerButton.addEventListener('click', () => {
            tutorMobileMenu.classList.toggle('hidden');
        });
    }
    
    function switchTutorTab(tabElementOrName) {
        let targetTabName;
        if (typeof tabElementOrName === 'string') {
            targetTabName = tabElementOrName;
        } else {
            targetTabName = tabElementOrName.getAttribute('data-tutor-tab');
        }
        console.log("Switching to Tutor tab:", targetTabName);

        tutorTabs.forEach(t => t.classList.remove('active'));
        document.querySelectorAll('#tutorMobileMenu .mobile-nav-link').forEach(l => l.classList.remove('active'));
        tutorTabContents.forEach(content => content.classList.add('hidden'));

        const desktopTabToActivate = document.querySelector(`.main-nav-button[data-tutor-tab="${targetTabName}"]`);
        if(desktopTabToActivate) desktopTabToActivate.classList.add('active');
        const mobileLinkToActivate = document.querySelector(`#tutorMobileMenu .mobile-nav-link[data-tutor-tab="${targetTabName}"]`);
        if(mobileLinkToActivate) mobileLinkToActivate.classList.add('active');

        const targetContentId = targetTabName + '-content';
        const targetEl = document.getElementById(targetContentId);
        if(targetEl) {
            targetEl.classList.remove('hidden');
            console.log("Showing content for main tutor tab:", targetContentId);
        } else {
            console.error("Target content not found for tutor tab:", targetContentId);
        }

        if (targetContentId === 'class-overview-content') loadClassOverviewData();
        else if (targetContentId === 'student-performance-tiers-content') loadStudentPerformanceTiers();
        else if (targetContentId === 'student-deep-dive-content') {
            if (studentSelector && studentSelector.value) {
                loadStudentDashboard(studentSelector.value);
            } else { 
                if(replicatedStudentDashboardDiv) replicatedStudentDashboardDiv.classList.add('hidden'); 
                if(studentSelectionPrompt) studentSelectionPrompt.classList.remove('hidden'); 
                if(selectedStudentNameHeader) selectedStudentNameHeader.textContent = "";
            }
        }
        if (tutorMobileMenu && !tutorMobileMenu.classList.contains('hidden')){
            tutorMobileMenu.classList.add('hidden');
        }
    }

    tutorTabs.forEach(tab => { 
        tab.addEventListener('click', () => switchTutorTab(tab));
    });
    document.querySelectorAll('#tutorMobileMenu .mobile-nav-link').forEach(link => { 
        link.addEventListener('click', (e) => { e.preventDefault(); switchTutorTab(link); });
    });
    
    if (studentSelector) {
        studentSelector.addEventListener('change', function() {
            if (this.value) { 
                console.log("Student selected via dropdown:", this.value);
                loadStudentDashboard(this.value); 
                if(studentSelectionPrompt) studentSelectionPrompt.classList.add('hidden'); 
            } else { 
                if(replicatedStudentDashboardDiv) replicatedStudentDashboardDiv.classList.add('hidden'); 
                if(studentSelectionPrompt) studentSelectionPrompt.classList.remove('hidden'); 
                if(selectedStudentNameHeader) selectedStudentNameHeader.textContent = ""; 
            }
        });
    }

    if (tutorTabs.length > 0) {
        console.log("Activating first tutor tab by default.");
        switchTutorTab(tutorTabs[0]); 
    } else {
        console.error("No tutor tabs found to activate.");
    }

    // Replicated Student Dashboard Navigation Setup
    if (replicatedStudentDashboardDiv) {
        const studentMainTabs = replicatedStudentDashboardDiv.querySelectorAll('.student-main-tab-button');
        const studentMainTabContents = replicatedStudentDashboardDiv.querySelectorAll('.student-main-tab-content');
        
        function switchStudentTab(studentTabElement) {
            const targetStudentTabName = studentTabElement.getAttribute('data-student-main-tab');
            console.log("Switching to student tab (deep dive):", targetStudentTabName);

            studentMainTabs.forEach(t => t.classList.remove('active'));
            studentMainTabContents.forEach(content => content.classList.add('hidden'));
            
            // Activate new desktop tab
            studentTabElement.classList.add('active');

            // Also activate corresponding mobile link if exists
            if(studentMobileNavMenu) {
                studentMobileNavMenu.querySelectorAll('.mobile-nav-link').forEach(l => l.classList.remove('active'));
                const mobileLink = studentMobileNavMenu.querySelector(`.mobile-nav-link[data-student-main-tab="${targetStudentTabName}"]`);
                if(mobileLink) mobileLink.classList.add('active');
            }

            const targetContentId = 'student-' + targetStudentTabName + '-content';
            const targetEl = document.getElementById(targetContentId);
            if(targetEl) targetEl.classList.remove('hidden'); else console.error("Student tab content not found:", targetContentId);
            
            if (targetStudentTabName === 'overview') {
                const student = students.find(s => s.id === (studentSelector ? studentSelector.value : null));
                if (student) initializeStudentOverviewCharts(student);
            }
            const firstSubTab = document.querySelector(`#${targetContentId} .sub-tab-button`);
            if (firstSubTab) firstSubTab.click();

            if (studentMobileNavMenu && !studentMobileNavMenu.classList.contains('hidden')) {
                studentMobileNavMenu.classList.add('hidden');
            }
        }

        studentMainTabs.forEach(tab => {
            tab.addEventListener('click', () => switchStudentTab(tab));
        });

        // Student Mobile Nav within Deep Dive
        if(studentMobileNavButton && studentMobileNavMenu) {
            studentMobileNavButton.addEventListener('click', () => studentMobileNavMenu.classList.toggle('hidden'));
            studentMobileNavMenu.querySelectorAll('.mobile-nav-link').forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    switchStudentTab(link); // Use the same switchTab function
                });
            });
        }

        // Student Sub-Tabs (common for all student sections)
        replicatedStudentDashboardDiv.querySelectorAll('.sub-tab-button').forEach(subTab => {
            subTab.addEventListener('click', (e) => {
                const parentMainTabContent = subTab.closest('.student-main-tab-content');
                if (parentMainTabContent) {
                    parentMainTabContent.querySelectorAll('.sub-tab-button').forEach(st => st.classList.remove('active'));
                    parentMainTabContent.querySelectorAll('.student-sub-tab-content-panel').forEach(panel => panel.classList.add('hidden'));
                }
                subTab.classList.add('active');
                const targetSubContentId = 'student-' + subTab.getAttribute('data-student-sub-tab') + '-content';
                const targetSubEl = document.getElementById(targetSubContentId);
                if(targetSubEl) targetSubEl.classList.remove('hidden'); else console.error("Student sub-tab content not found:", targetSubContentId);
            });
        });
    }
    console.log("All event listeners set up.");
});


function initializeStudentOverviewCharts(student) { 
    console.log("Initializing student overview charts for:", student.name);
    const chartOptions = { responsive: true, maintainAspectRatio: true, plugins: { legend: { display: true, position: 'bottom' }}};
    
    const studentScoreTrendCanvas = document.getElementById('studentScoreTrendChart');
    if (studentScoreTrendCanvas) {
        if(studentScoreTrendChartInstance) studentScoreTrendChartInstance.destroy();
        studentScoreTrendChartInstance = new Chart(studentScoreTrendCanvas.getContext('2d'), { 
            type: 'line', data: { labels: student.cbPracticeTests.filter(t => t.total !== "-").map(t => t.name.replace("Official Practice Test ","PT").replace("Diagnostic Test","Diag")), datasets: [{ label: 'Student Score', data: student.scoreHistory, borderColor: CHART_PRIMARY_COLOR, tension: 0.1 }] }, options: chartOptions });
    } else { console.error("studentScoreTrendChart canvas not found for student:", student.name); }

    const studentOverallSkillCanvas = document.getElementById('studentOverallSkillChart');
    if (studentOverallSkillCanvas) {
        if(studentOverallSkillChartInstance) studentOverallSkillChartInstance.destroy();
        let perfLabels = ['Reading', 'Writing & Language', 'Math'];
        let perfStudent = [0,0,0]; 
        let perfClass = [0,0,0];

        const readingAvg = student.skills.reading.flatMap(cat => cat.skills).reduce((acc, s, _, arr) => acc + (s.attempted ? s.score : 0) / (arr.filter(sk=>sk.attempted).length || 1), 0);
        const writingAvg = student.skills.writing.flatMap(cat => cat.skills).reduce((acc, s, _, arr) => acc + (s.attempted ? s.score : 0) / (arr.filter(sk=>sk.attempted).length || 1), 0);
        const mathAvg = student.skills.math.flatMap(cat => cat.skills).reduce((acc, s, _, arr) => acc + (s.attempted ? s.score : 0) / (arr.filter(sk=>sk.attempted).length || 1), 0);
        perfStudent = [readingAvg || 0, writingAvg || 0, mathAvg || 0].map(s => Math.round(s));
        
        perfClass = [ // Simplified class average for these broad categories
            Math.round(Object.keys(classAverages.skills).filter(k=>k.startsWith('reading')).reduce((a,k)=>a+classAverages.skills[k],0) / (Object.keys(classAverages.skills).filter(k=>k.startsWith('reading')).length||1)),
            Math.round(Object.keys(classAverages.skills).filter(k=>k.startsWith('writing')).reduce((a,k)=>a+classAverages.skills[k],0) / (Object.keys(classAverages.skills).filter(k=>k.startsWith('writing')).length||1)),
            Math.round(Object.keys(classAverages.skills).filter(k=>k.startsWith('math')).reduce((a,k)=>a+classAverages.skills[k],0) / (Object.keys(classAverages.skills).filter(k=>k.startsWith('math')).length||1))
        ];


        studentOverallSkillChartInstance = new Chart(studentOverallSkillCanvas.getContext('2d'), { 
            type: 'bar', data: { labels: perfLabels, datasets: [ 
                { label: 'Student Accuracy', data: perfStudent, backgroundColor: CHART_PRIMARY_BG_BAR}, 
                { label: 'Class Average', data: perfClass, backgroundColor: CHART_SECONDARY_COLOR + 'AA' } 
            ]}, options: { ...chartOptions, scales: { y: { beginAtZero: true, max: 100 }}} 
        });
    } else { console.error("studentOverallSkillChart canvas not found for student:", student.name); }
}

function loadClassOverviewData() { 
    console.log("Loading Class Overview Data...");
    const chartOptions = { responsive: true, maintainAspectRatio: true, plugins: { legend: { display: true, position: 'bottom' }}};
    const kpiContainer = document.getElementById('classKpiSection'); 
    if (kpiContainer) {
        kpiContainer.innerHTML = `
            <div class="themed-card kpi-widget p-0"><div class="themed-card-title-strip" style="font-size:0.9rem; padding:0.5rem 1rem;">Avg Total Score</div><div class="themed-card-body text-center py-2"><span class="value"><span class="math-inline">\{Math\.round\(classAverages\.totalScaledScore\)\}</span\></div\></div\> 
<div class\="themed\-card kpi\-widget p\-0"\><div class\="themed\-card\-title\-strip" style\="font\-size\:0\.9rem; padding\:0\.5rem 1rem;"\>Avg R&W Score</div\><div class\="themed\-card\-body text\-center py\-2"\><span class\="value"\></span>{Math.round(classAverages.rwScore)}</span></div></div> 
            <div class="themed-card kpi-widget p-0"><div class="themed-card-title-strip" style="font-size:0.9rem; padding:0.5rem 1rem;">Avg Math Score</div><div class="themed-card-body text-center py-2"><span class="value"><span class="math-inline">\{Math\.round\(classAverages\.mathScore\)\}</span\></div\></div\> 
<div class\="themed\-card kpi\-widget p\-0"\><div class\="themed\-card\-title\-strip" style\="font\-size\:0\.9rem; padding\:0\.5rem 1rem;"\>Avg EOC Practice Score</div\><div class\="themed\-card\-body text\-center py\-2"\><span class\="value"\></span>{Math.round(classAverages.eocOverallPercentage)}%</span></div></div> 
            <div class="themed-card kpi-widget p-0"><div class="themed-card-title-strip" style="font-size:0.9rem; padding:0.5rem 1rem;">Avg Activity Score</div><div class="themed-card-body text-center py-2"><span class="value">${Math.round(classAverages.avgActivityScore)}</span></div></div>`;
    } else { console.error("classKpiSection not found"); }
    
    const activityReportContainer = document.getElementById('classActivityReport'); 
    if (activityReportContainer) {
        const sortedByActivity = [...students].sort((a,b) => b.activityMetrics.activityScore - a.activityMetrics.activityScore); 
        activityReportContainer.innerHTML = `<div><p class="text-sm text-gray-500">Avg Class Activity</p><p class="font-semibold text-xl"><span class="math-inline">\{Math\.round\(classAverages\.avgActivityScore\)\}</p\></div\> <div\><p class\="text\-sm text\-green\-500"\>Most Active</p\><p class\="font\-semibold text\-lg"\></span>{sortedByActivity[0].name} (<span class="math-inline">\{sortedByActivity\[0\]\.activityMetrics\.activityScore\}\)</p\></div\> <div\><p class\="text\-sm text\-red\-500"\>Least Active</p\><p class\="font\-semibold text\-lg"\></span>{sortedByActivity[sortedByActivity.length-1].name} (${sortedByActivity[sortedByActivity.length-1].activityMetrics.activityScore})</p></div>`;
    } else { console.error("classActivityReport not found"); }

    const classScoreDistCanvas = document.getElementById('classScoreDistributionChart');
    if (classScoreDistCanvas) {
        if (classScoreDistributionChartInstance) classScoreDistributionChartInstance.destroy(); 
        const scoreCounts = students.reduce((acc, s) => { const bin = Math.floor(s.activityMetrics.latestTotalScore / 100) * 100; acc[bin] = (acc[bin] || 0) + 1; return acc; }, {}); 
        classScoreDistributionChartInstance = new Chart(classScoreDistCanvas.getContext('2d'), { type: 'bar', data: { labels: Object.keys(scoreCounts).map(bin => `<span class="math-inline">\{bin\}\-</span>{parseInt(bin)+99}`).sort(), datasets: [{ label: '# of Students', data: Object.values(scoreCounts), backgroundColor: CHART_PRIMARY_BG_BAR }] }, options: { ...chartOptions, scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } } } }); 
    } else { console.error("classScoreDistributionChart canvas not found"); }
    
    const classSkillPerfCanvas = document.getElementById('classSkillPerformanceChart');
    if (classSkillPerfCanvas) {
        if (classSkillPerformanceChartInstance) classSkillPerformanceChartInstance.destroy(); 
        const skillKeysForChart = ['math_algebra', 'math_advanced', 'math_problem_solving', 'math_geometry', 'reading_central_ideas', 'reading_vocab', 'writing_rhetoric', 'writing_boundaries']; 
        const radarChartLabels = skillKeysForChart.map(k => { const parts = k.split('_'); return parts.length > 1 ? (parts[1].charAt(0).toUpperCase() + parts[1].slice(1)) : (parts[0].charAt(0).toUpperCase() + parts[0].slice(1)); });
        classSkillPerformanceChartInstance = new Chart(classSkillPerfCanvas.getContext('2d'), { type: 'radar', data: { labels: radarChartLabels, datasets: [{ label: 'Class Avg Accuracy (%)', data: skillKeysForChart.map(key => classAverages.skills[key] || 0), fill: true, backgroundColor: CHART_PRIMARY_BG_RADAR, borderColor: CHART_PRIMARY_COLOR, pointBackgroundColor: CHART_PRIMARY_COLOR }] }, options: { ...chartOptions, scales: { r: { beginAtZero: true, max: 100, suggestedMin: 40, pointLabels: { font: { size: 10 } } } } } }); 
    } else { console.error("classSkillPerformanceChart canvas not found"); }
    
    ['Reading', 'Writing & Language', 'Math'].forEach(subject => { 
        let subjectKeyForId = subject;
        if (subject === 'Writing & Language') subjectKeyForId = 'Writing'; 
        const containerId = `classWeakEoc${subjectKeyForId}`; 
        const container = document.getElementById(containerId); 
        if(container) { 
            container.innerHTML = ''; 
            const subjectEocChapterNames = eocChaptersFull[subject.toLowerCase().split(' ')[0]]; 
            if (subjectEocChapterNames) {
                const sortedEocs = subjectEocChapterNames.map(name => ({name, avgScore: classAverages.eocChapters[name] || 0}))
                    .sort((a,b) => a.avgScore - b.avgScore)
                    .slice(0, 3); 
                sortedEocs.forEach(eoc => { 
                    const studentsBelow70 = students.filter(s => (Object.values(s.eocQuizzes).flat().find(se => se.name === eoc.name)? parseInt(Object.values(s.eocQuizzes).flat().find(se => se.name === eoc.name).latestScore) : 100) < 70).length; 
                    container.innerHTML += `<div class="p-1 border-b border-gray-200 text-xs"><span class="font-medium">${eoc.name}</span>: Avg <span class="math-inline">\{eoc\.avgScore\}% <span class\="text\-red\-500"\>\(</span>{studentsBelow70}/${students.length} &lt;70%)</span></div>`; 
                }); 
                if(sortedEocs.length === 0) container.innerHTML = `<p class="text-xs text-gray-400">No specific weak EOC Practice identified for ${subject}.</p>`; 
            } else {
                 container.innerHTML = `<p class="text-xs text-gray-400">Chapter definition missing for ${subject}.</p>`;
            }
        } else { 
            console.error(`Container not found for weak EOCs: ${containerId}`);
        } 
    });
    
    const skillStrengthsUl = document.getElementById('classSkillStrengths'); 
    const skillWeaknessesUl = document.getElementById('classSkillWeaknesses'); 
    if (skillStrengthsUl && skillWeaknessesUl) {
        skillStrengthsUl.innerHTML = ''; skillWeaknessesUl.innerHTML = ''; 
        const allSkillsWithNames = []; 
        Object.values(genericCbSkills).flat().forEach(category => { category.skills.forEach(skillInfo => { allSkillsWithNames.push({name: skillInfo.name, key: skillInfo.key, avgScore: classAverages.skills[skillInfo.key] || 0}); }); });
        allSkillsWithNames.sort((a,b) => b.avgScore - a.avgScore);  
        allSkillsWithNames.slice(0,3).forEach(s => skillStrengthsUl.innerHTML += `<li><span class="math-inline">\{s\.name\} \(</span>{s.avgScore}%)</li>`); 
        allSkillsWithNames.sort((a,b) => a.avgScore - b.avgScore);  
        allSkillsWithNames.slice(0,3).forEach(s => skillWeaknessesUl.innerHTML += `<li><span class="math-inline">\{s\.name\} \(</span>{s.avgScore}%)</li>`);
    } else { console.error("Skill strengths/weaknesses ULs not found"); }
    console.log("Class Overview Data populated.");
}

function loadStudentPerformanceTiers() { 
    console.log("Loading Student Performance Tiers...");
    const sprintersContainer = document.getElementById('sprintersList'); 
    const strugglersContainer = document.getElementById('strugglersList'); 
    if (!sprintersContainer || !strugglersContainer) { console.error("Sprinter/Struggler containers not found"); return;}
    sprintersContainer.innerHTML = ''; strugglersContainer.innerHTML = ''; 
    const sprinters = []; const strugglers = []; 
    students.forEach(s => { const scoreImprovement = s.activityMetrics.latestTotalScore - s.activityMetrics.previousTotalScore; let isSprinter = false; let isStruggler = false; if (s.activityMetrics.latestTotalScore > (classAverages.totalScaledScore + 75) || scoreImprovement > 50 || s.activityMetrics.activityScore > 85) isSprinter = true; if (s.activityMetrics.latestTotalScore < (classAverages.totalScaledScore - 75) || scoreImprovement < -20 || s.activityMetrics.activityScore < 60) isStruggler = true; if (isStruggler) strugglers.push(s); else if(isSprinter) sprinters.push(s);}); 
    if (sprinters.length === 0 && students.length > 0) sprinters.push(...[...students].sort((a,b) => b.activityMetrics.latestTotalScore - a.activityMetrics.latestTotalScore).slice(0, Math.min(3, students.length))); 
    if (strugglers.length === 0 && students.length > 0) strugglers.push(...[...students].sort((a,b) => a.activityMetrics.latestTotalScore - b.activityMetrics.latestTotalScore).slice(0, Math.min(3, students.length))); 
    sprinters.slice(0,6).forEach(s => { const improvement = s.activityMetrics.latestTotalScore - s.activityMetrics.previousTotalScore; const improvementText = improvement >= 0 ? `+${improvement}` : improvement; const topSkill = Object.values(s.skills).flat().flatMap(cat => cat.skills).filter(sk => sk.attempted).sort((a,b)=>b.score-a.score)[0]; sprintersContainer.innerHTML += `<div class="themed-card sprinter-card p-0"><div class="themed-card-title-strip" style="font-size:1rem; padding:0.5rem 1rem; background-color: #28a745; color:white;"><span class="math-inline">\{s\.name\}</div\><div class\="themed\-card\-body text\-xs"\><p\>Score\: <span class\="font\-bold"\></span>{s.activityMetrics.latestTotalScore}</span> (Target: ${s.targetScore}) <span class="ml-1 <span class="math-inline">\{improvement \>\=0 ? 'text\-good'\:'text\-poor'\}"\>\(</span>{improvementText} pts)</span></p><p>Activity: <span class="math-inline">\{s\.activityMetrics\.activityScore\}/100</p\><p class\="mt\-1"\>Strength\: <span class\="font\-medium"\></span>{topSkill?topSkill.name:'N/A'} (${topSkill?topSkill.score:'' }%)</span></p></div></div>`; }); 
    if(sprinters.length === 0) sprintersContainer.innerHTML = "<p class='text-gray-500 col-span-full text-center'>No students currently flagged as sprinters.</p>"; 
    strugglers.slice(0,6).forEach(s => { const worstSkill = Object.values(s.skills).flat().flatMap(cat => cat.skills).filter(sk => sk.attempted).sort((a,b)=>a.score-b.score)[0]; strugglersContainer.innerHTML += `<div class="themed-card struggler-card p-0"><div class="themed-card-title-strip" style="font-size:1rem; padding:0.5rem 1rem; background-color: #dc3545; color:white;"><span class="math-inline">\{s\.name\}</div\><div class\="themed\-card\-body text\-xs"\><p\>Score\: <span class\="font\-bold"\></span>{s.activityMetrics.latestTotalScore}</span> (Target: ${s.targetScore})</p><p>Activity: ${s.activityMetrics.activityScore}/100 <span class="math-inline">\{s\.activityMetrics\.activityScore < 60 ? '<span class\="text\-red\-500 font\-bold"\>LOW\!</span\>'\:''\}</p\><p class\="mt\-1"\>Focus Area\: <span class\="font\-medium"\></span>{worstSkill?worstSkill.name:'N/A'} (${worstSkill?worstSkill.score:'' }%)</span></p></div></div>`; }); 
    if(strugglers.length === 0) strugglersContainer.innerHTML = "<p class='text-gray-500 col-span-full text-center'>No students currently flagged as strugglers.</p>";
    console.log("Student Performance Tiers populated.");
}

function getPerformanceClassStudent(score, attempted = true) { 
    if (!attempted) return 'performance-na'; // For not attempted skills
    if (score >= 85) return 'performance-good'; 
    if (score >= 70) return 'performance-average'; 
    return 'performance-poor'; 
}

function loadStudentDashboard(studentId) { 
    console.log("Loading dashboard for student ID:", studentId);
    const student = students.find(s => s.id === studentId); 
    if (!student) { console.error("Student not found for ID:", studentId); return; }
    
    if(selectedStudentNameHeader) selectedStudentNameHeader.textContent = `- ${student.name}`; 
    if(replicatedStudentDashboardDiv) replicatedStudentDashboardDiv.classList.remove('hidden'); 
    if(studentSelectionPrompt) studentSelectionPrompt.classList.add('hidden'); 
    
    const compNameEl = document.getElementById('comparativeStudentName');
    if(compNameEl) compNameEl.textContent = student.name; 
    
    initializeStudentOverviewCharts(student); 
    
    const comparisonContainer = document.getElementById('studentComparisonWidgets'); 
    if(comparisonContainer) {
        comparisonContainer.innerHTML = `
            <div class="themed-card kpi-widget p-0"><div class="themed-card-title-strip" style="padding:0.4rem 0.8rem; font-size:0.8rem;">Total Score</div><div class="themed-card-body text-center py-2"><span class="value">${student.activityMetrics.latestTotalScore} <span class="text-sm <span class="math-inline">\{student\.activityMetrics\.latestTotalScore \> classAverages\.totalScaledScore ? 'text\-good'\:'text\-poor'\}"\></span>{student.activityMetrics.latestTotalScore > classAverages.totalScaledScore ? '↑':'↓'}</span></span><p class="comparison text-xs">Class Avg: <span class="math-inline">\{Math\.round\(classAverages\.totalScaledScore\)\}</p\></div\></div\> 
<div class\="themed\-card kpi\-widget p\-0"\><div class\="themed\-card\-title\-strip" style\="padding\:0\.4rem 0\.8rem; font\-size\:0\.8rem;"\>Avg Time/Module</div\><div class\="themed\-card\-body text\-center py\-2"\><span class\="value"\></span>{student.activityMetrics.avgTimePerModuleCB} min <span class="text-sm <span class="math-inline">\{student\.activityMetrics\.avgTimePerModuleCB < classAverages\.avgTimePerModuleCB ? 'text\-good'\:'text\-poor'\}"\></span>{student.activityMetrics.avgTimePerModuleCB < classAverages.avgTimePerModuleCB ? '↓':'↑'}</span></span><p class="comparison text-xs">Class Avg: <span class="math-inline">\{Math\.round\(classAverages\.avgTimePerModuleCB\)\} min</p\></div\></div\> 
<div class\="themed\-card kpi\-widget p\-0"\><div class\="themed\-card\-title\-strip" style\="padding\:0\.4rem 0\.8rem; font\-size\:0\.8rem;"\>EOC Practice Attempts</div\><div class\="themed\-card\-body text\-center py\-2"\><span class\="value"\></span>{student.activityMetrics.eocAttempts} <span class="text-sm <span class="math-inline">\{student\.activityMetrics\.eocAttempts \> classAverages\.eocAttempts ? 'text\-good'\:'text\-poor'\}"\></span>{student.activityMetrics.eocAttempts > classAverages.eocAttempts ? '↑':'↓'}</span></span><p class="comparison text-xs">Class Avg: <span class="math-inline">\{Math\.round\(classAverages\.eocAttempts\)\}</p\></div\></div\> 
<div class\="themed\-card kpi\-widget p\-0"\><div class\="themed\-card\-title\-strip" style\="padding\:0\.4rem 0\.8rem; font\-size\:0\.8rem;"\>Khan Academy Practice Activities</div\><div class\="themed\-card\-body text\-center py\-2"\><span class\="value"\></span>{student.activityMetrics.khanActivitiesCompleted} <span class="text-sm <span class="math-inline">\{student\.activityMetrics\.khanActivitiesCompleted \> classAverages\.khanActivitiesCompleted ? 'text\-good'\:'text\-poor'\}"\></span>{student.activityMetrics.khanActivitiesCompleted > classAverages.khanActivitiesCompleted ? '↑':'↓'}</span></span><p class="comparison text-xs">Class Avg: ${Math.round(classAverages.khanActivitiesCompleted)}</p></div></div>`; 
    } else { console.error("studentComparisonWidgets not found"); }
    
    const studentScoreCardContainer = document.getElementById('studentScoreCards'); 
    if(studentScoreCardContainer) {
        const latestTest = student.cbPracticeTests.find(t => t.total === student.activityMetrics.latestTotalScore)
