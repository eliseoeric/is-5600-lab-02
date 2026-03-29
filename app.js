document.addEventListener('DOMContentLoaded', () => {
  // parse data from external files
  let users = [];
  let stocks = [];

  try {
    users = JSON.parse(userContent);
  } catch (e) {
    console.error('Error parsing users:', e);
    users = [];
  }

  try {
    stocks = JSON.parse(stockContent);
  } catch (e) {
    console.error('Error parsing stocks:', e);
    stocks = [];
  }

  // form elements
  const userListEl = document.querySelector('.user-list');
  const portfolioListEl = document.querySelector('.portfolio-list');

  const userIDInput = document.querySelector('#userID');
  const firstNameInput = document.querySelector('#firstname');
  const lastNameInput = document.querySelector('#lastname');
  const addressInput = document.querySelector('#address');
  const cityInput = document.querySelector('#city');
  const emailInput = document.querySelector('#email');

  const btnSave = document.querySelector('#btnSave');
  const btnDelete = document.querySelector('#btnDelete');

  const stockNameEl = document.querySelector('#stockName');
  const stockSectorEl = document.querySelector('#stockSector');
  const stockIndustryEl = document.querySelector('#stockIndustry');
  const stockAddressEl = document.querySelector('#stockAddress');
  const logoImg = document.querySelector('#logo');

  const clearUserForm = () => {
    userIDInput.value = '';
    firstNameInput.value = '';
    lastNameInput.value = '';
    addressInput.value = '';
    cityInput.value = '';
    emailInput.value = '';
  };

  const clearPortfolio = () => {
    portfolioListEl.innerHTML = '<h3>Symbol</h3><h3># Shares</h3><h3>Actions</h3>';
  };

  const clearStockDetails = () => {
    stockNameEl.textContent = '';
    stockSectorEl.textContent = '';
    stockIndustryEl.textContent = '';
    stockAddressEl.textContent = '';
    logoImg.src = '';
    logoImg.alt = '';
  };

  const renderUserList = () => {
    // unique by ID
    const known = new Set();
    userListEl.innerHTML = '';

    users.forEach((customer) => {
      if (!known.has(customer.id)) {
        known.add(customer.id);

        const li = document.createElement('li');
        li.textContent = `${customer.user.lastname}, ${customer.user.firstname}`;
        li.dataset.userId = customer.id;
        li.id = `user-${customer.id}`;
        userListEl.appendChild(li);
      }
    });
  };

  const fillForm = (customer) => {
    userIDInput.value = customer.id;
    firstNameInput.value = customer.user.firstname;
    lastNameInput.value = customer.user.lastname;
    addressInput.value = customer.user.address;
    cityInput.value = customer.user.city;
    emailInput.value = customer.user.email;
  };

  const renderPortfolio = (customer) => {
    clearPortfolio();

    if (!customer || !Array.isArray(customer.portfolio)) {
      return;
    }

    customer.portfolio.forEach((position, index) => {
      const item = document.createElement('div');
      item.className = 'portfolio-item';
      item.dataset.positionIndex = index;

      const symbolEl = document.createElement('p');
      symbolEl.textContent = position.symbol;
      symbolEl.className = 'portfolio-symbol';

      const sharesEl = document.createElement('p');
      sharesEl.textContent = position.owned;
      sharesEl.className = 'portfolio-shares';

      const actionsEl = document.createElement('div');
      actionsEl.className = 'portfolio-actions';

      const viewBtn = document.createElement('button');
      viewBtn.textContent = 'View';
      viewBtn.id = position.symbol;
      viewBtn.dataset.symbol = position.symbol;
      viewBtn.type = 'button';

      actionsEl.appendChild(viewBtn);
      item.appendChild(symbolEl);
      item.appendChild(sharesEl);
      item.appendChild(actionsEl);
      portfolioListEl.appendChild(item);
    });
  };

  const showStockDetails = (symbol) => {
    if (!symbol) return;

    const stock = stocks.find((x) => x.symbol === symbol);
    if (!stock) {
      stockNameEl.textContent = 'Not Found';
      stockSectorEl.textContent = '';
      stockIndustryEl.textContent = '';
      stockAddressEl.textContent = '';
      logoImg.src = '';
      logoImg.alt = '';
      return;
    }

    stockNameEl.textContent = stock.name;
    stockSectorEl.textContent = stock.sector;
    stockIndustryEl.textContent = stock.subIndustry || stock.industry || '';
    stockAddressEl.textContent = stock.address;

    const logoPath = `./logos/${symbol}.svg`;
    logoImg.src = logoPath;
    logoImg.alt = `${stock.name} logo`;

    logoImg.onerror = () => {
      logoImg.src = '';
      logoImg.alt = 'Logo not available';
    };
  };


  const getUserById = (id) => users.find((customer) => customer.id === id);

  userListEl.addEventListener('click', (event) => {
    const clickedLi = event.target.closest('li');
    if (!clickedLi || !userListEl.contains(clickedLi)) return;

    const selectedId = Number(clickedLi.dataset.userId);
    const selectedUser = getUserById(selectedId);

    if (!selectedUser) return;

    fillForm(selectedUser);
    renderPortfolio(selectedUser);
    clearStockDetails();
  });

  portfolioListEl.addEventListener('click', (event) => {
    const button = event.target.closest('button');
    if (!button || !portfolioListEl.contains(button)) return;

    const symbol = button.dataset.symbol || button.id;
    showStockDetails(symbol);
  });

  btnDelete.addEventListener('click', (event) => {
    event.preventDefault();

    const id = Number(userIDInput.value);
    if (!id) return;

    users = users.filter((customer) => customer.id !== id);
    clearUserForm();
    clearPortfolio();
    clearStockDetails();
    renderUserList();
  });

  btnSave.addEventListener('click', (event) => {
    event.preventDefault();

    const id = Number(userIDInput.value);
    const firstName = firstNameInput.value.trim();
    const lastName = lastNameInput.value.trim();
    const address = addressInput.value.trim();
    const city = cityInput.value.trim();
    const email = emailInput.value.trim();

    if (!firstName || !lastName || !address || !city || !email) {
      return;
    }

    if (id) {
      const existing = getUserById(id);
      if (existing) {
        existing.user.firstname = firstName;
        existing.user.lastname = lastName;
        existing.user.address = address;
        existing.user.city = city;
        existing.user.email = email;
      }
    } else {
      const maxId = users.reduce((max, user) => Math.max(max, user.id), 0);
      const nextId = maxId + 1;
      users.push({ id: nextId, user: { firstname: firstName, lastname: lastName, address, city, email, state: '', zip: '' }, portfolio: [] });
      userIDInput.value = nextId;
    }

    renderUserList();
  });

  // initial render
  clearPortfolio();
  clearStockDetails();
  renderUserList();
});

