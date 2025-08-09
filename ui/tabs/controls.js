// Controls tab module: renders export, import, theme, and minimize controls
export function renderControlsTab(tabContent, exportAppData, importAppData, toggleDarkMode, minimizeSidebar, renderAll) {
  const controlsDiv = document.createElement('div');
  controlsDiv.className = 'app-controls-section';
  controlsDiv.style.display = 'flex';
  controlsDiv.style.justifyContent = 'flex-start';
  controlsDiv.style.alignItems = 'center';
  controlsDiv.style.gap = '32px';
  // Create buttons and input first
  const saveBtn = document.createElement('button');
  saveBtn.id = 'saveAppDataBtnMain';
  saveBtn.className = 'icon-btn';
  saveBtn.title = 'Export app data';
  saveBtn.innerHTML = `<svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 3v10m0 0l3.5-3.5M10 13l-3.5-3.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><rect x="4" y="15" width="12" height="2" rx="1" fill="currentColor"/></svg> <span style="vertical-align:middle;">Export</span>`;
  const importBtn = document.createElement('button');
  importBtn.id = 'importAppDataBtnMain';
  importBtn.className = 'icon-btn';
  importBtn.title = 'Import app data';
  importBtn.innerHTML = `<svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 17V7m0 0l3.5 3.5M10 7L6.5 10.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><rect x="4" y="15" width="12" height="2" rx="1" fill="currentColor"/></svg> <span style="vertical-align:middle;">Import</span>`;
  const importInput = document.createElement('input');
  importInput.type = 'file';
  importInput.accept = '.json';
  importInput.style.display = 'none';
  const darkModeBtn = document.createElement('button');
  darkModeBtn.id = 'darkModeToggleMain';
  darkModeBtn.className = 'icon-btn';
  darkModeBtn.title = 'Toggle dark mode';
  darkModeBtn.innerHTML = `<span id="moonIconMain" style="display:inline;">&#9789;</span><span id="sunIconMain" style="display:none;">&#9728;</span> <span style="vertical-align:middle;">Theme</span>`;
  const minimizeBtn = document.createElement('button');
  minimizeBtn.id = 'minimizeSidebarBtnSettings';
  minimizeBtn.className = 'icon-btn';
  minimizeBtn.title = 'Minimize sidebar';
  minimizeBtn.innerHTML = `<svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l3 3 3-3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg> <span style="vertical-align:middle;">Minimize</span>`;
  // Helper to create a control block
  function createControlBlock(btn, label, desc, shortcut) {
    const block = document.createElement('div');
    block.style.display = 'flex';
    block.style.flexDirection = 'column';
    block.style.alignItems = 'center';
    block.style.gap = '4px';
    block.appendChild(btn);
    const labelDiv = document.createElement('div');
    labelDiv.innerHTML = `<strong>${label}</strong>`;
    labelDiv.style.marginTop = '4px';
    block.appendChild(labelDiv);
    const descDiv = document.createElement('div');
    descDiv.textContent = desc;
    descDiv.style.color = '#888';
    descDiv.style.fontSize = '0.97em';
    block.appendChild(descDiv);
    const shortcutDiv = document.createElement('div');
    shortcutDiv.innerHTML = `<span style="background:#eee; color:#e94f37; border-radius:4px; padding:2px 6px; margin-top:4px; font-family:monospace;">${shortcut}</span>`;
    block.appendChild(shortcutDiv);
    return block;
  }
  // Create control blocks
  const exportBlock = createControlBlock(
    saveBtn,
    'Export',
    'Download your app data as a JSON file.',
    'Ctrl+E / Alt+E'
  );
  const importBlock = createControlBlock(
    importBtn,
    'Import',
    'Load app data from a JSON file.',
    'Ctrl+I / Alt+I'
  );
  const themeBlock = createControlBlock(
    darkModeBtn,
    'Theme',
    'Toggle between light and dark mode.',
    'Ctrl+D / Alt+D'
  );
  const minimizeBlock = createControlBlock(
    minimizeBtn,
    'Minimize',
    'Collapse or expand the sidebar.',
    'Ctrl+M / Alt+M'
  );
  controlsDiv.appendChild(exportBlock);
  controlsDiv.appendChild(importBlock);
  controlsDiv.appendChild(themeBlock);
  controlsDiv.appendChild(minimizeBlock);
  controlsDiv.appendChild(importInput);
  tabContent.appendChild(controlsDiv);
  // Event handlers
  saveBtn.onclick = exportAppData;
  importBtn.onclick = () => importInput.click();
  importInput.onchange = function(e) {
    if (e.target.files && e.target.files[0]) {
      importAppData(e.target.files[0]);
      importInput.value = '';
    }
  };
  darkModeBtn.onclick = toggleDarkMode;
  minimizeBtn.onclick = minimizeSidebar;
  // Keyboard shortcuts for controls (Ctrl/Alt/Cmd+E, I, D, M)
  document.onkeydown = function(e) {
    if ((e.ctrlKey || e.altKey || e.metaKey) && !e.shiftKey) {
      if (e.key.toLowerCase() === 'e') {
        e.preventDefault();
        exportAppData();
      } else if (e.key.toLowerCase() === 'i') {
        e.preventDefault();
        importInput.click();
      } else if (e.key.toLowerCase() === 'd') {
        e.preventDefault();
        toggleDarkMode();
      } else if (e.key.toLowerCase() === 'm') {
        e.preventDefault();
        minimizeSidebar();
      }
    }
  };
} 