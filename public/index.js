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
            'plus': '+'
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
const TEACHER_EMAIL = "gronzon31@gmail.com";

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
    { name: "Learning Git and GitHub", link: "https://www.linkedin.com/learning/learning-git-and-github-14213624" },
    { name: "SQL for Non-Programmers", link: "https://www.linkedin.com/learning/sql-for-non-programmers" },
    { name: "HTML, CSS, and JavaScript: Building the Web", link: "https://www.linkedin.com/learning/html-css-and-javascript-building-the-web" },
    { name: "JavaScript Essential Training", link: "https://www.linkedin.com/learning/javascript-essential-training" },
    { name: "Python for Non-Programmers", link: "https://www.linkedin.com/learning/python-for-non-programmers" },
    { name: "Introduction to Web APIs", link: "https://www.linkedin.com/learning/introduction-to-web-apis" },
    { name: "Data Visualization: Best Practices", link: "https://www.linkedin.com/learning/data-visualization-best-practices" },
    { name: "Programming Foundations: Software Testing/QA", link: "https://www.linkedin.com/learning/programming-foundations-software-testing-qa" },
    { name: "Programming Foundations: Web Security", link: "https://www.linkedin.com/learning/programming-foundations-web-security-2" },
    { name: "Learning Docker", link: "https://www.linkedin.com/learning/learning-docker-17236240" },
];

const createInitialUserData = (displayName) => {
    const initialLearningPlanData = [
        { id: 1, title: "What is Programming, Really?", phase: "Foundation", tasks: [ { text: "Watch 'Learning Git and GitHub'", link: "https://www.linkedin.com/learning/learning-git-and-github-14213624", completed: false }, { text: "Project: Get MinionMonitor running & add one device", completed: false } ] },
        { id: 2, title: "Understanding Data and Equipment", phase: "Foundation", tasks: [ { text: "Watch 'SQL for Non-Programmers'", link: "https://www.linkedin.com/learning/sql-for-non-programmers", completed: false }, { text: "Project: Add equipment data & understand organization", completed: false } ] },
        { id: 3, title: "Making Web Pages Interactive", phase: "Foundation", tasks: [ { text: "Watch 'HTML, CSS, and JavaScript: Building the Web'", link: "https://www.linkedin.com/learning/html-css-and-javascript-building-the-web", completed: false }, { text: "Project: Customize the interface", completed: false } ] },
        { id: 4, title: "Simple Logic and Automation", phase: "Foundation", tasks: [ { text: "Watch 'JavaScript Essential Training'", link: "https://www.linkedin.com/learning/javascript-essential-training", completed: false }, { text: "Project: Understand basic logic & make an element interactive", completed: false } ] },
        { id: 5, title: "Break/Catch-Up Week", phase: "Foundation", tasks: [ { text: "Catch up on any courses you're behind on", completed: false }, { text: "Review what you've learned so far", completed: false }, { text: "Take a break if you need one!", completed: false } ] },
        { id: 6, title: "Python Basics for Monitoring", phase: "Foundation", tasks: [ { text: "Watch 'Python for Non-Programmers'", link: "https://www.linkedin.com/learning/python-for-non-programmers", completed: false }, { text: "Project: Understand the backend & make a simple change", completed: false } ] },
        { id: 7, title: "APIs & Backend Development", phase: "Foundation", tasks: [ { text: "Watch 'Introduction to Web APIs'", link: "https://www.linkedin.com/learning/introduction-to-web-apis", completed: false }, { text: "Project: Understand how system parts communicate via APIs", completed: false } ] },
        { id: 8, title: "Equipment Monitoring Concepts", phase: "Foundation", tasks: [ { text: "Review previous courses or take a break", completed: false }, { text: "Project: Understand basic monitoring concepts like ping checks", completed: false } ] },
        { id: 9, title: "Data Visualization", phase: "Building", tasks: [ { text: "Watch 'Data Visualization: Best Practices'", link: "https://www.linkedin.com/learning/data-visualization-best-practices", completed: false }, { text: "Project: Understand how charts work in the system", completed: false } ] },
        { id: 10, title: "Extended Break/Catch-Up", phase: "Building", tasks: [ { text: "Catch up on any courses you're behind on", completed: false }, { text: "Review and improve anything you've built so far", completed: false } ] },
        { id: 11, title: "Alert Concepts & Notifications", phase: "Building", tasks: [ { text: "Review alert code and concepts", completed: false }, { text: "Project: Understand how alerts are triggered", completed: false } ] },
        { id: 12, title: "System Integration Basics", phase: "Building", tasks: [ { text: "Look at data import functionality", completed: false }, { text: "Project: Understand data validation and import a small file", completed: false } ] },
        { id: 13, title: "Testing and Quality", phase: "Building", tasks: [ { text: "Watch 'Programming Foundations: Software Testing/QA'", link: "https://www.linkedin.com/learning/programming-foundations-software-testing-qa", completed: false }, { text: "Project: Understand testing basics and why they matter", completed: false } ] },
        { id: 14, title: "Personal Project Week", phase: "Building", tasks: [ { text: "Review everything you've learned so far", completed: false }, { text: "Project: Build something small for your facility's needs", completed: false } ] },
        { id: 15, title: "Security Basics", phase: "Building", tasks: [ { text: "Watch 'Programming Foundations: Web Security'", link: "https://www.linkedin.com/learning/programming-foundations-web-security-2", completed: false }, { text: "Project: Review how authentication works", completed: false } ] },
        { id: 16, title: "Performance & Optimization", phase: "Building", tasks: [ { text: "Check how fast pages load in the application", completed: false }, { text: "Project: Identify one performance bottleneck", completed: false } ] },
        { id: 17, title: "Break Week", phase: "Advanced", tasks: [ { text: "No new learning required", completed: false }, { text: "Use spare time to practice existing skills", completed: false } ] },
        { id: 18, title: "Deployment & DevOps Basics", phase: "Advanced", tasks: [ { text: "Watch 'Learning Docker'", link: "https://www.linkedin.com/learning/learning-docker-17236240", completed: false }, { text: "Project: Understand how the project is deployed", completed: false } ] },
        { id: 19, title: "Advanced Database Concepts", phase: "Advanced", tasks: [ { text: "Review advanced database materials", completed: false }, { text: "Project: Write a complex database query", completed: false } ] },
        { id: 20, title: "Integration and Planning", phase: "Advanced", tasks: [ { text: "Review all the concepts you've learned", completed: false }, { text: "Project: Plan your next learning goals", completed: false } ] },
        { id: 21, title: "Specialization: Path 1", phase: "Advanced", tasks: [ { text: "Choose your focus: Frontend, Backend, or Integration", completed: false }, { text: "Start an advanced course in your chosen area", completed: false } ] },
        { id: 22, "title": "Specialization: Path 2", phase: "Advanced", tasks: [ { text: "Continue your chosen specialization path", completed: false }, { text: "Work on a project related to your specialization", completed: false } ] },
        { id: 23, title: "Leadership Track: Mentoring", phase: "Advanced", tasks: [ { text: "Mentor new learners on the team", completed: false }, { text: "Help a colleague understand a concept", completed: false } ] },
        { id: 24, title: "Leadership Track: Initiatives", phase: "Advanced", tasks: [ { text: "Lead a small development initiative", completed: false }, { text: "Plan and present a new feature idea", completed: false } ] },
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
            <span className={`flex-1 ${task.completed ? 'text-gray-500 line-through' : 'text-gray-700'}`}>{task.text}</span>
            {task.link && (<a href={task.link} target="_blank" rel="noopener noreferrer" onClick={e => e.stopPropagation()} className="ml-2 p-1 rounded-full hover:bg-blue-100"><ExternalLink className="w-4 h-4 text-blue-600" /></a>)}
        </div>
    );

    return (
        <Card>
            <h3 className="text-xl font-bold mb-4">24-Week Learning Plan</h3>
            <div className="space-y-2">
                {userData.weeks.map(week => (
                    <div key={week.id} className="border border-gray-200 rounded-lg">
                        <div
                            className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
                            onClick={() => setOpenWeek(openWeek === week.id ? null : week.id)}
                        >
                            <div className="flex-grow">
                                <div className="flex items-center gap-4">
                                    <h4 className="font-bold text-lg text-gray-800">Week {week.id}: {week.title}</h4>
                                    <PhaseIndicator phase={week.phase} />
                                </div>
                                <div className="mt-2 flex items-center gap-3">
                                    <div className="w-full"><ProgressBar progress={week.progress} /></div>
                                    <span className="text-sm font-semibold text-gray-600 w-12 text-right">{week.progress}%</span>
                                </div>
                            </div>
                            <ChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${openWeek === week.id ? 'rotate-180' : ''}`} />
                        </div>
                        {openWeek === week.id && (
                            <div className="p-4 border-t border-gray-200 bg-white">
                                <div className="space-y-3">
                                    {week.tasks.map((task, index) => (
                                        <ChecklistItem key={index} task={task} onToggle={() => onToggleTask(week.id, index)} />
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ))}
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
const TeacherDashboard = ({ allStudentsData, onSelectStudent, onSignOut, onRefresh }) => {
    const [sortBy, setSortBy] = useState('name'); // 'name', 'progress', 'lastActivity'
    const [isRefreshing, setIsRefreshing] = useState(false);

    const handleRefresh = async () => {
        setIsRefreshing(true);
        await onRefresh();
        setIsRefreshing(false);
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
                                            <input type="text" value={newDisplayName} onChange={(e) => setNewDisplayName(e.target.value)} className="p-1 border rounded-md text-sm" autoFocus />
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
        return <TeacherDashboard allStudentsData={allStudentsData} onSelectStudent={(student) => {
            setSelectedStudent(student);
        }} onRefresh={handleRefreshStudentData} onSignOut={handleSignOut} />
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
