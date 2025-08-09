import { stepLibrary } from './stepLibrary.js';

export function renderStepLibraryTab(tabContent) {
  tabContent.innerHTML = '';
  const container = document.createElement('div');
  container.style.maxWidth = '600px';
  container.style.margin = '0 auto';
  container.style.padding = '0';
  container.innerHTML = `
    <h2 style="margin-top:0;">Step Library</h2>
    <input type="text" id="stepSearch" placeholder="Search steps..." style="width:100%;padding:8px;margin-bottom:16px;">
    <div id="stepList"></div>
    <div id="stepParams" style="margin-top:24px;"></div>
    <div id="stepResult" style="margin-top:24px;font-weight:bold;"></div>
  `;
  tabContent.appendChild(container);

  const stepListEl = container.querySelector('#stepList');
  const stepParamsEl = container.querySelector('#stepParams');
  const stepResultEl = container.querySelector('#stepResult');
  const searchInput = container.querySelector('#stepSearch');

  let filteredSteps = stepLibrary;
  let selectedStep = null;
  let paramValues = {};

  function renderStepList() {
    stepListEl.innerHTML = '';
    filteredSteps.forEach(step => {
      const div = document.createElement('div');
      div.style.padding = '8px 0';
      div.style.borderBottom = '1px solid #eee';
      div.style.cursor = 'pointer';
      div.innerHTML = `<strong>${step.label}</strong> <span style="color:#888;font-size:0.97em;">(${step.category})</span><br><span style="font-size:0.97em;">${step.template}</span>`;
      div.onclick = () => selectStep(step);
      stepListEl.appendChild(div);
    });
  }

  function selectStep(step) {
    selectedStep = step;
    paramValues = {};
    stepParamsEl.innerHTML = '';
    stepResultEl.innerHTML = '';
    if (!step) return;
    if (step.params.length === 0) {
      stepResultEl.textContent = step.template;
      return;
    }
    stepParamsEl.innerHTML = `<h4>Fill Parameters:</h4>`;
    step.params.forEach(param => {
      const label = document.createElement('label');
      label.textContent = param;
      label.style.display = 'block';
      label.style.marginTop = '8px';
      const input = document.createElement('input');
      input.type = 'text';
      input.style.width = '100%';
      input.style.padding = '6px';
      input.oninput = function() {
        paramValues[param] = input.value;
        renderStepResult();
      };
      label.appendChild(input);
      stepParamsEl.appendChild(label);
    });
  }

  function renderStepResult() {
    if (!selectedStep) return;
    let result = selectedStep.template;
    selectedStep.params.forEach(param => {
      const value = paramValues[param] || '';
      result = result.replace(`{${param}}`, value);
    });
    stepResultEl.textContent = result;
  }

  searchInput.oninput = function() {
    const q = searchInput.value.trim().toLowerCase();
    filteredSteps = stepLibrary.filter(
      step => step.label.toLowerCase().includes(q) || step.category.toLowerCase().includes(q) || step.template.toLowerCase().includes(q)
    );
    renderStepList();
  };

  renderStepList();
}
