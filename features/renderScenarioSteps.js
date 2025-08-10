// features/renderScenarioSteps.js
import { getStepTypeColor, getParameterColor } from '../core/ui-utils.js';

export function renderScenarioSteps(scenario) {
  if (!scenario || !scenario.steps) return '';

  return scenario.steps.map((step, index) => {
    const stepDef = window.stepLibrary.find(s => s.id === step.id);
    if (!stepDef) return `<div class="step-item">Step ${index + 1}: Unknown step</div>`;

    let stepContent = stepDef.template;
    const stepType = stepDef.type.toLowerCase();
    const stepColor = getStepTypeColor(stepType);

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
            tooltipContent = `<div class="tooltip-content"><div class="tooltip-header">📄 Page Parameter</div><div class="tooltip-details"><div><strong>Name:</strong> ${key}</div><div><strong>Value:</strong> ${paramValue}</div><div><strong>Type:</strong> Page Reference${paramInfo}</div></div></div>`;
          } else if (paramType === 'variable') {
            const varDef = window.appData.appDetails.appVariables.find(v => v.name === paramValue);
            paramInfo = varDef ? ` (${varDef.code})` : '';
            tooltipContent = `<div class="tooltip-content"><div class="tooltip-header">🔧 Variable Parameter</div><div class="tooltip-details"><div><strong>Name:</strong> ${key}</div><div><strong>Value:</strong> ${paramValue}</div><div><strong>Type:</strong> ${varDef?.type || 'Unknown'}${paramInfo}</div></div></div>`;
          } else {
            tooltipContent = `<div class="tooltip-content"><div class="tooltip-header">📝 ${paramType.charAt(0).toUpperCase() + paramType.slice(1)} Parameter</div><div class="tooltip-details"><div><strong>Name:</strong> ${key}</div><div><strong>Value:</strong> ${paramValue}</div><div><strong>Type:</strong> ${paramType.charAt(0).toUpperCase() + paramType.slice(1)}</div></div></div>`;
          }
        } else {
          tooltipContent = `<div class="tooltip-content"><div class="tooltip-header">🔧 Parameter</div><div class="tooltip-details"><div><strong>Name:</strong> ${key}</div><div><strong>Value:</strong> ${paramValue}</div><div><strong>Type:</strong> Unknown</div></div></div>`;
        }

        const paramClass = paramDef?.type === 'page' ? 'page-parameter'
          : paramDef?.type === 'variable' ? 'variable-parameter'
          : paramDef?.type === 'string' ? 'string-parameter'
          : paramDef?.type === 'number' ? 'number-parameter'
          : paramDef?.type === 'boolean' ? 'boolean-parameter' : 'parameter-highlight';

        const highlightedParam = `<span class="${paramClass} parameter-tooltip" style="background: ${getParameterColor(paramDef?.type || 'string')};">${paramValue}</span>`;
        stepContent = stepContent.replace(`{${key}}`, highlightedParam);
      });
    }

    return `
      <div class="step-item" style="border-left: 4px solid ${stepColor}; padding: 10px 12px; margin: 8px 0;">
        <div class="step-content">
          <span class="step-title">${stepDef.type}:</span>
          <span class="step-text">${stepContent}</span>
        </div>
      </div>
    `;
  }).join('');
}

