export function getStepTypeColor(stepType) {
  const colors = {
    'Given': '#10b981',
    'When': '#3b82f6',
    'Then': '#f59e0b',
    'And': '#8b5cf6',
    'But': '#ef4444'
  };
  return colors[stepType] || '#6b7280';
}

export function getParameterColor(paramType) {
  const colors = {
    'page': '#10b981',
    'string': '#f59e0b',
    'number': '#8b5cf6',
    'boolean': '#ef4444'
  };
  return colors[paramType] || '#6b7280';
}

