// features/editor/stepListItem.js
import { stepLibrary } from '../../ui/tabs/stepLibrary.js';
import { renderStepDependencies } from './dependencies.js';
import { renderStepComments } from './comments.js';

export function renderStepListItem(step, stepIdx, appDetails, renderAll) {
  const stepDiv = document.createElement('div');
  stepDiv.className = 'step-item';

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

  const header = document.createElement('div');
  header.style.display = 'flex';
  header.style.justifyContent = 'space-between';
  header.style.alignItems = 'center';
  header.style.marginBottom = '10px';

  const stepNumber = document.createElement('span');
  stepNumber.textContent = `Step ${stepIdx + 1}`;
  stepNumber.style.fontWeight = 'bold';
  stepNumber.style.color = 'var(--color-primary)';

  const actions = document.createElement('div');
  actions.style.display = 'flex';
  actions.style.gap = '5px';

  if (stepIdx > 0) {
    const up = document.createElement('button');
    up.textContent = '↑';
    up.style.padding = '4px 8px';
    up.style.fontSize = '12px';
    up.onclick = () => {
      const temp = window.editingScenario.steps[stepIdx];
      window.editingScenario.steps[stepIdx] = window.editingScenario.steps[stepIdx - 1];
      window.editingScenario.steps[stepIdx - 1] = temp;
      renderAll();
    };
    actions.appendChild(up);
  }
  if (stepIdx < window.editingScenario.steps.length - 1) {
    const down = document.createElement('button');
    down.textContent = '↓';
    down.style.padding = '4px 8px';
    down.style.fontSize = '12px';
    down.onclick = () => {
      const temp = window.editingScenario.steps[stepIdx];
      window.editingScenario.steps[stepIdx] = window.editingScenario.steps[stepIdx + 1];
      window.editingScenario.steps[stepIdx + 1] = temp;
      renderAll();
    };
    actions.appendChild(down);
  }

  const del = document.createElement('button');
  del.textContent = '×';
  del.style.padding = '4px 8px';
  del.style.fontSize = '12px';
  del.style.background = 'var(--color-error)';
  del.style.color = 'white';
  del.style.border = 'none';
  del.style.borderRadius = '4px';
  del.onclick = () => { window.editingScenario.steps.splice(stepIdx, 1); renderAll(); };
  actions.appendChild(del);

  header.appendChild(stepNumber);
  header.appendChild(actions);
  stepDiv.appendChild(header);

  // Dependencies and comments
  stepDiv.appendChild(renderStepDependencies(stepIdx, renderAll));
  stepDiv.appendChild(renderStepComments(stepIdx));

  return stepDiv;
}

