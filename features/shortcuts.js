// features/shortcuts.js
export function setupEnhancedKeyboardShortcuts(ctx) {
  const { getEditingScenario, getJourneys, saveToLocalStorage, renderAll, showAppDataFeedback, toggleDarkMode, showAddScenarioModal, getSelectedJourney } = ctx;
  document.addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === 's') {
      e.preventDefault();
      const editing = getEditingScenario();
      if (editing) {
        const journeys = getJourneys();
        const journey = journeys[editing.journeyIdx];
        journey.scenarios[editing.scenarioIdx].steps = editing.steps;
        saveToLocalStorage();
        showAppDataFeedback('Scenario saved! (Ctrl+S)', false);
      }
    }
    if ((e.metaKey || e.ctrlKey) && e.key === 'd') {
      e.preventDefault();
      toggleDarkMode();
    }
    if ((e.metaKey || e.ctrlKey) && e.key === 'n') {
      e.preventDefault();
      const selectedJourney = getSelectedJourney();
      if (selectedJourney !== null && selectedJourney !== undefined) {
        showAddScenarioModal(selectedJourney);
      }
    }
    if (e.key === 'Escape') {
      const editing = getEditingScenario();
      if (editing) {
        window.editingScenario = null;
        renderAll();
        showAppDataFeedback('Editing cancelled', false);
      }
    }
  });
}

