// core/storage.js - Local storage helpers with stable window API

export function getCurrentAppData(appDetails, userProfiles, personas, journeys) {
  return { appDetails, userProfiles, personas, journeys };
}

export function saveToLocalStorage(appDetails, userProfiles, personas, journeys) {
  try {
    const data = getCurrentAppData(appDetails, userProfiles, personas, journeys);
    localStorage.setItem('prototyperAppData', JSON.stringify(data));
  } catch (_) {
    // ignore
  }
}

export function loadFromLocalStorage() {
  try {
    const data = localStorage.getItem('prototyperAppData');
    if (!data) return null;
    const parsed = JSON.parse(data);
    if (parsed && parsed.appDetails && parsed.userProfiles && parsed.personas && parsed.journeys) {
      return parsed;
    }
  } catch (_) {}
  return null;
}

