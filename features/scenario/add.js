// features/scenario/add.js
export function showAddScenarioModal(journeyIdx, addNewScenario) {
  const modalBg = document.createElement('div');
  modalBg.className = 'modal-bg';
  modalBg.onclick = (e) => { if (e.target === modalBg) document.body.removeChild(modalBg); };

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
    </form>`;

  modal.querySelector('#addScenarioForm').onsubmit = (e) => {
    e.preventDefault();
    const title = modal.querySelector('#scenarioTitle').value.trim();
    const description = modal.querySelector('#scenarioDescription').value.trim();
    const type = modal.querySelector('#scenarioType').value;
    const template = modal.querySelector('#scenarioTemplate').value;
    if (!title) { alert('Please enter a scenario title'); return; }
    addNewScenario(journeyIdx, title, description, type, template);
    document.body.removeChild(modalBg);
  };

  modalBg.appendChild(modal);
  document.body.appendChild(modalBg);
}

export function addNewScenario(journey, journeyIdx, title, description, type, template, saveToLocalStorage, renderAll, showAppDataFeedback) {
  if (window.trancescriptMetrics) window.trancescriptMetrics.trackScenarioCreated();
  const newScenarioId = `scenario${journey.scenarios.length + 1}`;

  const templateSteps = {
    'login-flow': [
      { id: 'access-home', params: { page: 'Home' } },
      { id: 'click-login-button', params: { page: 'Home' } },
      { id: 'enter-credentials', params: { page: 'Login', username: 'user@example.com', password: 'password123' } },
      { id: 'submit-login', params: { page: 'Login' } },
      { id: 'verify-login-success', params: { page: 'Dashboard' } }
    ],
    'upload-process': [
      { id: 'access-upload-page', params: { page: 'Upload' } },
      { id: 'select-file', params: { page: 'Upload', 'file-type': 'document' } },
      { id: 'add-metadata', params: { page: 'Upload', 'metadata-type': 'title-description' } },
      { id: 'set-visibility', params: { page: 'Upload', visibility: 'public' } },
      { id: 'publish-content', params: { page: 'Upload' } }
    ],
    'search-flow': [
      { id: 'access-search', params: { page: 'Search' } },
      { id: 'enter-search-query', params: { page: 'Search', 'search-term': 'example query' } },
      { id: 'apply-filters', params: { page: 'Search', 'filter-type': 'date-category' } },
      { id: 'view-results', params: { page: 'Search Results' } },
      { id: 'select-result', params: { page: 'Search Results' } }
    ],
    'payment-process': [
      { id: 'access-checkout', params: { page: 'Checkout' } },
      { id: 'enter-payment-details', params: { page: 'Checkout', 'payment-method': 'credit-card' } },
      { id: 'validate-payment', params: { page: 'Checkout' } },
      { id: 'confirm-purchase', params: { page: 'Checkout' } },
      { id: 'receive-confirmation', params: { page: 'Confirmation' } }
    ],
    'error-handling': [
      { id: 'trigger-error-condition', params: { page: 'Any Page' } },
      { id: 'display-error-message', params: { page: 'Error Page', 'error-type': 'validation' } },
      { id: 'provide-error-details', params: { page: 'Error Page' } },
      { id: 'suggest-solution', params: { page: 'Error Page' } },
      { id: 'allow-retry', params: { page: 'Error Page' } }
    ]
  };

  const newScenario = {
    id: newScenarioId,
    title,
    description,
    type,
    steps: template && templateSteps[template] ? templateSteps[template] : [ { id: 'access-home', params: { page: 'Home' } } ]
  };

  journey.scenarios.push(newScenario);
  // Select the new scenario
  window.selectedScenario = journey.scenarios.length - 1;
  saveToLocalStorage();
  renderAll();
  if (typeof showAppDataFeedback === 'function') showAppDataFeedback('New scenario added successfully' + (template ? ` with ${template.replace('-', ' ')} template` : '') + '!');
}

