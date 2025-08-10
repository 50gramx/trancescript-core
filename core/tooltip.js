// core/tooltip.js - centralize tooltip behavior; attach to window in app.js

export function showParameterTooltip(event, element) {
  const tooltipContent = decodeURIComponent(element.getAttribute('data-tooltip'));
  const existingTooltip = document.querySelector('.parameter-tooltip-popup');
  if (existingTooltip) existingTooltip.remove();

  const tooltip = document.createElement('div');
  tooltip.className = 'parameter-tooltip-popup';
  tooltip.innerHTML = tooltipContent;

  const rect = element.getBoundingClientRect();
  tooltip.style.position = 'fixed';
  tooltip.style.left = rect.left + 'px';
  tooltip.style.top = rect.bottom + 8 + 'px';
  tooltip.style.zIndex = '99999';
  tooltip.style.pointerEvents = 'none';
  document.body.appendChild(tooltip);

  setTimeout(() => {
    const tooltipRect = tooltip.getBoundingClientRect();
    if (tooltipRect.right > window.innerWidth) {
      tooltip.style.left = (window.innerWidth - tooltipRect.width - 10) + 'px';
    }
    if (tooltipRect.bottom > window.innerHeight) {
      tooltip.style.top = (rect.top - tooltipRect.height - 8) + 'px';
    }
  }, 0);
}

export function hideParameterTooltip() {
  const tooltip = document.querySelector('.parameter-tooltip-popup');
  if (tooltip) tooltip.remove();
}

export function showStepTypeTooltip(event, element) {
  const stepId = element.getAttribute('data-step-id');
  const stepCategory = element.getAttribute('data-step-category');
  const stepDescription = element.getAttribute('data-step-description');

  const existingTooltip = document.querySelector('.step-type-tooltip-popup');
  if (existingTooltip) existingTooltip.remove();

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
    </div>`;

  const rect = element.getBoundingClientRect();
  tooltip.style.position = 'fixed';
  tooltip.style.left = rect.left + 'px';
  tooltip.style.top = rect.bottom + 8 + 'px';
  tooltip.style.zIndex = '10000';
  document.body.appendChild(tooltip);

  setTimeout(() => {
    const tooltipRect = tooltip.getBoundingClientRect();
    if (tooltipRect.right > window.innerWidth) {
      tooltip.style.left = (window.innerWidth - tooltipRect.width - 10) + 'px';
    }
    if (tooltipRect.bottom > window.innerHeight) {
      tooltip.style.top = (rect.top - tooltipRect.height - 8) + 'px';
    }
  }, 0);
}

export function hideStepTypeTooltip() {
  const tooltip = document.querySelector('.step-type-tooltip-popup');
  if (tooltip) tooltip.remove();
}

