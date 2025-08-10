// scenarioEditor.js - Enhanced scenario editing functionality
// This module provides advanced scenario editing capabilities

import { ensureScenarioHasSteps } from '../core/validators.js';

// Defer data access until functions are called
function getJourneysData() {
  // Check if we're in a browser environment
  if (typeof window === 'undefined') {
    console.warn('Not in browser environment');
    return null;
  }
  
  // Check if appData exists and has journeys
  if (typeof window.appData === 'undefined' || !window.appData) {
    console.warn('appData not yet available');
    return null;
  }
  
  if (!window.appData.journeys) {
    console.warn('Journeys data not yet available in appData');
    return null;
  }
  
  // Validate that journeys is an array
  if (!Array.isArray(window.appData.journeys)) {
    console.error('Journeys data is not an array:', typeof window.appData.journeys);
    return null;
  }
  
  return window.appData.journeys;
}

// Enhanced scenario editing with validation and auto-save
export function enterScenarioEdit(journeyIdx, scenarioIdx) {
  console.log('enterScenarioEdit called with:', { journeyIdx, scenarioIdx });
  
  const journeys = getJourneysData();
  if (!journeys) {
    console.error('Cannot enter scenario edit mode: journeys data not available');
    console.log('Available data:', {
      hasWindow: typeof window !== 'undefined',
      hasAppData: typeof window.appData !== 'undefined',
      appDataKeys: window.appData ? Object.keys(window.appData) : 'N/A',
      hasJourneys: window.appData?.journeys ? 'Yes' : 'No'
    });
    return;
  }

  console.log('Journeys data found:', {
    journeysLength: journeys.length,
    journeyIdx,
    scenarioIdx
  });

  if (journeyIdx < 0 || journeyIdx >= journeys.length) {
    console.error('Invalid journey index:', journeyIdx, 'journeys length:', journeys.length);
    return;
  }

  const journey = journeys[journeyIdx];
  console.log('Journey found:', {
    journeyId: journey.id,
    journeyTitle: journey.title,
    hasScenarios: !!journey.scenarios,
    scenariosLength: journey.scenarios?.length || 0
  });
  
  if (!journey.scenarios || scenarioIdx < 0 || scenarioIdx >= journey.scenarios.length) {
    console.error('Invalid scenario index:', scenarioIdx, 'scenarios length:', journey.scenarios?.length || 0);
    return;
  }

  const scenario = journey.scenarios[scenarioIdx];
  
  // Validate scenario object
  if (!scenario || typeof scenario !== 'object') {
    console.error('Invalid scenario object:', scenario);
    return;
  }
  
  // Ensure scenario has steps
  ensureScenarioHasSteps(journeyIdx, scenarioIdx);
  
  // Store original state for potential rollback
  if (!window.scenarioEditHistory) {
    window.scenarioEditHistory = new Map();
  }
  
  const editKey = `${journeyIdx}-${scenarioIdx}`;
  window.scenarioEditHistory.set(editKey, JSON.stringify(scenario));
  
  // Set editing state
  window.editingScenario = {
    journeyIdx,
    scenarioIdx,
    originalSteps: [...(scenario.steps || [])],
    steps: [...(scenario.steps || [])]
  };
  
  // Render the enhanced editor
  renderEnhancedScenarioEditor(journeyIdx, scenarioIdx);
  
  // Initialize auto-save
  initializeAutoSave(journeyIdx, scenarioIdx);
  
  // Safe logging with fallback for title
  const scenarioTitle = scenario.title || scenario.id || `Scenario ${scenarioIdx}`;
  console.log(`Entered edit mode for scenario: ${scenarioTitle}`);
  
  // Additional validation and fallback for missing title
  if (!scenario.title && scenario.id) {
    console.warn(`Scenario missing title, using ID as fallback: ${scenario.id}`);
    // Optionally set a default title if missing
    if (typeof window.saveToLocalStorage === 'function') {
      scenario.title = scenario.id.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
      try {
        window.saveToLocalStorage();
        console.log(`Auto-generated title for scenario: ${scenario.title}`);
      } catch (error) {
        console.warn('Could not auto-save generated title:', error);
      }
    }
  }
}

// Exit scenario edit mode
export function exitScenarioEdit() {
  if (window.scenarioAutoSaveInterval) {
    clearInterval(window.scenarioAutoSaveInterval);
    window.scenarioAutoSaveInterval = null;
  }
  
  if (window.editingScenario) {
    console.log('Exited scenario edit mode');
    window.editingScenario = null;
  }
  
  // Trigger re-render
  if (typeof window.renderAll === 'function') {
    window.renderAll();
  }
}

// Export to window for non-module callers
// Note: kept minimal; in full modular build, rely on imports only
if (typeof window !== 'undefined') {
  window.enterScenarioEdit = enterScenarioEdit;
  window.exitScenarioEdit = exitScenarioEdit;
}

// Render the enhanced scenario editor
function renderEnhancedScenarioEditor(journeyIdx, scenarioIdx) {
  if (typeof window.renderAll === 'function') {
    window.renderAll();
  }
}

// Initialize auto-save functionality
function initializeAutoSave(journeyIdx, scenarioIdx) {
  // Auto-save every 30 seconds while editing
  if (window.scenarioAutoSaveInterval) {
    clearInterval(window.scenarioAutoSaveInterval);
  }
  
  window.scenarioAutoSaveInterval = setInterval(() => {
    if (window.editingScenario && 
        window.editingScenario.journeyIdx === journeyIdx && 
        window.editingScenario.scenarioIdx === scenarioIdx) {
      saveScenarioChanges(journeyIdx, scenarioIdx);
    }
  }, 30000);
}

// Save scenario changes
function saveScenarioChanges(journeyIdx, scenarioIdx) {
  const journeys = getJourneysData();
  if (!journeys || !window.editingScenario) return;
  
  try {
    // Update the scenario with edited steps
    journeys[journeyIdx].scenarios[scenarioIdx].steps = [...window.editingScenario.steps];
    
    // Trigger re-render
    if (typeof window.renderAll === 'function') {
      window.renderAll();
    }
    
    console.log('Auto-saved scenario changes');
  } catch (error) {
    console.error('Error auto-saving scenario:', error);
  }
}

