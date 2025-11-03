document.addEventListener('DOMContentLoaded', () => {
  const stocksData = JSON.parse(stockContent);
  const userData   = JSON.parse(userContent);

  const userListEl      = document.querySelector('.user-list');
  const portfolioListEl = document.querySelector('.portfolio-list');

  const idEl      = document.querySelector('#userID');
  const firstEl   = document.querySelector('#firstname');
  const lastEl    = document.querySelector('#lastname');
  const addressEl = document.querySelector('#address');
  const cityEl    = document.querySelector('#city');
  const emailEl   = document.querySelector('#email');

  const saveBtn   = document.querySelector('#btnSave');
  const deleteBtn = document.querySelector('#btnDelete');

  const logoEl        = document.querySelector('#logo');
  const stockNameEl   = document.querySelector('#stockName');
  const stockSectorEl = document.querySelector('#stockSector');
  const stockIndEl    = document.querySelector('#stockIndustry');
  const stockAddrEl   = document.querySelector('#stockAddress');

  let currentUserId = null;

  function generateUserList(users) {
    userListEl.innerHTML = '';
    users.forEach(({ user, id }) => {
      const li = document.createElement('li');
      li.id = id;
      li.textContent = `${user.lastname}, ${user.firstname}`;
      if (String(id) === String(currentUserId)) li.style.fontWeight = '700';
      userListEl.appendChild(li);
    });
  }

  function populateForm(data) {
    const { user, id } = data;
    idEl.value      = id ?? '';
    firstEl.value   = user?.firstname ?? '';
    lastEl.value    = user?.lastname ?? '';
    addressEl.value = user?.address ?? '';
    cityEl.value    = user?.city ?? '';
    emailEl.value   = user?.email ?? '';
  }

  function renderPortfolio(selectedUser) {
    portfolioListEl.innerHTML = `
      <h3>Symbol</h3>
      <h3># Shares</h3>
      <h3>Actions</h3>
    `;
    (selectedUser?.portfolio ?? []).forEach(({ symbol, owned }) => {
      const s = document.createElement('p');
      s.textContent = symbol;
      const o = document.createElement('p');
      o.textContent = owned;
      const b = document.createElement('button');
      b.textContent = 'View';
      b.dataset.symbol = symbol;
      portfolioListEl.appendChild(s);
      portfolioListEl.appendChild(o);
      portfolioListEl.appendChild(b);
    });
  }

  function viewStock(symbol) {
    const stock = stocksData.find(s => s.symbol == symbol);
    if (!stock) return;
    stockNameEl.textContent   = stock.name || '';
    stockSectorEl.textContent = stock.sector || '';
    stockIndEl.textContent    = stock.subIndustry || '';
    stockAddrEl.textContent   = stock.address || '';

   
    logoEl.src = `logos/${symbol}.svg`;
    logoEl.alt = symbol;
    logoEl.onerror = () => {
      logoEl.removeAttribute('src');
    };
  }

  userListEl.addEventListener('click', (e) => {
    if (e.target.tagName !== 'LI') return;
    const id = e.target.id;
    const selected = userData.find(u => u.id == id);
    if (!selected) return;
    currentUserId = id;
    populateForm(selected);
    renderPortfolio(selected);
    generateUserList(userData);
  });

  portfolioListEl.addEventListener('click', (e) => {
    if (e.target.tagName !== 'BUTTON') return;
    viewStock(e.target.dataset.symbol);
  });

  saveBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const id = idEl.value;
    if (!id) return;
    const idx = userData.findIndex(u => u.id == id);
    if (idx === -1) return;
    userData[idx].user.firstname = firstEl.value;
    userData[idx].user.lastname  = lastEl.value;
    userData[idx].user.address   = addressEl.value;
    userData[idx].user.city      = cityEl.value;
    userData[idx].user.email     = emailEl.value;
    generateUserList(userData);
  });

  deleteBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const id = idEl.value;
    if (!id) return;
    const idx = userData.findIndex(u => u.id == id);
    if (idx === -1) return;
    userData.splice(idx, 1);
    currentUserId = null;

    idEl.value = firstEl.value = lastEl.value = addressEl.value = cityEl.value = emailEl.value = '';
    portfolioListEl.innerHTML = `
      <h3>Symbol</h3>
      <h3># Shares</h3>
      <h3>Actions</h3>
    `;
    logoEl.removeAttribute('src');
    stockNameEl.textContent = stockSectorEl.textContent = stockIndEl.textContent = stockAddrEl.textContent = '';
    generateUserList(userData);
  });

  generateUserList(userData);

  if (userData.length) {
    const first = userData[0];
    currentUserId = first.id;
    populateForm(first);
    renderPortfolio(first);
    generateUserList(userData);
  }
});
