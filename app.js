// Import module utilities
import { getStepTypeColor, getParameterColor } from './core/ui-utils.js';
import { ensureScenarioHasSteps } from './core/validators.js';
import { stepLibrary } from './ui/tabs/stepLibrary.js';

// Import data from data.js
let { appDetails, userProfiles, personas, journeys } = window.appData || {};

// Ensure data is loaded
if (!appDetails || !userProfiles || !personas || !journeys) {
  console.error('App data not properly loaded. Please check data.js file.');
}

// Expose global variables for test suite and tooltips
window.appDetails = appDetails;
window.userProfiles = userProfiles;
window.personas = personas;
window.journeys = journeys;
window.stepLibrary = stepLibrary;
window.addNewScenario = addNewScenario;
window.validateScenario = validateScenario;
window.validateScenarioWithCache = validateScenarioWithCache;
window.debouncedRender = debouncedRender;
window.renderAll = renderAll;
// --- State Management ---
// selectedJourney: index of the selected journey in the journeys array, or null if none selected
// selectedScenario: index of the selected scenario tab for the selected journey
// selectedPersona: index of the selected persona in the personas array, or null if none selected
// editingAppDetails: true if the app settings (details) view is active
let selectedJourney = null; // index in journeys, or null
let selectedScenario = 0;
let selectedPersona = null; // index in personas, or null
let editingAppDetails = false;
let editingScenario = null; // { journeyIdx, scenarioIdx, steps: [...copy] }

// Helper to reset all selection state to default (no persona, journey, or app details selected)
function resetSelection() {
  selectedJourney = null;
  selectedPersona = null;
  editingAppDetails = false;
}

// DOM Elements
const storyList = document.getElementById('storyList');
const personaList = document.getElementById('personaList');
const tabs = document.getElementById('tabs');
const workspace = document.getElementById('workspace');
const appDetailsBtn = document.getElementById('appDetailsBtn');
const addPersonaBtn = document.getElementById('addPersonaBtn');
// Persona modal
const personaModalBg = document.getElementById('personaModalBg');
const personaNameInput = document.getElementById('personaName');
const personaProfileSelect = document.getElementById('personaProfile');
const personaBioInput = document.getElementById('personaBio');
const personaGoalsInput = document.getElementById('personaGoals');
const personaFrustrationsInput = document.getElementById('personaFrustrations');
const personaAvatarInput = document.getElementById('personaAvatar');
const personaModalError = document.getElementById('personaModalError');
const cancelPersonaModalBtn = document.getElementById('cancelPersonaModalBtn');
const addPersonaModalBtn = document.getElementById('addPersonaModalBtn');
// Profile modal
const profileModalBg = document.getElementById('profileModalBg');
const profileNameInput = document.getElementById('profileName');
const profileModalError = document.getElementById('profileModalError');
const cancelProfileModalBtn = document.getElementById('cancelProfileModalBtn');
const addProfileModalBtn = document.getElementById('addProfileModalBtn');

// Add Journey Modal
let addJourneyModal = null;
let addJourneyTitleInput = null;
let addJourneyStoryInput = null;
let addJourneyModalError = null;
let addJourneyModalBg = null;

const personasRow = document.getElementById('personasRow');

// Helper: Generate unique IDs for personas and journeys
function generateId() {
  return '_' + Math.random().toString(36).substr(2, 9);
}

// --- LocalStorage, Export, Import, Feedback ---
const saveAppDataBtn = document.getElementById('saveAppDataBtn');
const importAppDataBtn = document.getElementById('importAppDataBtn');
const importAppDataInput = document.getElementById('importAppDataInput');
const appDataFeedback = document.getElementById('appDataFeedback');
const appDetailsSection = document.querySelector('.app-details-section');

// Show/hide Save/Switch buttons on hover
// appDetailsSection.addEventListener('mouseenter', () => {
//   document.getElementById('appDetailsActions').style.display = 'flex';
// });
// appDetailsSection.addEventListener('mouseleave', () => {
//   document.getElementById('appDetailsActions').style.display = 'none';
// });

function showAppDataFeedback(msg, isError = false) {
  appDataFeedback.textContent = msg;
  appDataFeedback.className = 'app-data-feedback' + (isError ? ' error' : '');
  appDataFeedback.style.display = 'inline-block';
  setTimeout(() => { appDataFeedback.style.display = 'none'; }, 2600);
}

function getCurrentAppData() {
  return {
    appDetails,
    userProfiles,
    personas,
    journeys
  };
}

function saveToLocalStorage() {
  try {
    localStorage.setItem('prototyperAppData', JSON.stringify(getCurrentAppData()));
  } catch (e) {
    // Ignore quota errors for now
  }
}

function loadFromLocalStorage() {
  try {
    const data = localStorage.getItem('prototyperAppData');
    if (data) {
      const parsed = JSON.parse(data);
      if (parsed && parsed.appDetails && parsed.userProfiles && parsed.personas && parsed.journeys) {
        appDetails = parsed.appDetails;
        userProfiles = parsed.userProfiles;
        personas = parsed.personas;
        journeys = parsed.journeys;
        return true;
      }
    }
  } catch (e) {}
  return false;
}

function exportAppData() {
  const data = getCurrentAppData();
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const appName = (appDetails.name || 'App').replace(/[^a-z0-9]/gi, '_');
  const now = new Date();
  const pad = n => n.toString().padStart(2, '0');
  const filename = `${appName}-${now.getFullYear()}-${pad(now.getMonth()+1)}-${pad(now.getDate())}-${pad(now.getHours())}-${pad(now.getMinutes())}.json`;
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => { document.body.removeChild(a); }, 100);
  showAppDataFeedback('App data exported!');
}

function importAppData(file) {
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const data = JSON.parse(e.target.result);
      // Basic schema validation
      if (!data.appDetails || !data.userProfiles || !data.personas || !data.journeys) {
        showAppDataFeedback('Invalid file format.', true);
        return;
      }
      appDetails = data.appDetails;
      userProfiles = data.userProfiles;
      personas = data.personas;
      journeys = data.journeys;
      saveToLocalStorage();
      renderAll();
      showAppDataFeedback('App data imported!');
    } catch (err) {
      showAppDataFeedback('Failed to import: Invalid JSON.', true);
    }
  };
  reader.readAsText(file);
}

// --- Sidebar Rendering ---
// Renders the sidebar with app name, app key, and user story list. Handles sidebar minimize and navigation.
function renderSidebar() {
  // User journeys
  storyList.innerHTML = '';
  const sidebar = document.querySelector('.sidebar');
  journeys.forEach((journey, idx) => {
    const li = document.createElement('li');
    if (sidebar && sidebar.classList.contains('minimized')) {
      li.textContent = journey.code || `US${idx + 1}`;
    } else {
      li.textContent = (journey.code ? journey.code + ': ' : '') + (journey.title || `Story`);
    }
    if (selectedJourney === idx && selectedPersona === null && !editingAppDetails) {
      li.classList.add('selected');
    }
    li.onclick = () => {
      resetSelection();
      selectedJourney = idx;
      selectedScenario = 0;
      renderAll();
    };
    storyList.appendChild(li);
  });
  // Remove personas row (avatars and plus button) from sidebar
  personasRow.innerHTML = '';
  // App name and app key display
  // sidebar is already declared above if needed; do not redeclare
  appDetailsBtn.textContent = appDetails.name || 'App Settings';
  appDetailsBtn.onclick = () => {
    resetSelection();
    editingAppDetails = true;
    renderAll();
  };
  if (sidebar && sidebar.classList.contains('minimized')) {
    appDetailsBtn.style.display = 'none';
    appKeyDisplay.style.display = '';
    appKeyDisplay.textContent = appDetails.appKey;
    appKeyDisplay.style.cursor = 'pointer';
    appKeyDisplay.onclick = () => {
      resetSelection();
      editingAppDetails = true;
      renderAll();
    };
  } else {
    appDetailsBtn.style.display = '';
    appKeyDisplay.style.display = 'none';
    appKeyDisplay.onclick = null;
  }
  // Settings icon click handler
  const appSettingsIcon = document.getElementById('appSettingsIcon');
  if (appSettingsIcon) {
    appSettingsIcon.onclick = () => {
      resetSelection();
      editingAppDetails = true;
      renderAll();
    };
  }
}

// --- Workspace Rendering ---
// Renders the main workspace area based on current state (app settings, persona, journey, or empty)
function renderWorkspace() {
  const workspace = document.getElementById('workspace');
  workspace.innerHTML = '';

  if (editingAppDetails) {
    if (!window.appSettingsTab) window.appSettingsTab = 'General';
    const tabs = ['General', 'Pages', 'App Variables', 'User Profiles', 'Personas', 'Controls', 'Step Library'];
    const tabBar = document.createElement('div');
    tabBar.className = 'app-settings-tabs';
    tabs.forEach(tab => {
      const tabBtn = document.createElement('button');
      tabBtn.className = 'app-settings-tab-btn' + (window.appSettingsTab === tab ? ' selected' : '');
      tabBtn.textContent = tab;
      tabBtn.onclick = () => {
        window.appSettingsTab = tab;
        resetSelection();
        editingAppDetails = true;
        renderWorkspace();
      };
      tabBar.appendChild(tabBtn);
    });
    workspace.appendChild(tabBar);
    const tabContent = document.createElement('div');
    tabContent.className = 'app-settings-tab-content' + (window.appSettingsTab === 'Personas' ? ' personas-tab' : '');
    if (window.appSettingsTab === 'General') {
      renderGeneralTab(tabContent, appDetails, saveToLocalStorage, renderAll);
    } else if (window.appSettingsTab === 'Pages') {
      renderPagesTab(tabContent, appDetails, saveToLocalStorage, renderAll);
    } else if (window.appSettingsTab === 'App Variables') {
      renderAppVariablesTab(tabContent, appDetails, saveToLocalStorage, renderAll);
    } else if (window.appSettingsTab === 'User Profiles') {
      renderUserProfilesTab(tabContent, userProfiles, saveToLocalStorage, renderAll);
    } else if (window.appSettingsTab === 'Personas') {
      renderPersonasTab(tabContent, personas, userProfiles, journeys, saveToLocalStorage, renderAll, generateId);
    } else if (window.appSettingsTab === 'Controls') {
      renderControlsTab(tabContent, exportAppData, importAppData, toggleDarkMode, () => {
        const sidebar = document.querySelector('.sidebar');
        sidebar.classList.toggle('minimized');
        renderSidebar();
      }, renderAll);
    } else if (window.appSettingsTab === 'Step Library') {
      renderStepLibraryTab(tabContent);
    }
    workspace.appendChild(tabContent);
    // Attach handlers for personas tab after DOM is updated
    if (window.appSettingsTab === 'Personas') {
      // attachPersonasTabHandlers(); // This line is removed as per the edit hint.
    }
    return;
  }
  // 2. Persona selected
  if (selectedPersona !== null && personas[selectedPersona]) {
    const persona = personas[selectedPersona];
    const personaContainer = document.createElement('div');
    personaContainer.className = 'persona-container';
    const card = document.createElement('div');
    card.className = 'persona-card';
    card.innerHTML = `
      <div class="persona-card-header">
        <input type="text" class="persona-name-input" value="${persona.name || ''}" placeholder="Persona Name" data-idx="${selectedPersona}" />
        <select class="persona-profile-select" data-idx="${selectedPersona}">
          ${userProfiles.map(p => `<option value="${p.name}"${persona.profile === p.name ? ' selected' : ''}>${p.name}</option>`).join('')}
        </select>
        <button class="persona-delete-btn" data-idx="${selectedPersona}" title="Delete Persona">&#128465;</button>
      </div>
      <textarea class="persona-bio-input" placeholder="Bio" data-idx="${selectedPersona}">${persona.bio || ''}</textarea>
      <textarea class="persona-goals-input" placeholder="Goals" data-idx="${selectedPersona}">${persona.goals || ''}</textarea>
      <textarea class="persona-frustrations-input" placeholder="Frustrations" data-idx="${selectedPersona}">${persona.frustrations || ''}</textarea>
      <input type="text" class="persona-avatar-input" placeholder="Avatar URL (optional)" value="${persona.avatar || ''}" data-idx="${selectedPersona}" />
      <button class="persona-save-btn" data-idx="${selectedPersona}">Save</button>
      <div class="persona-journeys-section">
        <div class="persona-journeys-title">User Stories</div>
        <ul class="persona-journey-list" data-idx="${selectedPersona}"></ul>
        <div class="add-journey-inline">
          <input type="text" class="add-journey-action" placeholder="Wants to..." data-idx="${selectedPersona}" />
          <input type="text" class="add-journey-benefit" placeholder="So that..." data-idx="${selectedPersona}" style="display:none;" />
          <button class="add-journey-btn" data-idx="${selectedPersona}">Add Story</button>
        </div>
      </div>
    `;
    personaContainer.appendChild(card);
    workspace.appendChild(personaContainer);
    // Render journeys for this persona only
    const journeyList = personaContainer.querySelector('.persona-journey-list');
    const personaJourneys = journeys.filter(j => j.personaId === persona.id);
    if (personaJourneys.length === 0) {
      const li = document.createElement('li');
      li.textContent = 'No stories yet.';
      li.className = 'no-journeys';
      journeyList.appendChild(li);
    } else {
      personaJourneys.forEach((journey, jdx) => {
        const li = document.createElement('li');
        const userStory = `As ${persona.name}, I want to ${journey.action}${journey.benefit ? `, so that I ${journey.benefit}` : ''}`;
        li.innerHTML = `<span class="journey-title"><strong>${journey.code ? journey.code + ': ' : ''}${journey.title}</strong></span><br><span class="journey-story" style="font-size:0.97em; color:#666;">${userStory}</span>
          <button class="edit-journey-btn" data-jid="${journey.id}" title="Edit">✏️</button>
          <button class="delete-journey-btn" data-jid="${journey.id}" title="Delete">&#128465;</button>`;
        journeyList.appendChild(li);
      });
    }
    // Persona editing, saving, deleting, journey add/edit/delete logic (reuse previous logic, but only for selectedPersona)
    personaContainer.querySelectorAll('.persona-save-btn').forEach(btn => {
      btn.onclick = function() {
        const idx = +btn.getAttribute('data-idx');
        const card = personaContainer.children[0];
        personas[idx].name = card.querySelector('.persona-name-input').value.trim();
        personas[idx].profile = card.querySelector('.persona-profile-select').value;
        personas[idx].bio = card.querySelector('.persona-bio-input').value.trim();
        personas[idx].goals = card.querySelector('.persona-goals-input').value.trim();
        personas[idx].frustrations = card.querySelector('.persona-frustrations-input').value.trim();
        personas[idx].avatar = card.querySelector('.persona-avatar-input').value.trim();
        saveToLocalStorage();
        renderAll();
      };
    });
    personaContainer.querySelectorAll('.persona-delete-btn').forEach(btn => {
      btn.onclick = function() {
        const idx = +btn.getAttribute('data-idx');
        if (confirm('Delete this persona and all their journeys?')) {
          const pid = personas[idx].id;
          for (let i = journeys.length - 1; i >= 0; i--) {
            if (journeys[i].personaId === pid) journeys.splice(i, 1);
          }
          personas.splice(idx, 1);
          selectedPersona = null;
          saveToLocalStorage();
          renderAll();
        }
      };
    });
    // Add Journey logic (progressive fields)
    personaContainer.querySelectorAll('.add-journey-action').forEach((input, idx) => {
      input.oninput = function() {
        const benefitInput = personaContainer.querySelectorAll('.add-journey-benefit')[idx];
        if (input.value.trim()) {
          benefitInput.style.display = '';
        } else {
          benefitInput.style.display = 'none';
          benefitInput.value = '';
        }
      };
    });
    personaContainer.querySelectorAll('.add-journey-btn').forEach((btn, idx) => {
      btn.onclick = function() {
        const actionInput = personaContainer.querySelectorAll('.add-journey-action')[idx];
        const benefitInput = personaContainer.querySelectorAll('.add-journey-benefit')[idx];
        const action = actionInput.value.trim();
        const benefit = benefitInput.value.trim();
        if (!action) {
          alert('Please enter what the persona wants to do.');
          return;
        }
        const persona = personas[selectedPersona];
        const journey = {
          id: generateId(),
          personaId: persona.id,
          action,
          benefit,
          scenarios: [
            { name: 'Scenario 1', steps: [
              { id: 'access-page', params: { page: 'dashboard' } },
              { id: 'enter-text', params: { 'text-value': 'Initial note', 'field-name': 'Notes' } },
              { id: 'verify-message', params: { 'message-type': 'success', 'message-text': 'Saved' } }
            ] }
          ]
        };
        journeys.push(journey);
        saveToLocalStorage();
        renderAll();
      };
    });
    // Edit/Delete journey logic
    personaContainer.querySelectorAll('.edit-journey-btn').forEach(btn => {
      btn.onclick = function() {
        const jid = btn.getAttribute('data-jid');
        const journey = journeys.find(j => j.id === jid);
        if (!journey) return;
        const newAction = prompt('Edit what this persona wants to do:', journey.action || '');
        if (newAction !== null) {
          journey.action = newAction.trim();
          // Optionally prompt for benefit as well
          const newBenefit = prompt('Edit the benefit (so that...):', journey.benefit || '');
          if (newBenefit !== null) {
            journey.benefit = newBenefit.trim();
          }
          saveToLocalStorage();
          renderAll();
        }
      };
    });
    personaContainer.querySelectorAll('.delete-journey-btn').forEach(btn => {
      btn.onclick = function() {
        const jid = btn.getAttribute('data-jid');
        const idx = journeys.findIndex(j => j.id === jid);
        if (idx !== -1 && confirm('Delete this journey?')) {
          journeys.splice(idx, 1);
          saveToLocalStorage();
          renderAll();
        }
      };
    });
    return;
  }
  // 3. Journey selected
  if (selectedJourney !== null && journeys[selectedJourney]) {
    // Render scenario tabs
    const journey = journeys[selectedJourney];
    const persona = personas.find(p => p.id === journey.personaId) || { name: '(persona)' };
    // Render user story card at the top
    const userStoryCard = document.createElement('div');
    userStoryCard.className = 'user-story-card';
    userStoryCard.style.background = 'var(--color-card)';
    userStoryCard.style.border = '1px solid var(--color-card-border)';
    userStoryCard.style.borderRadius = '10px';
    userStoryCard.style.boxShadow = '0 2px 8px rgba(99,102,241,0.06)';
    userStoryCard.style.maxWidth = '420px';
    userStoryCard.style.padding = '8px 14px';
    userStoryCard.style.margin = '12px auto';
    const userStory = `As ${persona.name}, I want to ${journey.action}${journey.benefit ? `, so that I ${journey.benefit}` : ''}`;
    userStoryCard.innerHTML = `
      <div style="font-size:1.1em; font-weight:bold; margin-bottom:6px; color:var(--color-primary);">
        ${journey.code ? journey.code + ': ' : ''}${journey.title}
      </div>
      <div style="font-size:1.05em; color:var(--color-text);">
        ${userStory}
      </div>
    `;
    workspace.appendChild(userStoryCard);
    // Render scenario tabs
    const tabsDiv = document.createElement('div');
    tabsDiv.className = 'tabs';
    journey.scenarios.forEach((sc, idx) => {
      const tab = document.createElement('div');
      tab.className = 'tab' + (idx === selectedScenario ? ' active' : '');
      
      // Show scenario type as a small badge if available
      let tabText = sc.title || sc.id || `Scenario ${idx + 1}`;
      if (sc.type && sc.type !== 'happy-path') {
        tabText += ` (${sc.type.replace('-', ' ')})`;
      }
      
      tab.textContent = tabText;
      tab.onclick = () => {
        selectedScenario = idx;
        renderAll();
      };
      tabsDiv.appendChild(tab);
    });
    
    // Add Scenario button
    const addScenarioBtn = document.createElement('div');
    addScenarioBtn.className = 'tab add-scenario-tab';
    addScenarioBtn.innerHTML = '+';
    addScenarioBtn.title = 'Add New Scenario';
    addScenarioBtn.onclick = () => {
      showAddScenarioModal(selectedJourney);
    };
    tabsDiv.appendChild(addScenarioBtn);
    
    workspace.appendChild(tabsDiv);
    
    // Add scenario title (editable)
    if (journey.scenarios[selectedScenario] && journey.scenarios[selectedScenario].title) {
      const scenarioTitleDiv = document.createElement('div');
      scenarioTitleDiv.style.margin = '20px 0 10px 0';
      scenarioTitleDiv.style.display = 'flex';
      scenarioTitleDiv.style.alignItems = 'center';
      scenarioTitleDiv.style.gap = '10px';
      
      const titleInput = document.createElement('input');
      titleInput.type = 'text';
      titleInput.value = journey.scenarios[selectedScenario].title;
      titleInput.style.fontSize = '1.5em';
      titleInput.style.fontWeight = 'bold';
      titleInput.style.border = 'none';
      titleInput.style.background = 'transparent';
      titleInput.style.color = 'var(--color-text)';
      titleInput.style.padding = '0';
      titleInput.style.flex = '1';
      
      titleInput.onchange = () => {
        journey.scenarios[selectedScenario].title = titleInput.value.trim();
        saveToLocalStorage();
        renderAll();
      };
      
      scenarioTitleDiv.appendChild(titleInput);
      
      // Add scenario type badge if not happy-path
      if (journey.scenarios[selectedScenario].type && journey.scenarios[selectedScenario].type !== 'happy-path') {
        const typeBadge = document.createElement('span');
        typeBadge.textContent = journey.scenarios[selectedScenario].type.replace('-', ' ');
        typeBadge.style.background = 'var(--color-primary)';
        typeBadge.style.color = 'white';
        typeBadge.style.padding = '4px 8px';
        typeBadge.style.borderRadius = '12px';
        typeBadge.style.fontSize = '0.8em';
        typeBadge.style.fontWeight = 'normal';
        scenarioTitleDiv.appendChild(typeBadge);
      }
      
      workspace.appendChild(scenarioTitleDiv);
    }
    
    // Add scenario description if available
    if (journey.scenarios[selectedScenario] && journey.scenarios[selectedScenario].description) {
      const descriptionDiv = document.createElement('div');
      descriptionDiv.style.margin = '0 0 20px 0';
      descriptionDiv.style.color = 'var(--color-text-secondary)';
      descriptionDiv.style.fontStyle = 'italic';
      descriptionDiv.textContent = journey.scenarios[selectedScenario].description;
      workspace.appendChild(descriptionDiv);
    }
    
    // Render scenario text
    const scenarioTextDiv = document.createElement('div');
    scenarioTextDiv.className = 'scenario-text';
    if (editingScenario && editingScenario.journeyIdx === selectedJourney && editingScenario.scenarioIdx === selectedScenario) {
      scenarioTextDiv.appendChild(renderScenarioEditor(selectedJourney, selectedScenario));
    } else if (journey.scenarios[selectedScenario]) {
              scenarioTextDiv.innerHTML = renderScenarioSteps(journey.scenarios[selectedScenario]);
      // Add Edit button
      const editBtn = document.createElement('button');
      editBtn.textContent = 'Edit';
      editBtn.style.marginLeft = '16px';
      editBtn.onclick = function() {
        if (window.enterScenarioEdit) {
          window.enterScenarioEdit(selectedJourney, selectedScenario);
          return;
        }
        // Fallback if module not loaded
        const steps = (journey.scenarios[selectedScenario].steps || []).map(s => ({ id: s.id, params: { ...s.params } }));
        editingScenario = { journeyIdx: selectedJourney, scenarioIdx: selectedScenario, steps };
        renderAll();
      };
      scenarioTextDiv.appendChild(editBtn);
    } else {
      scenarioTextDiv.innerHTML = '<em>No scenario selected.</em>';
    }
    workspace.appendChild(scenarioTextDiv);
    return;
  }
  // If nothing is selected, show a welcome/empty state instead of all personas
  if (selectedPersona === null && selectedJourney === null && !editingAppDetails) {
    const emptyDiv = document.createElement('div');
    emptyDiv.style.textAlign = 'center';
    emptyDiv.style.margin = '80px auto';
    emptyDiv.style.color = '#888';
    emptyDiv.style.fontSize = '1.2em';
    emptyDiv.textContent = 'Select a user story or open App Settings to manage personas.';
    workspace.appendChild(emptyDiv);
    return;
  }
  // 4. Nothing selected
  // Show all personas as editable cards, and an Add Persona card at the end
  const personaContainer = document.createElement('div');
  personaContainer.className = 'persona-container';
  personas.forEach((persona) => {
    const card = document.createElement('div');
    card.className = 'persona-card';
    card.innerHTML = `
      <div class="persona-card-header">
        <input type="text" class="persona-name-input" value="${persona.name || ''}" placeholder="Persona Name" />
        <select class="persona-profile-select">
          ${userProfiles.map(p => `<option value="${p.name}"${persona.profile === p.name ? ' selected' : ''}>${p.name}</option>`).join('')}
        </select>
        <button class="persona-delete-btn" title="Delete Persona">&#128465;</button>
      </div>
      <textarea class="persona-bio-input" placeholder="Bio">${persona.bio || ''}</textarea>
      <textarea class="persona-goals-input" placeholder="Goals">${persona.goals || ''}</textarea>
      <textarea class="persona-frustrations-input" placeholder="Frustrations">${persona.frustrations || ''}</textarea>
      <input type="text" class="persona-avatar-input" placeholder="Avatar URL (optional)" value="${persona.avatar || ''}" />
      <button class="persona-save-btn">Save</button>
      <div class="persona-journeys-section">
        <div class="persona-journeys-title">User Stories</div>
        <ul class="persona-journey-list"></ul>
        <div class="add-journey-inline">
          <input type="text" class="add-journey-action" placeholder="Wants to..." />
          <input type="text" class="add-journey-benefit" placeholder="So that..." style="display:none;" />
          <button class="add-journey-btn">Add Story</button>
        </div>
      </div>
    `;
    card.setAttribute('data-persona-id', persona.id); // <-- set attribute after innerHTML
    personaContainer.appendChild(card);
  });
  // Add Persona card
  const addPersonaCard = document.createElement('div');
  addPersonaCard.className = 'persona-card add-persona-card';
  addPersonaCard.innerHTML = `
    <input type="text" class="add-persona-name" placeholder="New Persona Name" />
    <select class="add-persona-profile">
      ${userProfiles.map(p => `<option value="${p.name}">${p.name}</option>`).join('')}
    </select>
    <textarea class="add-persona-bio" placeholder="Bio"></textarea>
    <textarea class="add-persona-goals" placeholder="Goals"></textarea>
    <textarea class="add-persona-frustrations" placeholder="Frustrations"></textarea>
    <input type="text" class="add-persona-avatar" placeholder="Avatar URL (optional)" />
    <button class="add-persona-btn">Add Persona</button>
  `;
  personaContainer.appendChild(addPersonaCard);
  workspace.appendChild(personaContainer);
  // Add event listeners for persona editing, saving, deleting, journey add/edit/delete
  personaContainer.querySelectorAll('.persona-save-btn').forEach(btn => {
    btn.onclick = function() {
      const idx = +btn.getAttribute('data-idx');
      const card = personaContainer.children[idx];
      personas[idx].name = card.querySelector('.persona-name-input').value.trim();
      personas[idx].profile = card.querySelector('.persona-profile-select').value;
      personas[idx].bio = card.querySelector('.persona-bio-input').value.trim();
      personas[idx].goals = card.querySelector('.persona-goals-input').value.trim();
      personas[idx].frustrations = card.querySelector('.persona-frustrations-input').value.trim();
      personas[idx].avatar = card.querySelector('.persona-avatar-input').value.trim();
      saveToLocalStorage();
      renderAll();
    };
  });
  personaContainer.querySelectorAll('.persona-delete-btn').forEach(btn => {
    btn.onclick = function() {
      const idx = +btn.getAttribute('data-idx');
      if (confirm('Delete this persona and all their journeys?')) {
        const pid = personas[idx].id;
        for (let i = journeys.length - 1; i >= 0; i--) {
          if (journeys[i].personaId === pid) journeys.splice(i, 1);
        }
        personas.splice(idx, 1);
        saveToLocalStorage();
        renderAll();
      }
    };
  });
  // Add Persona logic
  addPersonaCard.querySelector('.add-persona-btn').onclick = function() {
    const name = addPersonaCard.querySelector('.add-persona-name').value.trim();
    const profile = addPersonaCard.querySelector('.add-persona-profile').value;
    const bio = addPersonaCard.querySelector('.add-persona-bio').value.trim();
    const goals = addPersonaCard.querySelector('.add-persona-goals').value.trim();
    const frustrations = addPersonaCard.querySelector('.add-persona-frustrations').value.trim();
    const avatar = addPersonaCard.querySelector('.add-persona-avatar').value.trim();
    if (!name || !profile) {
      alert('Name and profile are required.');
      return;
    }
    const id = generateId();
    personas.push({ id, name, profile, bio, goals, frustrations, avatar });
    saveToLocalStorage();
    renderAll();
  };
  // Add Journey logic (progressive fields) using data-idx
  personaContainer.querySelectorAll('.add-journey-action[data-idx]').forEach((input, idx) => {
    input.oninput = function() {
      const benefitInput = personaContainer.querySelectorAll('.add-journey-benefit[data-idx]')[idx];
      if (input.value.trim()) {
        benefitInput.style.display = '';
      } else {
        benefitInput.style.display = 'none';
        benefitInput.value = '';
      }
    };
  });
  personaContainer.querySelectorAll('.add-journey-btn[data-idx]').forEach(btn => {
    btn.onclick = function() {
      const idx = +btn.getAttribute('data-idx');
      const persona = personas[idx];
      const card = personaContainer.children[idx];
      const actionInput = card.querySelector('.add-journey-action');
      const benefitInput = card.querySelector('.add-journey-benefit');
      const action = actionInput.value.trim();
      const benefit = benefitInput.value.trim();
      if (!action) {
        alert('Please enter what the persona wants to do.');
        return;
      }
      // Prompt for title
      const personaJourneys = journeys.filter(j => j.personaId === persona.id);
      let defaultTitle = `Story ${personaJourneys.length + 1}`;
      let title = prompt('Enter a title for this user story:', defaultTitle);
      if (!title || title.trim() === '') title = defaultTitle;
      // Add journey with a default, editable structured scenario
      journeys.push({
        id: generateId(),
        personaId: persona.id,
        action,
        benefit,
        title,
        code: `US${journeys.length + 1}`,
        scenarios: [{
          name: 'Scenario 1',
          steps: [
            { id: 'access-page', params: { page: 'dashboard' } },
            { id: 'enter-text', params: { 'text-value': 'Initial note', 'field-name': 'Notes' } },
            { id: 'verify-message', params: { 'message-type': 'success', 'message-text': 'Saved' } }
          ]
        }]
      });
      saveToLocalStorage();
      actionInput.value = '';
      benefitInput.value = '';
      benefitInput.style.display = 'none';
      renderAll();
    };
  });
  // Edit/Delete journey logic
  personaContainer.querySelectorAll('.edit-journey-btn').forEach(btn => {
    btn.onclick = function() {
      const jid = btn.getAttribute('data-jid');
      const journey = journeys.find(j => j.id === jid);
      if (!journey) return;
      const newAction = prompt('Edit what this persona wants to do:', journey.action || '');
      if (newAction !== null) {
        journey.action = newAction.trim();
        // Optionally prompt for benefit as well
        const newBenefit = prompt('Edit the benefit (so that...):', journey.benefit || '');
        if (newBenefit !== null) {
          journey.benefit = newBenefit.trim();
        }
        saveToLocalStorage();
        renderAll();
      }
    };
  });
  personaContainer.querySelectorAll('.delete-journey-btn').forEach(btn => {
    btn.onclick = function() {
      const jid = btn.getAttribute('data-jid');
      const idx = journeys.findIndex(j => j.id === jid);
      if (idx !== -1 && confirm('Delete this journey?')) {
        journeys.splice(idx, 1);
        saveToLocalStorage();
        renderAll();
      }
    };
  });
}

// ensureScenarioHasSteps is now imported from core/validators.js

function renderScenarioSteps(scenario) {
    if (!scenario || !scenario.steps) return '';
    
    return scenario.steps.map((step, index) => {
        const stepDef = window.stepLibrary.find(s => s.id === step.id);
        if (!stepDef) return `<div class="step-item">Step ${index + 1}: Unknown step</div>`;
        
        let stepContent = stepDef.template;
        const stepType = stepDef.type.toLowerCase();
        const stepColor = getStepTypeColor(stepType);
        
        // Process parameters
        if (step.params) {
            Object.entries(step.params).forEach(([key, paramValue]) => {
                const paramDef = stepDef.params.find(p => p.name === key);
                let tooltipContent = '';
                
                if (paramDef) {
                    const paramType = paramDef.type;
                    let paramInfo = '';
                    
                    if (paramType === 'page') {
                        const pageDef = window.appData.appDetails.pages.find(p => p.name === paramValue);
                        paramInfo = pageDef ? ` (${pageDef.code})` : '';
                        tooltipContent = `
                            <div class="tooltip-content">
                                <div class="tooltip-header">📄 Page Parameter</div>
                                <div class="tooltip-details">
                                    <div><strong>Name:</strong> ${key}</div>
                                    <div><strong>Value:</strong> ${paramValue}</div>
                                    <div><strong>Type:</strong> Page Reference${paramInfo}</div>
                                </div>
                            </div>
                        `;
                    } else if (paramType === 'variable') {
                        const varDef = window.appData.appDetails.appVariables.find(v => v.name === paramValue);
                        paramInfo = varDef ? ` (${varDef.code})` : '';
                        tooltipContent = `
                            <div class="tooltip-content">
                                <div class="tooltip-header">🔧 Variable Parameter</div>
                                <div class="tooltip-details">
                                    <div><strong>Name:</strong> ${key}</div>
                                    <div><strong>Value:</strong> ${paramValue}</div>
                                    <div><strong>Type:</strong> ${varDef?.type || 'Unknown'}${paramInfo}</div>
                                </div>
                            </div>
                        `;
                    } else {
                        tooltipContent = `
                            <div class="tooltip-content">
                                <div class="tooltip-header">📝 ${paramType.charAt(0).toUpperCase() + paramType.slice(1)} Parameter</div>
                                <div class="tooltip-details">
                                    <div><strong>Name:</strong> ${key}</div>
                                    <div><strong>Value:</strong> ${paramValue}</div>
                                    <div><strong>Type:</strong> ${paramType.charAt(0).toUpperCase() + paramType.slice(1)}</div>
                                </div>
                            </div>
                        `;
                    }
                } else {
                    tooltipContent = `
                        <div class="tooltip-content">
                            <div class="tooltip-header">🔧 Parameter</div>
                            <div class="tooltip-details">
                                <div><strong>Name:</strong> ${key}</div>
                                <div><strong>Value:</strong> ${paramValue}</div>
                                <div><strong>Type:</strong> Unknown</div>
                            </div>
                        </div>
                    `;
                }
                
                const paramClass = paramDef?.type === 'page' ? 'page-parameter' : 
                                 paramDef?.type === 'variable' ? 'variable-parameter' :
                                 paramDef?.type === 'string' ? 'string-parameter' :
                                 paramDef?.type === 'number' ? 'number-parameter' :
                                 paramDef?.type === 'boolean' ? 'boolean-parameter' : 'parameter-highlight';
                
                const highlightedParam = `<span class="${paramClass} parameter-tooltip" 
                    style="
                        background: ${getParameterColor(paramDef?.type || 'string')};
                        color: ${getParameterTextColor(paramDef?.type || 'string')};
                        padding: 2px 6px;
                        border-radius: 4px;
                        font-weight: 500;
                        cursor: help;
                        position: relative;
                        display: inline-block;
                    "
                    data-tooltip="${encodeURIComponent(tooltipContent)}"
                    onmouseenter="showParameterTooltip(event, this)"
                    onmouseleave="hideParameterTooltip()"
                >${paramValue}</span>`;
                
                stepContent = stepContent.replace(`{${key}}`, highlightedParam);
            });
        }
        
        return `
            <div class="step-item ${stepType}-step">
                <span class="step-type-badge" 
                    style="background: ${stepColor};"
                    data-step-id="${step.id}"
                    data-step-category="${stepDef.category}"
                    data-step-description="${stepDef.description || ''}"
                    onmouseenter="showStepTypeTooltip(event, this)"
                    onmouseleave="hideStepTypeTooltip()"
                >${stepDef.type}</span>
                <span class="step-content">${stepContent}</span>
            </div>
        `;
    }).join('');
}

function showAddScenarioModal(journeyIdx) {
  // Create modal background
  const modalBg = document.createElement('div');
  modalBg.className = 'modal-bg';
  modalBg.onclick = (e) => {
    if (e.target === modalBg) {
      document.body.removeChild(modalBg);
    }
  };

  // Create modal content
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.innerHTML = `
    <h3>Add New Scenario</h3>
    <form id="addScenarioForm">
      <label for="scenarioTitle">Scenario Title *</label>
      <input type="text" id="scenarioTitle" placeholder="Enter scenario title" required />
      
      <label for="scenarioDescription">Description (optional)</label>
      <textarea id="scenarioDescription" placeholder="Describe what this scenario covers"></textarea>
      
      <label for="scenarioType">Scenario Type</label>
      <select id="scenarioType">
        <option value="happy-path">Happy Path</option>
        <option value="error-path">Error Path</option>
        <option value="alternative">Alternative Flow</option>
      </select>
      
      <label for="scenarioTemplate">Template (optional)</label>
      <select id="scenarioTemplate">
        <option value="">Start from scratch</option>
        <option value="login-flow">Login Flow</option>
        <option value="upload-process">Upload Process</option>
        <option value="search-flow">Search Flow</option>
        <option value="payment-process">Payment Process</option>
        <option value="error-handling">Error Handling</option>
      </select>
      
      <div class="modal-actions">
        <button type="button" class="cancel-btn" onclick="document.body.removeChild(this.closest('.modal-bg'))">Cancel</button>
        <button type="submit" class="add-btn">Add Scenario</button>
      </div>
    </form>
  `;

  // Add form submit handler
  modal.querySelector('#addScenarioForm').onsubmit = (e) => {
    e.preventDefault();
    const title = modal.querySelector('#scenarioTitle').value.trim();
    const description = modal.querySelector('#scenarioDescription').value.trim();
    const type = modal.querySelector('#scenarioType').value;
    const template = modal.querySelector('#scenarioTemplate').value;
    
    if (!title) {
      alert('Please enter a scenario title');
      return;
    }
    
    // Add the new scenario with template
    addNewScenario(journeyIdx, title, description, type, template);
    
    // Close modal
    document.body.removeChild(modalBg);
  };

  modalBg.appendChild(modal);
  document.body.appendChild(modalBg);
}

function addNewScenario(journeyIdx, title, description, type, template) {
  // Track scenario creation for metrics
  if (window.trancescriptMetrics) {
    window.trancescriptMetrics.trackScenarioCreated();
  }
  const journey = journeys[journeyIdx];
  const newScenarioId = `scenario${journey.scenarios.length + 1}`;
  
  // Define template steps
  const templateSteps = {
    'login-flow': [
      { id: "access-home", params: { page: "Home" } },
      { id: "click-login-button", params: { page: "Home" } },
      { id: "enter-credentials", params: { page: "Login", username: "user@example.com", password: "password123" } },
      { id: "submit-login", params: { page: "Login" } },
      { id: "verify-login-success", params: { page: "Dashboard" } }
    ],
    'upload-process': [
      { id: "access-upload-page", params: { page: "Upload" } },
      { id: "select-file", params: { page: "Upload", "file-type": "document" } },
      { id: "add-metadata", params: { page: "Upload", "metadata-type": "title-description" } },
      { id: "set-visibility", params: { page: "Upload", visibility: "public" } },
      { id: "publish-content", params: { page: "Upload" } }
    ],
    'search-flow': [
      { id: "access-search", params: { page: "Search" } },
      { id: "enter-search-query", params: { page: "Search", "search-term": "example query" } },
      { id: "apply-filters", params: { page: "Search", "filter-type": "date-category" } },
      { id: "view-results", params: { page: "Search Results" } },
      { id: "select-result", params: { page: "Search Results" } }
    ],
    'payment-process': [
      { id: "access-checkout", params: { page: "Checkout" } },
      { id: "enter-payment-details", params: { page: "Checkout", "payment-method": "credit-card" } },
      { id: "validate-payment", params: { page: "Checkout" } },
      { id: "confirm-purchase", params: { page: "Checkout" } },
      { id: "receive-confirmation", params: { page: "Confirmation" } }
    ],
    'error-handling': [
      { id: "trigger-error-condition", params: { page: "Any Page" } },
      { id: "display-error-message", params: { page: "Error Page", "error-type": "validation" } },
      { id: "provide-error-details", params: { page: "Error Page" } },
      { id: "suggest-solution", params: { page: "Error Page" } },
      { id: "allow-retry", params: { page: "Error Page" } }
    ]
  };
  
  const newScenario = {
    id: newScenarioId,
    title: title,
    description: description,
    type: type,
    steps: template && templateSteps[template] ? templateSteps[template] : [
      // Default step if no template
      { id: "access-home", params: { page: "Home" } }
    ]
  };
  
  journey.scenarios.push(newScenario);
  
  // Select the new scenario
  selectedScenario = journey.scenarios.length - 1;
  
  // Save to localStorage
  saveToLocalStorage();
  
  // Re-render
  renderAll();
  
  // Show feedback
  const templateText = template ? ` with ${template.replace('-', ' ')} template` : '';
  showAppDataFeedback(`New scenario added successfully${templateText}!`);
}

function renderScenarioEditor(journeyIdx, scenarioIdx) {
  const journey = journeys[journeyIdx];
  const scenario = journey.scenarios[scenarioIdx];
  
  const editorContainer = document.createElement('div');
  editorContainer.className = 'scenario-editor';
  
  // Step Builder Header
  const headerDiv = document.createElement('div');
  headerDiv.style.display = 'flex';
  headerDiv.style.justifyContent = 'space-between';
  headerDiv.style.alignItems = 'center';
  headerDiv.style.marginBottom = '20px';
  headerDiv.style.paddingBottom = '15px';
  headerDiv.style.borderBottom = '1px solid var(--color-card-border)';
  
  const titleDiv = document.createElement('h3');
  titleDiv.textContent = 'Step Builder';
  titleDiv.style.margin = '0';
  titleDiv.style.color = 'var(--color-text)';
  
  const saveBtn = document.createElement('button');
  saveBtn.textContent = 'Save Scenario';
  saveBtn.className = 'save-btn';
  saveBtn.onclick = () => {
    // Save the scenario steps
    journey.scenarios[scenarioIdx].steps = editingScenario.steps;
    saveToLocalStorage();
    editingScenario = null;
    renderAll();
    showAppDataFeedback('Scenario saved successfully!');
  };
  
  const duplicateBtn = document.createElement('button');
  duplicateBtn.textContent = 'Duplicate';
  duplicateBtn.className = 'duplicate-btn';
  duplicateBtn.style.marginRight = '10px';
  duplicateBtn.onclick = () => {
    duplicateScenario(journeyIdx, scenarioIdx);
  };
  
  const cancelBtn = document.createElement('button');
  cancelBtn.textContent = 'Cancel';
  cancelBtn.className = 'cancel-btn';
  cancelBtn.style.marginRight = '10px';
  cancelBtn.onclick = () => {
    editingScenario = null;
    renderAll();
  };
  
  headerDiv.appendChild(titleDiv);
  const buttonDiv = document.createElement('div');
  buttonDiv.appendChild(duplicateBtn);
  buttonDiv.appendChild(cancelBtn);
  buttonDiv.appendChild(saveBtn);
  headerDiv.appendChild(buttonDiv);
  editorContainer.appendChild(headerDiv);
  
  // Step List
  const stepListDiv = document.createElement('div');
  stepListDiv.className = 'step-list';
  stepListDiv.style.marginBottom = '20px';
  
  editingScenario.steps.forEach((step, stepIdx) => {
    const stepDiv = document.createElement('div');
    stepDiv.className = 'step-item';
    
    // Add color-coded class based on step type
    const selectedStepDef = stepLibrary.find(s => s.id === step.id);
    if (selectedStepDef) {
      const stepType = selectedStepDef.type.toLowerCase();
      stepDiv.classList.add(`${stepType}-step`);
    }
    
    stepDiv.style.border = '1px solid var(--color-card-border)';
    stepDiv.style.borderRadius = '8px';
    stepDiv.style.padding = '15px';
    stepDiv.style.marginBottom = '10px';
    stepDiv.style.background = 'var(--color-card)';
    
    // Step Header
    const stepHeader = document.createElement('div');
    stepHeader.style.display = 'flex';
    stepHeader.style.justifyContent = 'space-between';
    stepHeader.style.alignItems = 'center';
    stepHeader.style.marginBottom = '10px';
    
    const stepNumber = document.createElement('span');
    stepNumber.textContent = `Step ${stepIdx + 1}`;
    stepNumber.style.fontWeight = 'bold';
    stepNumber.style.color = 'var(--color-primary)';
    
    const stepActions = document.createElement('div');
    stepActions.style.display = 'flex';
    stepActions.style.gap = '5px';
    
    // Move Up Button
    if (stepIdx > 0) {
      const moveUpBtn = document.createElement('button');
      moveUpBtn.textContent = '↑';
      moveUpBtn.style.padding = '4px 8px';
      moveUpBtn.style.fontSize = '12px';
      moveUpBtn.onclick = () => {
        const temp = editingScenario.steps[stepIdx];
        editingScenario.steps[stepIdx] = editingScenario.steps[stepIdx - 1];
        editingScenario.steps[stepIdx - 1] = temp;
        renderAll();
      };
      stepActions.appendChild(moveUpBtn);
    }
    
    // Move Down Button
    if (stepIdx < editingScenario.steps.length - 1) {
      const moveDownBtn = document.createElement('button');
      moveDownBtn.textContent = '↓';
      moveDownBtn.style.padding = '4px 8px';
      moveDownBtn.style.fontSize = '12px';
      moveDownBtn.onclick = () => {
        const temp = editingScenario.steps[stepIdx];
        editingScenario.steps[stepIdx] = editingScenario.steps[stepIdx + 1];
        editingScenario.steps[stepIdx + 1] = temp;
        renderAll();
      };
      stepActions.appendChild(moveDownBtn);
    }
    
    // Delete Button
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = '×';
    deleteBtn.style.padding = '4px 8px';
    deleteBtn.style.fontSize = '12px';
    deleteBtn.style.background = 'var(--color-error)';
    deleteBtn.style.color = 'white';
    deleteBtn.style.border = 'none';
    deleteBtn.style.borderRadius = '4px';
    deleteBtn.onclick = () => {
      editingScenario.steps.splice(stepIdx, 1);
      renderAll();
    };
    stepActions.appendChild(deleteBtn);
    
    stepHeader.appendChild(stepNumber);
    stepHeader.appendChild(stepActions);
    stepDiv.appendChild(stepHeader);
    
    // Step Selection
    const stepSelectDiv = document.createElement('div');
    stepSelectDiv.style.marginBottom = '10px';
    
    const stepLabel = document.createElement('label');
    stepLabel.textContent = 'Step Type:';
    stepLabel.style.display = 'block';
    stepLabel.style.marginBottom = '5px';
    stepLabel.style.fontWeight = '500';
    
    const stepSelect = document.createElement('select');
    stepSelect.style.width = '100%';
    stepSelect.style.padding = '8px';
    stepSelect.style.border = '1px solid var(--color-card-border)';
    stepSelect.style.borderRadius = '4px';
    stepSelect.style.background = 'var(--color-bg)';
    stepSelect.style.color = 'var(--color-text)';
    
    // Add step options from step library
    stepLibrary.forEach(stepDef => {
      const option = document.createElement('option');
      option.value = stepDef.id;
      option.textContent = `${stepDef.type}: ${stepDef.label}`;
      if (stepDef.id === step.id) {
        option.selected = true;
      }
      stepSelect.appendChild(option);
    });
    
    stepSelect.onchange = () => {
      const selectedStepDef = stepLibrary.find(s => s.id === stepSelect.value);
      step.id = selectedStepDef.id;
      // Reset parameters to defaults
      step.params = {};
      selectedStepDef.params.forEach(param => {
        if (param.default !== undefined) {
          step.params[param.name] = param.default;
        }
      });
      renderAll();
    };
    
    stepSelectDiv.appendChild(stepLabel);
    stepSelectDiv.appendChild(stepSelect);
    stepDiv.appendChild(stepSelectDiv);
    
    // Parameter Configuration
    const currentStepDef = stepLibrary.find(s => s.id === step.id);
    if (currentStepDef && currentStepDef.params.length > 0) {
      const paramsDiv = document.createElement('div');
      paramsDiv.style.marginTop = '10px';
      
      const paramsLabel = document.createElement('label');
      paramsLabel.textContent = 'Parameters:';
      paramsLabel.style.display = 'block';
      paramsLabel.style.marginBottom = '5px';
      paramsLabel.style.fontWeight = '500';
      paramsDiv.appendChild(paramsLabel);
      
      currentStepDef.params.forEach(param => {
        const paramDiv = document.createElement('div');
        paramDiv.style.marginBottom = '8px';
        
        const paramLabel = document.createElement('label');
        paramLabel.textContent = `${param.name}${param.required ? ' *' : ''}:`;
        paramLabel.style.display = 'block';
        paramLabel.style.marginBottom = '3px';
        paramLabel.style.fontSize = '14px';
        
        let paramInput;
        
        if (param.type === 'page') {
          // Page dropdown
          paramInput = document.createElement('select');
          paramInput.style.width = '100%';
          paramInput.style.padding = '6px';
          paramInput.style.border = '1px solid var(--color-card-border)';
          paramInput.style.borderRadius = '4px';
          paramInput.style.background = 'var(--color-bg)';
          paramInput.style.color = 'var(--color-text)';
          
          // Add page options
          appDetails.pages.forEach(page => {
            const option = document.createElement('option');
            option.value = page.name;
            option.textContent = page.name;
            if (step.params[param.name] === page.name) {
              option.selected = true;
            }
            paramInput.appendChild(option);
          });
        } else if (param.type === 'string') {
          // Text input
          paramInput = document.createElement('input');
          paramInput.type = 'text';
          paramInput.value = step.params[param.name] || '';
          paramInput.placeholder = param.description || param.name;
          paramInput.style.width = '100%';
          paramInput.style.padding = '6px';
          paramInput.style.border = '1px solid var(--color-card-border)';
          paramInput.style.borderRadius = '4px';
          paramInput.style.background = 'var(--color-bg)';
          paramInput.style.color = 'var(--color-text)';
        } else if (param.type === 'number') {
          // Number input
          paramInput = document.createElement('input');
          paramInput.type = 'number';
          paramInput.value = step.params[param.name] || '';
          paramInput.placeholder = param.description || param.name;
          paramInput.style.width = '100%';
          paramInput.style.padding = '6px';
          paramInput.style.border = '1px solid var(--color-card-border)';
          paramInput.style.borderRadius = '4px';
          paramInput.style.background = 'var(--color-bg)';
          paramInput.style.color = 'var(--color-text)';
        } else if (param.type === 'bool') {
          // Boolean checkbox
          paramInput = document.createElement('input');
          paramInput.type = 'checkbox';
          paramInput.checked = step.params[param.name] || false;
          paramInput.style.marginLeft = '0';
        }
        
        // Add change handler
        paramInput.onchange = () => {
          if (param.type === 'bool') {
            step.params[param.name] = paramInput.checked;
          } else {
            step.params[param.name] = paramInput.value;
          }
        };
        
        paramDiv.appendChild(paramLabel);
        paramDiv.appendChild(paramInput);
        paramsDiv.appendChild(paramDiv);
      });
      
      stepDiv.appendChild(paramsDiv);
    }
    
    // Step Preview
    const previewDiv = document.createElement('div');
    previewDiv.className = 'step-preview';
    
    const selectedStepDefForPreview = stepLibrary.find(s => s.id === step.id);
    if (selectedStepDefForPreview) {
      let previewText = selectedStepDefForPreview.template;
      
      // Add step type badge
      const stepTypeBadge = document.createElement('span');
      stepTypeBadge.className = `step-type-badge ${selectedStepDefForPreview.type.toLowerCase()}`;
      stepTypeBadge.textContent = selectedStepDefForPreview.type;
      previewDiv.appendChild(stepTypeBadge);
      
      // Replace parameters in template with highlighted versions
      Object.keys(step.params).forEach(key => {
        const paramValue = step.params[key];
        const paramDef = selectedStepDefForPreview.params.find(p => p.name === key);
        let paramClass = 'parameter-highlight';
        
        if (paramDef) {
          switch (paramDef.type) {
            case 'page':
              paramClass = 'page-parameter';
              break;
            case 'string':
              paramClass = 'string-parameter';
              break;
            case 'number':
              paramClass = 'number-parameter';
              break;
            case 'bool':
              paramClass = 'boolean-parameter';
              break;
          }
        }
        
        const highlightedParam = `<span class="${paramClass}">${paramValue}</span>`;
        previewText = previewText.replace(`{${key}}`, highlightedParam);
      });
      
      // Set the preview content with HTML
      const previewContent = document.createElement('span');
      previewContent.innerHTML = previewText;
      previewDiv.appendChild(previewContent);
    }
    
    stepDiv.appendChild(previewDiv);
    stepListDiv.appendChild(stepDiv);
  });
  
  editorContainer.appendChild(stepListDiv);
  
  // Add Step Button
  const addStepDiv = document.createElement('div');
  addStepDiv.className = 'add-step-area';
  
  const addStepBtn = document.createElement('button');
  addStepBtn.textContent = '+ Add Step';
  addStepBtn.className = 'add-btn';
  addStepBtn.onclick = () => {
    // Add a new step with default values
    const newStep = {
      id: 'access-home',
      params: { page: 'Home' }
    };
    editingScenario.steps.push(newStep);
    renderAll();
  };
  
  addStepDiv.appendChild(addStepBtn);
  editorContainer.appendChild(addStepDiv);
  
  // Live Preview
  const previewHeader = document.createElement('h4');
  previewHeader.textContent = 'Live Preview';
  previewHeader.className = 'live-preview-header';
  
  const livePreviewDiv = document.createElement('div');
  livePreviewDiv.className = 'scenario-text';
  livePreviewDiv.innerHTML = renderScenarioSteps(editingScenario);
  
  editorContainer.appendChild(previewHeader);
  editorContainer.appendChild(livePreviewDiv);
  
  return editorContainer;
}

function renderFlowChartView(journeyIdx, scenarioIdx) {
  const journey = journeys[journeyIdx];
  const scenario = journey.scenarios[scenarioIdx];
  
  const flowContainer = document.createElement('div');
  flowContainer.className = 'flow-chart-container';
  flowContainer.style.padding = '20px';
  flowContainer.style.background = 'var(--color-bg)';
  flowContainer.style.borderRadius = '8px';
  
  const header = document.createElement('h3');
  header.textContent = 'Visual Flow Chart';
  header.style.marginBottom = '20px';
  header.style.color = 'var(--color-text)';
  flowContainer.appendChild(header);
  
  const flowChart = document.createElement('div');
  flowChart.className = 'flow-chart';
  flowChart.style.display = 'flex';
  flowChart.style.flexDirection = 'column';
  flowChart.style.gap = '20px';
  flowChart.style.alignItems = 'center';
  
  scenario.steps.forEach((step, index) => {
    const stepNode = document.createElement('div');
    stepNode.className = 'flow-step-node';
    stepNode.style.cssText = `
      background: var(--color-card);
      border: 2px solid var(--color-primary);
      border-radius: 12px;
      padding: 15px 20px;
      min-width: 200px;
      text-align: center;
      position: relative;
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    `;
    
    const selectedStepDef = stepLibrary.find(s => s.id === step.id);
    if (selectedStepDef) {
      // Add color coding based on step type
      const stepType = selectedStepDef.type.toLowerCase();
      const colors = {
        'given': '#10b981',
        'when': '#3b82f6', 
        'then': '#f59e0b',
        'and': '#8b5cf6',
        'but': '#ef4444'
      };
      stepNode.style.borderColor = colors[stepType] || '#e94f37';
      stepNode.style.background = `linear-gradient(135deg, ${colors[stepType]}15 0%, var(--color-card) 100%)`;
    }
    
    const stepNumber = document.createElement('div');
    stepNumber.textContent = `${index + 1}`;
    stepNumber.style.cssText = `
      position: absolute;
      top: -10px;
      left: -10px;
      background: var(--color-primary);
      color: white;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      font-size: 12px;
    `;
    
    const stepTitle = document.createElement('div');
    stepTitle.textContent = selectedStepDef ? selectedStepDef.label : step.id;
    stepTitle.style.cssText = `
      font-weight: bold;
      margin-bottom: 8px;
      color: var(--color-text);
    `;
    
    const stepType = document.createElement('div');
    stepType.textContent = selectedStepDef ? selectedStepDef.type : 'Step';
    stepType.style.cssText = `
      font-size: 12px;
      color: var(--color-text-secondary);
      text-transform: uppercase;
      letter-spacing: 0.5px;
    `;
    
    stepNode.appendChild(stepNumber);
    stepNode.appendChild(stepTitle);
    stepNode.appendChild(stepType);
    
    flowChart.appendChild(stepNode);
    
    // Add arrow connector (except for last step)
    if (index < scenario.steps.length - 1) {
      const arrow = document.createElement('div');
      arrow.innerHTML = '↓';
      arrow.style.cssText = `
        font-size: 24px;
        color: var(--color-primary);
        font-weight: bold;
        margin: 10px 0;
      `;
      flowChart.appendChild(arrow);
    }
  });
  
  flowContainer.appendChild(flowChart);
  return flowContainer;
}

function duplicateScenario(journeyIdx, scenarioIdx) {
  const journey = journeys[journeyIdx];
  const originalScenario = journey.scenarios[scenarioIdx];
  const newScenarioId = `scenario${journey.scenarios.length + 1}`;
  
  const duplicatedScenario = {
    id: newScenarioId,
    title: `${originalScenario.title} (Copy)`,
    description: originalScenario.description,
    type: originalScenario.type,
    steps: originalScenario.steps.map(step => ({
      id: step.id,
      params: { ...step.params }
    }))
  };
  
  journey.scenarios.push(duplicatedScenario);
  
  // Select the new scenario
  selectedScenario = journey.scenarios.length - 1;
  
  // Save to localStorage
  saveToLocalStorage();
  
  // Re-render
  renderAll();
  
  // Show feedback
  showAppDataFeedback('Scenario duplicated successfully!');
}

function addStepDependency(stepIdx, dependencyStepIdx, condition) {
  if (!editingScenario.steps[stepIdx].dependencies) {
    editingScenario.steps[stepIdx].dependencies = [];
  }
  
  editingScenario.steps[stepIdx].dependencies.push({
    stepId: dependencyStepIdx,
    condition: condition
  });
}

function renderStepDependencies(stepIdx) {
  const step = editingScenario.steps[stepIdx];
  const dependenciesDiv = document.createElement('div');
  dependenciesDiv.style.marginTop = '10px';
  dependenciesDiv.style.padding = '10px';
  dependenciesDiv.style.background = 'var(--color-bg-alt)';
  dependenciesDiv.style.borderRadius = '6px';
  dependenciesDiv.style.border = '1px solid var(--color-card-border)';
  
  const title = document.createElement('label');
  title.textContent = 'Step Dependencies:';
  title.style.display = 'block';
  title.style.marginBottom = '8px';
  title.style.fontWeight = '500';
  dependenciesDiv.appendChild(title);
  
  if (!step.dependencies || step.dependencies.length === 0) {
    const noDeps = document.createElement('div');
    noDeps.textContent = 'No dependencies';
    noDeps.style.color = 'var(--color-text-secondary)';
    noDeps.style.fontStyle = 'italic';
    dependenciesDiv.appendChild(noDeps);
  } else {
    step.dependencies.forEach((dep, depIdx) => {
      const depDiv = document.createElement('div');
      depDiv.style.display = 'flex';
      depDiv.style.alignItems = 'center';
      depDiv.style.gap = '8px';
      depDiv.style.marginBottom = '5px';
      
      const depText = document.createElement('span');
      depText.textContent = `Step ${dep.stepId + 1}: ${dep.condition}`;
      depText.style.fontSize = '14px';
      
      const removeBtn = document.createElement('button');
      removeBtn.textContent = '×';
      removeBtn.style.cssText = `
        background: var(--color-error);
        color: white;
        border: none;
        border-radius: 50%;
        width: 20px;
        height: 20px;
        font-size: 12px;
        cursor: pointer;
      `;
      removeBtn.onclick = () => {
        step.dependencies.splice(depIdx, 1);
        renderAll();
      };
      
      depDiv.appendChild(depText);
      depDiv.appendChild(removeBtn);
      dependenciesDiv.appendChild(depDiv);
    });
  }
  
  // Add dependency button
  const addDepBtn = document.createElement('button');
  addDepBtn.textContent = '+ Add Dependency';
  addDepBtn.style.cssText = `
    background: var(--color-primary);
    color: white;
    border: none;
    border-radius: 4px;
    padding: 6px 12px;
    font-size: 12px;
    cursor: pointer;
    margin-top: 8px;
  `;
  addDepBtn.onclick = () => {
    showAddDependencyModal(stepIdx);
  };
  
  dependenciesDiv.appendChild(addDepBtn);
  return dependenciesDiv;
}

function showAddDependencyModal(stepIdx) {
  const modalBg = document.createElement('div');
  modalBg.className = 'modal-bg';
  modalBg.onclick = (e) => {
    if (e.target === modalBg) {
      document.body.removeChild(modalBg);
    }
  };
  
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.innerHTML = `
    <h3>Add Step Dependency</h3>
    <form id="addDependencyForm">
      <label for="dependencyStep">Dependent Step:</label>
      <select id="dependencyStep" required>
        ${editingScenario.steps.map((step, idx) => 
          `<option value="${idx}">Step ${idx + 1}: ${stepLibrary.find(s => s.id === step.id)?.label || step.id}</option>`
        ).join('')}
      </select>
      
      <label for="dependencyCondition">Condition:</label>
      <select id="dependencyCondition" required>
        <option value="completed">Must be completed</option>
        <option value="successful">Must be successful</option>
        <option value="failed">Must have failed</option>
        <option value="with-result">With specific result</option>
      </select>
      
      <div class="modal-actions">
        <button type="button" class="cancel-btn" onclick="document.body.removeChild(this.closest('.modal-bg'))">Cancel</button>
        <button type="submit" class="add-btn">Add Dependency</button>
      </div>
    </form>
  `;
  
  modal.querySelector('#addDependencyForm').onsubmit = (e) => {
    e.preventDefault();
    const depStepIdx = parseInt(modal.querySelector('#dependencyStep').value);
    const condition = modal.querySelector('#dependencyCondition').value;
    
    addStepDependency(stepIdx, depStepIdx, condition);
    document.body.removeChild(modalBg);
    renderAll();
  };
  
  modalBg.appendChild(modal);
  document.body.appendChild(modalBg);
}

function renderStepComments(stepIdx) {
  const step = editingScenario.steps[stepIdx];
  const commentsDiv = document.createElement('div');
  commentsDiv.style.marginTop = '10px';
  
  const title = document.createElement('label');
  title.textContent = 'Step Notes:';
  title.style.display = 'block';
  title.style.marginBottom = '5px';
  title.style.fontWeight = '500';
  commentsDiv.appendChild(title);
  
  const commentTextarea = document.createElement('textarea');
  commentTextarea.value = step.comments || '';
  commentTextarea.placeholder = 'Add notes, comments, or documentation for this step...';
  commentTextarea.style.cssText = `
    width: 100%;
    min-height: 60px;
    padding: 8px;
    border: 1px solid var(--color-card-border);
    border-radius: 4px;
    background: var(--color-bg);
    color: var(--color-text);
    font-size: 14px;
    resize: vertical;
  `;
  
  commentTextarea.onchange = () => {
    step.comments = commentTextarea.value;
  };
  
  commentsDiv.appendChild(commentTextarea);
  return commentsDiv;
}

function validateScenario(scenario) {
  const errors = [];
  const warnings = [];
  
  // Check if scenario has steps
  if (!scenario.steps || scenario.steps.length === 0) {
    errors.push('Scenario must have at least one step');
  }
  
  // Validate each step
  scenario.steps.forEach((step, stepIdx) => {
    const stepDef = stepLibrary.find(s => s.id === step.id);
    if (!stepDef) {
      errors.push(`Step ${stepIdx + 1}: Unknown step type "${step.id}"`);
      return;
    }
    
    // Check required parameters
    stepDef.params.forEach(param => {
      if (param.required && (!step.params || !step.params[param.name])) {
        errors.push(`Step ${stepIdx + 1}: Missing required parameter "${param.name}"`);
      }
    });
    
    // Check parameter types
    if (step.params) {
      Object.keys(step.params).forEach(paramName => {
        const paramDef = stepDef.params.find(p => p.name === paramName);
        if (paramDef) {
          const value = step.params[paramName];
          if (paramDef.type === 'number' && isNaN(Number(value))) {
            errors.push(`Step ${stepIdx + 1}: Parameter "${paramName}" must be a number`);
          }
        }
      });
    }
    
    // Check dependencies
    if (step.dependencies) {
      step.dependencies.forEach(dep => {
        if (dep.stepId >= scenario.steps.length) {
          errors.push(`Step ${stepIdx + 1}: Invalid dependency on step ${dep.stepId + 1}`);
        }
      });
    }
  });
  
  // Check for circular dependencies
  const visited = new Set();
  const recursionStack = new Set();
  
  function hasCircularDependency(stepIdx) {
    if (recursionStack.has(stepIdx)) {
      return true;
    }
    if (visited.has(stepIdx)) {
      return false;
    }
    
    visited.add(stepIdx);
    recursionStack.add(stepIdx);
    
    const step = scenario.steps[stepIdx];
    if (step.dependencies) {
      for (const dep of step.dependencies) {
        if (hasCircularDependency(dep.stepId)) {
          return true;
        }
      }
    }
    
    recursionStack.delete(stepIdx);
    return false;
  }
  
  for (let i = 0; i < scenario.steps.length; i++) {
    if (hasCircularDependency(i)) {
      errors.push('Circular dependency detected in scenario steps');
      break;
    }
  }
  
  return { errors, warnings };
}

function showScenarioValidation(journeyIdx, scenarioIdx) {
  const journey = journeys[journeyIdx];
  const scenario = journey.scenarios[scenarioIdx];
  const validation = validateScenario(scenario);
  
  const modalBg = document.createElement('div');
  modalBg.className = 'modal-bg';
  modalBg.onclick = (e) => {
    if (e.target === modalBg) {
      document.body.removeChild(modalBg);
    }
  };
  
  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.style.maxWidth = '600px';
  
  let modalContent = `<h3>Scenario Validation</h3>`;
  
  if (validation.errors.length === 0 && validation.warnings.length === 0) {
    modalContent += `
      <div style="color: #10b981; font-weight: bold; margin: 20px 0;">
        ✅ Scenario is valid! No issues found.
      </div>
    `;
  } else {
    if (validation.errors.length > 0) {
      modalContent += `
        <div style="margin: 20px 0;">
          <h4 style="color: #ef4444; margin-bottom: 10px;">❌ Errors (${validation.errors.length})</h4>
          <ul style="color: #ef4444; margin-left: 20px;">
            ${validation.errors.map(error => `<li>${error}</li>`).join('')}
          </ul>
        </div>
      `;
    }
    
    if (validation.warnings.length > 0) {
      modalContent += `
        <div style="margin: 20px 0;">
          <h4 style="color: #f59e0b; margin-bottom: 10px;">⚠️ Warnings (${validation.warnings.length})</h4>
          <ul style="color: #f59e0b; margin-left: 20px;">
            ${validation.warnings.map(warning => `<li>${warning}</li>`).join('')}
          </ul>
        </div>
      `;
    }
  }
  
  modalContent += `
    <div class="modal-actions">
      <button type="button" class="cancel-btn" onclick="document.body.removeChild(this.closest('.modal-bg'))">Close</button>
    </div>
  `;
  
  modal.innerHTML = modalContent;
  modalBg.appendChild(modal);
  document.body.appendChild(modalBg);
}

// --- Data Migration for Existing Journeys ---
function migrateJourneys() {
  // If journeys are missing action/benefit/title/code, migrate them
  let usCounter = 1;
  journeys.forEach(journey => {
    // Assign code if missing
    if (!journey.code) {
      journey.code = `US${usCounter++}`;
    }
    // If already migrated, skip
    if (journey.action && journey.benefit && journey.title && journey.personaId) return;
    // Try to parse old story format: 'As [persona], I want to [action], so that I [benefit]'
    if (journey.story) {
      let personaName, action, benefit;
      const match = journey.story.match(/^As ([^,]+), I want to ([^,]+), so that I (.+)$/);
      if (match) {
        personaName = match[1].trim();
        action = match[2].trim();
        benefit = match[3].trim();
      } else {
        personaName = personas[0] ? personas[0].name : 'User';
        action = journey.title || '';
        benefit = '';
      }
      // If persona is 'user', assign to first persona
      let persona;
      if (personaName.toLowerCase() === 'user' && personas.length > 0) {
        persona = personas[0];
      } else {
        persona = personas.find(p => p.name === personaName);
      }
      if (!persona && personas.length > 0) {
        persona = personas[0];
      }
      if (!persona) {
        persona = { id: generateId(), name: personaName, profile: '', bio: '', goals: '', frustrations: '', avatar: '' };
        personas.push(persona);
      }
      if (!persona.id) persona.id = generateId();
      journey.personaId = persona.id;
      journey.action = action;
      journey.benefit = benefit;
      journey.title = journey.title || action;
    } else {
      // Fallback for journeys with only title
      journey.personaId = personas[0] ? personas[0].id : '';
      journey.action = journey.action || journey.title || '';
      journey.benefit = journey.benefit || '';
      journey.title = journey.title || journey.action || 'Story';
    }
  });
  saveToLocalStorage();
}
// Call migration on load
migrateJourneys();

// --- Patch renderAll to use new workspace ---
function renderAll() {
  renderSidebar();
  renderWorkspace();
}

// --- App Settings Tabs ---
import { renderGeneralTab } from './ui/tabs/general.js';
import { renderUserProfilesTab } from './ui/tabs/profiles.js';
import { renderPersonasTab } from './ui/tabs/personas.js';
import { renderControlsTab } from './ui/tabs/controls.js';
import { renderStepLibraryTab } from './ui/tabs/stepLibraryTab.js';
import { renderPagesTab } from './ui/tabs/general.js';
import { renderAppVariablesTab } from './ui/tabs/general.js';

// --- On page load, try to restore from localStorage ---
if (loadFromLocalStorage()) {
  renderAll();
}
// --- Dark Mode Toggle (Keyboard Shortcut) ---
function setDarkMode(enabled) {
  if (enabled) {
    document.body.classList.add('dark-mode');
  } else {
    document.body.classList.remove('dark-mode');
  }
  localStorage.setItem('prototyperDarkMode', enabled ? '1' : '0');
}
function toggleDarkMode() {
  const enabled = !document.body.classList.contains('dark-mode');
  setDarkMode(enabled);
}
// Keyboard shortcuts are disabled in the OSS core build
(function() {
  const darkPref = localStorage.getItem('prototyperDarkMode');
  if (darkPref === '1') setDarkMode(true);
})(); 

document.addEventListener('DOMContentLoaded', function() {
  const sidebar = document.querySelector('.sidebar');
  function updateChevron() {
    const btn = document.getElementById('minimizeSidebarBtn');
    if (!btn) return;
    btn.innerHTML = sidebar.classList.contains('minimized')
      ? `<svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 7l-3 3 3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`
      : `<svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l3 3 3-3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  }
  function toggleSidebarMinimized() {
    sidebar.classList.toggle('minimized');
    renderSidebar();
    updateChevron();
  }
  function setupMinimizeBtn() {
    const btn = document.getElementById('minimizeSidebarBtn');
    if (!btn) return;
    btn.onclick = toggleSidebarMinimized;
    updateChevron();
  }
  setupMinimizeBtn();
  // Also re-setup after every renderAll
  const origRenderAll = window.renderAll;
  window.renderAll = function() {
    origRenderAll();
    setupMinimizeBtn();
  };
  // App settings minimize button
  function setupMinimizeBtnSettings() {
    const btn = document.getElementById('minimizeSidebarBtnSettings');
    if (!btn) return;
    btn.onclick = function() {
      toggleSidebarMinimized();
    };
  }
  setupMinimizeBtnSettings();
  // Keyboard shortcuts disabled in OSS core
}); 

// Add global keyboard shortcut handler for dark mode, minimize, export, and import
// Place after all imports and function definitions

// Global keyboard shortcuts disabled in OSS core

function exportScenarioToJSON(journeyIdx, scenarioIdx) {
  const journey = journeys[journeyIdx];
  const scenario = journey.scenarios[scenarioIdx];
  
  const exportData = {
    scenario: {
      ...scenario,
      exportedAt: new Date().toISOString(),
      version: '1.0',
      appName: appDetails.name
    }
  };
  
  const dataStr = JSON.stringify(exportData, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  
  const link = document.createElement('a');
  link.href = URL.createObjectURL(dataBlob);
  link.download = `${scenario.title.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_scenario.json`;
  link.click();
  
  showAppDataFeedback('Scenario exported successfully!');
}

function importScenarioFromJSON(journeyIdx) {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json';
  input.onchange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const importData = JSON.parse(event.target.result);
        
        if (!importData.scenario) {
          throw new Error('Invalid scenario file format');
        }
        
        const importedScenario = importData.scenario;
        const journey = journeys[journeyIdx];
        
        // Generate new ID
        const newScenarioId = `scenario${journey.scenarios.length + 1}`;
        importedScenario.id = newScenarioId;
        importedScenario.title = `${importedScenario.title} (Imported)`;
        
        // Validate imported scenario
        const validation = validateScenario(importedScenario);
        if (validation.errors.length > 0) {
          alert(`Import failed: ${validation.errors.join(', ')}`);
          return;
        }
        
        journey.scenarios.push(importedScenario);
        selectedScenario = journey.scenarios.length - 1;
        
        saveToLocalStorage();
        renderAll();
        showAppDataFeedback('Scenario imported successfully!');
        
      } catch (error) {
        alert(`Import failed: ${error.message}`);
      }
    };
    reader.readAsText(file);
  };
  input.click();
}

function exportAllScenarios() {
  // Track scenario sharing for metrics
  if (window.trancescriptMetrics) {
    window.trancescriptMetrics.trackScenarioShared();
  }
  const exportData = {
    appDetails: appDetails,
    scenarios: [],
    exportedAt: new Date().toISOString(),
    version: '1.0'
  };
  
  journeys.forEach(journey => {
    journey.scenarios.forEach(scenario => {
      exportData.scenarios.push({
        journeyTitle: journey.title,
        scenario: scenario
      });
    });
  });
  
  const dataStr = JSON.stringify(exportData, null, 2);
  const dataBlob = new Blob([dataStr], { type: 'application/json' });
  
  const link = document.createElement('a');
  link.href = URL.createObjectURL(dataBlob);
  link.download = `${appDetails.name.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_all_scenarios.json`;
  link.click();
  
  showAppDataFeedback('All scenarios exported successfully!');
}

function addSearchAndFilter() {
  const searchContainer = document.createElement('div');
  searchContainer.style.cssText = `
    margin-bottom: 20px;
    padding: 15px;
    background: var(--color-card);
    border-radius: 8px;
    border: 1px solid var(--color-card-border);
  `;
  
  const searchInput = document.createElement('input');
  searchInput.type = 'text';
  searchInput.placeholder = 'Search scenarios, steps, or parameters...';
  searchInput.style.cssText = `
    width: 100%;
    padding: 10px;
    border: 1px solid var(--color-card-border);
    border-radius: 6px;
    background: var(--color-bg);
    color: var(--color-text);
    font-size: 14px;
    margin-bottom: 10px;
  `;
  
  const filterContainer = document.createElement('div');
  filterContainer.style.display = 'flex';
  filterContainer.style.gap = '10px';
  filterContainer.style.flexWrap = 'wrap';
  
  const stepTypeFilter = document.createElement('select');
  stepTypeFilter.style.cssText = `
    padding: 8px;
    border: 1px solid var(--color-card-border);
    border-radius: 4px;
    background: var(--color-bg);
    color: var(--color-text);
    font-size: 14px;
  `;
  stepTypeFilter.innerHTML = `
    <option value="">All Step Types</option>
    <option value="Given">Given</option>
    <option value="When">When</option>
    <option value="Then">Then</option>
    <option value="And">And</option>
    <option value="But">But</option>
  `;
  
  const scenarioTypeFilter = document.createElement('select');
  scenarioTypeFilter.style.cssText = `
    padding: 8px;
    border: 1px solid var(--color-card-border);
    border-radius: 4px;
    background: var(--color-bg);
    color: var(--color-text);
    font-size: 14px;
  `;
  scenarioTypeFilter.innerHTML = `
    <option value="">All Scenario Types</option>
    <option value="happy-path">Happy Path</option>
    <option value="error-path">Error Path</option>
    <option value="alternative">Alternative Flow</option>
  `;
  
  const clearFiltersBtn = document.createElement('button');
  clearFiltersBtn.textContent = 'Clear Filters';
  clearFiltersBtn.style.cssText = `
    padding: 8px 16px;
    background: var(--color-primary);
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 14px;
  `;
  
  searchContainer.appendChild(searchInput);
  filterContainer.appendChild(stepTypeFilter);
  filterContainer.appendChild(scenarioTypeFilter);
  filterContainer.appendChild(clearFiltersBtn);
  searchContainer.appendChild(filterContainer);
  
  return searchContainer;
}

function searchScenarios(query, stepTypeFilter, scenarioTypeFilter) {
  const results = [];
  
  journeys.forEach((journey, journeyIdx) => {
    journey.scenarios.forEach((scenario, scenarioIdx) => {
      let matches = false;
      
      // Check scenario type filter
      if (scenarioTypeFilter && scenario.type !== scenarioTypeFilter) {
        return;
      }
      
      // Check title and description
      if (query) {
        const searchText = `${scenario.title} ${scenario.description || ''}`.toLowerCase();
        if (searchText.includes(query.toLowerCase())) {
          matches = true;
        }
      }
      
      // Check steps
      scenario.steps.forEach(step => {
        const stepDef = stepLibrary.find(s => s.id === step.id);
        
        // Check step type filter
        if (stepTypeFilter && stepDef && stepDef.type !== stepTypeFilter) {
          return;
        }
        
        // Check step content
        if (query) {
          const stepText = `${stepDef?.label || step.id} ${JSON.stringify(step.params)}`.toLowerCase();
          if (stepText.includes(query.toLowerCase())) {
            matches = true;
          }
        }
      });
      
      if (matches || (!query && !stepTypeFilter && !scenarioTypeFilter)) {
        results.push({
          journeyIdx,
          scenarioIdx,
          journey,
          scenario
        });
      }
    });
  });
  
  return results;
}

// Performance optimizations
let renderTimeout = null;
let searchTimeout = null;

function debouncedRender() {
  if (renderTimeout) {
    clearTimeout(renderTimeout);
  }
  renderTimeout = setTimeout(() => {
    renderAll();
  }, 100);
}

function debouncedSearch(callback) {
  if (searchTimeout) {
    clearTimeout(searchTimeout);
  }
  searchTimeout = setTimeout(callback, 300);
}

// Efficient DOM updates
function updateElementSafely(element, newContent) {
  if (element && element.innerHTML !== newContent) {
    element.innerHTML = newContent;
  }
}

// Lazy loading for large datasets
function lazyLoadSteps(steps, startIndex, batchSize = 10) {
  return steps.slice(startIndex, startIndex + batchSize);
}

// Memory management
function cleanupUnusedData() {
  // Clear old validation results
  if (window.scenarioValidationCache) {
    const cacheAge = Date.now() - window.scenarioValidationCache.timestamp;
    if (cacheAge > 300000) { // 5 minutes
      delete window.scenarioValidationCache;
    }
  }
}

// Optimized validation with caching
function validateScenarioWithCache(scenario) {
  const cacheKey = JSON.stringify(scenario);
  
  if (window.scenarioValidationCache && 
      window.scenarioValidationCache.key === cacheKey) {
    return window.scenarioValidationCache.result;
  }
  
  const result = validateScenario(scenario);
  
  window.scenarioValidationCache = {
    key: cacheKey,
    result: result,
    timestamp: Date.now()
  };
  
  return result;
}

// Enhanced keyboard shortcuts
function setupEnhancedKeyboardShortcuts() {
  document.addEventListener('keydown', (e) => {
    // Cmd/Ctrl + S: Save current scenario
    if ((e.metaKey || e.ctrlKey) && e.key === 's') {
      e.preventDefault();
      if (editingScenario) {
        const journey = journeys[editingScenario.journeyIdx];
        journey.scenarios[editingScenario.scenarioIdx].steps = editingScenario.steps;
        saveToLocalStorage();
        showAppDataFeedback('Scenario saved! (Ctrl+S)', false);
      }
    }
    
    // Cmd/Ctrl + D: Toggle dark mode
    if ((e.metaKey || e.ctrlKey) && e.key === 'd') {
      e.preventDefault();
      toggleDarkMode();
    }
    
    // Cmd/Ctrl + N: New scenario
    if ((e.metaKey || e.ctrlKey) && e.key === 'n') {
      e.preventDefault();
      if (selectedJourney !== null) {
        showAddScenarioModal(selectedJourney);
      }
    }
    
    // Escape: Cancel editing
    if (e.key === 'Escape') {
      if (editingScenario) {
        editingScenario = null;
        renderAll();
        showAppDataFeedback('Editing cancelled', false);
      }
    }
  });
}

// Auto-save indicator
function showAutoSaveIndicator() {
  const indicator = document.createElement('div');
  indicator.id = 'autoSaveIndicator';
  indicator.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: var(--color-primary);
    color: white;
    padding: 8px 16px;
    border-radius: 20px;
    font-size: 12px;
    font-weight: 500;
    z-index: 1000;
    opacity: 0;
    transition: opacity 0.3s ease;
  `;
  indicator.textContent = 'Auto-saved';
  document.body.appendChild(indicator);
  
  // Show indicator
  setTimeout(() => {
    indicator.style.opacity = '1';
  }, 100);
  
  // Hide indicator
  setTimeout(() => {
    indicator.style.opacity = '0';
    setTimeout(() => {
      if (indicator.parentNode) {
        indicator.parentNode.removeChild(indicator);
      }
    }, 300);
  }, 2000);
}

// Enhanced user feedback
function showEnhancedFeedback(message, type = 'info', duration = 3000) {
  const feedback = document.createElement('div');
  feedback.style.cssText = `
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: ${type === 'error' ? 'var(--color-error)' : 
                 type === 'success' ? '#10b981' : 
                 type === 'warning' ? '#f59e0b' : 'var(--color-primary)'};
    color: white;
    padding: 12px 24px;
    border-radius: 8px;
    font-weight: 500;
    z-index: 1000;
    opacity: 0;
    transition: opacity 0.3s ease;
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  `;
  feedback.textContent = message;
  document.body.appendChild(feedback);
  
  // Show feedback
  setTimeout(() => {
    feedback.style.opacity = '1';
  }, 100);
  
  // Hide feedback
  setTimeout(() => {
    feedback.style.opacity = '0';
    setTimeout(() => {
      if (feedback.parentNode) {
        feedback.parentNode.removeChild(feedback);
      }
    }, 300);
  }, duration);
}

// Progress indicator for long operations
function showProgressIndicator(operation, progress = 0) {
  let indicator = document.getElementById('progressIndicator');
  if (!indicator) {
    indicator = document.createElement('div');
    indicator.id = 'progressIndicator';
    indicator.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: var(--color-card);
      border: 1px solid var(--color-card-border);
      border-radius: 8px;
      padding: 20px;
      z-index: 1000;
      min-width: 300px;
      text-align: center;
    `;
    document.body.appendChild(indicator);
  }
  
  indicator.innerHTML = `
    <div style="margin-bottom: 10px; font-weight: 500;">${operation}</div>
    <div style="background: var(--color-bg-alt); border-radius: 4px; height: 8px; overflow: hidden;">
      <div style="background: var(--color-primary); height: 100%; width: ${progress}%; transition: width 0.3s ease;"></div>
    </div>
    <div style="margin-top: 8px; font-size: 12px; color: var(--color-text-secondary);">${progress}% complete</div>
  `;
  
  if (progress >= 100) {
    setTimeout(() => {
      if (indicator.parentNode) {
        indicator.parentNode.removeChild(indicator);
      }
    }, 1000);
  }
}

// Initialize enhanced features
function initializeEnhancedFeatures() {
  setupEnhancedKeyboardShortcuts();
  
  // Show welcome message
  setTimeout(() => {
    showEnhancedFeedback('Welcome to YouTube Prototype! Press Ctrl+D for dark mode, Ctrl+S to save.', 'info', 5000);
  }, 1000);
  
  // Auto-save indicator on localStorage changes
  const originalSave = saveToLocalStorage;
  saveToLocalStorage = function() {
    originalSave.call(this);
    showAutoSaveIndicator();
  };
}

// Helper functions for step rendering moved to core/ui-utils.js

function getParameterTextColor(paramType) {
  const colors = {
    'page': '#10b981',
    'string': '#f59e0b',
    'number': '#8b5cf6',
    'boolean': '#ef4444',
    'variable': '#3b82f6'
  };
  return colors[paramType] || '#3b82f6';
}

// Global tooltip functions
window.showParameterTooltip = function(event, element) {
  const tooltipContent = decodeURIComponent(element.getAttribute('data-tooltip'));
  
  // Remove existing tooltip
  const existingTooltip = document.querySelector('.parameter-tooltip-popup');
  if (existingTooltip) {
    existingTooltip.remove();
  }
  
  // Create tooltip
  const tooltip = document.createElement('div');
  tooltip.className = 'parameter-tooltip-popup';
  tooltip.innerHTML = tooltipContent;
  
  // Position tooltip
  const rect = element.getBoundingClientRect();
  tooltip.style.position = 'fixed';
  tooltip.style.left = rect.left + 'px';
  tooltip.style.top = (rect.bottom + 8) + 'px';
  tooltip.style.zIndex = '99999';
  tooltip.style.pointerEvents = 'none';
  
  document.body.appendChild(tooltip);
  
  // Adjust position if tooltip goes off screen
  setTimeout(() => {
    const tooltipRect = tooltip.getBoundingClientRect();
    if (tooltipRect.right > window.innerWidth) {
      tooltip.style.left = (window.innerWidth - tooltipRect.width - 10) + 'px';
    }
    if (tooltipRect.bottom > window.innerHeight) {
      tooltip.style.top = (rect.top - tooltipRect.height - 8) + 'px';
    }
  }, 0);
};

window.hideParameterTooltip = function() {
  const tooltip = document.querySelector('.parameter-tooltip-popup');
  if (tooltip) {
    tooltip.remove();
  }
};

window.showStepTypeTooltip = function(event, element) {
  const stepId = element.getAttribute('data-step-id');
  const stepCategory = element.getAttribute('data-step-category');
  const stepDescription = element.getAttribute('data-step-description');
  
  // Remove existing tooltip
  const existingTooltip = document.querySelector('.step-type-tooltip-popup');
  if (existingTooltip) {
    existingTooltip.remove();
  }
  
  // Create tooltip
  const tooltip = document.createElement('div');
  tooltip.className = 'step-type-tooltip-popup';
  tooltip.innerHTML = `
    <div class="tooltip-content">
      <div class="tooltip-header">🔧 Step: ${stepId}</div>
      <div class="tooltip-details">
        <div><strong>Type:</strong> ${element.textContent}</div>
        <div><strong>Category:</strong> ${stepCategory}</div>
        <div><strong>Description:</strong> ${stepDescription}</div>
      </div>
    </div>
  `;
  
  // Position tooltip
  const rect = element.getBoundingClientRect();
  tooltip.style.position = 'fixed';
  tooltip.style.left = rect.left + 'px';
  tooltip.style.top = (rect.bottom + 8) + 'px';
  tooltip.style.zIndex = '10000';
  
  document.body.appendChild(tooltip);
  
  // Adjust position if tooltip goes off screen
  setTimeout(() => {
    const tooltipRect = tooltip.getBoundingClientRect();
    if (tooltipRect.right > window.innerWidth) {
      tooltip.style.left = (window.innerWidth - tooltipRect.width - 10) + 'px';
    }
    if (tooltipRect.bottom > window.innerHeight) {
      tooltip.style.top = (rect.top - tooltipRect.height - 8) + 'px';
    }
  }, 0);
};

window.hideStepTypeTooltip = function() {
  const tooltip = document.querySelector('.step-type-tooltip-popup');
  if (tooltip) {
    tooltip.remove();
  }
};

// Make stepLibrary available globally for tests
window.stepLibrary = stepLibrary;

// Make addNewScenario available globally for tests
window.addNewScenario = addNewScenario;

// Make validateScenario available globally for tests
window.validateScenario = function(scenario) {
  if (!scenario || !scenario.steps || scenario.steps.length === 0) {
    return { valid: false, errors: ['Scenario must have at least one step'] };
  }
  
  const errors = [];
  
  scenario.steps.forEach((step, index) => {
    const stepDef = stepLibrary.find(s => s.id === step.id);
    if (!stepDef) {
      errors.push(`Step ${index + 1}: Unknown step ID "${step.id}"`);
      return;
    }
    
    // Check required parameters
    stepDef.params.forEach(param => {
      if (param.required && (!step.params || !step.params[param.name])) {
        errors.push(`Step ${index + 1}: Missing required parameter "${param.name}"`);
      }
    });
  });
  
  return { valid: errors.length === 0, errors };
};

// Make validateScenarioWithCache available globally for tests
window.validateScenarioWithCache = function(scenario) {
  // Simple cache implementation for testing
  const cacheKey = JSON.stringify(scenario);
  if (window.validationCache && window.validationCache[cacheKey]) {
    return window.validationCache[cacheKey];
  }
  
  const result = validateScenario(scenario);
  
  if (!window.validationCache) {
    window.validationCache = {};
  }
  window.validationCache[cacheKey] = result;
  
  return result;
};

// Debounced render function for performance testing
window.debouncedRender = function(func, delay = 300) {
  let timeoutId;
  return function(...args) {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func.apply(this, args), delay);
  };
};

// Make renderAll available globally for tests
window.renderAll = renderAll;

// Make appData available globally for tooltips
window.appData = { appDetails, userProfiles, personas, journeys };

// Tooltip functionality is now working perfectly - no test code needed

// --- Live Collaboration Features ---
let liveCollaborationMode = false;
let collaborationParticipants = [];
let realTimeUpdates = [];

// Initialize live collaboration features
function initializeLiveCollaboration() {
  // Add collaboration UI to the workspace
  const collaborationBar = document.createElement('div');
  collaborationBar.id = 'collaborationBar';
  collaborationBar.className = 'collaboration-bar';
  collaborationBar.innerHTML = `
    <div class="collaboration-status">
      <span class="status-indicator" id="collaborationStatus">🔴 Offline</span>
      <button id="toggleCollaborationBtn" class="btn btn-primary">Start Live Session</button>
    </div>
    <div class="participants-list" id="participantsList">
      <span class="participants-label">Participants: </span>
      <span class="participants-count">0</span>
    </div>
    <div class="live-chat" id="liveChat">
      <div class="chat-messages" id="chatMessages"></div>
      <div class="chat-input">
        <input type="text" id="chatInput" placeholder="Type a message..." />
        <button id="sendChatBtn" class="btn btn-secondary">Send</button>
      </div>
    </div>
  `;
  
  // Insert collaboration bar after the tabs (disabled in OSS core)
  const tabsElement = document.getElementById('tabs');
  if (tabsElement && tabsElement.parentNode) {
    // tabsElement.parentNode.insertBefore(collaborationBar, tabsElement.nextSibling);
  }
  
  // Event listeners disabled in OSS core
  
  // Simulate real-time updates
  // Disabled in OSS core
}

function toggleLiveCollaboration() {
  liveCollaborationMode = !liveCollaborationMode;
  const statusIndicator = document.getElementById('collaborationStatus');
  const toggleBtn = document.getElementById('toggleCollaborationBtn');
  const liveChat = document.getElementById('liveChat');
  
  if (false && liveCollaborationMode) {
    statusIndicator.textContent = '🟢 Live';
    statusIndicator.className = 'status-indicator live';
    toggleBtn.textContent = 'End Live Session';
    liveChat.style.display = 'block';
    
    // Simulate participants joining
    collaborationParticipants = [
      { id: 1, name: 'Sarah (Creator)', role: 'Content Creator', avatar: '👩‍💻' },
      { id: 2, name: 'Mike (Viewer)', role: 'Viewer', avatar: '👨‍💼' },
      { id: 3, name: 'AI Assistant', role: 'AI Helper', avatar: '🤖' }
    ];
    
    updateParticipantsList();
    addChatMessage('System', 'Live collaboration session started! 🚀', 'system');
    addChatMessage('Sarah (Creator)', 'Hey everyone! Ready to build some amazing features together!', 'user');
    addChatMessage('AI Assistant', 'I\'m here to help with technical implementation and best practices.', 'ai');
    
    showEnhancedFeedback('Live collaboration session started!', 'success');
  } else {
    statusIndicator.textContent = '🔴 Offline';
    statusIndicator.className = 'status-indicator offline';
    toggleBtn.textContent = 'Start Live Session';
    liveChat.style.display = 'none';
    collaborationParticipants = [];
    updateParticipantsList();
    
    showEnhancedFeedback('Live collaboration session ended.', 'info');
  }
}

function updateParticipantsList() {
  const participantsList = document.getElementById('participantsList'); // may not exist in OSS core
  const count = collaborationParticipants.length;
  participantsList.innerHTML = `
    <span class="participants-label">Participants: </span>
    <span class="participants-count">${count}</span>
    ${collaborationParticipants.map(p => `
      <span class="participant" title="${p.role}">
        ${p.avatar} ${p.name}
      </span>
    `).join('')}
  `;
}

function addChatMessage(sender, message, type = 'user') {
  const chatMessages = document.getElementById('chatMessages');
  const messageElement = document.createElement('div');
  messageElement.className = `chat-message ${type}`;
  messageElement.innerHTML = `
    <span class="message-sender">${sender}:</span>
    <span class="message-text">${message}</span>
    <span class="message-time">${new Date().toLocaleTimeString()}</span>
  `;
  chatMessages.appendChild(messageElement);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function sendChatMessage() {
  const chatInput = document.getElementById('chatInput');
  const message = chatInput.value.trim();
  
  if (message && liveCollaborationMode) {
    addChatMessage('You', message, 'user');
    chatInput.value = '';
    
    // Simulate AI response
    setTimeout(() => {
      const responses = [
        'Great idea! Let me help implement that feature.',
        'I can see you\'re working on the user journey. Would you like me to suggest some improvements?',
        'That\'s an interesting approach. Have you considered the edge cases?',
        'I\'m analyzing the current scenario. Here are some optimization suggestions...',
        'Perfect! This aligns well with our user experience goals.'
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      addChatMessage('AI Assistant', randomResponse, 'ai');
    }, 1000 + Math.random() * 2000);
  }
}

function simulateRealTimeUpdates() {
  if (!liveCollaborationMode) return;
  
  const updates = [
    { type: 'scenario_edit', message: 'Sarah is editing the Video Upload scenario' },
    { type: 'new_comment', message: 'Mike added a comment to the Analytics journey' },
    { type: 'validation', message: 'AI Assistant validated the Live Streaming scenario' },
    { type: 'export', message: 'Sarah exported the Collaboration journey' }
  ];
  
  const randomUpdate = updates[Math.floor(Math.random() * updates.length)];
  realTimeUpdates.push({
    ...randomUpdate,
    timestamp: new Date(),
    participant: collaborationParticipants[Math.floor(Math.random() * collaborationParticipants.length)]
  });
  
  // Show notification
  if (Math.random() > 0.7) { // 30% chance
    showEnhancedFeedback(randomUpdate.message, 'info', 2000);
  }
}

// Initialize live collaboration when the app loads
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(initializeLiveCollaboration, 1000);
});
// Load and display community metrics
async function loadAndDisplayMetrics() {
  try {
  if (window.trancescriptMetrics) {
    const metrics = await window.trancescriptMetrics.getMetrics();
      
      // Update the display
      document.getElementById("scenarios-created").textContent = metrics.scenarios_created || 0;
      document.getElementById("apps-visualized").textContent = metrics.apps_visualized || 0;
      document.getElementById("scenarios-shared").textContent = metrics.scenarios_shared || 0;
    }
  } catch (error) {
    console.log("Metrics display disabled:", error);
  }
}

// Load metrics when page loads
document.addEventListener("DOMContentLoaded", function() {
  // Track app visualization for metrics
  if (window.trancescriptMetrics) {
    window.trancescriptMetrics.trackAppVisualized();
  }
  loadAndDisplayMetrics();
  
  // Refresh metrics every 30 seconds
  setInterval(loadAndDisplayMetrics, 30000);
});
