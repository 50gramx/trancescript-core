// scenarioEditor.js - Edit UI helpers

import { ensureScenarioHasSteps } from '../core/validators.js';

export function enterScenarioEdit(journeyIdx, scenarioIdx) {
  ensureScenarioHasSteps(journeyIdx, scenarioIdx);
  const journey = window.journeys[journeyIdx];
  const steps = (journey.scenarios[scenarioIdx].steps || []).map(s => ({ id: s.id, params: { ...s.params } }));
  window.editingScenario = { journeyIdx, scenarioIdx, steps };
  if (typeof window.renderAll === 'function') window.renderAll();
}

// Export to window for non-module callers
// Note: kept minimal; in full modular build, rely on imports only
if (typeof window !== 'undefined') {
  window.enterScenarioEdit = enterScenarioEdit;
}

