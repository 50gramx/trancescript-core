// data.js (Generic demo dataset)
window.appData = {
    appDetails: {
        name: "Sample App",
        description: "A generic application used to demonstrate journeys, personas, and scenarios.",
        code: "APP001",
        pages: [
            { id: "home", name: "Home", code: "PAGE001", description: "Main landing page" },
            { id: "dashboard", name: "Dashboard", code: "PAGE002", description: "User dashboard" },
            { id: "profile", name: "Profile", code: "PAGE003", description: "User profile page" },
            { id: "settings", name: "Settings", code: "PAGE004", description: "Application settings" },
            { id: "search", name: "Search", code: "PAGE005", description: "Search functionality" },
            { id: "notifications", name: "Notifications", code: "PAGE006", description: "Notification center" },
            { id: "help", name: "Help", code: "PAGE007", description: "Help and support" },
            { id: "about", name: "About", code: "PAGE008", description: "About the application" }
        ],
        appVariables: [
            { id: "user-role", name: "User Role", code: "VAR001", type: "string", defaultValue: "user", description: "User's role in the application" },
            { id: "theme", name: "Theme", code: "VAR002", type: "string", defaultValue: "light", description: "Application theme setting" },
            { id: "language", name: "Language", code: "VAR003", type: "string", defaultValue: "en", description: "Application language" },
            { id: "timezone", name: "Timezone", code: "VAR004", type: "string", defaultValue: "UTC", description: "User's timezone" },
            { id: "notifications", name: "Notifications", code: "VAR005", type: "boolean", defaultValue: true, description: "Notification preferences" },
            { id: "auto-save", name: "Auto Save", code: "VAR006", type: "boolean", defaultValue: true, description: "Auto-save functionality" },
            { id: "session-timeout", name: "Session Timeout", code: "VAR007", type: "number", defaultValue: 30, description: "Session timeout in minutes" },
            { id: "max-upload-size", name: "Max Upload Size", code: "VAR008", type: "number", defaultValue: 10, description: "Maximum file upload size in MB" }
        ]
    },
    userProfiles: [
        { id: "user", name: "User", description: "Regular application users" },
        { id: "admin", name: "Administrator", description: "System administrators" },
        { id: "moderator", name: "Moderator", description: "Content moderators" }
    ],
    personas: [
        {
            id: "primary-user",
            name: "Alex Johnson",
            role: "User",
            age: 28,
            bio: "A tech-savvy professional who uses applications to improve productivity and workflow efficiency.",
            goals: [
                "Complete tasks efficiently",
                "Learn new features quickly",
                "Collaborate with team members",
                "Maintain data security"
            ],
            frustrations: [
                "Complex user interfaces",
                "Slow loading times",
                "Difficult navigation",
                "Limited customization options"
            ],
            userStories: [
                {
                    id: "US1",
                    title: "Complete Task",
                    story: "As a user, I want to complete tasks efficiently so that I can be more productive.",
                    benefit: "This will save me time and improve my workflow."
                },
                {
                    id: "US2", 
                    title: "Access Dashboard",
                    story: "As a user, I want to access my dashboard quickly so that I can see my important information.",
                    benefit: "This will help me stay organized and informed."
                }
            ]
        },
        {
            id: "admin-user",
            name: "Sarah Chen",
            role: "Administrator",
            age: 24,
            bio: "A system administrator who manages user accounts and application settings.",
            goals: [
                "Manage user accounts effectively",
                "Monitor system performance",
                "Ensure data security",
                "Provide user support"
            ],
            frustrations: [
                "Complex admin interfaces",
                "Limited reporting tools",
                "Difficult user management",
                "Poor system monitoring"
            ],
            userStories: [
                {
                    id: "US3",
                    title: "Manage Users",
                    story: "As an administrator, I want to manage user accounts easily so that I can maintain system security.",
                    benefit: "This will help me ensure proper access control and user management."
                }
            ]
        }
    ],
    journeys: [
        {
            id: "task-completion-journey",
            title: "Task Completion Journey",
            persona: "primary-user",
            story: "As a user, I want to create and complete a task efficiently so that I can be more productive.",
            benefit: "This will save me time and improve my workflow.",
            scenarios: [
                {
                    id: "happy-path-create-task",
                    title: "Happy Path - Create Task",
                    type: "happy-path",
                    steps: [
                        {
                            id: "access-page",
                            params: { page: "dashboard" }
                        },
                        {
                            id: "click-button",
                            params: { "button-text": "New Task" }
                        },
                        {
                            id: "upload-file",
                            params: { "file-type": "TXT", "file-name": "requirements.txt" }
                        },
                        {
                            id: "enter-text",
                            params: { "text-value": "Finish quarterly report", "field-name": "Task Title" }
                        },
                        {
                            id: "enter-text",
                            params: { "text-value": "Compile metrics and finalize draft", "field-name": "Description" }
                        },
                        {
                            id: "select-option",
                            params: { "option-value": "High", "dropdown-name": "Priority" }
                        },
                        {
                            id: "click-button",
                            params: { "button-text": "Save" }
                        },
                        {
                            id: "verify-message",
                            params: { "message-type": "success", "message-text": "Task created successfully" }
                        }
                    ]
                },
                {
                    id: "error-handling-missing-field",
                    title: "Error Handling - Missing Field",
                    type: "error-path",
                    steps: [
                        {
                            id: "access-page",
                            params: { page: "dashboard" }
                        },
                        {
                            id: "click-button",
                            params: { "button-text": "New Task" }
                        },
                        {
                            id: "upload-file",
                            params: { "file-type": "TXT", "file-name": "notes.txt" }
                        },
                        {
                            id: "verify-message",
                            params: { "message-type": "error", "message-text": "Title is required" }
                        }
                    ]
                }
            ]
        },
        {
            id: "reporting-journey",
            title: "Reporting Journey",
            persona: "primary-user",
            story: "As a user, I want to view my reports so that I can understand progress and outcomes.",
            benefit: "This will help me make better decisions and prioritize work.",
            scenarios: [
                {
                    id: "view-reports",
                    title: "View Reports Overview",
                    type: "happy-path",
                    steps: [
                        {
                            id: "access-page",
                            params: { page: "dashboard" }
                        },
                        {
                            id: "click-link",
                            params: { "link-text": "Reports" }
                        },
                        {
                            id: "view-list",
                            params: { "item-type": "reports" }
                        },
                        {
                            id: "click-link",
                            params: { "link-text": "View Details" }
                        },
                        {
                            id: "verify-content",
                            params: { "expected-content": "Report metrics" }
                        }
                    ]
                },
                {
                    id: "export-report",
                    title: "Export Report",
                    type: "happy-path",
                    steps: [
                        {
                            id: "access-page",
                            params: { page: "dashboard" }
                        },
                        {
                            id: "apply-filter",
                            params: { "filter-type": "date range", "filter-value": "last 30 days" }
                        },
                        {
                            id: "click-button",
                            params: { "button-text": "Export" }
                        },
                        {
                            id: "click-button",
                            params: { "button-text": "Download" }
                        },
                        {
                            id: "verify-message",
                            params: { "message-type": "success", "message-text": "Report downloaded successfully" }
                        }
                    ]
                }
            ]
        },
        {
            id: "search-journey",
            title: "Search Journey",
            persona: "primary-user",
            story: "As a user, I want to search for relevant items so that I can find what I need faster.",
            benefit: "This will help me work more efficiently.",
            scenarios: [
                {
                    id: "search-items",
                    title: "Search for Items",
                    type: "happy-path",
                    steps: [
                        {
                            id: "access-page",
                            params: { page: "search" }
                        },
                        {
                            id: "search-for",
                            params: { "search-term": "Quarterly report" }
                        },
                        {
                            id: "apply-filter",
                            params: { "filter-type": "status", "filter-value": "Open" }
                        },
                        {
                            id: "view-list",
                            params: { "item-type": "results" }
                        },
                        {
                            id: "verify-count",
                            params: { "expected-count": 10, "item-type": "relevant items" }
                        }
                    ]
                },
                {
                    id: "no-results",
                    title: "No Search Results",
                    type: "error-path",
                    steps: [
                        {
                            id: "access-page",
                            params: { page: "search" }
                        },
                        {
                            id: "search-for",
                            params: { "search-term": "very specific item" }
                        },
                        {
                            id: "verify-message",
                            params: { "message-type": "info", "message-text": "No results found. Try different keywords." }
                        }
                    ]
                }
            ]
        },
        {
            id: "demo-flow-journey",
            title: "Demo Flow Journey",
            persona: "primary-user",
            story: "As a user, I want to run through a demo flow so that I can validate a basic workflow end-to-end.",
            benefit: "This will help me ensure the system works as intended.",
            scenarios: [
                {
                    id: "start-demo-flow",
                    title: "Start Demo Flow",
                    type: "happy-path",
                    steps: [
                        {
                            id: "access-page",
                            params: { page: "home" }
                        },
                        {
                            id: "click-button",
                            params: { "button-text": "Start" }
                        },
                        {
                            id: "enter-text",
                            params: { "text-value": "Demo run", "field-name": "Title" }
                        },
                        {
                            id: "enter-text",
                            params: { "text-value": "Validating key flow steps", "field-name": "Description" }
                        },
                        {
                            id: "select-option",
                            params: { "option-value": "Default", "dropdown-name": "Mode" }
                        },
                        {
                            id: "click-button",
                            params: { "button-text": "Run" }
                        },
                        {
                            id: "verify-message",
                            params: { "message-type": "success", "message-text": "Demo flow started successfully" }
                        }
                    ]
                },
                {
                    id: "review-demo-steps",
                    title: "Review Demo Steps",
                    type: "happy-path",
                    steps: [
                        {
                            id: "access-page",
                            params: { page: "dashboard" }
                        },
                        {
                            id: "view-list",
                            params: { "item-type": "recent actions" }
                        },
                        {
                            id: "click-button",
                            params: { "button-text": "Mark Complete" }
                        },
                        {
                            id: "click-button",
                            params: { "button-text": "Archive" }
                        },
                        {
                            id: "enter-text",
                            params: { "text-value": "All steps validated", "field-name": "Notes" }
                        },
                        {
                            id: "click-button",
                            params: { "button-text": "Save" }
                        }
                    ]
                }
            ]
        },
        {
            id: "team-collaboration-journey",
            title: "Team Collaboration Journey",
            persona: "admin-user",
            story: "As an administrator, I want to coordinate with team members so that I can ensure smooth operations.",
            benefit: "This will help us deliver work more consistently.",
            scenarios: [
                {
                    id: "assign-owner",
                    title: "Assign Owner",
                    type: "happy-path",
                    steps: [
                        {
                            id: "access-page",
                            params: { page: "dashboard" }
                        },
                        {
                            id: "click-link",
                            params: { "link-text": "Tasks" }
                        },
                        {
                            id: "search-for",
                            params: { "search-term": "owner" }
                        },
                        {
                            id: "apply-filter",
                            params: { "filter-type": "role", "filter-value": "admin" }
                        },
                        {
                            id: "view-list",
                            params: { "item-type": "users" }
                        },
                        {
                            id: "click-button",
                            params: { "button-text": "Assign" }
                        },
                        {
                            id: "enter-text",
                            params: { "text-value": "Assigning to Sarah for follow-up", "field-name": "Note" }
                        },
                        {
                            id: "click-button",
                            params: { "button-text": "Confirm" }
                        }
                    ]
                }
            ]
        }
    ]
}; 