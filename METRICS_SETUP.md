# Pathlight Metrics Setup Guide

## Overview
This guide will help you set up the zero-cost Firebase metrics system for Pathlight to track community impact.

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Create a project"
3. Name it: `pathlight-metrics`
4. Choose "Spark Plan" (free tier)
5. Complete the setup

## Step 2: Get Firebase Configuration

1. In Firebase Console, go to Project Settings
2. Scroll down to "Your apps" section
3. Click "Add app" → Web app
4. Name it: `pathlight-app`
5. Copy the config object

## Step 3: Provide Local Configuration (Do Not Commit)

Create a file named `firebase-config.local.js` in `trancescript-core/` (this file is gitignored):

```html
<script>
  window.PATHLIGHT_FIREBASE_CONFIG = {
    apiKey: "YOUR_API_KEY",
    authDomain: "your-project.firebaseapp.com",
    projectId: "your-project-id",
    storageBucket: "your-project.appspot.com",
    messagingSenderId: "YOUR_SENDER_ID",
    appId: "YOUR_APP_ID",
    measurementId: "YOUR_MEASUREMENT_ID"
  };
</script>
```

Alternatively for local testing, you can paste the JSON into LocalStorage:

```js
localStorage.setItem('PATHLIGHT_FIREBASE_CONFIG_JSON', JSON.stringify({
  apiKey: "YOUR_API_KEY",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
  measurementId: "YOUR_MEASUREMENT_ID"
}));
```

## Step 4: Set Up Firestore Database

1. In Firebase Console, go to "Firestore Database"
2. Click "Create database"
3. Choose "Start in test mode" (for now)
4. Select a location close to your users

## Step 5: Create Initial Metrics Document

The app will automatically create the metrics document, but you can also create it manually:

1. Go to Firestore Database
2. Create a collection called `stats`
3. Create a document with ID `global_metrics`
4. Add these fields:
   - `scenarios_created` (number): 0
   - `apps_visualized` (number): 0
   - `scenarios_shared` (number): 0

## Step 6: Test the Implementation

1. Open `index.html` in a web browser
2. Open browser console (F12)
3. Create a new scenario
4. You should see: "Metric incremented: scenarios_created"
5. Check Firestore to see the counter increment

## Step 7: Security Rules (Optional)

For production, update Firestore security rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /stats/global_metrics {
      allow read: if true;  // Anyone can read metrics
      allow write: if false; // Only server can write (use Cloud Functions)
    }
  }
}
```

## Metrics Being Tracked

- **scenarios_created**: When users create new scenarios
- **apps_visualized**: When users view app details
- **scenarios_shared**: When users export/share scenarios

## Benefits

- **Zero Cost**: Firebase Spark Plan is free
- **Privacy First**: No user data collected, only aggregate counters
- **Real-time**: Metrics update instantly
- **Community Impact**: Shows adoption and usage

## Troubleshooting

- **"Firebase not loaded"**: Check if Firebase SDK is loading correctly
- **"Error incrementing metric"**: Check Firebase configuration and permissions
- **Metrics not updating**: Check browser console for errors

## Next Steps

1. Set up the Firebase project
2. Update the configuration
3. Test the metrics
4. Deploy to GitHub Pages
5. Monitor community growth!

The metrics will help demonstrate Pathlight's impact and build community confidence. 