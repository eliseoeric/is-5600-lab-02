/* add your code here */
// Lab 02: DOM manipulation and event delegation.
document.addEventListener('DOMContentLoaded', () => {
  const stocks = JSON.parse(stockContent);
  const users = JSON.parse(userContent);
  const userList = document.querySelector('.user-list');
  const portfolioList = document.querySelector('.portfolio-list');
  const form = document.querySelector('.userEntry');
  const stockArea = document.querySelector('.stock-form');
  const saveButton = document.querySelector('#btnSave');
  const deleteButton = document.querySelector('#btnDelete');
  const fields = ['firstname', 'lastname', 'address', 'city', 'email'];
  let selectedId = null;

  function renderUsers() {
    userList.replaceChildren();
    users.forEach(({ id, user }) => {
      const item = document.createElement('li');
      item.id = String(id);
      item.textContent = `${user.lastname}, ${user.firstname}`;
      item.tabIndex = 0;
      item.setAttribute('role', 'button');
      item.setAttribute('aria-pressed', String(id === selectedId));
      userList.appendChild(item);
    });
  }

  function clearStock() {
    stockArea.hidden = true;
    ['stockName', 'stockSector', 'stockIndustry', 'stockAddress'].forEach(id => {
      document.getElementById(id).textContent = '';
    });
    document.querySelector('#logo').removeAttribute('src');
  }

  function renderPortfolio(portfolio = []) {
    portfolioList.replaceChildren();
    ['Symbol', '# Shares', 'Actions'].forEach(label => {
      const heading = document.createElement('h3');
      heading.textContent = label;
      portfolioList.appendChild(heading);
    });
    portfolio.forEach(({ symbol, owned }) => {
      const symbolElement = document.createElement('p');
      const sharesElement = document.createElement('p');
      const button = document.createElement('button');
      symbolElement.textContent = symbol;
      sharesElement.textContent = owned;
      button.type = 'button';
      button.textContent = 'View';
      button.dataset.symbol = symbol;
      button.setAttribute('aria-label', `View ${symbol}`);
      portfolioList.append(symbolElement, sharesElement, button);
    });
  }

  function selectUser(item) {
    if (!item || !userList.contains(item)) return;
    const entry = users.find(entry => String(entry.id) === item.id);
    if (!entry) return;
    selectedId = entry.id;
    document.querySelector('#userID').value = entry.id;
    fields.forEach(field => {
      document.getElementById(field).value = entry.user[field] || '';
    });
    saveButton.disabled = false;
    deleteButton.disabled = false;
    clearStock();
    renderPortfolio(entry.portfolio);
    renderUsers();
  }

  // Register each delegated listener once, even after lists are redrawn.
  userList.addEventListener('click', event => selectUser(event.target.closest('li')));
  userList.addEventListener('keydown', event => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      selectUser(event.target.closest('li'));
    }
  });

  portfolioList.addEventListener('click', event => {
    const button = event.target.closest('button[data-symbol]');
    if (!button || !portfolioList.contains(button)) return;
    const stock = stocks.find(stock => stock.symbol === button.dataset.symbol);
    clearStock();
    if (!stock) return;
    document.querySelector('#stockName').textContent = stock.name;
    document.querySelector('#stockSector').textContent = stock.sector;
    document.querySelector('#stockIndustry').textContent = stock.subIndustry;
    document.querySelector('#stockAddress').textContent = stock.address;
    const logo = document.querySelector('#logo');
    logo.alt = `${stock.name} logo`;
    logo.src = `logos/${stock.symbol}.svg`;
    stockArea.hidden = false;
  });

  form.addEventListener('submit', event => {
    event.preventDefault();
    const entry = users.find(entry => entry.id === selectedId);
    if (!entry) return;
    fields.forEach(field => {
      entry.user[field] = document.getElementById(field).value.trim();
    });
    renderUsers();
  });

  deleteButton.type = 'button';
  deleteButton.addEventListener('click', () => {
    const index = users.findIndex(entry => entry.id === selectedId);
    if (index < 0) return;
    users.splice(index, 1);
    selectedId = null;
    form.reset();
    document.querySelector('#userID').value = '';
    saveButton.disabled = true;
    deleteButton.disabled = true;
    renderUsers();
    renderPortfolio();
    clearStock();
  });

  saveButton.disabled = true;
  deleteButton.disabled = true;
  renderUsers();
  renderPortfolio();
  clearStock();
});


