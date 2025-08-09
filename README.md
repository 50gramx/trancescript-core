# TranceScript Core — Open Source Journey Builder

A lightweight, offline-first user journey and scenario builder. TranceScript Core ships with a generic sample app data set, runs on GitHub Pages, and optionally reports anonymous community metrics with explicit user consent.

## 🚀 Features

### Core Functionality
- **User Journey Management** - Create and manage user stories and scenarios
- **Step Library Integration** - Pre-built step templates with parameter configuration
- **Visual Step Builder** - Drag-and-drop step management with real-time preview
- **Scenario Templates** - Pre-built workflows for common use cases

### Advanced Features
- **Color-Coded Steps** - Syntax highlighting for different step types (Given/When/Then/And/But)
- **Parameter Highlighting** - Visual distinction for different parameter types
- **Step Dependencies** - Define relationships between steps
- **Scenario Validation** - Comprehensive validation with error checking
- **Import/Export** - Share and backup scenarios via JSON
- **Search & Filter** - Find scenarios and steps quickly

### Visual Enhancements
- **Dark/Light Mode** - Toggle between themes
- **Flow Chart View** - Visual representation of scenario flows
- **Step Type Badges** - Clear identification of step types
- **Live Preview** - Real-time scenario rendering
- **Auto-save** - Automatic data persistence

## 🎨 Color Coding System

### Step Types
- **🟢 Given** - Green (#10b981) - Preconditions and setup
- **🔵 When** - Blue (#3b82f6) - Actions and triggers
- **🟠 Then** - Orange (#f59e0b) - Expected outcomes
- **🟣 And** - Purple (#8b5cf6) - Additional conditions
- **🔴 But** - Red (#ef4444) - Error conditions

### Parameter Types
- **📄 Page Parameters** - Green highlighting
- **📝 String Parameters** - Orange highlighting
- **🔢 Number Parameters** - Purple highlighting
- **✅ Boolean Parameters** - Red highlighting

## 🛠️ Usage

### Getting Started
1. Open `index.html` in a web browser (or serve locally with `python3 -m http.server 8000`)
2. Build your journeys and scenarios using the sample data in `data.js`

### Creating Scenarios
1. **Add New Scenario**
   - Click the "+" button next to scenario tabs
   - Fill in title, description, and type
   - Choose from available templates
   - Click "Add Scenario"

2. **Edit Scenarios**
   - Click "Edit" on any scenario
   - Use the step builder to modify steps
   - Configure parameters for each step
   - Save your changes

3. **Use Templates**
   - Login Flow - Complete authentication process
   - Upload Process - File upload workflow
   - Search Flow - Search and filter process
   - Payment Process - Checkout and payment
   - Error Handling - Error scenarios and recovery

### Step Management
- **Add Steps** - Click "+ Add Step" in the step builder
- **Delete Steps** - Click "×" on any step
- **Reorder Steps** - Use "↑" and "↓" buttons
- **Configure Parameters** - Fill in required parameters
- **Add Dependencies** - Define step relationships
- **Add Comments** - Document your steps

### Keyboard Shortcuts
- **Ctrl+S** - Save current scenario
  (Note: global shortcuts are disabled in the OSS core build.)

## 📊 Data Structure

### App Details
```javascript
{
  name: "YouTube",
  description: "Video sharing platform",
  pages: [...],
  appVariables: [...]
}
```

### User Profiles
```javascript
[
  {
    name: "Content Creator",
    description: "Users who create and upload content"
  }
]
```

### Personas
```javascript
[
  {
    name: "Sarah (Content Creator)",
    bio: "...",
    goals: "...",
    frustrations: "...",
    userStories: [...]
  }
]
```

### Journeys
```javascript
[
  {
    id: "journey1",
    title: "Content Creation Workflow",
    persona: "Sarah (Content Creator)",
    scenarios: [...]
  }
]
```

### Scenarios
```javascript
{
  id: "scenario1",
  title: "Video Upload Process",
  description: "...",
  type: "happy-path",
  steps: [...],
  dependencies: [...],
  comments: "..."
}
```

### Steps
```javascript
{
  id: "access-home",
  params: {
    page: "Home"
  },
  dependencies: [...],
  comments: "..."
}
```

## 🧪 Testing

This repository does not ship a runtime test harness. Development tests should be run locally and are not included in the production build.

## 🔧 Technical Details

### File Structure
```
trancescript-core/
├── index.html                 # Main HTML file
├── styles.css                 # All CSS styles
├── app.js                     # Main JavaScript logic
├── data.js                    # Sample application data
├── firebase-config.js         # Optional metrics bootstrap (no secrets committed)
├── ui/                        # UI modules (if used by app.js)
└── README.md                  # This documentation
```

### Browser Compatibility
- Modern browsers with ES6 support
- Local HTTP server required for ES6 modules
- Tested on Chrome, Firefox, Safari, Edge

### Performance Features
- Debounced rendering for smooth UI
- Validation caching for improved performance
- Lazy loading for large datasets
- Memory management and cleanup

## 🎯 Best Practices

### Scenario Design
1. **Start with Given** - Set up the context
2. **Use When for Actions** - Describe user actions
3. **Define Then for Outcomes** - Specify expected results
4. **Add And/But for Variations** - Handle alternatives and errors

### Step Configuration
1. **Use Descriptive Names** - Make steps self-explanatory
2. **Configure All Parameters** - Fill in required fields
3. **Add Comments** - Document complex steps
4. **Validate Regularly** - Check for errors and warnings

### Data Management
1. **Save Frequently** - Use Ctrl+S or auto-save
2. **Export Backups** - Export important scenarios
3. **Use Templates** - Start with pre-built workflows
4. **Version Control** - Keep track of changes

## 🚀 Future Enhancements

### Planned Features
- **Collaboration Tools** - Share scenarios with team
- **Version History** - Track scenario changes
- **Advanced Analytics** - Usage statistics and insights
- **API Integration** - Connect with external tools
- **Mobile Support** - Responsive design improvements

### Performance Improvements
- **Virtual Scrolling** - Handle large datasets
- **Web Workers** - Background processing
- **Service Workers** - Offline support
- **IndexedDB** - Larger data storage

## 📝 License

Copyright 2024 TranceScript contributors

Licensed under the Apache License, Version 2.0. See `LICENSE` for details.

## 🤝 Contributing

For questions or contributions, please refer to the project documentation and coding standards.

---

**Built with ❤️ by the TranceScript community**