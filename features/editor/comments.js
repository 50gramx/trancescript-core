// features/editor/comments.js
export function renderStepComments(stepIdx) {
  const step = window.editingScenario.steps[stepIdx];
  const commentsDiv = document.createElement('div');
  commentsDiv.style.marginTop = '10px';

  const title = document.createElement('label');
  title.textContent = 'Step Notes:';
  title.style.display = 'block';
  title.style.marginBottom = '5px';
  title.style.fontWeight = '500';
  commentsDiv.appendChild(title);

  const commentTextarea = document.createElement('textarea');
  commentTextarea.name = `step-notes-${stepIdx}`;
  commentTextarea.value = step.comments || '';
  commentTextarea.placeholder = 'Add notes, comments, or documentation for this step...';
  commentTextarea.style.cssText = `
    width: 100%;
    min-height: 60px;
    padding: 8px;
    border: 1px solid var(--color-card-border);
    border-radius: 4px;
    background: var(--color-bg);
    color: var(--color-text);
  `;
  commentTextarea.oninput = () => { step.comments = commentTextarea.value; };

  commentsDiv.appendChild(commentTextarea);
  return commentsDiv;
}

