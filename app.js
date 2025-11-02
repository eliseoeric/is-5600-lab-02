document.addEventListener('DOMContentLoaded', () => {
  const stocksData = JSON.parse(typeof stockContent !== 'undefined' ? stockContent : '[]');
  const userData   = JSON.parse(typeof userContent  !== 'undefined' ? userContent  : '[]');
  const userListEl       = document.querySelector('.user-list');
  const portfolioListEl  = document.querySelector('.portfolio-list');
  const saveBtn          = document.querySelector('#saveButton')   || document.querySelector('button.save');
  const deleteBtn        = document.querySelector('#deleteButton') || document.querySelector('button.delete');
  const fId        = document.querySelector('#userID');
  const fName      = document.querySelector('#name');
  const fFirst     = document.querySelector('#firstname');
  const fLast      = document.querySelector('#lastname');
  const fAddress   = document.querySelector('#address');
  const fCity      = document.querySelector('#city');
  const fEmail     = document.querySelector('#email');
  const stockNameEl     = document.querySelector('#stockName');
  const stockSectorEl   = document.querySelector('#stockSector');
  const stockIndustryEl = document.querySelector('#stockIndustry');
  const stockAddressEl  = document.querySelector('#stockAddress');
  const stockLogoEl     = document.querySelector('#logo');

  generateUserList(userData);

  userListEl.addEventListener('click', (e) => handleUserListClick(e, userData));

  if (saveBtn) {
    saveBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const id = fId.value;
      for (let i = 0; i < userData.length; i++) {
        if (userData[i].id == id) {
          if (fName) {
            const name = fName.value.trim();
            const parts = name.split(' ').filter(Boolean);
            const first = parts.shift() || '';
            const last = parts.join(' ') || '';
            userData[i].user.firstname = first;
            userData[i].user.lastname  = last;
          } else {
            if (fFirst) userData[i].user.firstname = fFirst.value.trim();
            if (fLast)  userData[i].user.lastname  = fLast.value.trim();
          }
          if (fAddress) userData[i].user.address = fAddress.value.trim();
          if (fCity)    userData[i].user.city    = fCity.value.trim();
          if (fEmail)   userData[i].user.email   = fEmail.value.trim();
          break;
        }
      }
      generateUserList(userData);
    });
  }

  if (deleteBtn) {
    deleteBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const id = fId.value;
      const idx = userData.findIndex(u => u.id == id);
      if (idx > -1) {
        userData.splice(idx, 1);
        clearForm();
        portfolioListEl.innerHTML = '';
        renderStockDetails(null);
        generateUserList(userData);
      }
    });
  }

  function generateUserList(users) {
    userListEl.innerHTML = '';
    users.map(({ user, id }) => {
      const li = document.createElement('li');
      li.textContent = `${user.lastname}, ${user.firstname}`;
      li.id = id;
      userListEl.appendChild(li);
    });
  }

  function handleUserListClick(event, users) {
    const userId = event.target.id;
    if (!userId) return;
    const user = users.find(u => u.id == userId);
    if (!user) return;
    populateForm(user);
    renderPortfolio(user);
    renderStockDetails(null);
  }

  function populateForm(data) {
    const { user, id } = data;
    if (fId) fId.value = id ?? '';
    const first = user?.firstname ?? '';
    const last  = user?.lastname ?? '';
    if (fName) fName.value = [first, last].filter(Boolean).join(' ');
    if (fFirst) fFirst.value = first;
    if (fLast)  fLast.value  = last;
    if (fAddress) fAddress.value = user?.address ?? '';
    if (fCity)    fCity.value    = user?.city ?? '';
    if (fEmail)   fEmail.value   = user?.email ?? '';
  }

  function clearForm() {
    if (fId) fId.value = '';
    if (fName) fName.value = '';
    if (fFirst) fFirst.value = '';
    if (fLast) fLast.value = '';
    if (fAddress) fAddress.value = '';
    if (fCity) fCity.value = '';
    if (fEmail) fEmail.value = '';
  }

  function renderPortfolio(user) {
    const { portfolio = [] } = user || {};
    portfolioListEl.innerHTML = '';
    portfolio.forEach(({ symbol, owned }) => {
      const sym = document.createElement('p');
      sym.textContent = symbol;
      const qty = document.createElement('p');
      qty.textContent = owned;
      const btn = document.createElement('button');
      btn.textContent = 'View';
      btn.id = symbol;
      btn.addEventListener('click', () => viewStock(symbol));
      portfolioListEl.append(sym, qty, btn);
    });
  }

  function viewStock(symbol) {
    const stock = stocksData.find(s => s.symbol == symbol);
    renderStockDetails(stock);
  }

  function renderStockDetails(stock) {
    if (!stock) {
      if (stockNameEl) stockNameEl.textContent = '';
      if (stockSectorEl) stockSectorEl.textContent = '';
      if (stockIndustryEl) stockIndustryEl.textContent = '';
      if (stockAddressEl) stockAddressEl.textContent = '';
      if (stockLogoEl) stockLogoEl.removeAttribute('src');
      return;
    }
    if (stockNameEl) stockNameEl.textContent = stock.name ?? '';
    if (stockSectorEl) stockSectorEl.textContent = stock.sector ?? '';
    if (stockIndustryEl) stockIndustryEl.textContent = stock.subIndustry ?? '';
    if (stockAddressEl) stockAddressEl.textContent = stock.address ?? '';
    if (stockLogoEl) stockLogoEl.src = `logos/${stock.symbol}.svg`;
  }
});
Footer
