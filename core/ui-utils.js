export function getStepTypeColor(stepType) {
  const key = String(stepType || '').toLowerCase();
  const colors = {
    given: '#10b981',
    when: '#3b82f6',
    then: '#f59e0b',
    and: '#8b5cf6',
    but: '#ef4444'
  };
  return colors[key] || '#6b7280';
}

export function getParameterColor(paramType) {
  const key = String(paramType || '').toLowerCase();
  const colors = {
    page: '#10b981',
    string: '#f59e0b',
    number: '#8b5cf6',
    boolean: '#ef4444',
    variable: '#3b82f6'
  };
  return colors[key] || '#6b7280';
}

export function getParameterTextColor(paramType) {
  const key = String(paramType || '').toLowerCase();
  const colors = {
    page: '#064e3b',
    string: '#7c2d12',
    number: '#3b0764',
    boolean: '#7f1d1d',
    variable: '#0b3b82'
  };
  return colors[key] || '#111827';
}

