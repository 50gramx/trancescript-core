// Personas tab module: renders persona cards and inline user story management
export function renderPersonasTab(tabContent, personas, userProfiles, journeys, saveToLocalStorage, renderAll, generateId) {
  const personaContainer = document.createElement('div');
  personaContainer.className = 'persona-container';
  personas.forEach((persona, idx) => {
    const card = document.createElement('div');
    card.className = 'persona-card';
    card.innerHTML = `
      <div class="persona-card-header">
        <input type="text" class="persona-name-input" value="${persona.name || ''}" placeholder="Persona Name" data-idx="${idx}" />
        <select class="persona-profile-select" data-idx="${idx}">
          ${userProfiles.map(p => `<option value="${p.name}"${persona.profile === p.name ? ' selected' : ''}>${p.name}</option>`).join('')}
        </select>
        <button class="persona-delete-btn" data-idx="${idx}" title="Delete Persona">&#128465;</button>
      </div>
      <textarea class="persona-bio-input" placeholder="Bio" data-idx="${idx}">${persona.bio || ''}</textarea>
      <textarea class="persona-goals-input" placeholder="Goals" data-idx="${idx}">${persona.goals || ''}</textarea>
      <textarea class="persona-frustrations-input" placeholder="Frustrations" data-idx="${idx}">${persona.frustrations || ''}</textarea>
      <input type="text" class="persona-avatar-input" placeholder="Avatar URL (optional)" value="${persona.avatar || ''}" data-idx="${idx}" />
      <button class="persona-save-btn" data-idx="${idx}">Save</button>
      <div class="persona-journeys-section">
        <div class="persona-journeys-title">User Stories</div>
        <ul class="persona-journey-list" data-idx="${idx}"></ul>
        <div class="add-journey-inline">
          <input type="text" class="add-journey-action" placeholder="Wants to..." data-idx="${idx}" />
          <input type="text" class="add-journey-benefit" placeholder="So that..." data-idx="${idx}" style="display:none;" />
          <button class="add-journey-btn" data-idx="${idx}">Add Story</button>
        </div>
      </div>
    `;
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
  personaContainer.appendChild(addPersonaCard);
  // Attach event handlers for persona editing, saving, deleting, add story, and benefit field
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
      journeys.push({
        id: generateId(),
        personaId: persona.id,
        action,
        benefit,
        title,
        code: `US${journeys.length + 1}`,
        scenarios: [{ name: 'Scenario 1', scenarioText: '<h3>Scenario 1</h3><p><strong>Given</strong> ...<br><strong>When</strong> ...<br><strong>Then</strong> ...</p>' }]
      });
      saveToLocalStorage();
      actionInput.value = '';
      benefitInput.value = '';
      benefitInput.style.display = 'none';
      renderAll();
    };
  });
  tabContent.appendChild(personaContainer);
} 