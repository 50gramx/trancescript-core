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

export function renderPagesTab(tabContent, appDetails, saveToLocalStorage, renderAll) {
  if (!appDetails.pages) appDetails.pages = [];
  // Migrate old string array to array of {code, name}
  if (appDetails.pages.length && typeof appDetails.pages[0] === 'string') {
    appDetails.pages = appDetails.pages.map((name, idx) => ({
      code: 'EAIP' + (1001 + idx),
      name
    }));
    saveToLocalStorage();
  }
  const container = document.createElement('div');
  container.className = 'pages-tab';
  container.innerHTML = `<h3>Pages</h3>`;
  const list = document.createElement('ul');
  appDetails.pages.forEach((page, idx) => {
    const li = document.createElement('li');
    // Codename (readonly)
    const codeSpan = document.createElement('span');
    codeSpan.textContent = page.code;
    codeSpan.style.marginRight = '12px';
    codeSpan.style.fontWeight = 'bold';
    li.appendChild(codeSpan);
    // Page name (editable)
    const input = document.createElement('input');
    input.type = 'text';
    input.value = page.name;
    input.oninput = function() {
      appDetails.pages[idx].name = input.value;
      saveToLocalStorage();
    };
    li.appendChild(input);
    const delBtn = document.createElement('button');
    delBtn.textContent = '✕';
    delBtn.title = 'Delete page';
    delBtn.onclick = function() {
      appDetails.pages.splice(idx, 1);
      saveToLocalStorage();
      renderAll();
    };
    li.appendChild(delBtn);
    list.appendChild(li);
  });
  container.appendChild(list);
  // Add new page
  const addDiv = document.createElement('div');
  const addInput = document.createElement('input');
  addInput.type = 'text';
  addInput.placeholder = 'New page name';
  const addBtn = document.createElement('button');
  addBtn.textContent = '+ Add Page';
  addBtn.onclick = function() {
    const name = addInput.value.trim();
    if (name && !appDetails.pages.some(p => p.name === name)) {
      // Generate next code
      let nextNum = 1001;
      if (appDetails.pages.length > 0) {
        const nums = appDetails.pages.map(p => parseInt((p.code||'').replace('EAIP',''))).filter(n => !isNaN(n));
        if (nums.length) nextNum = Math.max(...nums) + 1;
      }
      const code = 'EAIP' + nextNum;
      appDetails.pages.push({ code, name });
      saveToLocalStorage();
      renderAll();
    }
    addInput.value = '';
  };
  addDiv.appendChild(addInput);
  addDiv.appendChild(addBtn);
  container.appendChild(addDiv);
  tabContent.appendChild(container);
}

const PROTOBUF_TYPES = [
  'double', 'float', 'int32', 'int64', 'uint32', 'uint64', 'sint32', 'sint64',
  'fixed32', 'fixed64', 'sfixed32', 'sfixed64', 'bool', 'string', 'bytes', 'enum'
];
function is64BitType(type) {
  return ['int64','uint64','sint64','fixed64','sfixed64'].includes(type);
}
export function renderAppVariablesTab(tabContent, appDetails, saveToLocalStorage, renderAll) {
  if (!appDetails.appVariables) appDetails.appVariables = [];
  const container = document.createElement('div');
  container.className = 'app-variables-tab';
  container.innerHTML = `<h3>App Variables</h3>`;
  // List
  const list = document.createElement('table');
  list.style.width = '100%';
  list.innerHTML = `<tr><th>Code</th><th>Name</th><th>Type</th><th>Description</th><th>Default Value</th><th>Enum Values</th><th></th></tr>`;
  appDetails.appVariables.forEach((v, idx) => {
    const tr = document.createElement('tr');
    // Code (readonly)
    const codeTd = document.createElement('td');
    codeTd.textContent = v.code;
    tr.appendChild(codeTd);
    // Name
    const nameTd = document.createElement('td');
    const nameInput = document.createElement('input');
    nameInput.type = 'text';
    nameInput.value = v.name;
    nameInput.oninput = function() {
      v.name = nameInput.value;
      saveToLocalStorage();
    };
    nameTd.appendChild(nameInput);
    tr.appendChild(nameTd);
    // Type
    const typeTd = document.createElement('td');
    const typeSelect = document.createElement('select');
    PROTOBUF_TYPES.forEach(t => {
      const opt = document.createElement('option');
      opt.value = t;
      opt.textContent = t;
      if (v.type === t) opt.selected = true;
      typeSelect.appendChild(opt);
    });
    typeSelect.onchange = function() {
      v.type = typeSelect.value;
      if (v.type !== 'enum') v.enumValues = [];
      if (v.type === 'bool') v.defaultValue = 'false';
      else if (v.type === 'enum') v.defaultValue = '';
      else if (is64BitType(v.type)) v.defaultValue = '';
      else if (['double','float','int32','uint32','sint32','fixed32','sfixed32'].includes(v.type)) v.defaultValue = 0;
      else if (v.type === 'string' || v.type === 'bytes') v.defaultValue = '';
      saveToLocalStorage();
      renderAll();
    };
    typeTd.appendChild(typeSelect);
    tr.appendChild(typeTd);
    // Description
    const descTd = document.createElement('td');
    const descInput = document.createElement('input');
    descInput.type = 'text';
    descInput.value = v.description || '';
    descInput.placeholder = 'Description';
    descInput.oninput = function() {
      v.description = descInput.value;
      saveToLocalStorage();
    };
    descTd.appendChild(descInput);
    tr.appendChild(descTd);
    // Default Value
    const defTd = document.createElement('td');
    if (v.type === 'bool') {
      const defSelect = document.createElement('select');
      ['false','true'].forEach(val => {
        const opt = document.createElement('option');
        opt.value = val;
        opt.textContent = val;
        if ((v.defaultValue === true && val === 'true') || (v.defaultValue === false && val === 'false') || v.defaultValue === val) opt.selected = true;
        defSelect.appendChild(opt);
      });
      defSelect.onchange = function() {
        v.defaultValue = defSelect.value === 'true';
        saveToLocalStorage();
      };
      defTd.appendChild(defSelect);
    } else if (v.type === 'enum') {
      const defSelect = document.createElement('select');
      (v.enumValues || []).forEach(val => {
        const opt = document.createElement('option');
        opt.value = val;
        opt.textContent = val;
        if (v.defaultValue === val) opt.selected = true;
        defSelect.appendChild(opt);
      });
      defSelect.onchange = function() {
        v.defaultValue = defSelect.value;
        saveToLocalStorage();
      };
      defTd.appendChild(defSelect);
    } else if (is64BitType(v.type)) {
      const defInput = document.createElement('input');
      defInput.type = 'text';
      defInput.value = v.defaultValue || '';
      defInput.placeholder = 'Enter integer as string';
      defInput.oninput = function() {
        v.defaultValue = defInput.value;
        saveToLocalStorage();
      };
      defTd.appendChild(defInput);
    } else if (['double','float','int32','uint32','sint32','fixed32','sfixed32'].includes(v.type)) {
      const defInput = document.createElement('input');
      defInput.type = 'number';
      defInput.value = v.defaultValue || 0;
      defInput.oninput = function() {
        const val = defInput.value;
        v.defaultValue = val === '' ? 0 : Number(val);
        saveToLocalStorage();
      };
      defTd.appendChild(defInput);
    } else if (v.type === 'string' || v.type === 'bytes') {
      const defInput = document.createElement('input');
      defInput.type = 'text';
      defInput.value = v.defaultValue || '';
      defInput.placeholder = v.type === 'bytes' ? 'Base64 string' : '';
      defInput.oninput = function() {
        v.defaultValue = defInput.value;
        saveToLocalStorage();
      };
      defTd.appendChild(defInput);
    }
    tr.appendChild(defTd);
    // Enum values
    const enumTd = document.createElement('td');
    if (v.type === 'enum') {
      const enumInput = document.createElement('input');
      enumInput.type = 'text';
      enumInput.value = (v.enumValues || []).join(', ');
      enumInput.placeholder = 'Comma-separated values';
      enumInput.oninput = function() {
        v.enumValues = enumInput.value.split(',').map(s => s.trim()).filter(Boolean);
        if (!v.enumValues.includes(v.defaultValue)) v.defaultValue = '';
        saveToLocalStorage();
        renderAll();
      };
      enumTd.appendChild(enumInput);
    }
    tr.appendChild(enumTd);
    // Delete
    const delTd = document.createElement('td');
    const delBtn = document.createElement('button');
    delBtn.textContent = '✕';
    delBtn.title = 'Delete variable';
    delBtn.onclick = function() {
      appDetails.appVariables.splice(idx, 1);
      saveToLocalStorage();
      renderAll();
    };
    delTd.appendChild(delBtn);
    tr.appendChild(delTd);
    list.appendChild(tr);
  });
  container.appendChild(list);
  // Add new variable
  const addDiv = document.createElement('div');
  addDiv.style.marginTop = '16px';
  const addName = document.createElement('input');
  addName.type = 'text';
  addName.placeholder = 'Variable name';
  const addType = document.createElement('select');
  PROTOBUF_TYPES.forEach(t => {
    const opt = document.createElement('option');
    opt.value = t;
    opt.textContent = t;
    addType.appendChild(opt);
  });
  const addDesc = document.createElement('input');
  addDesc.type = 'text';
  addDesc.placeholder = 'Description (optional)';
  const addEnum = document.createElement('input');
  addEnum.type = 'text';
  addEnum.placeholder = 'Enum values (comma separated)';
  addEnum.style.display = 'none';
  let addDefault = document.createElement('input');
  addDefault.type = 'text';
  addDefault.placeholder = 'Default value';
  function updateAddDefaultInput() {
    const parent = addDefault.parentNode;
    if (parent) parent.removeChild(addDefault);
    if (addType.value === 'bool') {
      addDefault = document.createElement('select');
      ['false','true'].forEach(val => {
        const opt = document.createElement('option');
        opt.value = val;
        opt.textContent = val;
        addDefault.appendChild(opt);
      });
    } else if (addType.value === 'enum') {
      addDefault = document.createElement('select');
      const vals = addEnum.value.split(',').map(s => s.trim()).filter(Boolean);
      vals.forEach(val => {
        const opt = document.createElement('option');
        opt.value = val;
        opt.textContent = val;
        addDefault.appendChild(opt);
      });
      addEnum.oninput = function() {
        while (addDefault.firstChild) addDefault.removeChild(addDefault.firstChild);
        const vals = addEnum.value.split(',').map(s => s.trim()).filter(Boolean);
        vals.forEach(val => {
          const opt = document.createElement('option');
          opt.value = val;
          opt.textContent = val;
          addDefault.appendChild(opt);
        });
      };
    } else if (is64BitType(addType.value)) {
      addDefault = document.createElement('input');
      addDefault.type = 'text';
      addDefault.placeholder = 'Enter integer as string';
    } else if (['double','float','int32','uint32','sint32','fixed32','sfixed32'].includes(addType.value)) {
      addDefault = document.createElement('input');
      addDefault.type = 'number';
      addDefault.placeholder = 'Default value';
    } else if (addType.value === 'string' || addType.value === 'bytes') {
      addDefault = document.createElement('input');
      addDefault.type = 'text';
      addDefault.placeholder = addType.value === 'bytes' ? 'Base64 string' : 'Default value';
    }
    addDiv.insertBefore(addDefault, addBtn);
  }
  addType.onchange = function() {
    addEnum.style.display = addType.value === 'enum' ? '' : 'none';
    updateAddDefaultInput();
  };
  const addBtn = document.createElement('button');
  addBtn.textContent = '+ Add Variable';
  addBtn.onclick = function() {
    const name = addName.value.trim();
    const type = addType.value;
    const description = addDesc.value.trim();
    const enumValues = type === 'enum' ? addEnum.value.split(',').map(s => s.trim()).filter(Boolean) : [];
    let defaultValue = '';
    if (type === 'bool') defaultValue = addDefault.value === 'true';
    else if (type === 'enum') defaultValue = addDefault.value;
    else if (is64BitType(type)) defaultValue = addDefault.value;
    else if (['double','float','int32','uint32','sint32','fixed32','sfixed32'].includes(type)) defaultValue = addDefault.value === '' ? 0 : Number(addDefault.value);
    else if (type === 'string' || type === 'bytes') defaultValue = addDefault.value;
    if (!name) return;
    // Generate code: EAIV1001, EAIV1002, ...
    let nextNum = 1001;
    if (appDetails.appVariables.length > 0) {
      const nums = appDetails.appVariables.map(v => parseInt((v.code||'').replace('EAIV',''))).filter(n => !isNaN(n));
      if (nums.length) nextNum = Math.max(...nums) + 1;
    }
    const code = 'EAIV' + nextNum;
    appDetails.appVariables.push({ code, name, type, description, enumValues, defaultValue });
    saveToLocalStorage();
    renderAll();
    addName.value = '';
    addDesc.value = '';
    addEnum.value = '';
    if (addDefault) addDefault.value = '';
  };
  addDiv.appendChild(addName);
  addDiv.appendChild(addType);
  addDiv.appendChild(addDesc);
  addDiv.appendChild(addEnum);
  addDiv.appendChild(addDefault);
  addDiv.appendChild(addBtn);
  // Now call updateAddDefaultInput so addBtn exists
  updateAddDefaultInput();
  container.appendChild(addDiv);
  tabContent.appendChild(container);
} 