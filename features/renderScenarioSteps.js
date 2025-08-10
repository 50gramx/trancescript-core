// features/renderScenarioSteps.js
import { getStepTypeColor, getParameterColor, getParameterTextColor } from '../core/ui-utils.js';

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

        const highlightedParam = `<span class=\"${paramClass} parameter-tooltip\"
          style=\"background: ${getParameterColor(paramDef?.type || 'string')}; color: ${getParameterTextColor(paramDef?.type || 'string')}; padding: 2px 6px; border-radius: 4px; font-weight: 500; cursor: help; position: relative; display: inline-block;\"
          data-tooltip=\"${encodeURIComponent(tooltipContent)}\"
          onmouseenter=\"showParameterTooltip(event, this)\"
          onmouseleave=\"hideParameterTooltip()\"
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

