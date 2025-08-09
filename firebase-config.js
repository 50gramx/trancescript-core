// Firebase Configuration for Pathlight Metrics
// This file handles anonymous, aggregate metrics tracking for community impact

// Resolve Firebase configuration from safe sources (no hardcoded secrets)
function resolveFirebaseConfig() {
  // 1) Window-injected config (e.g., from a non-committed local file)
  if (typeof window !== 'undefined' && window.PATHLIGHT_FIREBASE_CONFIG) {
    return window.PATHLIGHT_FIREBASE_CONFIG;
  }
  // 2) LocalStorage for development overrides
  try {
    var stored = localStorage.getItem('PATHLIGHT_FIREBASE_CONFIG_JSON');
    if (stored) {
      return JSON.parse(stored);
    }
  } catch (_) {}
  // 3) No config available
  return null;
}

const firebaseConfig = resolveFirebaseConfig();
  

// Initialize Firebase (only if not already initialized)
if (typeof firebase === 'undefined' || !firebaseConfig) {
  console.log('Firebase not loaded, metrics will be disabled');
} else {
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  // Get Firestore reference
  const db = firebase.firestore();
  
  // Global metrics tracking
  window.pathlightMetrics = {
    // Increment a metric counter
    incrementMetric: async function(metricName) {
      try {
        const statsRef = db.collection('stats').doc('global_metrics');
        
        // Use Firestore's increment operation
        await statsRef.update({
          [metricName]: firebase.firestore.FieldValue.increment(1)
        });
        
        console.log(`Metric incremented: ${metricName}`);
      } catch (error) {
        console.error('Error incrementing metric:', error);
        // Don't throw error - metrics should never break the app
      }
    },
    
    // Track scenario creation
    trackScenarioCreated: function() {
      this.incrementMetric('scenarios_created');
    },
    
    // Track app visualization
    trackAppVisualized: function() {
      this.incrementMetric('apps_visualized');
    },
    
    // Track scenario sharing
    trackScenarioShared: function() {
      this.incrementMetric('scenarios_shared');
    },
    
    // Get current metrics (for display on website)
    getMetrics: async function() {
      try {
        const statsRef = db.collection('stats').doc('global_metrics');
        const doc = await statsRef.get();
        
        if (doc.exists) {
          return doc.data();
        } else {
          // Initialize with default values if document doesn't exist
          const defaultMetrics = {
            scenarios_created: 0,
            apps_visualized: 0,
            scenarios_shared: 0
          };
          
          await statsRef.set(defaultMetrics);
          return defaultMetrics;
        }
      } catch (error) {
        console.error('Error getting metrics:', error);
        return {
          scenarios_created: 0,
          apps_visualized: 0,
          scenarios_shared: 0
        };
      }
    }
  };
  
  console.log('Pathlight metrics initialized');
}

// Fallback if Firebase is not available
if (typeof window.pathlightMetrics === 'undefined') {
  window.pathlightMetrics = {
    incrementMetric: function() { console.log('Metrics disabled - Firebase not available'); },
    trackScenarioCreated: function() { console.log('Scenario created (metrics disabled)'); },
    trackAppVisualized: function() { console.log('App visualized (metrics disabled)'); },
    trackScenarioShared: function() { console.log('Scenario shared (metrics disabled)'); },
    getMetrics: async function() { 
      return {
        scenarios_created: 0,
        apps_visualized: 0,
        scenarios_shared: 0
      };
    }
  };
}
