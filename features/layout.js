// features/layout.js
export function initSidebarMinimize(renderSidebar) {
  document.addEventListener('DOMContentLoaded', function() {
    const sidebar = document.querySelector('.sidebar');
    function updateChevron() {
      const btn = document.getElementById('minimizeSidebarBtn');
      if (!btn) return;
      btn.innerHTML = sidebar.classList.contains('minimized')
        ? `<svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 7l-3 3 3 3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`
        : `<svg width="18" height="18" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M7 10l3 3 3-3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
    }
    function toggleSidebarMinimized() {
      sidebar.classList.toggle('minimized');
      renderSidebar();
      updateChevron();
    }
    function setupMinimizeBtn() {
      const btn = document.getElementById('minimizeSidebarBtn');
      if (!btn) return;
      btn.onclick = toggleSidebarMinimized;
      updateChevron();
    }
    setupMinimizeBtn();
    const origRenderAll = window.renderAll;
    window.renderAll = function() {
      origRenderAll();
      setupMinimizeBtn();
    };
    function setupMinimizeBtnSettings() {
      const btn = document.getElementById('minimizeSidebarBtnSettings');
      if (!btn) return;
      btn.onclick = function() { toggleSidebarMinimized(); };
    }
    setupMinimizeBtnSettings();
  });
}

