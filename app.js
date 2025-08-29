document.addEventListener('DOMContentLoaded', () => {
  const stocksData = JSON.parse(typeof stockContent === 'string' ? stockContent : '[]');
  const userData   = JSON.parse(typeof userContent  === 'string' ? userContent  : '[]');

  const userListEl       = document.querySelector('.user-list');
  const portfolioListEl  = document.querySelector('.portfolio-list');
  const stockAreaEl      = document.querySelector('.stock-form');

  const idEl      = document.querySelector('#userID');
  const firstEl   = document.querySelector('#firstname');
  const lastEl    = document.querySelector('#lastname');
  const addressEl = document.querySelector('#address');
  const cityEl    = document.querySelector('#city');
  const emailEl   = document.querySelector('#email');

  const saveBtn   = document.querySelector('#saveButton');
  const deleteBtn = document.querySelector('#deleteButton');

  const stockNameEl     = document.querySelector('#stockName');
  const stockSectorEl   = document.querySelector('#stockSector');
  const stockIndustryEl = document.querySelector('#stockIndustry');
  const stockAddrEl     = document.querySelector('#stockAddress');
  const logoImgEl       = document.querySelector('#logo');

  function generateUserList(users, stocks) {
    if (!userListEl) return;
    userListEl.innerHTML = '';
    users.forEach(({ user, id }) => {
      const li = document.createElement('li');
      li.textContent = `${user.lastname}, ${user.firstname}`;
      li.setAttribute('data-id', id);
      userListEl.appendChild(li);
    });
    userListEl.onclick = (evt) => handleUserListClick(evt, users, stocks);
  }

  function handleUserListClick(event, users, stocks) {
    const target = event.target;
    if (!(target instanceof HTMLElement)) return;
    const userId = target.getAttribute('data-id');
    if (!userId) return;
    const userObj = users.find(u => String(u.id) === String(userId));
    if (!userObj) return;
    populateForm(userObj);
    renderPortfolio(userObj, stocks);
    clearStockPanel();
  }

  function populateForm(data) {
    const { user, id } = data;
    if (idEl)      idEl.value      = id ?? '';
    if (firstEl)   firstEl.value   = user?.firstname ?? '';
    if (lastEl)    lastEl.value    = user?.lastname ?? '';
    if (addressEl) addressEl.value = user?.address ?? '';
    if (cityEl)    cityEl.value    = user?.city ?? '';
    if (emailEl)   emailEl.value   = user?.email ?? '';
  }

  function renderPortfolio(user, stocks) {
    if (!portfolioListEl) return;
    portfolioListEl.innerHTML = '';
    const { portfolio = [] } = user;
    portfolio.forEach(({ symbol, owned }) => {
      const row = document.createElement('div');
      row.className = 'portfolio-row';
      const symbolEl = document.createElement('p');
      symbolEl.textContent = symbol;
      const sharesEl = document.createElement('p');
      sharesEl.textContent = owned;
      const btn = document.createElement('button');
      btn.textContent = 'View';
      btn.setAttribute('data-symbol', symbol);
      row.appendChild(symbolEl);
      row.appendChild(sharesEl);
      row.appendChild(btn);
      portfolioListEl.appendChild(row);
    });
    portfolioListEl.onclick = (evt) => {
      const t = evt.target;
      if (t && t.tagName === 'BUTTON') {
        const sym = t.getAttribute('data-symbol');
        if (sym) viewStock(sym, stocks);
      }
    };
  }

  function viewStock(symbol, stocks) {
    if (!stockAreaEl) return;
    const stock = stocks.find(s => String(s.symbol) === String(symbol));
    if (!stock) return;
    if (stockNameEl)     stockNameEl.textContent     = stock.name ?? '';
    if (stockSectorEl)   stockSectorEl.textContent   = stock.sector ?? '';
    if (stockIndustryEl) stockIndustryEl.textContent = stock.subIndustry ?? '';
    if (stockAddrEl)     stockAddrEl.textContent     = stock.address ?? '';
    if (logoImgEl)       logoImgEl.src = `logos/${symbol}.svg`;
  }

  function clearStockPanel() {
    if (stockNameEl)     stockNameEl.textContent     = '';
    if (stockSectorEl)   stockSectorEl.textContent   = '';
    if (stockIndustryEl) stockIndustryEl.textContent = '';
    if (stockAddrEl)     stockAddrEl.textContent     = '';
    if (logoImgEl)       logoImgEl.removeAttribute('src');
  }

  if (saveBtn) {
    saveBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const id = idEl?.value;
      if (!id) return;
      for (let i = 0; i < userData.length; i++) {
        if (String(userData[i].id) === String(id)) {
          userData[i].user.firstname = firstEl?.value ?? userData[i].user.firstname;
          userData[i].user.lastname  = lastEl?.value  ?? userData[i].user.lastname;
          userData[i].user.address   = addressEl?.value ?? userData[i].user.address;
          userData[i].user.city      = cityEl?.value ?? userData[i].user.city;
          userData[i].user.email     = emailEl?.value ?? userData[i].user.email;
          generateUserList(userData, stocksData);
          const stillThere = userData[i];
          populateForm(stillThere);
          renderPortfolio(stillThere, stocksData);
          break;
        }
      }
    });
  }

  if (deleteBtn) {
    deleteBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const id = idEl?.value;
      if (!id) return;
      const idx = userData.findIndex(u => String(u.id) === String(id));
      if (idx >= 0) {
        userData.splice(idx, 1);
        if (idEl)      idEl.value = '';
        if (firstEl)   firstEl.value = '';
        if (lastEl)    lastEl.value = '';
        if (addressEl) addressEl.value = '';
        if (cityEl)    cityEl.value = '';
        if (emailEl)   emailEl.value = '';
        if (portfolioListEl) portfolioListEl.innerHTML = '';
        clearStockPanel();
        generateUserList(userData, stocksData);
      }
    });
  }

  generateUserList(userData, stocksData);
});
