// features/editor/dependencies.js
import { stepLibrary } from '../../ui/tabs/stepLibrary.js';

export function addStepDependency(stepIdx, dependencyStepIdx, condition) {
  if (!window.editingScenario.steps[stepIdx].dependencies) {
    window.editingScenario.steps[stepIdx].dependencies = [];
  }
  window.editingScenario.steps[stepIdx].dependencies.push({ stepId: dependencyStepIdx, condition });
}

export function renderStepDependencies(stepIdx, renderAll) {
  const step = window.editingScenario.steps[stepIdx];
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
    showAddDependencyModal(stepIdx, renderAll);
  };

  dependenciesDiv.appendChild(addDepBtn);
  return dependenciesDiv;
}

export function showAddDependencyModal(stepIdx, renderAll) {
  const modalBg = document.createElement('div');
  modalBg.className = 'modal-bg';
  modalBg.onclick = (e) => { if (e.target === modalBg) document.body.removeChild(modalBg); };

  const modal = document.createElement('div');
  modal.className = 'modal';
  modal.innerHTML = `
    <h3>Add Step Dependency</h3>
    <form id="addDependencyForm">
      <label for="dependencyStep">Dependent Step:</label>
      <select id="dependencyStep" required>
        ${window.editingScenario.steps.map((step, idx) =>
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
    </form>`;

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

