// core/export-import.js
export function getCurrentAppData(appDetails, userProfiles, personas, journeys) {
  return { appDetails, userProfiles, personas, journeys };
}

export function exportAppData(appDetails, userProfiles, personas, journeys, showFeedback) {
  const data = getCurrentAppData(appDetails, userProfiles, personas, journeys);
  const json = JSON.stringify(data, null, 2);
  const blob = new Blob([json], { type: 'application/json' });
  const appName = (appDetails?.name || 'App').replace(/[^a-z0-9]/gi, '_');
  const now = new Date();
  const pad = n => n.toString().padStart(2, '0');
  const filename = `${appName}-${now.getFullYear()}-${pad(now.getMonth()+1)}-${pad(now.getDate())}-${pad(now.getHours())}-${pad(now.getMinutes())}.json`;
  const a = document.createElement('a');
  a.href = URL.createObjectURL(blob);
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  setTimeout(() => { document.body.removeChild(a); }, 100);
  if (typeof showFeedback === 'function') showFeedback('App data exported!');
}

export function importAppData(file, assignFn, showFeedback) {
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const data = JSON.parse(e.target.result);
      if (!data.appDetails || !data.userProfiles || !data.personas || !data.journeys) {
        if (typeof showFeedback === 'function') showFeedback('Invalid file format.', true);
        return;
      }
      assignFn(data);
      if (typeof showFeedback === 'function') showFeedback('App data imported!');
    } catch(_) {
      if (typeof showFeedback === 'function') showFeedback('Failed to import file.', true);
    }
  };
  reader.readAsText(file);
}

