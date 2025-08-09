// General tab module: renders the app details form
export function renderGeneralTab(tabContent, appDetails, saveToLocalStorage, renderAll) {
  const form = document.createElement('form');
  form.className = 'app-editor';
  form.innerHTML = `
    <label>App Name<input type="text" id="appNameInput" value="${appDetails.name || ''}" maxlength="40" /></label>
    <label>Description<textarea id="appDescInput" maxlength="200">${appDetails.description || ''}</textarea></label>
    <label>App Code<input type="text" id="appKeyInput" value="${appDetails.appKey || ''}" maxlength="4" style="text-transform:uppercase;" /></label>
    <button type="submit" class="save-btn">Save App Details</button>
  `;
  form.onsubmit = function(e) {
    e.preventDefault();
    appDetails.name = form.querySelector('#appNameInput').value.trim();
    appDetails.description = form.querySelector('#appDescInput').value.trim();
    appDetails.appKey = form.querySelector('#appKeyInput').value.trim().toUpperCase();
    saveToLocalStorage();
    renderAll();
  };
  tabContent.appendChild(form);
} 