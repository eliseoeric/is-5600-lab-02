document.addEventListener('DOMContentLoaded', () => {
  let users = [];
  let stocks = [];

  try {
    users = JSON.parse(userContent);
  } catch (err) {
    if (Array.isArray(userContent)) users = userContent;
  }

  try {
    stocks = JSON.parse(stockContent);
  } catch (err) {
    if (Array.isArray(stockContent)) stocks = stockContent;
  }

  const userListEl = document.querySelector('.user-list');
  const portfolioListEl = document.querySelector('.portfolio-list');
  const stockArea = document.querySelector('.stock-form');
  const logoImg = document.querySelector('#logo');

  const inputUserID = document.querySelector('#userID');
  const inputFirst = document.querySelector('#firstname');
  const inputLast = document.querySelector('#lastname');
  const inputAddress = document.querySelector('#address');
  const inputCity = document.querySelector('#city');
  const inputEmail = document.querySelector('#email');

  const saveButton =
    document.querySelector('#save') ||
    document.querySelector('#saveButton') ||
    document.querySelector('.save-btn') ||
    document.querySelector('.btn-save');

  const deleteButton =
    document.querySelector('#delete') ||
    document.querySelector('#deleteButton') ||
    document.querySelector('.delete-btn') ||
    document.querySelector('.btn-delete');

  if (stockArea) stockArea.style.display = 'none';

  function generateUserList(usersArr, stocksArr) {
    userListEl.innerHTML = '';
    usersArr.forEach(({ user, id }) => {
      const li = document.createElement('li');
      li.innerText = `${user.lastname}, ${user.firstname}`;
      li.setAttribute('id', id);
      li.classList.add('user-list-item');
      userListEl.appendChild(li);
    });

    userListEl.onclick = (event) => {
      const target = event.target;
      if (!target) return;
      if (target.tagName !== 'LI' && !target.classList.contains('user-list-item')) return;
      handleUserListClick(event, usersArr, stocksArr);
    };
  }

  function handleUserListClick(event, usersArr, stocksArr) {
    const userId = event.target.id;
    const userObj = usersArr.find((u) => u.id == userId);
    if (!userObj) return;
    populateForm(userObj);
    renderPortfolio(userObj, stocksArr);
  }

  function populateForm(data) {
    if (!data) return;
    const { user, id } = data;
    if (inputUserID) inputUserID.value = id;
    if (inputFirst) inputFirst.value = user.firstname || '';
    if (inputLast) inputLast.value = user.lastname || '';
    if (inputAddress) inputAddress.value = user.address || '';
    if (inputCity) inputCity.value = user.city || '';
    if (inputEmail) inputEmail.value = user.email || '';
  }

  function renderPortfolio(userObj, stocksArr) {
    if (stockArea) stockArea.style.display = 'none';
    if (!portfolioListEl) return;
    portfolioListEl.innerHTML = '';

    const { portfolio } = userObj;
    if (!Array.isArray(portfolio) || portfolio.length === 0) {
      const p = document.createElement('p');
      p.innerText = 'No holdings';
      portfolioListEl.appendChild(p);
      return;
    }

    portfolio.forEach(({ symbol, owned }) => {
      const row = document.createElement('div');
      row.classList.add('portfolio-row');

      const symbolEl = document.createElement('p');
      symbolEl.classList.add('portfolio-symbol');
      symbolEl.innerText = symbol;

      const sharesEl = document.createElement('p');
      sharesEl.classList.add('portfolio-shares');
      sharesEl.innerText = owned;

      const actionEl = document.createElement('button');
      actionEl.classList.add('portfolio-view-btn');
      actionEl.innerText = 'View';
      actionEl.setAttribute('data-symbol', symbol);
      actionEl.setAttribute('id', symbol);

      row.appendChild(symbolEl);
      row.appendChild(sharesEl);
      row.appendChild(actionEl);

      portfolioListEl.appendChild(row);
    });

    portfolioListEl.onclick = (event) => {
      const t = event.target;
      if (!t) return;
      if (t.tagName === 'BUTTON' || (t.dataset && t.dataset.symbol)) {
        const symbol = t.dataset.symbol || t.id || t.getAttribute('id');
        if (symbol) viewStock(symbol, stocksArr);
      }
    };
  }

  function viewStock(symbol, stocksArr) {
    if (!symbol) return;
    const stock = stocksArr.find((s) => s.symbol == symbol);
    if (!stock) {
      if (stockArea) stockArea.style.display = 'none';
      return;
    }

    if (stockArea) stockArea.style.display = 'block';

    const nameEl = document.querySelector('#stockName');
    const sectorEl = document.querySelector('#stockSector');
    const industryEl = document.querySelector('#stockIndustry');
    const addressEl = document.querySelector('#stockAddress');

    if (nameEl) nameEl.textContent = stock.name || '';
    if (sectorEl) sectorEl.textContent = stock.sector || '';
    if (industryEl) industryEl.textContent = stock.subIndustry || stock.industry || '';
    if (addressEl) addressEl.textContent = stock.address || '';

    if (logoImg) {
      logoImg.src = `logos/${symbol}.svg`;
      logoImg.alt = `${symbol} logo`;
    }
  }

  if (saveButton) {
    saveButton.addEventListener('click', function (e) {
      e.preventDefault();
      const id = inputUserID ? inputUserID.value : null;
      if (!id) return;

      for (let i = 0; i < users.length; i++) {
        if (users[i].id == id) {
          if (inputFirst) users[i].user.firstname = inputFirst.value;
          if (inputLast) users[i].user.lastname = inputLast.value;
          if (inputAddress) users[i].user.address = inputAddress.value;
          if (inputCity) users[i].user.city = inputCity.value;
          if (inputEmail) users[i].user.email = inputEmail.value;

          generateUserList(users, stocks);
          const li = document.getElementById(String(id));
          if (li) {
            document.querySelectorAll('.user-list li').forEach((n) => n.classList.remove('selected'));
            li.classList.add('selected');
          }
          break;
        }
      }
    });
  }

  if (deleteButton) {
    deleteButton.addEventListener('click', function (e) {
      e.preventDefault();
      const id = inputUserID ? inputUserID.value : null;
      if (!id) return;

      const index = users.findIndex((u) => u.id == id);
      if (index === -1) return;

      users.splice(index, 1);

      if (inputUserID) inputUserID.value = '';
      if (inputFirst) inputFirst.value = '';
      if (inputLast) inputLast.value = '';
      if (inputAddress) inputAddress.value = '';
      if (inputCity) inputCity.value = '';
      if (inputEmail) inputEmail.value = '';
      if (portfolioListEl) portfolioListEl.innerHTML = '';
      if (stockArea) stockArea.style.display = 'none';

      generateUserList(users, stocks);
    });
  }

  generateUserList(users, stocks);
});
