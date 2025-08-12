// Global variables from CDN scripts
const React = window.React;
const { useState, useMemo, useEffect, useRef } = React;
const ReactDOM = window.ReactDOM;

// Create Lucide icon components using simple SVG fallbacks
const createLucideIcon = (iconName) => {
    return ({ className = "w-4 h-4", ...props }) => {
        // Simple icon mapping with basic SVG fallbacks
        const iconMap = {
            'layout-dashboard': '📊',
            'book-open': '📖',
            'target': '🎯',
            'linkedin': '💼',
            'award': '🏆',
            'zap': '⚡',
            'wind': '💨',
            'check-square': '✅',
            'square': '⬜',
            'user-plus': '👤',
            'users': '👥',
            'calendar-days': '📅',
            'smile': '😊',
            'meh': '😐',
            'frown': '😔',
            'star': '⭐',
            'bot': '🤖',
            'image-plus': '🖼️',
            'trophy': '🏆',
            'book-copy': '📚',
            'message-square': '💬',
            'brain-circuit': '🧠',
            'upload': '⬆️',
            'chevron-down': '▼',
            'loader': '⟳',
            'edit': '✏️',
            'save': '💾',
            'log-out': '🚪',
            'mail': '📧',
            'key-round': '🔑',
            'arrow-left': '←',
            'graduation-cap': '🎓',
            'external-link': '🔗',
            'plus': '+',
            'copy': '📋',
            'search': '🔍'
        };
        
        const fallback = iconMap[iconName] || '?';
        
        return React.createElement('span', {
            className: `inline-flex items-center justify-center ${className}`,
            ...props,
            style: { fontSize: '1em', lineHeight: 1 }
        }, fallback);
    };
};

// Create icon components
const LayoutDashboard = createLucideIcon('layout-dashboard');
const BookOpen = createLucideIcon('book-open');
const Target = createLucideIcon('target');
const Linkedin = createLucideIcon('linkedin');
const Award = createLucideIcon('award');
const Zap = createLucideIcon('zap');
const Wind = createLucideIcon('wind');
const CheckSquare = createLucideIcon('check-square');
const Square = createLucideIcon('square');
const UserPlus = createLucideIcon('user-plus');
const Users = createLucideIcon('users');
const CalendarDays = createLucideIcon('calendar-days');
const Smile = createLucideIcon('smile');
const Meh = createLucideIcon('meh');
const Frown = createLucideIcon('frown');
const Star = createLucideIcon('star');
const Bot = createLucideIcon('bot');
const ImagePlus = createLucideIcon('image-plus');
const Trophy = createLucideIcon('trophy');
const BookCopy = createLucideIcon('book-copy');
const MessageSquare = createLucideIcon('message-square');
const BrainCircuit = createLucideIcon('brain-circuit');
const Upload = createLucideIcon('upload');
const ChevronDown = createLucideIcon('chevron-down');
const Loader2 = createLucideIcon('loader');
const Edit = createLucideIcon('edit');
const Save = createLucideIcon('save');
const LogOut = createLucideIcon('log-out');
const Mail = createLucideIcon('mail');
const KeyRound = createLucideIcon('key-round');
const ArrowLeft = createLucideIcon('arrow-left');
const GraduationCap = createLucideIcon('graduation-cap');
const ExternalLink = createLucideIcon('external-link');
const Plus = createLucideIcon('plus');
const Copy = createLucideIcon('copy');
const Search = createLucideIcon('search');

// Custom Bar Chart Component using Chart.js
const Bar = ({ data, options }) => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    useEffect(() => {
        if (chartRef.current && window.Chart) {
            // Destroy existing chart if it exists
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }

            const ctx = chartRef.current.getContext('2d');
            chartInstance.current = new window.Chart(ctx, {
                type: 'bar',
                data: data,
                options: options || {}
            });
        }

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [data, options]);

    return <canvas ref={chartRef}></canvas>;
};

// Firebase from global scope (compat mode)
const firebase = window.firebase;

// --- CONSTANTS & CONFIG ---
const TEACHER_EMAIL = window.__ENV__?.TEACHER_EMAIL || "teacher@example.com";

const SKILLS_LIST = ["Git & GitHub", "SQL & Databases", "HTML", "CSS", "JavaScript", "Python", "Web APIs (REST)", "React", "Docker", "Testing", "Security"];
const CONFIDENCE_LEVELS = ["Not Started", "Beginner", "Intermediate", "Advanced", "Expert"];

const ACHIEVEMENTS_LIST = [
    { id: 'first_commit', name: 'First Code Commit', description: 'You made your first change!', icon: 'star' },
    { id: 'foundation_complete', name: 'Foundation Complete', description: 'Completed all Foundation phase weeks.', icon: 'trophy' },
    { id: 'building_complete', name: 'Builder', description: 'Completed all Building phase weeks.', icon: 'award' },
    { id: 'advanced_complete', name: 'Advanced Learner', description: 'Completed all Advanced phase weeks.', icon: 'target' },
    { id: 'first_project', name: 'Project Pioneer', description: 'Added your first project to the gallery.', icon: 'image-plus' },
    { id: 'all_courses', name: 'LinkedIn Legend', description: 'Completed all core LinkedIn courses.', icon: 'linkedin' },
    { id: '10_day_log', name: 'Consistent Learner', description: 'Logged 10 daily learning sessions.', icon: 'calendar-days' },
];

const COURSES_LIST = [
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

const AI_PROMPT_TEMPLATES = {
    'master-prompt': {
        title: 'Master Prompt (Use This First)',
        category: 'Foundation',
        description: 'The main prompt that establishes your learning context and background',
        template: `ROLE: You are an expert programming tutor specializing in teaching broadcast engineers.

STUDENT CONTEXT:
- I'm a broadcast engineer with [X years] experience in [TV/Radio/Streaming/etc.]
- I work with equipment like [list your familiar equipment]
- I'm learning programming for the first time through a 24-week structured plan
- I'm currently in Week [X]: [Week Topic]
- I have [X minutes/hours] for this learning session
- I prefer explanations using broadcast equipment analogies

LEARNING APPROACH:
- Explain concepts step-by-step using broadcast analogies
- Ask me to explain back what I learned before moving forward
- Provide simple examples first, then build complexity
- Help me understand WHY something works, not just HOW
- Connect programming concepts to broadcast engineering tasks I already do
- Check my understanding with questions before proceeding

CURRENT CHALLENGE:
[Describe what you're trying to learn or solve]
[Share any specific errors or confusion points]
[Include relevant code if applicable]

Please help me understand this concept thoroughly using broadcast engineering examples I can relate to.`
    },
    'course-evaluation': {
        title: 'Course Evaluation',
        category: 'Learning',
        description: 'Evaluate if a course is right for your level and background',
        template: `I'm considering "[COURSE NAME]" for Week [X] of my programming learning.

My background: [X years] broadcast engineering with [equipment you work with]
My concerns: [too advanced/too basic/too long/not relevant enough]
Available time: [X hours over X days]

Help me evaluate:
1. Is this course appropriate for my experience level?
2. Are there easier/better alternatives for broadcast engineers?
3. What should I focus on most in this course?
4. How does this content relate to broadcast engineering?
5. Should I supplement with additional resources?

Find me the perfect learning path for my broadcast engineering background.`
    },
    'concept-explanation': {
        title: 'Concept Explanation',
        category: 'Learning',
        description: 'Get complex programming concepts explained with broadcast analogies',
        template: `You are my programming tutor specializing in broadcast engineering analogies.

I'm learning about [CONCEPT/TOPIC] and I'm confused about [SPECIFIC CONFUSION].

My broadcast background: [years] with [equipment types]
My current understanding: [what you think you know]
What's confusing me: [specific points of confusion]

Please:
1. Explain this concept using broadcast equipment I know
2. Give me a step-by-step breakdown
3. Provide a simple example first
4. Ask me to explain it back to check my understanding
5. Give me practical ways to apply this in programming

Use analogies from broadcast engineering to help me understand.`
    },
    'debugging-help': {
        title: 'Debugging & Error Help',
        category: 'Problem Solving',
        description: 'Get help troubleshooting code with broadcast engineering approach',
        template: `You are my senior programming mentor with broadcast engineering expertise.

PROBLEM: [Describe what you're trying to do]
ERROR MESSAGE: [Copy exact error message]
MY CODE: [Paste the problematic code]

My broadcast background: [equipment you work with]
What I expected: [what should happen]
What's happening: [what actually happens]

Please help me debug this like we troubleshoot broadcast equipment:
1. What's the most likely cause?
2. How do I isolate the problem?
3. What should I check first?
4. Explain the solution using broadcast troubleshooting logic
5. How do I prevent this in the future?

Walk me through the debugging process step-by-step.`
    },
    'project-planning': {
        title: 'Project Planning',
        category: 'Planning',
        description: 'Plan programming projects using broadcast project management approaches',
        template: `You are my programming project manager with broadcast engineering experience.

PROJECT GOAL: [What you want to build]
MY SKILLS: Currently in Week [X], comfortable with [list skills]
TIME AVAILABLE: [hours/days available]
BROADCAST CONNECTION: [how this relates to broadcast work]

Help me plan this project like we plan broadcast installations:
1. Break down the project into phases
2. Identify dependencies and requirements
3. Suggest what to learn/research first
4. Create a timeline with milestones
5. Identify potential risks and mitigation
6. Recommend tools and resources

Make this manageable for someone with broadcast engineering experience but new to programming.`
    },
    'code-review': {
        title: 'Code Review',
        category: 'Problem Solving',
        description: 'Get feedback on your code with broadcast engineering perspective',
        template: `You are my senior programmer and broadcast engineering mentor.

PROJECT: [Brief description of what this code does]
MY CODE: [Paste your code here]

My experience level: Week [X] of learning, broadcast engineer
What I'm trying to achieve: [goal]
My concerns: [what you're unsure about]

Please review my code like a senior engineer reviews broadcast system designs:
1. Does this code accomplish the goal?
2. Are there any obvious problems or bugs?
3. How could this be improved?
4. What best practices am I missing?
5. How does this compare to professional standards?
6. What should I learn next to improve?

Be encouraging but honest - I want to learn proper programming practices.`
    },
    'career-guidance': {
        title: 'Career Guidance',
        category: 'Career',
        description: 'Get advice on transitioning from broadcast to programming roles',
        template: `You are a career counselor specializing in broadcast engineers transitioning to programming.

MY SITUATION:
- [X years] broadcast engineering experience
- Currently in Week [X] of programming learning
- Work with: [equipment/technologies]
- Interested in: [specific programming areas]
- Career goal: [what you want to achieve]

QUESTIONS:
1. What programming roles best match my broadcast background?
2. How do I highlight my transferable skills?
3. What should I focus on learning next for my goals?
4. How do I build a portfolio that shows my unique perspective?
5. What companies value broadcast + programming experience?
6. How do I network in the programming community?

Help me create a strategic career transition plan.`
    },
    'learning-strategy': {
        title: 'Learning Strategy',
        category: 'Planning',
        description: 'Optimize your learning approach and overcome obstacles',
        template: `You are my learning coach specialized in adult education and technical training.

MY LEARNING SITUATION:
- Week [X] of 24-week programming plan
- Background: [years] broadcast engineering
- Current challenge: [what's difficult]
- Time constraints: [available time]
- Learning style: [how you learn best]

CHALLENGES I'M FACING:
[List specific difficulties]

HELP ME:
1. Adjust my learning strategy for these challenges
2. Find ways to connect new concepts to broadcast knowledge
3. Create a more effective daily routine
4. Overcome specific mental blocks
5. Stay motivated when things get difficult
6. Balance learning with work responsibilities

Give me practical, actionable advice for becoming a more effective learner.`
    },
    'interview-prep': {
        title: 'Interview Preparation',
        category: 'Career',
        description: 'Prepare for programming job interviews leveraging broadcast experience',
        template: `You are my interview coach specializing in career transitions to programming.

INTERVIEW DETAILS:
- Position: [job title]
- Company: [company name/type]
- My background: [years] broadcast engineering
- Programming level: Week [X] of learning
- Interview type: [technical/behavioral/both]

PREPARATION HELP:
1. How do I explain my transition from broadcast to programming?
2. What technical questions might they ask at my level?
3. How do I showcase problem-solving from broadcast work?
4. What projects best demonstrate my unique perspective?
5. How do I address gaps in traditional programming education?
6. What questions should I ask them about the role?

Help me prepare responses that highlight my broadcast experience as an asset.`
    }
};

const AI_PROMPT_EXAMPLES = {
    'career-transition-example': {
        week: 0,
        title: 'Career Transition Planning',
        situation: 'Planning transition to programming roles',
        example: `You are a career counselor specializing in broadcast engineers transitioning to programming.

MY SITUATION:
- 10 years broadcast engineering experience
- Currently in Week 0 of programming learning
- Work with: Video routers, automation systems, SNMP monitoring, RF systems
- Interested in: DevOps, system monitoring, automation tools
- Career goal: Transition to a role that combines broadcast knowledge with programming

QUESTIONS:
1. What programming roles best match my broadcast background?
2. How do I highlight my transferable skills?
3. What should I focus on learning next for my goals?
4. How do I build a portfolio that shows my unique perspective?
5. What companies value broadcast + programming experience?
6. How do I network in the programming community?

Help me create a strategic career transition plan that leverages my broadcast engineering expertise.`
    },
    'week1-git-example': {
        week: 3,
        title: 'Git & Version Control for Broadcast Engineers',
        situation: 'Learning Git in Week 3',
        example: `ROLE: You are an expert programming tutor specializing in teaching broadcast engineers.

STUDENT CONTEXT:
- I'm a broadcast engineer with 8 years experience in TV broadcast operations
- I work with equipment like video routers, audio mixers, transmitters, automation systems, and master control switchers
- I'm learning programming for the first time through a 24-week structured plan
- I'm currently in Week 1: Version Control - Project Tracking Like Equipment Logs
- I have 15-20 minutes for this learning session
- I prefer explanations using broadcast equipment analogies

LEARNING APPROACH:
- Explain concepts step-by-step using broadcast analogies
- Ask me to explain back what I learned before moving forward
- Provide simple examples first, then build complexity
- Help me understand WHY something works, not just HOW
- Connect programming concepts to broadcast engineering tasks I already do
- Check my understanding with questions before proceeding

CURRENT CHALLENGE:
I'm considering "Learning Git and GitHub" on LinkedIn Learning for Week 1. Our facility tracks equipment changes in Excel spreadsheets and email chains, which creates confusion when multiple engineers work on the same systems. How does Git solve these problems better than our current methods?

Please help me understand this concept thoroughly using broadcast engineering examples I can relate to.`
    },
    'week2-sql-example': {
        week: 4,
        title: 'Database Concepts vs Equipment Inventory',
        situation: 'Learning SQL basics in Week 4',
        example: `I'm considering "SQL for Non-Programmers" for Week 4 of my programming learning.

My background: 8 years broadcast engineering with video routers, audio mixers, transmitters, currently use Excel for equipment inventory tracking
My concerns: I'm comfortable with Excel - not sure why I need databases for equipment management
Available time: 30 minutes spread across the week

Help me evaluate:
1. Is this course appropriate for my experience level?
2. Are there easier/better alternatives for broadcast engineers?
3. What should I focus on most in this course?
4. How does this content relate to broadcast engineering?
5. Should I supplement with additional resources?

Find me the perfect learning path for my broadcast engineering background.`
    },
    'debugging-javascript': {
        week: 6,
        title: 'JavaScript Debugging Help',
        situation: 'Troubleshooting JavaScript code',
        example: `You are my senior programming mentor with broadcast engineering expertise.

PROBLEM: I'm trying to create a simple equipment status checker
ERROR MESSAGE: "Cannot read property 'status' of undefined"
MY CODE: 
const equipment = [
  { name: "Router", status: "online" },
  { name: "Mixer", status: "offline" }
];

function checkStatus(deviceName) {
  const device = equipment.find(item => item.name === deviceName);
  return device.status; // Error happens here
}

console.log(checkStatus("Transmitter"));

My broadcast background: Video routing systems and audio mixers
What I expected: Should return status or show error gracefully
What's happening: Code crashes with undefined error

Please help me debug this like we troubleshoot broadcast equipment:
1. What's the most likely cause?
2. How do I isolate the problem?
3. What should I check first?
4. Explain the solution using broadcast troubleshooting logic
5. How do I prevent this in the future?

Walk me through the debugging process step-by-step.`
    },
    'week5-foundations-example': {
        week: 5,
        title: 'Understanding Programming Foundations',
        situation: 'Learning programming fundamentals in Week 5',
        example: `You are my programming tutor specializing in broadcast engineering analogies.

I'm learning about programming fundamentals and I'm confused about how variables and functions work together.

My broadcast background: 8 years with video routers, audio mixers, and automation systems
My current understanding: Variables store data like equipment settings, but I'm unclear how functions use them
What's confusing me: When do I use functions vs just setting variables directly?

Please:
1. Explain this concept using broadcast equipment I know
2. Give me a step-by-step breakdown
3. Provide a simple example first
4. Ask me to explain it back to check my understanding
5. Give me practical ways to apply this in programming

Use analogies from broadcast engineering to help me understand.`
    },
    'week8-python-example': {
        week: 8,
        title: 'Python for Equipment Controllers',
        situation: 'Learning Python basics for automation',
        example: `You are my senior programming mentor with broadcast engineering expertise.

PROBLEM: I'm trying to learn Python to create equipment monitoring scripts
MY GOAL: Write a script that checks equipment status like our current manual processes
MY CODE: (I'm just starting - no code yet)

My broadcast background: Work with routers, mixers, transmitters - familiar with SNMP monitoring
What I want to achieve: Automate equipment health checks we do manually
My concerns: Python syntax looks complex compared to the simple scripts I've seen

Please help me learn Python like I learned broadcast automation:
1. Start with the most basic concepts I need
2. Show me how Python scripts are like equipment macros
3. Give me a simple first project that relates to equipment monitoring
4. Explain Python syntax using broadcast control examples
5. What should I focus on first to build useful tools?

Make this practical for someone who thinks in terms of signal flow and equipment control.`
    }
};

const createInitialUserData = (displayName) => {
    const initialLearningPlanData = [
        { id: 0, title: "Career Essentials – Professional Programming Foundations", phase: "Foundation", successGoal: "Understand professional programming landscape for broadcast", tasks: [
            { text: " Course 1 – Introduction module (Career overview ~25m)", link: "https://www.linkedin.com/learning/paths/career-essentials-in-software-development-by-microsoft-and-linkedin", completed: false },
            { text: " AI Prompt – How do these career skills apply to broadcast engineers?", completed: false },
            { text: " Course 1 – Skills and tools module (~25m)", link: "https://www.linkedin.com/learning/paths/career-essentials-in-software-development-by-microsoft-and-linkedin", completed: false },
            { text: " AI Prompt – Relate programming career skills to broadcast engineering", completed: false },
            { text: " Course 1 – Industry perspectives module (~25m)", link: "https://www.linkedin.com/learning/paths/career-essentials-in-software-development-by-microsoft-and-linkedin", completed: false },
            { text: " AI Prompt – Apply programming skills in broadcast environments", completed: false },
            { text: " Course 1 – Remaining sections (~25m)", link: "https://www.linkedin.com/learning/paths/career-essentials-in-software-development-by-microsoft-and-linkedin", completed: false },
            { text: " AI Discussion – Professional development plan (broadcast focus)", completed: false },
            { text: " Finish Course 1 & create learning plan for remaining courses", completed: false }
        ]},
        { id: 1, title: "Programming Foundations – Core Concepts", phase: "Foundation", successGoal: "Master core concepts w/ broadcast context", tasks: [
            { text: " Course 2 – Fundamentals intro + basics (~25m)", link: "https://www.linkedin.com/learning/programming-foundations-fundamentals", completed: false },
            { text: " AI Prompt – Connect programming fundamentals to broadcast system logic", completed: false },
            { text: " Course 2 – Variables & data types (~25m)", link: "https://www.linkedin.com/learning/programming-foundations-fundamentals", completed: false },
            { text: " AI Prompt – Relate variables to equipment parameters", completed: false },
            { text: " Course 2 – Functions & methods (~25m)", link: "https://www.linkedin.com/learning/programming-foundations-fundamentals", completed: false },
            { text: " AI Prompt – Functions like equipment control procedures", completed: false },
            { text: " Course 2 – Conditionals & modular programming (~25m)", link: "https://www.linkedin.com/learning/programming-foundations-fundamentals", completed: false },
            { text: " AI Prompt – Apply conditional logic to automation scenarios", completed: false },
            { text: " Course 2 – Debugging & error handling (~25m)", link: "https://www.linkedin.com/learning/programming-foundations-fundamentals", completed: false },
            { text: " AI Prompt – Compare debugging to equipment troubleshooting", completed: false }
        ]},
        { id: 2, title: "Advanced Foundations – Professional Practices", phase: "Foundation", successGoal: "Certificate complete + applied insights", tasks: [
            { text: " Course 3 – Collections (~25m)", link: "https://www.linkedin.com/learning/programming-foundations-beyond-the-fundamentals", completed: false },
            { text: " AI Prompt – Collections vs equipment inventories", completed: false },
            { text: " Course 3 – External code & libraries (~25m)", link: "https://www.linkedin.com/learning/programming-foundations-beyond-the-fundamentals", completed: false },
            { text: " AI Prompt – Libraries vs integrating 3rd-party equipment", completed: false },
            { text: " Course 3 – Advanced debugging & error handling (~25m)", link: "https://www.linkedin.com/learning/programming-foundations-beyond-the-fundamentals", completed: false },
            { text: " AI Prompt – Advanced troubleshooting techniques", completed: false },
            { text: " Course 3 – Planning & documenting code (~25m)", link: "https://www.linkedin.com/learning/programming-foundations-beyond-the-fundamentals", completed: false },
            { text: " AI Prompt – Documentation practices vs broadcast engineering", completed: false },
            { text: " Complete certificate & create insights doc (repo)", completed: false },
            { text: " AI Prompt – Review understanding of professional foundations", completed: false }
        ]},
        { id: 3, title: "Version Control – Project Tracking like Equipment Logs", phase: "Foundation", successGoal: "Track project like equipment docs", tasks: [
            { text: " Watch Git course intro sections (~30m)", link: "https://www.linkedin.com/learning/learning-git-and-github-14213624", completed: false },
            { text: " AI Prompt – Explain Git like broadcast change logs", completed: false },
            { text: " Repo: Create learning branch feature/learning-[name] & add to LEARNERS.md", completed: false },
            { text: " Watch 'Working with repositories' module", link: "https://www.linkedin.com/learning/learning-git-and-github-14213624", completed: false },
            { text: " AI Prompt – Repos vs equipment documentation", completed: false },
            { text: " Repo: Add new device type to shared/core/device_types.py", completed: false },
            { text: " Repo: Create logs/learning/week1-[name].md (what you learned)", completed: false }
        ]},
        { id: 4, title: "Data & Databases – Why DBs Beat Excel", phase: "Foundation", successGoal: "Understand DB advantage for equipment mgmt", tasks: [
            { text: " Watch 'Database fundamentals' module", link: "https://www.linkedin.com/learning/sql-for-non-programmers", completed: false },
            { text: " AI Prompt – Databases vs equipment inventory systems", completed: false },
            { text: " Repo: Explore models in device-service & document 3 fields", completed: false },
            { text: " FreeCodeCamp: Start Bash boilerplate (optional)", link: "https://www.freecodecamp.org/learn/relational-database/", completed: false },
            { text: " Watch 'Basic SQL queries' module", link: "https://www.linkedin.com/learning/sql-for-non-programmers", completed: false },
            { text: " AI Prompt – Translate SQL queries to equipment searches", completed: false },
            { text: " FreeCodeCamp: Student Database project (optional)", link: "https://www.freecodecamp.org/learn/relational-database/", completed: false },
            { text: " Repo: Add a new device via UI & inspect API call", completed: false },
            { text: " Repo: Create database-notes-[name].md (DB vs Excel)", completed: false }
        ]},
        { id: 5, title: "Web Interfaces – Equipment Monitoring Pages", phase: "Foundation", successGoal: "Display equipment info in UI", tasks: [
            { text: " HTML basics modules", link: "https://www.linkedin.com/learning/html-css-and-javascript-building-the-web", completed: false },
            { text: " AI Prompt – HTML vs signal flow diagrams", completed: false },
            { text: " Repo: Modify Dashboard welcome message", completed: false },
            { text: " FreeCodeCamp HTML Cat Photo App (optional)", link: "https://www.freecodecamp.org/learn/2022/responsive-web-design/", completed: false },
            { text: " CSS styling modules", link: "https://www.linkedin.com/learning/html-css-and-javascript-building-the-web", completed: false },
            { text: " AI Prompt – CSS like equipment front panels", completed: false },
            { text: " Repo: Update header color (branding)", completed: false },
            { text: " FreeCodeCamp Cafe Menu (optional)", link: "https://www.freecodecamp.org/learn/2022/responsive-web-design/", completed: false },
            { text: " Repo: Create MyEquipmentList React component", completed: false }
        ]},
        { id: 6, title: "Programming Logic – If/Then Automation", phase: "Foundation", successGoal: "Apply conditionals to monitoring logic", tasks: [
            { text: " JS Essential Training – Variables & data types", link: "https://www.linkedin.com/learning/javascript-essential-training", completed: false },
            { text: " AI Prompt – Variables vs equipment settings", completed: false },
            { text: " Repo: Add equipment variables file (config/equipment.js)", completed: false },
            { text: " JS – Conditional statements module", link: "https://www.linkedin.com/learning/javascript-essential-training", completed: false },
            { text: " AI Prompt – If/then vs automation logic", completed: false },
            { text: " Repo: DeviceStatus.js color logic (R/Y/G)", completed: false },
            { text: " Repo: Create alert rules file [name]_rules.py", completed: false }
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
            { text: " Python intro modules", link: "https://www.linkedin.com/learning/python-for-non-programmers", completed: false },
            { text: " AI Prompt – Python scripts vs control software", completed: false },
            { text: " Repo: Explore device-service/main.py; add startup print", completed: false },
            { text: " Python – Working with data module", link: "https://www.linkedin.com/learning/python-for-non-programmers", completed: false },
            { text: " AI Prompt – Data handling like controllers", completed: false },
            { text: " Repo: Create device check script", completed: false },
            { text: " Repo: Add facility equipment to default_devices.py", completed: false }
        ]},
        { id: 9, title: "API Communication – Network Protocols", phase: "Foundation", successGoal: "Grasp request-response mechanics", tasks: [
            { text: " API fundamentals module", link: "https://www.linkedin.com/learning/introduction-to-web-apis", completed: false },
            { text: " AI Prompt – APIs vs SNMP/equipment protocols", completed: false },
            { text: " Test GET /api/devices (curl/Postman) & document response", completed: false },
            { text: " Making API requests module", link: "https://www.linkedin.com/learning/introduction-to-web-apis", completed: false },
            { text: " AI Prompt – Requests like equipment commands", completed: false },
            { text: " Repo: api-test-[name].py to add a device", completed: false },
            { text: " Repo: Add custom endpoint routes/custom.py", completed: false }
        ]},
        { id: 10, title: "Monitoring Concepts – Health Checks", phase: "Foundation", successGoal: "Link programming to equipment monitoring", tasks: [
            { text: " REST principles module", link: "https://www.linkedin.com/learning/learning-rest-apis", completed: false },
            { text: " AI Prompt – REST vs monitoring protocols", completed: false },
            { text: " Repo: Create monitoring checks file", completed: false },
            { text: " API responses module", link: "https://www.linkedin.com/learning/learning-rest-apis", completed: false },
            { text: " AI Prompt – Responses like status reports", completed: false },
            { text: " Repo: Add monitoring dashboard widget", completed: false },
            { text: " Repo: Document monitoring setup (broadcast analogies)", completed: false }
        ]},
        { id: 11, title: "Data Visualization – Status Dashboards", phase: "Building", successGoal: "Working real-time displays", tasks: [
            { text: " Visualization principles module", link: "https://www.linkedin.com/learning/data-visualization-best-practices", completed: false },
            { text: " AI Prompt – Best ways to visualize equipment data", completed: false },
            { text: " Repo: EquipmentChart.js (Chart.js) status distribution", completed: false },
            { text: " Dashboard design module", link: "https://www.linkedin.com/learning/data-visualization-best-practices", completed: false },
            { text: " Repo: Add color coding to main dashboard", completed: false },
            { text: " Repo: Real-time status chart (WebSocket)", completed: false },
            { text: " Repo: Add dashboard to navigation", completed: false }
        ]},
        { id: 12, title: "Real Features – Complete Monitoring (React)", phase: "Building", successGoal: "First end-to-end monitoring feature", tasks: [
            { text: " React components setup module", link: "https://www.linkedin.com/learning/react-js-essential-training-14836121", completed: false },
            { text: " Plan feature via GitHub Issues", completed: false },
            { text: " Repo: MyEquipmentList with search & filter", completed: false },
            { text: " Repo: EquipmentDetails modal (full info)", completed: false },
            { text: " Repo: Implement WebSocket real-time updates", completed: false },
            { text: " Deploy: Update docker-compose & test", completed: false }
        ]},
        { id: 13, title: "Error Handling – Failure Management", phase: "Building", successGoal: "Robust failure handling", tasks: [
            { text: " Error handling strategies module", link: "https://www.linkedin.com/learning/programming-foundations-software-testing-qa", completed: false },
            { text: " AI Prompt – Equipment failure protocols analogy", completed: false },
            { text: " Repo: Add try/catch in devices routes", completed: false },
            { text: " Repo: failure_handler.py for offline detection", completed: false },
            { text: " Repo: Graceful degradation in DeviceList.js", completed: false },
            { text: " Repo: Error logging device/error-handling.log", completed: false }
        ]},
        { id: 14, title: "Break – Assess Building Skills", phase: "Building", successGoal: "Confidence with shipped features", tasks: [
            { text: "Review code with AI for improvements", completed: false },
            { text: "Document learning in broadcast terms", completed: false },
            { text: "Plan next phase", completed: false },
            { text: "Rest & consolidate", completed: false }
        ]},
        { id: 15, title: "User Authentication – Secure Access", phase: "Building", successGoal: "Role-based secure system", tasks: [
            { text: " Auth fundamentals module", link: "https://www.linkedin.com/learning/react-authentication-25660373", completed: false },
            { text: " AI Prompt – Auth like equipment access control", completed: false },
            { text: " Repo: Add custom user roles (auth-service)", completed: false },
            { text: " Roles & permissions module", link: "https://www.linkedin.com/learning/react-authentication-25660373", completed: false },
            { text: " Repo: Implement ProtectedRoute RBAC", completed: false },
            { text: " Repo: SecureDeviceControls (modify equipment)", completed: false },
            { text: " Repo: access_log.py audit logging", completed: false }
        ]},
        { id: 16, title: "Advanced APIs – Equipment Integration", phase: "Building", successGoal: "External system connectivity", tasks: [
            { text: " Advanced API patterns module", link: "https://www.linkedin.com/learning/learning-rest-apis", completed: false },
            { text: " AI Prompt – Best practices for equipment integration", completed: false },
            { text: " Repo: snipeit_connector.py", completed: false },
            { text: " API auth & security module", link: "https://www.linkedin.com/learning/learning-rest-apis", completed: false },
            { text: " Repo: sync/device_sync.py bidirectional sync", completed: false },
            { text: " Repo: retry_handler.py with retries & backoff", completed: false },
            { text: " Repo: external_api_tests integration suite", completed: false }
        ]},
        { id: 17, title: "Performance – Production Monitoring", phase: "Building", successGoal: "Production-ready performance", tasks: [
            { text: " DB performance optimization module", link: "https://www.linkedin.com/learning/advanced-python-working-with-databases-22307421", completed: false },
            { text: " AI Prompt – Optimization for equipment monitoring", completed: false },
            { text: " Repo: query_profiler.py", completed: false },
            { text: " Query optimization techniques module", link: "https://www.linkedin.com/learning/advanced-python-working-with-databases-22307421", completed: false },
            { text: " Repo: Optimize slow queries device model", completed: false },
            { text: " Repo: device_cache.py (Redis caching)", completed: false },
            { text: " Repo: performance-dashboard Grafana JSON", completed: false }
        ]},
        { id: 18, title: "Testing – Broadcast Quality Assurance", phase: "Building", successGoal: "Comprehensive automated testing", tasks: [
            { text: " TDD fundamentals module", link: "https://www.linkedin.com/learning/programming-foundations-test-driven-development-3", completed: false },
            { text: " AI Prompt – Testing like broadcast QA", completed: false },
            { text: " Repo: test_device_status.py unit tests", completed: false },
            { text: " Integration testing strategies module", link: "https://www.linkedin.com/learning/programming-foundations-test-driven-development-3", completed: false },
            { text: " Repo: test_monitoring_workflow.py integration", completed: false },
            { text: " Repo: test_equipment_failures.py E2E failure sims", completed: false },
            { text: " Repo: CI/CD workflow testing.yml", completed: false }
        ]},
        { id: 19, title: "System Architecture – Broadcast Infrastructure Design", phase: "Advanced", successGoal: "Professional architecture articulation", tasks: [
            { text: " Architecture patterns module", link: "https://www.linkedin.com/learning/software-architecture-foundations", completed: false },
            { text: " AI Prompt – Software architecture vs broadcast facility design", completed: false },
            { text: " Repo: system-overview-[name].md", completed: false },
            { text: " System design principles module", link: "https://www.linkedin.com/learning/software-architecture-foundations", completed: false },
            { text: " Repo: microservices-plan.md improvements", completed: false },
            { text: " Create diagrams (draw.io) in docs/architecture/diagrams", completed: false },
            { text: " Propose improvements via GitHub issue (broadcast analogies)", completed: false }
        ]},
        { id: 20, title: "Advanced Integration – Enterprise Equipment Systems", phase: "Advanced", successGoal: "Enterprise-grade external integrations", tasks: [
            { text: " Watch 'API design principles' module", link: "https://www.linkedin.com/learning/designing-restful-apis", completed: false },
            { text: " Repo: Document external API requirements (api-requirements.md)", completed: false },
            { text: " Repo: Build Snipe-IT integration (services/integration-service/app/snipeit/)", completed: false },
            { text: " Watch 'API documentation & versioning' module", link: "https://www.linkedin.com/learning/designing-restful-apis", completed: false },
            { text: " Repo: Create OpenAPI spec external-integrations.yaml", completed: false },
            { text: " Repo: Implement complex error handling (error_handling/)", completed: false },
            { text: " Repo: Deploy integration to staging & document deployment", completed: false }
        ]},
        { id: 21, title: "Deployment & DevOps – Production Broadcast Systems", phase: "Advanced", successGoal: "Reliable production deployment workflow", tasks: [
            { text: " Watch 'Containerization basics' (Learning Docker) + AI DevOps practices", link: "https://www.linkedin.com/learning/learning-docker-2", completed: false },
            { text: " Configure production environment settings", completed: false },
            { text: " Watch 'CI/CD pipelines' (DevOps Foundations) + Implement deployment pipeline", link: "https://www.linkedin.com/learning/devops-foundations", completed: false },
            { text: " Configure production monitoring & alerting", completed: false },
            { text: " Full production deployment + AI operations review", completed: false }
        ]},
        { id: 22, title: "Break Week – Mastery Assessment", phase: "Advanced", successGoal: "Ready for technical leadership", tasks: [
            { text: "Comprehensive code review with AI (senior dev role)", completed: false },
            { text: "Architecture assessment & improvement recommendations", completed: false },
            { text: "Career development planning with AI", completed: false },
            { text: "Rest & prepare for leadership phase", completed: false }
        ]},
        { id: 23, title: "Team Leadership – Mentoring Engineers", phase: "Advanced", successGoal: "Effective mentoring capability", tasks: [
            { text: " Watch 'Coaching & mentoring' + AI guidance teaching engineers", link: "https://www.linkedin.com/learning/coach-your-team-to-learn-stretch-and-grow", completed: false },
            { text: " Conduct code review session for teammate", completed: false },
            { text: " Watch 'Building technical skills in teams' + Lead system improvement discussion", link: "https://www.linkedin.com/learning/coach-your-team-to-learn-stretch-and-grow", completed: false },
            { text: " Mentor colleague through programming challenge", completed: false },
            { text: " Leadership skills reflection with AI", completed: false }
        ]},
        { id: 24, title: "Innovation Projects – Custom Broadcast Solutions", phase: "Advanced", successGoal: "Novel broadcast-focused solution", tasks: [
            { text: " Watch 'Problem identification & analysis' + Identify unique challenges", link: "https://www.linkedin.com/learning/strategic-thinking", completed: false },
            { text: " Design custom solution architecture w/ AI", completed: false },
            { text: " Watch 'Solution design & planning' + Prototype proof-of-concept", link: "https://www.linkedin.com/learning/strategic-thinking", completed: false },
            { text: " Implement core functionality", completed: false },
            { text: " Demo solution (AI presentation coaching)", completed: false }
        ]},
        { id: 25, title: "Professional Practice – Industry Standards", phase: "Advanced", successGoal: "Professional-grade engineering habits", tasks: [
            { text: " Watch 'Professional development practices' + AI consultation", link: "https://www.linkedin.com/learning/programming-foundations-real-world-examples", completed: false },
            { text: " Implement documentation & commenting standards", completed: false },
            { text: " Watch 'Industry best practices' + Setup pro dev tools", link: "https://www.linkedin.com/learning/programming-foundations-real-world-examples", completed: false },
            { text: " Peer code review & collaboration workflow practice", completed: false },
            { text: " Professional skills evaluation with AI", completed: false }
        ]},
        { id: 26, title: "Graduation – Portfolio & Next Steps", phase: "Advanced", successGoal: "Ready to lead and teach others", tasks: [
            { text: " Watch 'Building your professional brand' + Build portfolio", link: "https://www.linkedin.com/learning/learning-personal-branding-2018", completed: false },
            { text: " Document case studies of solved broadcast problems", completed: false },
            { text: " Watch 'Career positioning strategies' + Plan next phase", link: "https://www.linkedin.com/learning/learning-personal-branding-2018", completed: false },
            { text: " Network with broadcast engineers who program", completed: false },
            { text: " Celebrate transformation & reflect achievements", completed: false }
        ]},
    ];
    
    return {
        displayName: displayName || 'New User',
        weeks: JSON.parse(JSON.stringify(initialLearningPlanData)).map(week => ({ ...week, progress: 0 })),
        dailyLog: [],
        skills: SKILLS_LIST.reduce((acc, skill) => ({ ...acc, [skill]: "Not Started" }), {}),
        projects: [],
        courses: COURSES_LIST.reduce((acc, course) => ({ ...acc, [course.name]: "Not Started" }), {}),
        reflection: { weeklyNotes: '', leadFeedback: '', peerNotes: '' },
    };
};

const motivationalQuotes = [
    "The secret of getting ahead is getting started. - Mark Twain",
    "It’s not that I’m so smart, it’s just that I stay with problems longer. - Albert Einstein",
    "The only way to learn a new programming language is by writing programs in it. - Dennis Ritchie",
    "Learning fits into YOUR schedule.",
    "Work-life balance maintained.",
    "Every expert was once a beginner."
];

// --- HELPER & GENERIC COMPONENTS ---
const Card = ({ children, className = '', ...props }) => <div className={`bg-white rounded-lg shadow p-6 ${className}`} {...props}>{children}</div>;
const PhaseIndicator = ({ phase }) => {
    const phaseColors = { Foundation: 'bg-green-100 text-green-800', Building: 'bg-blue-100 text-blue-800', Advanced: 'bg-purple-100 text-purple-800' };
    return <span className={`px-2 py-1 text-xs font-semibold rounded-full ${phaseColors[phase]}`}>{phase}</span>;
};
const ProgressBar = ({ progress }) => (
    <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div className="bg-gradient-to-r from-blue-400 to-blue-600 h-2.5 rounded-full" style={{ width: `${progress}%` }}></div>
    </div>
);
const LoadingSpinner = () => (
    <div className="flex justify-center items-center h-full p-10">
        <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
    </div>
);

// --- WORKBOOK SHEETS (COMPONENTS) ---

const DashboardSheet = ({ userData }) => {
    if (!userData) return <LoadingSpinner />;
    const chartData = {
        labels: userData.weeks.map(w => `W${w.id}`),
        datasets: [{
            label: 'Weekly Completion %',
            data: userData.weeks.map(w => w.progress),
            backgroundColor: 'rgba(59, 130, 246, 0.5)',
            borderColor: 'rgba(59, 130, 246, 1)',
            borderWidth: 1,
        }],
    };
    const totalProgress = useMemo(() => {
        if (!userData.weeks || userData.weeks.length === 0) return 0;
        const total = userData.weeks.reduce((acc, week) => acc + week.progress, 0);
        return Math.round(total / userData.weeks.length);
    }, [userData.weeks]);

    return (
        <div className="space-y-6">
            <Card>
                <h3 className="text-xl font-bold mb-4">Overall Progress: {totalProgress}%</h3>
                <div className="w-full bg-gray-200 rounded-full h-4">
                    <div className="bg-gradient-to-r from-blue-400 to-purple-500 h-4 rounded-full" style={{ width: `${totalProgress}%` }}></div>
                </div>
            </Card>
            <Card>
                <h3 className="text-xl font-bold mb-4">Weekly Completion Rates</h3>
                <div className="h-64"><Bar data={chartData} options={{ maintainAspectRatio: false, scales: { y: { beginAtZero: true, max: 100 } } }} /></div>
            </Card>
        </div>
    );
};

const WeeklyPlanSheet = ({ userData, onToggleTask, isReadOnly = false }) => {
    if (!userData) return <LoadingSpinner />;
    const [openWeek, setOpenWeek] = useState(1);

    const ChecklistItem = ({ task, onToggle }) => (
        <div onClick={isReadOnly ? null : onToggle} className={`flex items-center p-3 bg-gray-50 rounded-lg ${!isReadOnly ? 'cursor-pointer hover:bg-gray-100' : ''} transition-colors`}>
            {task.completed ? <CheckSquare className="w-5 h-5 mr-3 text-green-600" /> : <Square className="w-5 h-5 mr-3 text-gray-400" />}
            <span className={`flex-1 ${task.completed ? 'text-gray-500 line-through' : 'text-gray-700'}`}>{task.text.replace(/^(Mon|Tue|Wed|Thu|Fri):\s*/, '')}</span>
            {task.link && (<a href={task.link} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="ml-2 p-1 rounded-full hover:bg-blue-100"><ExternalLink className="w-4 h-4 text-blue-600" /></a>)}
        </div>
    );

    const extractSuccessGoal = (week) => {
        if (week.successGoal) return week.successGoal;
        const sgTask = (week.tasks || []).find(t => /^Success Goal:/i.test(t.text));
        return sgTask ? sgTask.text.replace(/^Success Goal:\s*/i, '') : '';
    };

    return (
        <Card>
            <h3 className="text-xl font-bold mb-4">24-Week Learning Plan</h3>
            <div className="space-y-2">
                {userData.weeks.map(week => {
                    const successGoal = extractSuccessGoal(week);
                    const displayTasks = (week.tasks || []).filter(t => !/^Success Goal:/i.test(t.text));
                    return (
                        <div key={week.id} className="border border-gray-200 rounded-lg">
                            <div
                                className="flex items-start justify-between p-4 cursor-pointer hover:bg-gray-50"
                                onClick={() => setOpenWeek(openWeek === week.id ? null : week.id)}
                            >
                                <div className="flex-grow">
                                    <div className="flex items-center gap-4">
                                        <h4 className="font-bold text-lg text-gray-800">Week {week.id}: {week.title}</h4>
                                        <PhaseIndicator phase={week.phase} />
                                    </div>
                                    {successGoal && <p className="mt-1 text-sm text-gray-600 italic">Success Goal: {successGoal}</p>}
                                    <div className="mt-2 flex items-center gap-3">
                                        <div className="w-full"><ProgressBar progress={week.progress} /></div>
                                        <span className="text-sm font-semibold text-gray-600 w-12 text-right">{week.progress}%</span>
                                    </div>
                                </div>
                                <ChevronDown className={`w-4 h-4 text-gray-500 mt-1 transition-transform ${openWeek === week.id ? 'rotate-180' : ''}`} />
                            </div>
                            {openWeek === week.id && (
                                <div className="p-4 border-t border-gray-200 bg-white">
                                    <div className="space-y-3">
                                        {displayTasks.map((task, index) => (
                                            <ChecklistItem key={index} task={task} onToggle={() => onToggleTask(week.id, index)} />
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </Card>
    );
};


const DailyLogSheet = ({ userData, onUpdate, isReadOnly = false }) => {
    if (!userData) return <LoadingSpinner />;
    const [entry, setEntry] = useState('');
    const [mood, setMood] = useState('😊');

    const handleAddLog = () => {
        if (!entry) return;
        const newLog = { date: new Date().toISOString().split('T')[0], text: entry, mood };
        onUpdate('dailyLog', [newLog, ...userData.dailyLog]);
        setEntry('');
    };

    return (
        <Card>
            <h3 className="text-xl font-bold mb-4">15-Minute Daily Log</h3>
            {!isReadOnly && (
                <div className="flex gap-4 mb-4">
                    <input type="text" value={entry} onChange={e => setEntry(e.target.value)} placeholder="What did you learn today?" className="flex-grow p-2 border rounded-md" />
                    <div className="flex items-center gap-2">
                        <button onClick={() => setMood('😊')} className={`p-2 rounded-full ${mood === '😊' ? 'bg-green-200' : ''}`}><Smile className="w-4 h-4" /></button>
                        <button onClick={() => setMood('🤔')} className={`p-2 rounded-full ${mood === '🤔' ? 'bg-yellow-200' : ''}`}><Meh className="w-4 h-4" /></button>
                        <button onClick={() => setMood('😩')} className={`p-2 rounded-full ${mood === '😩' ? 'bg-red-200' : ''}`}><Frown className="w-4 h-4" /></button>
                    </div>
                    <button onClick={handleAddLog} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-center gap-2">
                        <Plus className="w-4 h-4" /> Log Session
                    </button>
                </div>
            )}
            <div className="space-y-3 max-h-96 overflow-y-auto">
                {userData.dailyLog.map((log, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                        <div>
                            <span className="font-semibold">{log.date}: </span>
                            <span>{log.text}</span>
                        </div>
                        <span className="text-2xl">{log.mood}</span>
                    </div>
                ))}
            </div>
        </Card>
    );
};

const SkillsMatrixSheet = ({ userData, onUpdate, isReadOnly = false }) => {
    if (!userData) return <LoadingSpinner />;
    const handleConfidenceChange = (skill, level) => {
        if (isReadOnly) return;
        onUpdate('skills', { ...userData.skills, [skill]: level });
    };
    const levelColors = { "Not Started": "bg-gray-200", "Beginner": "bg-red-200", "Intermediate": "bg-yellow-200", "Advanced": "bg-green-200", "Expert": "bg-blue-200" };

    return (
        <Card>
            <h3 className="text-xl font-bold mb-4">Skills Matrix</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {SKILLS_LIST.map(skill => (
                    <div key={skill}>
                        <h4 className="font-semibold mb-2">{skill}</h4>
                        <div className="flex gap-1">
                            {CONFIDENCE_LEVELS.map(level => (
                                <button
                                    key={level}
                                    onClick={() => handleConfidenceChange(skill, level)}
                                    className={`flex-1 text-xs p-2 rounded-md ${!isReadOnly ? 'transition-transform hover:scale-105' : ''} ${userData.skills[skill] === level ? 'ring-2 ring-blue-500 ring-offset-2' : ''} ${levelColors[level]}`}
                                    title={level}
                                    disabled={isReadOnly}
                                >
                                    {level.substring(0,1)}
                                </button>
                            ))}
                        </div>
                        <p className="text-center text-sm mt-1">{userData.skills[skill]}</p>
                    </div>
                ))}
            </div>
        </Card>
    );
};

const ProjectGallerySheet = ({ userData, onUpdate, isReadOnly = false }) => {
    if (!userData) return <LoadingSpinner />;
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [screenshot, setScreenshot] = useState(null);
    const fileInputRef = useRef(null);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setScreenshot(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleAddProject = () => {
        if (!title || !description) return;
        const newProject = { 
            title, 
            description, 
            screenshot: screenshot || 'https://placehold.co/600x400/eee/ccc?text=Your+Screenshot' 
        };
        onUpdate('projects', [...userData.projects, newProject]);
        setTitle('');
        setDescription('');
        setScreenshot(null);
        if(fileInputRef.current) {
            fileInputRef.current.value = "";
        }
    };

    return (
        <div className="space-y-6">
            {!isReadOnly && (
                <Card>
                    <h3 className="text-xl font-bold mb-4">Add a New Project</h3>
                    <div className="space-y-4">
                        <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Project Title" className="w-full p-2 border rounded-md" />
                        <textarea value={description} onChange={e => setDescription(e.target.value)} placeholder="Project Description" className="w-full p-2 border rounded-md" rows="3"></textarea>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">Upload Screenshot</label>
                            <input ref={fileInputRef} type="file" accept="image/png, image/jpeg, image/gif" onChange={handleImageUpload} className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"/>
                        </div>
                        {screenshot && (
                            <div>
                                <p className="text-sm font-medium text-gray-700 mb-1">Preview:</p>
                                <img src={screenshot} alt="Project preview" className="rounded-md max-h-48 border border-gray-200" />
                            </div>
                        )}
                        <button onClick={handleAddProject} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 flex items-center gap-2">
                            <ImagePlus className="w-4 h-4" /> Add to Gallery
                        </button>
                    </div>
                </Card>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {userData.projects.map((proj, i) => (
                    <Card key={i}>
                        <img src={proj.screenshot} alt={proj.title} className="rounded-md mb-4 w-full h-48 object-cover bg-gray-100" />
                        <h4 className="font-bold text-lg">{proj.title}</h4>
                        <p className="text-gray-600 text-sm">{proj.description}</p>
                    </Card>
                ))}
            </div>
        </div>
    );
};

const CourseTrackerSheet = ({ userData, onUpdate, isReadOnly = false }) => {
    if (!userData) return <LoadingSpinner />;
    const handleStatusChange = (courseName, status) => {
        if(isReadOnly) return;
        onUpdate('courses', { ...userData.courses, [courseName]: status });
    };

    return (
        <Card>
            <h3 className="text-xl font-bold mb-4">LinkedIn Learning Tracker</h3>
            <div className="space-y-3">
                {COURSES_LIST.map(course => (
                    <div key={course.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                        <a href={course.link} target="_blank" rel="noopener noreferrer" className="font-semibold text-blue-600 hover:underline">{course.name}</a>
                        <select value={userData.courses[course.name]} onChange={e => handleStatusChange(course.name, e.target.value)} disabled={isReadOnly} className="p-2 border rounded-md disabled:bg-gray-200">
                            <option>Not Started</option>
                            <option>In Progress</option>
                            <option>Completed</option>
                        </select>
                    </div>
                ))}
            </div>
        </Card>
    );
};

const AchievementsSheet = ({ userData }) => {
    if (!userData) return <LoadingSpinner />;
    const unlockedAchievements = useMemo(() => {
        const unlocked = new Set();
        if(!userData) return unlocked;
        const { weeks, dailyLog, projects, courses } = userData;
        
        if (weeks.some(w => w.progress > 0)) unlocked.add('first_commit');
        if (weeks.filter(w => w.phase === "Foundation").every(w => w.progress === 100)) unlocked.add('foundation_complete');
        if (weeks.filter(w => w.phase === "Building").every(w => w.progress === 100)) unlocked.add('building_complete');
        if (weeks.filter(w => w.phase === "Advanced").every(w => w.progress === 100)) unlocked.add('advanced_complete');
        if (projects.length > 0) unlocked.add('first_project');
        if (Object.values(courses).every(status => status === 'Completed')) unlocked.add('all_courses');
        if (dailyLog.length >= 10) unlocked.add('10_day_log');

        return unlocked;
    }, [userData]);

    return (
        <Card>
            <h3 className="text-xl font-bold mb-4">Achievements</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {ACHIEVEMENTS_LIST.map(ach => {
                    const IconComponent = createLucideIcon(ach.icon);
                    return (
                        <div key={ach.id} className={`p-4 text-center rounded-lg transition-all ${unlockedAchievements.has(ach.id) ? 'bg-green-100 text-green-800 shadow-lg' : 'bg-gray-200 text-gray-500'}`}>
                            <div className={`flex justify-center mx-auto mb-2 ${unlockedAchievements.has(ach.id) ? 'text-yellow-500' : 'text-gray-400'}`}>
                                <IconComponent className={`w-8 h-8 ${unlockedAchievements.has(ach.id) ? 'text-yellow-500' : 'text-gray-400'}`} />
                            </div>
                        <h4 className="font-bold">{ach.name}</h4>
                        <p className="text-xs">{ach.description}</p>
                    </div>
                    );
                })}
            </div>
        </Card>
    );
};

const ReflectionSheet = ({ userData, onUpdate, isReadOnly = false }) => {
    if (!userData) return <LoadingSpinner />;
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <Card className="lg:col-span-2">
                <h3 className="text-xl font-bold mb-4">Weekly Reflection</h3>
                <textarea
                    value={userData.reflection.weeklyNotes}
                    onChange={e => !isReadOnly && onUpdate('reflection', { ...userData.reflection, weeklyNotes: e.target.value })}
                    readOnly={isReadOnly}
                    placeholder="What clicked this week? What was challenging? What are my goals for next week?"
                    className="w-full p-2 border rounded-md disabled:bg-gray-100"
                    rows="12"
                    disabled={isReadOnly}
                />
            </Card>
            <div className="space-y-6">
                <Card>
                    <h3 className="text-xl font-bold mb-4">Team Lead Feedback</h3>
                    <textarea
                        value={userData.reflection.leadFeedback}
                        onChange={e => onUpdate('reflection', { ...userData.reflection, leadFeedback: e.target.value })}
                        placeholder="Notes from your team lead..."
                        className="w-full p-2 border rounded-md"
                        rows="4"
                    />
                </Card>
                <Card>
                    <h3 className="text-xl font-bold mb-4">Peer Collaboration Notes</h3>
                    <textarea
                        value={userData.reflection.peerNotes}
                        onChange={e => !isReadOnly && onUpdate('reflection', { ...userData.reflection, peerNotes: e.target.value })}
                        readOnly={isReadOnly}
                        placeholder="Notes from working with peers..."
                        className="w-full p-2 border rounded-md disabled:bg-gray-100"
                        rows="4"
                        disabled={isReadOnly}
                    />
                </Card>
            </div>
        </div>
    );
};

const AIPromptsSheet = ({ userData, isReadOnly = false }) => {
    const [activeCategory, setActiveCategory] = useState('Foundation');
    const [activeTemplate, setActiveTemplate] = useState(null);
    const [activeExample, setActiveExample] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [copiedTemplate, setCopiedTemplate] = useState(null);
    
    const categories = ['Foundation', 'Learning', 'Problem Solving', 'Planning', 'Career'];
    
    const copyToClipboard = (text, templateId) => {
        navigator.clipboard.writeText(text).then(() => {
            setCopiedTemplate(templateId);
            setTimeout(() => setCopiedTemplate(null), 2000);
        });
    };

    const filteredTemplates = Object.entries(AI_PROMPT_TEMPLATES).filter(([id, template]) => {
        const matchesCategory = activeCategory === 'All' || template.category === activeCategory;
        const matchesSearch = searchTerm === '' || 
            template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            template.description.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    const getCurrentWeekExamples = () => {
        if (!userData?.weeks) return [];
        
        // Find the current week (first incomplete week)
        let currentWeek = userData.weeks.find(w => w.progress < 100);
        
        // If no incomplete weeks, check the most recently worked on week
        if (!currentWeek) {
            currentWeek = userData.weeks.reduce((latest, week) => {
                return week.progress > (latest?.progress || 0) ? week : latest;
            }, null);
        }
        
        if (!currentWeek) return [];
        
        // Get examples for current week
        const examples = Object.entries(AI_PROMPT_EXAMPLES).filter(([id, example]) => 
            example.week === currentWeek.id
        );
        
        return examples;
    };

    // For demonstration, let's also add a function to get examples for any week
    const getExamplesForWeek = (weekNumber) => {
        return Object.entries(AI_PROMPT_EXAMPLES).filter(([id, example]) => 
            example.week === weekNumber
        );
    };

    return (
        <div className="space-y-6">

                        {/* Quick Tips */}
            <Card>
                <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <BrainCircuit className="w-5 h-5 text-purple-600" />
                    Quick Tips for Better AI Conversations
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                        <h5 className="font-semibold text-yellow-800 mb-2">🎯 Be Specific</h5>
                        <p className="text-sm text-yellow-700">
                            Replace ALL [bracketed placeholders] with your exact situation. 
                            The more specific you are, the better help you'll get.
                        </p>
                    </div>
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                        <h5 className="font-semibold text-green-800 mb-2">🔄 Follow Up</h5>
                        <p className="text-sm text-green-700">
                            Ask clarifying questions, request examples, or ask the AI to 
                            explain something differently if you don't understand.
                        </p>
                    </div>
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h5 className="font-semibold text-blue-800 mb-2">📺 Use Your Experience</h5>
                        <p className="text-sm text-blue-700">
                            Always mention your broadcast engineering background - it's your 
                            superpower for learning programming concepts.
                        </p>
                    </div>
                    <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
                        <h5 className="font-semibold text-purple-800 mb-2">🔍 Test Understanding</h5>
                        <p className="text-sm text-purple-700">
                            Ask the AI to quiz you or have you explain concepts back to 
                            ensure you really understand before moving on.
                        </p>
                    </div>
                </div>
            </Card>
            
            {/* Header */}
            <Card>
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h3 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                            <Bot className="w-6 h-6 text-blue-600" />
                            AI Prompts Helper
                        </h3>
                        <p className="text-gray-600 mt-1">
                            Copy-paste prompts designed for broadcast engineers learning programming
                        </p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                            <input
                                type="text"
                                placeholder="Search prompts..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                            />
                        </div>
                    </div>
                </div>
                
                {/* Category Tabs */}
                <div className="flex flex-wrap gap-2 mb-4">
                    {categories.map(category => (
                        <button
                            key={category}
                            onClick={() => setActiveCategory(category)}
                            className={`px-4 py-2 rounded-lg font-medium text-sm transition-colors ${
                                activeCategory === category
                                    ? 'bg-blue-100 text-blue-700 border border-blue-200'
                                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                            }`}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </Card>

            {/* Prompt Templates */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Templates List */}
                <Card>
                    <h4 className="text-lg font-bold text-gray-800 mb-4">
                        {activeCategory} Prompts ({filteredTemplates.length})
                    </h4>
                    <div className="space-y-3 max-h-96 overflow-y-auto">
                        {filteredTemplates.map(([id, template]) => (
                            <div
                                key={id}
                                onClick={() => {
                                    setActiveTemplate(id);
                                    setActiveExample(null); // Clear example selection
                                }}
                                className={`p-4 rounded-lg border cursor-pointer transition-all ${
                                    activeTemplate === id
                                        ? 'border-blue-300 bg-blue-50'
                                        : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'
                                }`}
                            >
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <h5 className="font-semibold text-gray-800">{template.title}</h5>
                                        <p className="text-sm text-gray-600 mt-1">{template.description}</p>
                                        <span className="inline-block bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full mt-2">
                                            {template.category}
                                        </span>
                                    </div>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            copyToClipboard(template.template, id);
                                        }}
                                        className="ml-2 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-md"
                                    >
                                        <Copy className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                {/* Template Preview */}
                <Card>
                    <div className="flex items-center justify-between mb-4">
                        <h4 className="text-lg font-bold text-gray-800">
                            {activeTemplate ? AI_PROMPT_TEMPLATES[activeTemplate]?.title : 
                             activeExample ? AI_PROMPT_EXAMPLES[activeExample]?.title :
                             'Select a Template or Example'}
                        </h4>
                        {(activeTemplate || activeExample) && (
                            <button
                                onClick={() => {
                                    const content = activeTemplate ? 
                                        AI_PROMPT_TEMPLATES[activeTemplate].template :
                                        AI_PROMPT_EXAMPLES[activeExample].example;
                                    const id = activeTemplate || activeExample;
                                    copyToClipboard(content, id);
                                }}
                                className="flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-lg hover:bg-blue-200 font-medium"
                            >
                                <Copy className="w-4 h-4" />
                                {copiedTemplate === (activeTemplate || activeExample) ? 'Copied!' : 
                                 activeTemplate ? 'Copy Template' : 'Copy Example'}
                            </button>
                        )}
                    </div>
                    
                    {(activeTemplate || activeExample) ? (
                        <div className="space-y-4">
                            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                                <p className="text-sm text-gray-600 mb-3">
                                    {activeTemplate ? 
                                        AI_PROMPT_TEMPLATES[activeTemplate].description :
                                        AI_PROMPT_EXAMPLES[activeExample].situation
                                    }
                                </p>
                                <div className="bg-white border border-gray-200 rounded-md p-4 max-h-80 overflow-y-auto">
                                    <pre className="text-sm text-gray-700 whitespace-pre-wrap font-mono">
                                        {activeTemplate ? 
                                            AI_PROMPT_TEMPLATES[activeTemplate].template :
                                            AI_PROMPT_EXAMPLES[activeExample].example
                                        }
                                    </pre>
                                </div>
                            </div>
                            
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                                <h5 className="font-semibold text-blue-800 mb-2">💡 How to Use This {activeTemplate ? 'Template' : 'Example'}</h5>
                                <ul className="text-sm text-blue-700 space-y-1">
                                    {activeTemplate ? (
                                        <>
                                            <li>• Copy the template above</li>
                                            <li>• Replace [bracketed placeholders] with your specific information</li>
                                            <li>• Paste into ChatGPT, Claude, or your preferred AI assistant</li>
                                            <li>• Have a productive learning conversation!</li>
                                        </>
                                    ) : (
                                        <>
                                            <li>• This is a real example for {AI_PROMPT_EXAMPLES[activeExample]?.situation}</li>
                                            <li>• Copy and adapt it for your specific situation</li>
                                            <li>• Replace details to match your broadcast experience</li>
                                            <li>• Use it as a starting point for your own prompts</li>
                                        </>
                                    )}
                                </ul>
                            </div>
                        </div>
                    ) : (
                        <div className="text-center py-12 text-gray-500">
                            <Bot className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                            <p>Select a prompt template or example from the list to preview it here.</p>
                        </div>
                    )}
                </Card>
            </div>

            {/* Current Week Examples */}
            {getCurrentWeekExamples().length > 0 && (
                <Card>
                    <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                        <Target className="w-5 h-5 text-green-600" />
                        Examples for Your Current Week
                    </h4>
                    <div className="grid gap-4">
                        {getCurrentWeekExamples().map(([id, example]) => (
                            <div key={id} className="bg-green-50 border border-green-200 rounded-lg p-4">
                                <div className="flex items-start justify-between mb-2">
                                    <div>
                                        <h5 className="font-semibold text-green-800">{example.title}</h5>
                                        <p className="text-sm text-green-600">{example.situation}</p>
                                    </div>
                                    <button
                                        onClick={() => copyToClipboard(example.example, id)}
                                        className="flex items-center gap-1 bg-green-100 text-green-700 px-3 py-1 rounded-md hover:bg-green-200 text-sm font-medium"
                                    >
                                        <Copy className="w-4 h-4" />
                                        {copiedTemplate === id ? 'Copied!' : 'Copy'}
                                    </button>
                                </div>
                                <div className="bg-white border border-green-200 rounded-md p-3 mt-3">
                                    <pre className="text-xs text-gray-700 whitespace-pre-wrap font-mono">
                                        {example.example.length > 200 ? 
                                            `${example.example.substring(0, 200)}...` : 
                                            example.example
                                        }
                                    </pre>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>
            )}

            {/* Featured Examples - Always Show */}
            <Card>
                <h4 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-600" />
                    Featured Examples by Learning Phase
                </h4>
                <p className="text-gray-600 mb-4">
                    Real examples of how to use prompts for different learning situations
                </p>
                <div className="grid gap-4">
                    {Object.entries(AI_PROMPT_EXAMPLES).map(([id, example]) => (
                        <div key={id} className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <div className="flex items-start justify-between mb-2">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full font-medium">
                                            Week {example.week}
                                        </span>
                                        <h5 className="font-semibold text-blue-800">{example.title}</h5>
                                    </div>
                                    <p className="text-sm text-blue-600">{example.situation}</p>
                                </div>
                                <button
                                    onClick={() => copyToClipboard(example.example, id)}
                                    className="flex items-center gap-1 bg-blue-100 text-blue-700 px-3 py-1 rounded-md hover:bg-blue-200 text-sm font-medium"
                                >
                                    <Copy className="w-4 h-4" />
                                    {copiedTemplate === id ? 'Copied!' : 'Copy'}
                                </button>
                            </div>
                            <div className="bg-white border border-blue-200 rounded-md p-3 mt-3">
                                <pre className="text-xs text-gray-700 whitespace-pre-wrap font-mono">
                                    {example.example.length > 300 ? 
                                        `${example.example.substring(0, 300)}...` : 
                                        example.example
                                    }
                                </pre>
                                {example.example.length > 300 && (
                                    <button
                                        onClick={() => {
                                            setActiveExample(id);
                                            setActiveTemplate(null); // Clear template selection
                                        }}
                                        className="mt-2 text-blue-600 hover:text-blue-800 text-xs underline"
                                    >
                                        View full example →
                                    </button>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </Card>

        </div>
    );
};

// --- AUTHENTICATION COMPONENT ---
const AuthComponent = ({ auth, db }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [displayName, setDisplayName] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleAuthAction = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        
        try {
            if (isLogin) {
                await auth.signInWithEmailAndPassword(email, password);
            } else {
                const tempUserCredential = await auth.createUserWithEmailAndPassword(email, password);
                const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
                const docRef = db.collection('artifacts').doc(appId).collection('users').doc(tempUserCredential.user.uid);
                const initialData = createInitialUserData(displayName);
                await docRef.set(initialData);
            }
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center p-4">
            <div className="w-full max-w-md bg-white rounded-xl shadow-2xl p-8">
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-2">{isLogin ? 'Welcome Back!' : 'Create Your Account'}</h2>
                <p className="text-center text-gray-500 mb-8">{isLogin ? 'Sign in to access your workbook.' : 'Sign up to start your learning journey.'}</p>
                <form onSubmit={handleAuthAction} className="space-y-6">
                    {!isLogin && (
                        <div>
                            <label className="text-sm font-bold text-gray-700 block mb-2">Display Name</label>
                            <div className="relative"><span className="absolute left-3 top-1/2 transform -translate-y-1/2">👥</span><input type="text" value={displayName} onChange={e => setDisplayName(e.target.value)} placeholder="Your Name" required className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"/></div>
                        </div>
                    )}
                    <div>
                        <label className="text-sm font-bold text-gray-700 block mb-2">Email</label>
                        <div className="relative"><Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" /><input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"/></div>
                    </div>
                    <div>
                        <label className="text-sm font-bold text-gray-700 block mb-2">Password</label>
                        <div className="relative"><KeyRound className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" /><input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"/></div>
                    </div>
                    {error && <p className="text-red-500 text-sm text-center">{error}</p>}
                    <button type="submit" disabled={loading} className="w-full bg-blue-600 text-white font-bold py-3 rounded-md hover:bg-blue-700 transition-colors disabled:bg-blue-300 flex justify-center items-center">
                        {loading ? <Loader2 className="animate-spin" /> : (isLogin ? 'Sign In' : 'Sign Up')}
                    </button>
                </form>
                <p className="text-center text-sm text-gray-600 mt-8">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}
                    <button onClick={() => setIsLogin(!isLogin)} className="font-semibold text-blue-600 hover:underline ml-1">{isLogin ? 'Sign Up' : 'Sign In'}</button>
                </p>
            </div>
        </div>
    );
};

// --- TEACHER COMPONENTS ---
const TeacherDashboard = ({ allStudentsData, onSelectStudent, onSignOut, onRefresh, firebaseServices }) => {
    const [sortBy, setSortBy] = useState('name'); // 'name', 'progress', 'lastActivity'
    const [isRefreshing, setIsRefreshing] = useState(false);

    const handleRefresh = async () => {
        setIsRefreshing(true);
        await onRefresh();
        setIsRefreshing(false);
    };

    const handleRunMigration = () => {
        if (!firebaseServices || !firebaseServices.db) {
            alert("Error: Firebase services not available.");
            return;
        }
        window.runMigration(firebaseServices.db);
    };
    
    const sortedStudents = useMemo(() => {
        if (!allStudentsData || !Array.isArray(allStudentsData)) {
            return [];
        }
        
        return [...allStudentsData].sort((a, b) => {
            switch (sortBy) {
                case 'progress':
                    const progressA = (a.weeks || []).reduce((acc, week) => acc + (week.progress || 0), 0) / Math.max((a.weeks || []).length, 1);
                    const progressB = (b.weeks || []).reduce((acc, week) => acc + (week.progress || 0), 0) / Math.max((b.weeks || []).length, 1);
                    return progressB - progressA;
                case 'lastActivity':
                    const lastLogA = (a.dailyLogs && a.dailyLogs.length) ? new Date(a.dailyLogs[a.dailyLogs.length - 1].date) : new Date(0);
                    const lastLogB = (b.dailyLogs && b.dailyLogs.length) ? new Date(b.dailyLogs[b.dailyLogs.length - 1].date) : new Date(0);
                    return lastLogB - lastLogA;
                default: // name
                    return (a.displayName || 'Unknown').localeCompare(b.displayName || 'Unknown');
            }
        });
    }, [allStudentsData, sortBy]);

    const getLastActivityDate = (student) => {
        // Check multiple sources for last activity
        const sources = [];
        
        // Check daily logs (handle both 'dailyLogs' and 'dailyLog' property names)
        const dailyLogs = student.dailyLogs || student.dailyLog || [];
        if (Array.isArray(dailyLogs) && dailyLogs.length > 0) {
            const lastLog = dailyLogs[dailyLogs.length - 1];
            if (lastLog && lastLog.date) {
                sources.push(new Date(lastLog.date));
            }
        }
        
        // Check week progress (last completed task)
        if (student.weeks && Array.isArray(student.weeks)) {
            student.weeks.forEach(week => {
                if (week.tasks && Array.isArray(week.tasks)) {
                    week.tasks.forEach(task => {
                        if (task.completed && task.completedDate) {
                            sources.push(new Date(task.completedDate));
                        }
                    });
                }
            });
        }
        
        // If no activity found
        if (sources.length === 0) return 'No activity';
        
        // Get the most recent activity
        const lastActivity = new Date(Math.max(...sources));
        const today = new Date();
        const diffTime = Math.abs(today - lastActivity);
        const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
        
        if (diffDays === 0) return 'Today';
        if (diffDays === 1) return 'Yesterday';
        if (diffDays <= 7) return `${diffDays} days ago`;
        if (diffDays <= 30) return `${Math.floor(diffDays / 7)} weeks ago`;
        return lastActivity.toLocaleDateString();
    };

    const getStudentStats = (student) => {
        // Ensure we have safe fallbacks for all student data
        const weeks = student.weeks || [];
        const skills = student.skills || {};
        const projects = student.projects || [];
        const dailyLogs = student.dailyLogs || student.dailyLog || []; // Handle both property names
        
        const totalProgress = weeks.length > 0 
            ? Math.round(weeks.reduce((acc, week) => acc + (week.progress || 0), 0) / weeks.length)
            : 0;
            
        const completedTasks = weeks.reduce((acc, week) => {
            const tasks = week.tasks || [];
            return acc + tasks.filter(task => task.completed).length;
        }, 0);
        
        const totalTasks = weeks.reduce((acc, week) => {
            const tasks = week.tasks || [];
            return acc + tasks.length;
        }, 0);
        
        const skillsCount = Object.keys(skills).length;
        const projectsCount = projects.length;
        const logsCount = dailyLogs.length;
        
        return { totalProgress, completedTasks, totalTasks, skillsCount, projectsCount, logsCount };
    };

    return (
        <div className="bg-gray-100 min-h-screen font-sans">
             <header className="bg-white shadow-md p-4 sticky top-0 z-20">
                <div className="container mx-auto flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">Teacher Dashboard</h1>
                        <p className="text-gray-600">Overview of {(allStudentsData || []).length} student{(allStudentsData || []).length !== 1 ? 's' : ''}</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button 
                            onClick={handleRefresh} 
                            disabled={isRefreshing}
                            className="flex items-center gap-2 bg-blue-100 text-blue-700 p-2 rounded-lg font-semibold text-sm hover:bg-blue-200 disabled:opacity-50"
                        >
                            <span className={isRefreshing ? 'animate-spin' : ''}>🔄</span>
                            {isRefreshing ? 'Refreshing...' : 'Refresh Data'}
                        </button>
                        <button 
                            onClick={handleRunMigration} 
                            className="flex items-center gap-2 bg-yellow-100 text-yellow-700 p-2 rounded-lg font-semibold text-sm hover:bg-yellow-200"
                        >
                            <span>⚙️</span>
                            Run Migration
                        </button>
                        <button onClick={onSignOut} className="flex items-center gap-2 bg-red-100 text-red-700 p-2 rounded-lg font-semibold text-sm hover:bg-red-200">
                            <LogOut className="w-4 h-4" />
                            Logout
                        </button>
                    </div>
                </div>
            </header>
            
            <main className="container mx-auto p-4 md:p-8">
                {/* Controls */}
                <div className="bg-white rounded-lg shadow-sm p-4 mb-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-gray-800">Student Overview</h2>
                        <div className="flex items-center gap-2">
                            <span className="text-sm text-gray-600">Sort by:</span>
                            <select 
                                value={sortBy} 
                                onChange={(e) => setSortBy(e.target.value)}
                                className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option value="name">Name</option>
                                <option value="progress">Progress</option>
                                <option value="lastActivity">Last Activity</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Students Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {sortedStudents.map(student => {
                         const stats = getStudentStats(student);
                         const lastActivity = getLastActivityDate(student);
                         
                         return (
                            <Card key={student.id} className="cursor-pointer hover:shadow-xl hover:-translate-y-1 transition-all duration-200 group" onClick={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                onSelectStudent(student);
                            }}>
                                {/* Header */}
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="w-14 h-14 bg-gradient-to-br from-blue-400 to-blue-600 rounded-full flex items-center justify-center shadow-md">
                                        <GraduationCap className="w-6 h-6 text-white" />
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-bold text-lg text-gray-800 group-hover:text-blue-600 transition-colors">{student.displayName}</h3>
                                        <p className="text-sm text-gray-500">Last activity: {lastActivity}</p>
                                    </div>
                                    <div className="text-right">
                                        <div className="text-2xl font-bold text-blue-600">{stats.totalProgress}%</div>
                                        <div className="text-xs text-gray-500">Overall</div>
                                    </div>
                                </div>

                                {/* Progress Bar */}
                                <div className="mb-4">
                                    <ProgressBar progress={stats.totalProgress} />
                                </div>

                                {/* Quick Stats */}
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div className="bg-gray-50 rounded-lg p-3">
                                        <div className="flex items-center gap-2 mb-1">
                                            <CheckSquare className="w-4 h-4 text-green-600" />
                                            <span className="font-medium">Tasks</span>
                                        </div>
                                        <div className="text-gray-600">{stats.completedTasks}/{stats.totalTasks} completed</div>
                                    </div>
                                    <div className="bg-gray-50 rounded-lg p-3">
                                        <div className="flex items-center gap-2 mb-1">
                                            <BrainCircuit className="w-4 h-4 text-purple-600" />
                                            <span className="font-medium">Skills</span>
                                        </div>
                                        <div className="text-gray-600">{stats.skillsCount} tracked</div>
                                    </div>
                                    <div className="bg-gray-50 rounded-lg p-3">
                                        <div className="flex items-center gap-2 mb-1">
                                            <ImagePlus className="w-4 h-4 text-orange-600" />
                                            <span className="font-medium">Projects</span>
                                        </div>
                                        <div className="text-gray-600">{stats.projectsCount} created</div>
                                    </div>
                                    <div className="bg-gray-50 rounded-lg p-3">
                                        <div className="flex items-center gap-2 mb-1">
                                            <CalendarDays className="w-4 h-4 text-blue-600" />
                                            <span className="font-medium">Logs</span>
                                        </div>
                                        <div className="text-gray-600">{stats.logsCount} entries</div>
                                    </div>
                                </div>

                                {/* Action Indicator */}
                                <div className="mt-4 pt-3 border-t border-gray-200">
                                    <div className="flex items-center justify-between text-sm text-gray-500">
                                        <span>Click to view details</span>
                                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <span>View Dashboard</span>
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                         )
                    })}
                </div>

                {/* Empty State */}
                {(!allStudentsData || allStudentsData.length === 0) && (
                    <div className="text-center py-12">
                        <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No Students Yet</h3>
                        <p className="text-gray-500">Students will appear here once they sign up and start using the Learning Journal.</p>
                    </div>
                )}
            </main>
        </div>
    )
}


// --- MAIN APP & WORKBOOK CONTAINER ---
const WorkbookContainer = ({ user, userData, onUpdate, onToggleTask, onSignOut, isReadOnly = false, onBack }) => {
    const [activeTab, setActiveTab] = useState('Dashboard');
    const [quote, setQuote] = useState(motivationalQuotes[0]);
    const [isEditingName, setIsEditingName] = useState(false);
    const [newDisplayName, setNewDisplayName] = useState(userData?.displayName || '');

    useEffect(() => {
        setNewDisplayName(userData?.displayName || '');
    }, [userData?.displayName]);
    
    useEffect(() => {
        const interval = setInterval(() => {
            setQuote(motivationalQuotes[Math.floor(Math.random() * motivationalQuotes.length)]);
        }, 10000);
        return () => clearInterval(interval);
    }, []);
    
    const handleSaveName = () => {
        if (newDisplayName.trim()) {
            onUpdate('displayName', newDisplayName.trim());
            setIsEditingName(false);
        }
    };

    const TABS = {
        'Dashboard': { icon: <LayoutDashboard className="w-4 h-4" />, component: <DashboardSheet userData={userData} /> },
        'Weekly Plan': { icon: <BookOpen className="w-4 h-4" />, component: <WeeklyPlanSheet userData={userData} onToggleTask={onToggleTask} isReadOnly={isReadOnly} /> },
        'Daily Log': { icon: <CalendarDays className="w-4 h-4" />, component: <DailyLogSheet userData={userData} onUpdate={onUpdate} isReadOnly={isReadOnly} /> },
        'Skills Matrix': { icon: <BrainCircuit className="w-4 h-4" />, component: <SkillsMatrixSheet userData={userData} onUpdate={onUpdate} isReadOnly={isReadOnly} /> },
        'Project Gallery': { icon: <ImagePlus className="w-4 h-4" />, component: <ProjectGallerySheet userData={userData} onUpdate={onUpdate} isReadOnly={isReadOnly} /> },
        'Course Tracker': { icon: <BookCopy className="w-4 h-4" />, component: <CourseTrackerSheet userData={userData} onUpdate={onUpdate} isReadOnly={isReadOnly} /> },
        'Achievements': { icon: <Trophy className="w-4 h-4" />, component: <AchievementsSheet userData={userData} /> },
        'AI Prompts': { icon: <Bot className="w-4 h-4" />, component: <AIPromptsSheet userData={userData} isReadOnly={isReadOnly} /> },
        'Reflection': { icon: <MessageSquare className="w-4 h-4" />, component: <ReflectionSheet userData={userData} onUpdate={onUpdate} isReadOnly={isReadOnly || user.email === TEACHER_EMAIL} /> },
    };

    if (!userData) {
        return <LoadingSpinner />;
    }



    return (
        <div className="bg-gray-100 min-h-screen font-sans">
            <header className="bg-white shadow-md p-4 sticky top-0 z-20">
                <div className="container mx-auto">
                    <div className="flex flex-wrap justify-between items-center gap-4 mb-4">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-800">{isReadOnly ? `${userData.displayName}'s Journey` : 'My Programming Learning Journey'}</h1>
                            <p className="text-gray-600 italic">"{quote}"</p>
                        </div>
                        <div className="flex items-center gap-4">
                            {!isReadOnly && (
                                <div className="flex items-center gap-2 bg-gray-100 p-2 rounded-lg">
                                    <span className="text-gray-600">👥</span>
                                    {isEditingName ? (
                                        <div className="flex items-center gap-2">
                                            <input type="text" value={newDisplayName} onChange={e => setNewDisplayName(e.target.value)} className="p-1 border rounded-md text-sm" autoFocus />
                                            <button onClick={handleSaveName} className="p-1 text-green-600 hover:bg-green-100 rounded-full"><Save className="w-4 h-4" /></button>
                                        </div>
                                    ) : (
                                        <div className="flex items-center gap-2">
                                            <span className="text-sm font-medium text-gray-700">{userData?.displayName || 'Loading...'}</span>
                                            <button onClick={() => setIsEditingName(true)} className="p-1 text-gray-500 hover:bg-gray-200 rounded-full"><Edit className="w-4 h-4" /></button>
                                        </div>
                                    )}
                                </div>
                            )}
                            {onBack ? (
                                <button onClick={onBack} className="flex items-center gap-2 bg-gray-200 text-gray-800 p-2 rounded-lg font-semibold text-sm hover:bg-gray-300">
                                    <ArrowLeft className="w-4 h-4" />
                                    Back to Dashboard
                                </button>
                            ) : (
                                <button onClick={onSignOut} className="flex items-center gap-2 bg-red-100 text-red-700 p-2 rounded-lg font-semibold text-sm hover:bg-red-200">
                                    <LogOut className="w-4 h-4" />
                                    Logout
                                </button>
                            )}
                        </div>
                    </div>
                     <nav className="border-b border-gray-200">
                        <div className="-mb-px flex space-x-6 overflow-x-auto">
                            {Object.entries(TABS).map(([name, { icon }]) => (
                                <button
                                    key={name}
                                    onClick={() => setActiveTab(name)}
                                    className={`flex items-center gap-2 whitespace-nowrap py-3 px-1 border-b-2 font-medium text-sm transition-colors ${activeTab === name ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}
                                >
                                    {icon} {name}
                                </button>
                            ))}
                        </div>
                    </nav>
                </div>
            </header>

            <main className="container mx-auto p-4 md:p-8">
                {TABS[activeTab].component}
            </main>
        </div>
    );
};

function App() {
    const [firebaseServices, setFirebaseServices] = useState(null);
    const [user, setUser] = useState(null);
    const [userRole, setUserRole] = useState('student');
    const [userData, setUserData] = useState(null);
    const [allStudentsData, setAllStudentsData] = useState([]);
    const [selectedStudent, setSelectedStudent] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    
    // Initialize Firebase
    useEffect(() => {
        const firebaseConfig = window.getFirebaseConfig ? window.getFirebaseConfig() : null;
        if (!firebaseConfig) {
            console.error("Firebase config not found.");
            setIsLoading(false);
            return;
        }
        try {
            firebase.initializeApp(firebaseConfig);
            const auth = firebase.auth();
            const db = firebase.firestore();
            
            // Configure Firestore settings to avoid CORS issues
            db.settings({
                experimentalForceLongPolling: true // Use long polling instead of WebChannel transport
            });
            
            setFirebaseServices({ auth, db });
        } catch (error) {
            console.error("Firebase initialization error:", error);
        }
    }, []);

    // Handle Authentication State Change
    useEffect(() => {
        if (!firebaseServices) return;
        const { auth } = firebaseServices;
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setUser(user);
            if (user && user.email === TEACHER_EMAIL) {
                setUserRole('teacher');
            } else {
                setUserRole('student');
            }
            setIsLoading(false);
        });
        return () => unsubscribe();
    }, [firebaseServices]);

    // Fetch data based on role
    useEffect(() => {
        if (!firebaseServices || !user) {
            setUserData(null);
            setAllStudentsData([]);
            return;
        };
        
        const { db } = firebaseServices;
        const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
        
        if (userRole === 'teacher') {
            // For teachers: Fetch student data once initially only
            const fetchStudentsData = async () => {
                try {
                    const usersCollectionRef = db.collection('artifacts').doc(appId).collection('users');
                    const querySnapshot = await usersCollectionRef.get();
                    const students = [];
                    querySnapshot.forEach((doc) => {
                        // Exclude the teacher's own data from the student list
                        if(doc.id !== user.uid) {
                            students.push({ id: doc.id, ...doc.data() });
                        }
                    });
                    setAllStudentsData(students);
                } catch (error) {
                    console.error("Error fetching students data:", error);
                }
            };

            // Initial fetch only - no automatic polling
            fetchStudentsData();
            
        } else { // Role is 'student'
            // For students: Use real-time listener for their own data only (minimal reads)
            const docRef = db.collection('artifacts').doc(appId).collection('users').doc(user.uid);
            const unsubscribe = docRef.onSnapshot((docSnap) => {
                if (docSnap.exists) {
                    setUserData(docSnap.data());
                } else {
                    // No user data found - this might happen briefly during sign-up
                    setUserData(null);
                }
            }, (error) => {
                console.error("Error fetching user data:", error);
            });
            return () => unsubscribe();
        }
    }, [firebaseServices, user, userRole]);

    // Manual refresh function for teachers
    const handleRefreshStudentData = async () => {
        if (!firebaseServices || !user || userRole !== 'teacher') return;
        
        const { db } = firebaseServices;
        const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
        
        try {
            const usersCollectionRef = db.collection('artifacts').doc(appId).collection('users');
            const querySnapshot = await usersCollectionRef.get();
            const students = [];
            querySnapshot.forEach((doc) => {
                if(doc.id !== user.uid) {
                    students.push({ id: doc.id, ...doc.data() });
                }
            });
            setAllStudentsData(students);
        } catch (error) {
            console.error("Error refreshing students data:", error);
        }
    };

    const handleUpdateUserData = async (key, value) => {
        if (!firebaseServices || !user || !userData) return;
        const { db } = firebaseServices;
        const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
        const docRef = db.collection('artifacts').doc(appId).collection('users').doc(user.uid);
        
        const updatedData = { ...userData, [key]: value };
        await docRef.set(updatedData, { merge: true });
    };

    const handleTeacherUpdateReflection = async (studentId, key, value) => {
        if (!firebaseServices || !user || userRole !== 'teacher') return;
        const { db } = firebaseServices;
        const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
        const docRef = db.collection('artifacts').doc(appId).collection('users').doc(studentId);
        await docRef.set({ reflection: { [key]: value } }, { merge: true });
    }
    
    const handleToggleTask = async (weekId, taskIndex) => {
        if (!userData) return;
        const newWeeks = userData.weeks.map(w => {
            if (w.id === weekId) {
                const updatedTasks = w.tasks.map((task, index) => {
                    if (index === taskIndex) {
                        return { ...task, completed: !task.completed };
                    }
                    return task;
                });
                const newProgress = Math.round((updatedTasks.filter(t => t.completed).length / updatedTasks.length) * 100);
                return { ...w, tasks: updatedTasks, progress: newProgress };
            }
            return w;
        });
        await handleUpdateUserData('weeks', newWeeks);
    };

    const handleSignOut = async () => {
        if (!firebaseServices) return;
        await firebaseServices.auth.signOut();
        setSelectedStudent(null);
    };

    if (isLoading) {
        return <div className="bg-gray-100 min-h-screen flex justify-center items-center"><LoadingSpinner /></div>;
    }

    if (!user) {
        return <AuthComponent auth={firebaseServices.auth} db={firebaseServices.db} />;
    }

    if (userRole === 'teacher') {
        if (selectedStudent) {
             return <WorkbookContainer 
                user={user}
                userData={selectedStudent}
                isReadOnly={true}
                onBack={() => {
                    setSelectedStudent(null);
                }}
                // Teacher can only update the feedback part of reflection
                onUpdate={(key, value) => {
                    if (key === 'reflection') {
                        handleTeacherUpdateReflection(selectedStudent.id, 'leadFeedback', value.leadFeedback)
                    }
                }}
                onToggleTask={() => {}} // Read-only, so no-op
                onSignOut={handleSignOut}
            />
        }
        return <TeacherDashboard 
            allStudentsData={allStudentsData} 
            onSelectStudent={(student) => {
                setSelectedStudent(student);
            }} 
            onRefresh={handleRefreshStudentData} 
            onSignOut={handleSignOut} 
            firebaseServices={firebaseServices}
        />
    }

    // Default is student view
    return (
        <WorkbookContainer 
            user={user}
            userData={userData}
            onUpdate={handleUpdateUserData}
            onToggleTask={handleToggleTask}
            onSignOut={handleSignOut}
        />
    );
}

// Render the app
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(React.createElement(App));
