// scenarioEditor.js - Enhanced scenario editing functionality
// This module provides advanced scenario editing capabilities

import { ensureScenarioHasSteps } from '../core/validators.js';

// Defer data access until functions are called
function getJourneysData() {
  if (typeof window.journeys === 'undefined' || !window.journeys) {
    console.warn('Journeys data not yet available');
    return null;
  }
  return window.journeys;
}

// Enhanced scenario editing with validation and auto-save
export function enterScenarioEdit(journeyIdx, scenarioIdx) {
  const journeys = getJourneysData();
  if (!journeys) {
    console.error('Cannot enter scenario edit mode: journeys data not available');
    return;
  }

  if (journeyIdx < 0 || journeyIdx >= journeys.length) {
    console.error('Invalid journey index:', journeyIdx);
    return;
  }

  const journey = journeys[journeyIdx];
  if (!journey.scenarios || scenarioIdx < 0 || scenarioIdx >= journey.scenarios.length) {
    console.error('Invalid scenario index:', scenarioIdx);
    return;
  }

  const scenario = journey.scenarios[scenarioIdx];
  
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
    originalSteps: [...scenario.steps],
    steps: [...scenario.steps]
  };
  
  // Render the enhanced editor
  renderEnhancedScenarioEditor(journeyIdx, scenarioIdx);
  
  // Initialize auto-save
  initializeAutoSave(journeyIdx, scenarioIdx);
  
  console.log(`Entered edit mode for scenario: ${scenario.title}`);
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

