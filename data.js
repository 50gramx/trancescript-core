// data.js
window.appData = {
    appDetails: {
        name: "YouTube Creator Studio",
        description: "A comprehensive platform for YouTube content creators to manage their channels, upload videos, analyze performance, and engage with their audience.",
        code: "EAIV1001",
        pages: [
            { id: "creator-dashboard", name: "Creator Dashboard", code: "EAIP1001", description: "Main dashboard for creators" },
            { id: "video-upload", name: "Video Upload", code: "EAIP1002", description: "Page for uploading videos" },
            { id: "youtube-studio", name: "YouTube Studio", code: "EAIP1003", description: "YouTube Studio main page" },
            { id: "analytics", name: "Analytics", code: "EAIP1004", description: "Analytics and insights page" },
            { id: "channel-management", name: "Channel Management", code: "EAIP1005", description: "Channel settings and management" },
            { id: "live-stream", name: "Live Stream", code: "EAIP1006", description: "Live streaming interface" },
            { id: "collaborations", name: "Collaborations", code: "EAIP1007", description: "Creator collaboration hub" },
            { id: "community", name: "Community", code: "EAIP1008", description: "Community engagement tools" }
        ],
        appVariables: [
            { id: "video-visibility", name: "Video Visibility", code: "EAIV1001", type: "string", defaultValue: "public", description: "Visibility setting for uploaded videos" },
            { id: "file-type", name: "File Type", code: "EAIV1002", type: "string", defaultValue: "MP4", description: "Type of video file being uploaded" },
            { id: "metadata-type", name: "Metadata Type", code: "EAIV1003", type: "string", defaultValue: "title and description", description: "Type of metadata being added" },
            { id: "demographic-type", name: "Demographic Type", code: "EAIV1004", type: "string", defaultValue: "age and location", description: "Type of demographic data to analyze" },
            { id: "report-format", name: "Report Format", code: "EAIV1005", type: "string", defaultValue: "PDF", description: "Format for exported reports" },
            { id: "stream-quality", name: "Stream Quality", code: "EAIV1006", type: "string", defaultValue: "1080p", description: "Live stream quality setting" },
            { id: "collaboration-type", name: "Collaboration Type", code: "EAIV1007", type: "string", defaultValue: "video collaboration", description: "Type of collaboration being requested" },
            { id: "audience-size", name: "Audience Size", code: "EAIV1008", type: "number", defaultValue: 1000, description: "Expected audience size for live streams" }
        ]
    },
    userProfiles: [
        { id: "creator", name: "Content Creator", description: "YouTube content creators who upload videos" },
        { id: "viewer", name: "Viewer", description: "Users who watch and interact with videos" },
        { id: "admin", name: "Administrator", description: "System administrators managing the platform" }
    ],
    personas: [
        {
            id: "sarah-creator",
            name: "Sarah Johnson",
            role: "Content Creator",
            age: 28,
            bio: "A passionate YouTuber with 50K subscribers who creates educational content about technology and programming.",
            goals: [
                "Grow my subscriber base to 100K",
                "Increase video engagement and watch time",
                "Monetize my content effectively",
                "Collaborate with other creators"
            ],
            frustrations: [
                "Complex video upload process",
                "Limited analytics insights",
                "Difficulty understanding audience demographics",
                "Time-consuming thumbnail creation"
            ],
            userStories: [
                {
                    id: "US1",
                    title: "Upload Video",
                    story: "As a content creator, I want to upload videos easily so that I can share my content with my audience quickly and efficiently.",
                    benefit: "This will save me time and allow me to focus on creating more content."
                },
                {
                    id: "US2", 
                    title: "Analyze Performance",
                    story: "As a content creator, I want to analyze my video performance so that I can understand what content resonates with my audience.",
                    benefit: "This will help me create better content and grow my channel."
                }
            ]
        },
        {
            id: "mike-viewer",
            name: "Mike Chen",
            role: "Viewer",
            age: 24,
            bio: "A tech enthusiast who watches educational videos and follows multiple programming channels.",
            goals: [
                "Learn new programming skills",
                "Stay updated with latest tech trends",
                "Find high-quality educational content",
                "Engage with creators through comments"
            ],
            frustrations: [
                "Difficulty finding relevant content",
                "Poor video quality recommendations",
                "Limited search filters",
                "Inconsistent content recommendations"
            ],
            userStories: [
                {
                    id: "US3",
                    title: "Discover Content",
                    story: "As a viewer, I want to discover relevant educational content so that I can learn new skills and stay updated.",
                    benefit: "This will help me grow my knowledge and skills efficiently."
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