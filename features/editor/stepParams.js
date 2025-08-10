// features/editor/stepParams.js
export function createParamInput(param, step, appDetails) {
  let inputEl;
  if (param.type === 'page') {
    inputEl = document.createElement('select');
    inputEl.name = `${param.name}`;
    inputEl.style.width = '100%';
    inputEl.style.padding = '6px';
    inputEl.style.border = '1px solid var(--color-card-border)';
    inputEl.style.borderRadius = '4px';
    inputEl.style.background = 'var(--color-bg)';
    inputEl.style.color = 'var(--color-text)';
    (appDetails?.pages || []).forEach(page => {
      const option = document.createElement('option');
      option.value = page.name;
      option.textContent = page.name;
      if (step.params[param.name] === page.name) option.selected = true;
      inputEl.appendChild(option);
    });
    inputEl.onchange = () => { step.params[param.name] = inputEl.value; };
    return inputEl;
  }

  if (param.type === 'string') {
    inputEl = document.createElement('input');
    inputEl.type = 'text';
    inputEl.name = `${param.name}`;
    inputEl.value = step.params[param.name] || '';
    inputEl.placeholder = param.description || param.name;
    inputEl.style.width = '100%';
    inputEl.style.padding = '6px';
    inputEl.style.border = '1px solid var(--color-card-border)';
    inputEl.style.borderRadius = '4px';
    inputEl.style.background = 'var(--color-bg)';
    inputEl.style.color = 'var(--color-text)';
    inputEl.onchange = () => { step.params[param.name] = inputEl.value; };
    return inputEl;
  }

  if (param.type === 'number') {
    inputEl = document.createElement('input');
    inputEl.type = 'number';
    inputEl.name = `${param.name}`;
    inputEl.value = step.params[param.name] || '';
    inputEl.placeholder = param.description || param.name;
    inputEl.style.width = '100%';
    inputEl.style.padding = '6px';
    inputEl.style.border = '1px solid var(--color-card-border)';
    inputEl.style.borderRadius = '4px';
    inputEl.style.background = 'var(--color-bg)';
    inputEl.style.color = 'var(--color-text)';
    inputEl.onchange = () => { step.params[param.name] = inputEl.value; };
    return inputEl;
  }

  if (param.type === 'bool') {
    inputEl = document.createElement('input');
    inputEl.type = 'checkbox';
    inputEl.name = `${param.name}`;
    inputEl.checked = !!step.params[param.name];
    inputEl.style.marginLeft = '0';
    inputEl.onchange = () => { step.params[param.name] = inputEl.checked; };
    return inputEl;
  }

  // Fallback to text input for unknown types
  inputEl = document.createElement('input');
  inputEl.type = 'text';
  inputEl.name = `${param.name}`;
  inputEl.value = step.params[param.name] || '';
  inputEl.placeholder = param.description || param.name;
  inputEl.style.width = '100%';
  inputEl.style.padding = '6px';
  inputEl.style.border = '1px solid var(--color-card-border)';
  inputEl.style.borderRadius = '4px';
  inputEl.style.background = 'var(--color-bg)';
  inputEl.style.color = 'var(--color-text)';
  inputEl.onchange = () => { step.params[param.name] = inputEl.value; };
  return inputEl;
}

