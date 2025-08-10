// validators.js - Core validation and migration helpers

// Defer data access until functions are called
function getJourneysData() {
  if (typeof window.journeys === 'undefined' || !window.journeys) {
    console.warn('Journeys data not yet available for validation');
    return null;
  }
  return window.journeys;
}

export function ensureScenarioHasSteps(journeyIdx, scenarioIdx) {
  const journeys = getJourneysData();
  if (!journeys) {
    console.warn('Cannot ensure scenario has steps: journeys data not available');
    return;
  }
  
  if (!Array.isArray(journeys)) return;
  const journey = journeys[journeyIdx];
  if (!journey || !Array.isArray(journey.scenarios)) return;
  const scenario = journey.scenarios[scenarioIdx];
  if (!scenario) return;
  if (!Array.isArray(scenario.steps)) {
    scenario.steps = [
      { id: 'access-page', params: { page: 'dashboard' } }
    ];
    if (scenario.scenarioText) delete scenario.scenarioText;
    try { if (typeof window.saveToLocalStorage === 'function') window.saveToLocalStorage(); } catch (_) {}
  }
}

export function validateAppData(appData) {
  const journeys = getJourneysData();
  if (!journeys) {
    console.warn('Cannot validate app data: journeys data not available');
    return { ok: false, errors: ['Journeys data not yet available'], fixes: [] };
  }
  
  const errors = [];
  const fixes = [];
  if (!appData || typeof appData !== 'object') {
    errors.push('window.appData missing');
    return { ok: false, errors, fixes };
  }
  const { appDetails, userProfiles, personas } = appData;
  if (!appDetails) errors.push('appDetails missing');
  if (!Array.isArray(appDetails?.pages)) errors.push('appDetails.pages missing');
  if (!Array.isArray(appDetails?.appVariables)) errors.push('appDetails.appVariables missing');
  if (!Array.isArray(userProfiles)) errors.push('userProfiles missing');
  if (!Array.isArray(personas)) errors.push('personas missing');
  if (!Array.isArray(journeys)) errors.push('journeys missing');
  // Soft-fix: ensure each scenario has steps
  if (Array.isArray(journeys)) {
    journeys.forEach((j, ji) => {
      (j.scenarios || []).forEach((_, si) => {
        const before = JSON.stringify(journeys[ji]?.scenarios?.[si]?.steps || null);
        ensureScenarioHasSteps(ji, si);
        const after = JSON.stringify(journeys[ji]?.scenarios?.[si]?.steps || null);
        if (before !== after) fixes.push(`migrated scenario to steps: journey[${ji}] scenario[${si}]`);
      });
    });
  }
  return { ok: errors.length === 0, errors, fixes };
}

