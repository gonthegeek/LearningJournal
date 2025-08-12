// This script is designed to be run by a teacher/admin to migrate existing user data.
// It will update the weekly learning plan and the course list for all users.

// --- NEW DATA TO MIGRATE ---

// This should be the single source of truth for courses.
const MIGRATION_COURSES_LIST = [
    { name: "Career Essentials in Software Development by Microsoft and LinkedIn", link: "https://www.linkedin.com/learning/paths/career-essentials-in-software-development-by-microsoft-and-linkedin" },
    { name: "Learning Git and GitHub", link: "https://www.linkedin.com/learning/learning-git-and-github-14213624" },
    { name: "SQL for Non-Programmers", link: "https://www.linkedin.com/learning/sql-for-non-programmers" },
    { name: "HTML, CSS, and JavaScript: Building the Web", link: "https://www.linkedin.com/learning/html-css-and-javascript-building-the-web" },
    { name: "JavaScript Essential Training", link: "https://www.linkedin.com/learning/javascript-essential-training" },
    { name: "Python for Non-Programmers", link: "https://www.linkedin.com/learning/python-for-non-programmers" },
    { name: "Introduction to Web APIs", link: "https://www.linkedin.com/learning/introduction-to-web-apis" },
    { name: "Learning REST APIs", link: "https://www.linkedin.com/learning/learning-rest-apis" },
    { name: "Data Visualization: Best Practices", link: "https://www.linkedin.com/learning/data-visualization-best-practices-14429760" },
    { name: "React.js Essential Training", link: "https://www.linkedin.com/learning/react-js-essential-training-14836121" },
    { name: "Programming Foundations: Software Testing/QA", link: "https://www.linkedin.com/learning/programming-foundations-software-testing-qa" },
    { name: "React Authentication", link: "https://www.linkedin.com/learning/react-authentication-25660373" },
    { name: "Advanced Python: Working with Databases", link: "https://www.linkedin.com/learning/advanced-python-working-with-databases-22307421" },
    { name: "Programming Foundations: Test-Driven Development", link: "https://www.linkedin.com/learning/programming-foundations-test-driven-development-3" },
    { name: "Software Architecture Foundations", link: "https://www.linkedin.com/learning/software-architecture-foundations" },
    { name: "Designing RESTful APIs", link: "https://www.linkedin.com/learning/designing-restful-apis" },
    { name: "Learning Docker", link: "https://www.linkedin.com/learning/learning-docker-2" },
    { name: "DevOps Foundations", link: "https://www.linkedin.com/learning/devops-foundations" },
    { name: "Coach Your Team to Learn, Stretch, and Grow", link: "https://www.linkedin.com/learning/coach-your-team-to-learn-stretch-and-grow" },
    { name: "Strategic Thinking", link: "https://www.linkedin.com/learning/strategic-thinking" },
    { name: "Programming Foundations: Real-World Examples", link: "https://www.linkedin.com/learning/programming-foundations-real-world-examples" },
    { name: "Learning Personal Branding (2018)", link: "https://www.linkedin.com/learning/learning-personal-branding-2018" },
];

// This should be the single source of truth for the weekly plan.
const MIGRATION_LEARNING_PLAN = [
    { id: 0, title: "Career Essentials – Professional Programming Foundations", phase: "Foundation", successGoal: "Understand professional programming landscape for broadcast", tasks: [
        { text: "Mon: Course 1 – Introduction module (Career overview ~25m)", link: "https://www.linkedin.com/learning/paths/career-essentials-in-software-development-by-microsoft-and-linkedin", completed: false },
        { text: "Mon: AI Prompt – How do these career skills apply to broadcast engineers?", completed: false },
        { text: "Tue: Course 1 – Skills and tools module (~25m)", link: "https://www.linkedin.com/learning/paths/career-essentials-in-software-development-by-microsoft-and-linkedin", completed: false },
        { text: "Tue: AI Prompt – Relate programming career skills to broadcast engineering", completed: false },
        { text: "Wed: Course 1 – Industry perspectives module (~25m)", link: "https://www.linkedin.com/learning/paths/career-essentials-in-software-development-by-microsoft-and-linkedin", completed: false },
        { text: "Wed: AI Prompt – Apply programming skills in broadcast environments", completed: false },
        { text: "Thu: Course 1 – Remaining sections (~25m)", link: "https://www.linkedin.com/learning/paths/career-essentials-in-software-development-by-microsoft-and-linkedin", completed: false },
        { text: "Thu: AI Discussion – Professional development plan (broadcast focus)", completed: false },
        { text: "Fri: Finish Course 1 & create learning plan for remaining courses", completed: false }
    ]},
    { id: 1, title: "Programming Foundations – Core Concepts", phase: "Foundation", successGoal: "Master core concepts w/ broadcast context", tasks: [
        { text: "Mon: Course 2 – Fundamentals intro + basics (~25m)", link: "https://www.linkedin.com/learning/programming-foundations-fundamentals", completed: false },
        { text: "Mon: AI – Connect programming fundamentals to broadcast system logic", completed: false },
        { text: "Tue: Course 2 – Variables & data types (~25m)", link: "https://www.linkedin.com/learning/programming-foundations-fundamentals", completed: false },
        { text: "Tue: AI – Relate variables to equipment parameters", completed: false },
        { text: "Wed: Course 2 – Functions & methods (~25m)", link: "https://www.linkedin.com/learning/programming-foundations-fundamentals", completed: false },
        { text: "Wed: AI – Functions like equipment control procedures", completed: false },
        { text: "Thu: Course 2 – Conditionals & modular programming (~25m)", link: "https://www.linkedin.com/learning/programming-foundations-fundamentals", completed: false },
        { text: "Thu: AI – Apply conditional logic to automation scenarios", completed: false },
        { text: "Fri: Course 2 – Debugging & error handling (~25m)", link: "https://www.linkedin.com/learning/programming-foundations-fundamentals", completed: false },
        { text: "Fri: AI – Compare debugging to equipment troubleshooting", completed: false }
    ]},
    { id: 2, title: "Advanced Foundations – Professional Practices", phase: "Foundation", successGoal: "Certificate complete + applied insights", tasks: [
        { text: "Mon: Course 3 – Collections (~25m)", link: "https://www.linkedin.com/learning/programming-foundations-beyond-the-fundamentals", completed: false },
        { text: "Mon: AI – Collections vs equipment inventories", completed: false },
        { text: "Tue: Course 3 – External code & libraries (~25m)", link: "https://www.linkedin.com/learning/programming-foundations-beyond-the-fundamentals", completed: false },
        { text: "Tue: AI – Libraries vs integrating 3rd-party equipment", completed: false },
        { text: "Wed: Course 3 – Advanced debugging & error handling (~25m)", link: "https://www.linkedin.com/learning/programming-foundations-beyond-the-fundamentals", completed: false },
        { text: "Wed: AI – Advanced troubleshooting techniques", completed: false },
        { text: "Thu: Course 3 – Planning & documenting code (~25m)", link: "https://www.linkedin.com/learning/programming-foundations-beyond-the-fundamentals", completed: false },
        { text: "Thu: AI – Documentation practices vs broadcast engineering", completed: false },
        { text: "Fri: Complete certificate & create insights doc (repo)", completed: false },
        { text: "Fri: AI – Review understanding of professional foundations", completed: false }
    ]},
    { id: 3, title: "Version Control – Project Tracking like Equipment Logs", phase: "Foundation", successGoal: "Track project like equipment docs", tasks: [
        { text: "Mon: Watch Git course intro sections (~30m)", link: "https://www.linkedin.com/learning/learning-git-and-github-14213624", completed: false },
        { text: "Mon: AI – Explain Git like broadcast change logs", completed: false },
        { text: "Tue: Repo: Create learning branch feature/learning-[name] & add to LEARNERS.md", completed: false },
        { text: "Wed: Watch 'Working with repositories' module", link: "https://www.linkedin.com/learning/learning-git-and-github-14213624", completed: false },
        { text: "Wed: AI – Repos vs equipment documentation", completed: false },
        { text: "Thu: Repo: Add new device type to shared/core/device_types.py", completed: false },
        { text: "Fri: Repo: Create logs/learning/week1-[name].md (what you learned)", completed: false }
    ]},
    { id: 4, title: "Data & Databases – Why DBs Beat Excel", phase: "Foundation", successGoal: "Understand DB advantage for equipment mgmt", tasks: [
        { text: "Mon: Watch 'Database fundamentals' module", link: "https://www.linkedin.com/learning/sql-for-non-programmers", completed: false },
        { text: "Mon: AI – Databases vs equipment inventory systems", completed: false },
        { text: "Tue: Repo: Explore models in device-service & document 3 fields", completed: false },
        { text: "Tue: FreeCodeCamp: Start Bash boilerplate (optional)", link: "https://www.freecodecamp.org/learn/relational-database/", completed: false },
        { text: "Wed: Watch 'Basic SQL queries' module", link: "https://www.linkedin.com/learning/sql-for-non-programmers", completed: false },
        { text: "Wed: AI – Translate SQL queries to equipment searches", completed: false },
        { text: "Wed: FreeCodeCamp: Student Database project (optional)", link: "https://www.freecodecamp.org/learn/relational-database/", completed: false },
        { text: "Thu: Repo: Add a new device via UI & inspect API call", completed: false },
        { text: "Fri: Repo: Create database-notes-[name].md (DB vs Excel)", completed: false }
    ]},
    { id: 5, title: "Web Interfaces – Equipment Monitoring Pages", phase: "Foundation", successGoal: "Display equipment info in UI", tasks: [
        { text: "Mon: HTML basics modules", link: "https://www.linkedin.com/learning/html-css-and-javascript-building-the-web", completed: false },
        { text: "Mon: AI – HTML vs signal flow diagrams", completed: false },
        { text: "Tue: Repo: Modify Dashboard welcome message", completed: false },
        { text: "Tue: FreeCodeCamp HTML Cat Photo App (optional)", link: "https://www.freecodecamp.org/learn/2022/responsive-web-design/", completed: false },
        { text: "Wed: CSS styling modules", link: "https://www.linkedin.com/learning/html-css-and-javascript-building-the-web", completed: false },
        { text: "Wed: AI – CSS like equipment front panels", completed: false },
        { text: "Thu: Repo: Update header color (branding)", completed: false },
        { text: "Thu: FreeCodeCamp Cafe Menu (optional)", link: "https://www.freecodecamp.org/learn/2022/responsive-web-design/", completed: false },
        { text: "Fri: Repo: Create MyEquipmentList React component", completed: false }
    ]},
    { id: 6, title: "Programming Logic – If/Then Automation", phase: "Foundation", successGoal: "Apply conditionals to monitoring logic", tasks: [
        { text: "Mon: JS Essential Training – Variables & data types", link: "https://www.linkedin.com/learning/javascript-essential-training", completed: false },
        { text: "Mon: AI – Variables vs equipment settings", completed: false },
        { text: "Tue: Repo: Add equipment variables file (config/equipment.js)", completed: false },
        { text: "Wed: JS – Conditional statements module", link: "https://www.linkedin.com/learning/javascript-essential-training", completed: false },
        { text: "Wed: AI – If/then vs automation logic", completed: false },
        { text: "Thu: Repo: DeviceStatus.js color logic (R/Y/G)", completed: false },
        { text: "Fri: Repo: Create alert rules file [name]_rules.py", completed: false }
    ]},
    { id: 7, title: "Break / Consolidate Foundation Skills", phase: "Foundation", successGoal: "Confidence with basics", tasks: [
        { text: "Review confusing concepts with AI", completed: false },
        { text: "Practice Git commands", completed: false },
        { text: "Experiment with simple HTML/CSS changes", completed: false },
        { text: "FreeCodeCamp deep dive (projects)", completed: false },
        { text: "AI Portfolio review – progress & next steps", completed: false },
        { text: "Rest & knowledge consolidation", completed: false }
    ]},
    { id: 8, title: "Backend Systems – Equipment Controllers", phase: "Foundation", successGoal: "Understand backend service role", tasks: [
        { text: "Mon: Python intro modules", link: "https://www.linkedin.com/learning/python-for-non-programmers", completed: false },
        { text: "Mon: AI – Python scripts vs control software", completed: false },
        { text: "Tue: Repo: Explore device-service/main.py; add startup print", completed: false },
        { text: "Wed: Python – Working with data module", link: "https://www.linkedin.com/learning/python-for-non-programmers", completed: false },
        { text: "Wed: AI – Data handling like controllers", completed: false },
        { text: "Thu: Repo: Create device check script", completed: false },
        { text: "Fri: Repo: Add facility equipment to default_devices.py", completed: false }
    ]},
    { id: 9, title: "API Communication – Network Protocols", phase: "Foundation", successGoal: "Grasp request-response mechanics", tasks: [
        { text: "Mon: API fundamentals module", link: "https://www.linkedin.com/learning/introduction-to-web-apis", completed: false },
        { text: "Mon: AI – APIs vs SNMP/equipment protocols", completed: false },
        { text: "Tue: Test GET /api/devices (curl/Postman) & document response", completed: false },
        { text: "Wed: Making API requests module", link: "https://www.linkedin.com/learning/introduction-to-web-apis", completed: false },
        { text: "Wed: AI – Requests like equipment commands", completed: false },
        { text: "Thu: Repo: api-test-[name].py to add a device", completed: false },
        { text: "Fri: Repo: Add custom endpoint routes/custom.py", completed: false }
    ]},
    { id: 10, title: "Monitoring Concepts – Health Checks", phase: "Foundation", successGoal: "Link programming to equipment monitoring", tasks: [
        { text: "Mon: REST principles module", link: "https://www.linkedin.com/learning/learning-rest-apis", completed: false },
        { text: "Mon: AI – REST vs monitoring protocols", completed: false },
        { text: "Tue: Repo: Create monitoring checks file", completed: false },
        { text: "Wed: API responses module", link: "https://www.linkedin.com/learning/learning-rest-apis", completed: false },
        { text: "Wed: AI – Responses like status reports", completed: false },
        { text: "Thu: Repo: Add monitoring dashboard widget", completed: false },
        { text: "Fri: Repo: Document monitoring setup (broadcast analogies)", completed: false }
    ]},
    { id: 11, title: "Data Visualization – Status Dashboards", phase: "Building", successGoal: "Working real-time displays", tasks: [
        { text: "Mon: Visualization principles module", link: "https://www.linkedin.com/learning/data-visualization-best-practices", completed: false },
        { text: "Mon: AI – Best ways to visualize equipment data", completed: false },
        { text: "Tue: Repo: EquipmentChart.js (Chart.js) status distribution", completed: false },
        { text: "Wed: Dashboard design module", link: "https://www.linkedin.com/learning/data-visualization-best-practices", completed: false },
        { text: "Wed: Repo: Add color coding to main dashboard", completed: false },
        { text: "Thu: Repo: Real-time status chart (WebSocket)", completed: false },
        { text: "Fri: Repo: Add dashboard to navigation", completed: false }
    ]},
    { id: 12, title: "Real Features – Complete Monitoring (React)", phase: "Building", successGoal: "First end-to-end monitoring feature", tasks: [
        { text: "Mon: React components setup module", link: "https://www.linkedin.com/learning/react-js-essential-training-14836121", completed: false },
        { text: "Mon: Plan feature via GitHub Issues", completed: false },
        { text: "Tue: Repo: MyEquipmentList with search & filter", completed: false },
        { text: "Wed: Repo: EquipmentDetails modal (full info)", completed: false },
        { text: "Thu: Repo: Implement WebSocket real-time updates", completed: false },
        { text: "Fri: Deploy: Update docker-compose & test", completed: false }
    ]},
    { id: 13, title: "Error Handling – Failure Management", phase: "Building", successGoal: "Robust failure handling", tasks: [
        { text: "Mon: Error handling strategies module", link: "https://www.linkedin.com/learning/programming-foundations-software-testing-qa", completed: false },
        { text: "Mon: AI – Equipment failure protocols analogy", completed: false },
        { text: "Tue: Repo: Add try/catch in devices routes", completed: false },
        { text: "Wed: Repo: failure_handler.py for offline detection", completed: false },
        { text: "Thu: Repo: Graceful degradation in DeviceList.js", completed: false },
        { text: "Fri: Repo: Error logging device/error-handling.log", completed: false }
    ]},
    { id: 14, title: "Break – Assess Building Skills", phase: "Building", successGoal: "Confidence with shipped features", tasks: [
        { text: "Review code with AI for improvements", completed: false },
        { text: "Document learning in broadcast terms", completed: false },
        { text: "Plan next phase", completed: false },
        { text: "Rest & consolidate", completed: false }
    ]},
    { id: 15, title: "User Authentication – Secure Access", phase: "Building", successGoal: "Role-based secure system", tasks: [
        { text: "Mon: Auth fundamentals module", link: "https://www.linkedin.com/learning/react-authentication-25660373", completed: false },
        { text: "Mon: AI – Auth like equipment access control", completed: false },
        { text: "Tue: Repo: Add custom user roles (auth-service)", completed: false },
        { text: "Wed: Roles & permissions module", link: "https://www.linkedin.com/learning/react-authentication-25660373", completed: false },
        { text: "Wed: Repo: Implement ProtectedRoute RBAC", completed: false },
        { text: "Thu: Repo: SecureDeviceControls (modify equipment)", completed: false },
        { text: "Fri: Repo: access_log.py audit logging", completed: false }
    ]},
    { id: 16, title: "Advanced APIs – Equipment Integration", phase: "Building", successGoal: "External system connectivity", tasks: [
        { text: "Mon: Advanced API patterns module", link: "https://www.linkedin.com/learning/learning-rest-apis", completed: false },
        { text: "Mon: AI – Best practices for equipment integration", completed: false },
        { text: "Tue: Repo: snipeit_connector.py", completed: false },
        { text: "Wed: API auth & security module", link: "https://www.linkedin.com/learning/learning-rest-apis", completed: false },
        { text: "Wed: Repo: sync/device_sync.py bidirectional sync", completed: false },
        { text: "Thu: Repo: retry_handler.py with retries & backoff", completed: false },
        { text: "Fri: Repo: external_api_tests integration suite", completed: false }
    ]},
    { id: 17, title: "Performance – Production Monitoring", phase: "Building", successGoal: "Production-ready performance", tasks: [
        { text: "Mon: DB performance optimization module", link: "https://www.linkedin.com/learning/advanced-python-working-with-databases-22307421", completed: false },
        { text: "Mon: AI – Optimization for equipment monitoring", completed: false },
        { text: "Tue: Repo: query_profiler.py", completed: false },
        { text: "Wed: Query optimization techniques module", link: "https://www.linkedin.com/learning/advanced-python-working-with-databases-22307421", completed: false },
        { text: "Wed: Repo: Optimize slow queries device model", completed: false },
        { text: "Thu: Repo: device_cache.py (Redis caching)", completed: false },
        { text: "Fri: Repo: performance-dashboard Grafana JSON", completed: false }
    ]},
    { id: 18, title: "Testing – Broadcast Quality Assurance", phase: "Building", successGoal: "Comprehensive automated testing", tasks: [
        { text: "Mon: TDD fundamentals module", link: "https://www.linkedin.com/learning/programming-foundations-test-driven-development-3", completed: false },
        { text: "Mon: AI – Testing like broadcast QA", completed: false },
        { text: "Tue: Repo: test_device_status.py unit tests", completed: false },
        { text: "Wed: Integration testing strategies module", link: "https://www.linkedin.com/learning/programming-foundations-test-driven-development-3", completed: false },
        { text: "Wed: Repo: test_monitoring_workflow.py integration", completed: false },
        { text: "Thu: Repo: test_equipment_failures.py E2E failure sims", completed: false },
        { text: "Fri: Repo: CI/CD workflow testing.yml", completed: false }
    ]},
    { id: 19, title: "System Architecture – Broadcast Infrastructure Design", phase: "Advanced", successGoal: "Professional architecture articulation", tasks: [
        { text: "Mon: Architecture patterns module", link: "https://www.linkedin.com/learning/software-architecture-foundations", completed: false },
        { text: "Mon: AI – Software architecture vs broadcast facility design", completed: false },
        { text: "Tue: Repo: system-overview-[name].md", completed: false },
        { text: "Wed: System design principles module", link: "https://www.linkedin.com/learning/software-architecture-foundations", completed: false },
        { text: "Wed: Repo: microservices-plan.md improvements", completed: false },
        { text: "Thu: Create diagrams (draw.io) in docs/architecture/diagrams", completed: false },
        { text: "Fri: Propose improvements via GitHub issue (broadcast analogies)", completed: false }
    ]},
    { id: 20, title: "Advanced Integration – Enterprise Equipment Systems", phase: "Advanced", successGoal: "Enterprise-grade external integrations", tasks: [
        { text: "Mon: Watch 'API design principles' module", link: "https://www.linkedin.com/learning/designing-restful-apis", completed: false },
        { text: "Mon: Repo: Document external API requirements (api-requirements.md)", completed: false },
        { text: "Tue: Repo: Build Snipe-IT integration (services/integration-service/app/snipeit/)", completed: false },
        { text: "Wed: Watch 'API documentation & versioning' module", link: "https://www.linkedin.com/learning/designing-restful-apis", completed: false },
        { text: "Wed: Repo: Create OpenAPI spec external-integrations.yaml", completed: false },
        { text: "Thu: Repo: Implement complex error handling (error_handling/)", completed: false },
        { text: "Fri: Repo: Deploy integration to staging & document deployment", completed: false }
    ]},
    { id: 21, title: "Deployment & DevOps – Production Broadcast Systems", phase: "Advanced", successGoal: "Reliable production deployment workflow", tasks: [
        { text: "Mon: Watch 'Containerization basics' (Learning Docker) + AI DevOps practices", link: "https://www.linkedin.com/learning/learning-docker-2", completed: false },
        { text: "Tue: Configure production environment settings", completed: false },
        { text: "Wed: Watch 'CI/CD pipelines' (DevOps Foundations) + Implement deployment pipeline", link: "https://www.linkedin.com/learning/devops-foundations", completed: false },
        { text: "Thu: Configure production monitoring & alerting", completed: false },
        { text: "Fri: Full production deployment + AI operations review", completed: false }
    ]},
    { id: 22, title: "Break Week – Mastery Assessment", phase: "Advanced", successGoal: "Ready for technical leadership", tasks: [
        { text: "Comprehensive code review with AI (senior dev role)", completed: false },
        { text: "Architecture assessment & improvement recommendations", completed: false },
        { text: "Career development planning with AI", completed: false },
        { text: "Rest & prepare for leadership phase", completed: false }
    ]},
    { id: 23, title: "Team Leadership – Mentoring Engineers", phase: "Advanced", successGoal: "Effective mentoring capability", tasks: [
        { text: "Mon: Watch 'Coaching & mentoring' + AI guidance teaching engineers", link: "https://www.linkedin.com/learning/coach-your-team-to-learn-stretch-and-grow", completed: false },
        { text: "Tue: Conduct code review session for teammate", completed: false },
        { text: "Wed: Watch 'Building technical skills in teams' + Lead system improvement discussion", link: "https://www.linkedin.com/learning/coach-your-team-to-learn-stretch-and-grow", completed: false },
        { text: "Thu: Mentor colleague through programming challenge", completed: false },
        { text: "Fri: Leadership skills reflection with AI", completed: false }
    ]},
    { id: 24, title: "Innovation Projects – Custom Broadcast Solutions", phase: "Advanced", successGoal: "Novel broadcast-focused solution", tasks: [
        { text: "Mon: Watch 'Problem identification & analysis' + Identify unique challenges", link: "https://www.linkedin.com/learning/strategic-thinking", completed: false },
        { text: "Tue: Design custom solution architecture w/ AI", completed: false },
        { text: "Wed: Watch 'Solution design & planning' + Prototype proof-of-concept", link: "https://www.linkedin.com/learning/strategic-thinking", completed: false },
        { text: "Thu: Implement core functionality", completed: false },
        { text: "Fri: Demo solution (AI presentation coaching)", completed: false }
    ]},
    { id: 25, title: "Professional Practice – Industry Standards", phase: "Advanced", successGoal: "Professional-grade engineering habits", tasks: [
        { text: "Mon: Watch 'Professional development practices' + AI consultation", link: "https://www.linkedin.com/learning/programming-foundations-real-world-examples", completed: false },
        { text: "Tue: Implement documentation & commenting standards", completed: false },
        { text: "Wed: Watch 'Industry best practices' + Setup pro dev tools", link: "https://www.linkedin.com/learning/programming-foundations-real-world-examples", completed: false },
        { text: "Thu: Peer code review & collaboration workflow practice", completed: false },
        { text: "Fri: Professional skills evaluation with AI", completed: false }
    ]},
    { id: 26, title: "Graduation – Portfolio & Next Steps", phase: "Advanced", successGoal: "Ready to lead and teach others", tasks: [
        { text: "Mon: Watch 'Building your professional brand' + Build portfolio", link: "https://www.linkedin.com/learning/learning-personal-branding-2018", completed: false },
        { text: "Tue: Document case studies of solved broadcast problems", completed: false },
        { text: "Wed: Watch 'Career positioning strategies' + Plan next phase", link: "https://www.linkedin.com/learning/learning-personal-branding-2018", completed: false },
        { text: "Thu: Network with broadcast engineers who program", completed: false },
        { text: "Fri: Celebrate transformation & reflect achievements", completed: false }
    ]},
];


// --- MIGRATION LOGIC ---

/**
 * Replaces the user's course list with the new one, resetting all progress.
 * @returns {object} The new course list.
 */
function migrateCourses() {
    const newCourses = {};
    MIGRATION_COURSES_LIST.forEach(course => {
        newCourses[course.name] = "Not Started";
    });
    return newCourses;
}

/**
 * Replaces the user's weekly plan with the new one, resetting all progress.
 * @returns {Array} The new weekly plan.
 */
function migrateWeeks() {
    return MIGRATION_LEARNING_PLAN.map(week => ({ ...week, progress: 0 }));
}

/**
 * Main migration function to be called from the browser console.
 * @param {object} db - The initialized and configured Firestore database instance.
 */
window.runMigration = async function(db) {
    if (!db) {
        console.error("Firestore database instance is required.");
        alert("Error: Firestore database instance is not available.");
        return;
    }

    if (!window.firebase || !window.firebase.auth().currentUser) {
        console.error("You must be logged in to run the migration.");
        alert("Error: You must be logged in to run the migration.");
        return;
    }

    if (window.firebase.auth().currentUser.email !== window.__ENV__?.TEACHER_EMAIL) {
        console.error("This script must be run by a teacher/admin user.");
        alert("Error: This script must be run by a teacher/admin user.");
        return;
    }

    if (!confirm("You are about to update the learning plan for ALL users. This action cannot be undone. Are you sure you want to proceed?")) {
        console.log("Migration cancelled by user.");
        return;
    }

    console.log("Starting migration...");

    const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
    const usersCollectionRef = db.collection('artifacts').doc(appId).collection('users');

    try {
        const querySnapshot = await usersCollectionRef.get();
        const userDocs = querySnapshot.docs;
        let successCount = 0;
        let errorCount = 0;

        console.log(`Found ${userDocs.length} users to migrate.`);

        for (const doc of userDocs) {
            const userId = doc.id;
            const userData = doc.data();
            
            console.log(`Migrating user: ${userData.displayName} (${userId})`);

            try {
                const migratedCoursesData = migrateCourses(userData.courses);
                const migratedWeeksData = migrateWeeks(userData.weeks);

                const updatedData = {
                    ...userData,
                    courses: migratedCoursesData,
                    weeks: migratedWeeksData,
                };

                // Write the updated data back to Firestore
                await usersCollectionRef.doc(userId).set(updatedData);
                console.log(`✅ Successfully migrated user: ${userData.displayName}`);
                successCount++;
            } catch (error) {
                console.error(`❌ Error migrating user: ${userData.displayName} (${userId})`, error);
                errorCount++;
            }
        }

        console.log("--- Migration Complete ---");
        console.log(`Successfully migrated ${successCount} users.`);
        console.log(`Failed to migrate ${errorCount} users.`);
        alert(`Migration complete!\n\nSuccessfully migrated: ${successCount}\nFailed: ${errorCount}`);

    } catch (error) {
        console.error("A critical error occurred during migration:", error);
        alert("A critical error occurred during migration. Check the console for details.");
    }
}
