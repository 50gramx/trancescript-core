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
            id: "video-upload-journey",
            title: "Video Upload Journey",
            persona: "sarah-creator",
            story: "As a content creator, I want to upload videos easily so that I can share my content with my audience quickly and efficiently.",
            benefit: "This will save me time and allow me to focus on creating more content.",
            scenarios: [
                {
                    id: "happy-path-upload",
                    title: "Happy Path - Video Upload",
                    type: "happy-path",
                    steps: [
                        {
                            id: "access-page",
                            params: { page: "creator-dashboard" }
                        },
                        {
                            id: "click-button",
                            params: { "button-text": "Upload Video" }
                        },
                        {
                            id: "upload-file",
                            params: { "file-type": "MP4", "file-name": "tutorial-video.mp4" }
                        },
                        {
                            id: "enter-text",
                            params: { "text-value": "Python Tutorial for Beginners", "field-name": "Video Title" }
                        },
                        {
                            id: "enter-text",
                            params: { "text-value": "Learn Python programming from scratch", "field-name": "Description" }
                        },
                        {
                            id: "select-option",
                            params: { "option-value": "public", "dropdown-name": "Visibility" }
                        },
                        {
                            id: "click-button",
                            params: { "button-text": "Publish" }
                        },
                        {
                            id: "verify-message",
                            params: { "message-type": "success", "message-text": "Video published successfully" }
                        }
                    ]
                },
                {
                    id: "error-handling-upload",
                    title: "Error Handling - Invalid File",
                    type: "error-path",
                    steps: [
                        {
                            id: "access-page",
                            params: { page: "creator-dashboard" }
                        },
                        {
                            id: "click-button",
                            params: { "button-text": "Upload Video" }
                        },
                        {
                            id: "upload-file",
                            params: { "file-type": "TXT", "file-name": "invalid-file.txt" }
                        },
                        {
                            id: "verify-message",
                            params: { "message-type": "error", "message-text": "Invalid file type. Please upload a video file." }
                        }
                    ]
                }
            ]
        },
        {
            id: "analytics-journey",
            title: "Analytics Journey",
            persona: "sarah-creator",
            story: "As a content creator, I want to analyze my video performance so that I can understand what content resonates with my audience.",
            benefit: "This will help me create better content and grow my channel.",
            scenarios: [
                {
                    id: "view-analytics",
                    title: "View Analytics Overview",
                    type: "happy-path",
                    steps: [
                        {
                            id: "access-page",
                            params: { page: "youtube-studio" }
                        },
                        {
                            id: "click-link",
                            params: { "link-text": "Analytics" }
                        },
                        {
                            id: "view-list",
                            params: { "item-type": "videos" }
                        },
                        {
                            id: "click-link",
                            params: { "link-text": "View Details" }
                        },
                        {
                            id: "verify-content",
                            params: { "expected-content": "Video performance metrics" }
                        }
                    ]
                },
                {
                    id: "export-report",
                    title: "Export Analytics Report",
                    type: "happy-path",
                    steps: [
                        {
                            id: "access-page",
                            params: { page: "analytics" }
                        },
                        {
                            id: "apply-filter",
                            params: { "filter-type": "date range", "filter-value": "last 30 days" }
                        },
                        {
                            id: "click-button",
                            params: { "button-text": "Export Report" }
                        },
                        {
                            id: "select-option",
                            params: { "option-value": "PDF", "dropdown-name": "Format" }
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
            id: "content-discovery-journey",
            title: "Content Discovery Journey",
            persona: "mike-viewer",
            story: "As a viewer, I want to discover relevant educational content so that I can learn new skills and stay updated.",
            benefit: "This will help me grow my knowledge and skills efficiently.",
            scenarios: [
                {
                    id: "search-content",
                    title: "Search for Educational Content",
                    type: "happy-path",
                    steps: [
                        {
                            id: "access-page",
                            params: { page: "creator-dashboard" }
                        },
                        {
                            id: "search-for",
                            params: { "search-term": "Python programming tutorial" }
                        },
                        {
                            id: "apply-filter",
                            params: { "filter-type": "duration", "filter-value": "10-20 minutes" }
                        },
                        {
                            id: "view-list",
                            params: { "item-type": "videos" }
                        },
                        {
                            id: "verify-count",
                            params: { "expected-count": 15, "item-type": "relevant videos" }
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
                            params: { page: "creator-dashboard" }
                        },
                        {
                            id: "search-for",
                            params: { "search-term": "very specific niche topic" }
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
            id: "live-streaming-journey",
            title: "Live Streaming Journey",
            persona: "sarah-creator",
            story: "As a content creator, I want to go live and interact with my audience in real-time so that I can build stronger connections and increase engagement.",
            benefit: "This will help me grow my community and create more engaging content.",
            scenarios: [
                {
                    id: "start-live-stream",
                    title: "Start Live Stream",
                    type: "happy-path",
                    steps: [
                        {
                            id: "access-page",
                            params: { page: "creator-dashboard" }
                        },
                        {
                            id: "click-button",
                            params: { "button-text": "Go Live" }
                        },
                        {
                            id: "enter-text",
                            params: { "text-value": "Live Coding: Building YouTube Features", "field-name": "Stream Title" }
                        },
                        {
                            id: "enter-text",
                            params: { "text-value": "Join me as I code live and build new features for our platform", "field-name": "Description" }
                        },
                        {
                            id: "select-option",
                            params: { "option-value": "public", "dropdown-name": "Visibility" }
                        },
                        {
                            id: "click-button",
                            params: { "button-text": "Start Streaming" }
                        },
                        {
                            id: "verify-message",
                            params: { "message-type": "success", "message-text": "Live stream started successfully" }
                        }
                    ]
                },
                {
                    id: "interact-with-audience",
                    title: "Interact with Live Audience",
                    type: "happy-path",
                    steps: [
                        {
                            id: "access-page",
                            params: { page: "live-stream" }
                        },
                        {
                            id: "view-list",
                            params: { "item-type": "live comments" }
                        },
                        {
                            id: "click-button",
                            params: { "button-text": "Pin Comment" }
                        },
                        {
                            id: "click-button",
                            params: { "button-text": "Reply to Comment" }
                        },
                        {
                            id: "enter-text",
                            params: { "text-value": "Great question! Let me show you how to implement that feature.", "field-name": "Reply" }
                        },
                        {
                            id: "click-button",
                            params: { "button-text": "Send Reply" }
                        }
                    ]
                }
            ]
        },
        {
            id: "collaboration-journey",
            title: "Creator Collaboration Journey",
            persona: "sarah-creator",
            story: "As a content creator, I want to collaborate with other creators so that I can expand my reach and create better content together.",
            benefit: "This will help me grow my audience and learn from other creators.",
            scenarios: [
                {
                    id: "find-collaborators",
                    title: "Find Collaboration Partners",
                    type: "happy-path",
                    steps: [
                        {
                            id: "access-page",
                            params: { page: "creator-dashboard" }
                        },
                        {
                            id: "click-link",
                            params: { "link-text": "Collaborations" }
                        },
                        {
                            id: "search-for",
                            params: { "search-term": "programming tutorial creators" }
                        },
                        {
                            id: "apply-filter",
                            params: { "filter-type": "subscriber count", "filter-value": "10K-100K" }
                        },
                        {
                            id: "view-list",
                            params: { "item-type": "potential collaborators" }
                        },
                        {
                            id: "click-button",
                            params: { "button-text": "Send Collaboration Request" }
                        },
                        {
                            id: "enter-text",
                            params: { "text-value": "Hi! I'd love to collaborate on a programming tutorial series. Let's discuss ideas!", "field-name": "Message" }
                        },
                        {
                            id: "click-button",
                            params: { "button-text": "Send Request" }
                        }
                    ]
                }
            ]
        }
    ]
}; 