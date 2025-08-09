// User Profiles tab module: renders the user profiles list and add button
export function renderUserProfilesTab(tabContent, userProfiles, saveToLocalStorage, renderAll) {
  const list = document.createElement('ul');
  list.className = 'profile-list';
  userProfiles.forEach((profile, idx) => {
    const li = document.createElement('li');
    li.textContent = profile.name;
    list.appendChild(li);
  });
  tabContent.appendChild(list);
  const addDiv = document.createElement('div');
  addDiv.style.marginTop = '12px';
  const input = document.createElement('input');
  input.type = 'text';
  input.placeholder = 'Add new profile';
  input.maxLength = 20;
  const btn = document.createElement('button');
  btn.textContent = 'Add Profile';
  btn.onclick = function() {
    const name = input.value.trim();
    if (!name) return;
    userProfiles.push({ name });
    saveToLocalStorage();
    renderAll();
  };
  addDiv.appendChild(input);
  addDiv.appendChild(btn);
  tabContent.appendChild(addDiv);
} 