// Lab 02: Stock Portfolio Dashboard
// The original HTML and CSS are supplied by the lab repository.

document.addEventListener('DOMContentLoaded', () => {
  // Load the datasets supplied by the script tags in index.html.
  const users = JSON.parse(userContent);
  // The supplied stock data has line breaks inside some text fields.
  // Replace those line breaks with spaces before parsing the JSON.
  const stocks = JSON.parse(stockContent.replace(/[\r\n]+/g, ' '));

  const userList = document.querySelector('.user-list');
  const portfolioList = document.querySelector('.portfolio-list');
  const userForm = document.querySelector('.userEntry');
  const userIdField = document.querySelector('#userID');
  const logo = document.querySelector('#logo');

  const fields = ['firstname', 'lastname', 'address', 'city', 'email'];

  function renderUserList() {
    userList.replaceChildren();

    users.forEach(({ id, user }) => {
      const item = document.createElement('li');
      item.dataset.userId = String(id);
      item.textContent = `${user.lastname}, ${user.firstname}`;
      userList.appendChild(item);
    });
  }

  function clearStockDetails() {
    ['stockName', 'stockSector', 'stockIndustry', 'stockAddress'].forEach((id) => {
      document.getElementById(id).textContent = '';
    });
    logo.removeAttribute('src');
    logo.alt = '';
  }

  function renderPortfolio(portfolio = []) {
    // Keep the column headings even when no user is selected.
    portfolioList.innerHTML = '<h3>Symbol</h3><h3># Shares</h3><h3>Actions</h3>';

    portfolio.forEach(({ symbol, owned }) => {
      const symbolElement = document.createElement('p');
      symbolElement.textContent = symbol;

      const sharesElement = document.createElement('p');
      sharesElement.textContent = String(owned);

      const viewButton = document.createElement('button');
      viewButton.type = 'button';
      viewButton.textContent = 'View';
      viewButton.dataset.symbol = symbol;

      portfolioList.append(symbolElement, sharesElement, viewButton);
    });
  }

  function selectUser(record) {
    userIdField.value = String(record.id);
    fields.forEach((field) => {
      document.getElementById(field).value = record.user[field] ?? '';
    });

    renderPortfolio(record.portfolio);
    clearStockDetails();
  }

  function showStock(symbol) {
    const stock = stocks.find((item) => item.symbol === symbol);
    if (!stock) {
      clearStockDetails();
      return;
    }

    document.getElementById('stockName').textContent = stock.name ?? '';
    document.getElementById('stockSector').textContent = stock.sector ?? '';
    document.getElementById('stockIndustry').textContent = stock.subIndustry ?? '';
    document.getElementById('stockAddress').textContent = stock.address ?? '';
    logo.alt = `${stock.name} logo`;
    logo.onerror = () => { logo.style.display = 'none'; };
    logo.src = `logos/${symbol}.svg`;
    
  }

  function clearSelection() {
    userForm.reset();
    userIdField.value = '';
    renderPortfolio();
    clearStockDetails();
  }

  // Event delegation: one listener handles every user list item.
  userList.addEventListener('click', (event) => {
    const item = event.target.closest('li[data-user-id]');
    if (!item || !userList.contains(item)) return;

    const record = users.find((person) => String(person.id) === item.dataset.userId);
    if (record) selectUser(record);
  });

  // Event delegation: one listener handles all portfolio View buttons.
  portfolioList.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-symbol]');
    if (!button || !portfolioList.contains(button)) return;
    showStock(button.dataset.symbol);
  });

  document.querySelector('#btnSave').addEventListener('click', (event) => {
    event.preventDefault();

    const record = users.find((person) => String(person.id) === userIdField.value);
    if (!record) return; // Nothing selected yet.

    fields.forEach((field) => {
      record.user[field] = document.getElementById(field).value;
    });
    renderUserList();
  });

  document.querySelector('#btnDelete').addEventListener('click', (event) => {
    event.preventDefault();

    const index = users.findIndex((person) => String(person.id) === userIdField.value);
    if (index === -1) return; // Avoid deleting the wrong user.

    users.splice(index, 1);
    renderUserList();
    clearSelection();
  });

  renderUserList();
  renderPortfolio();
  clearStockDetails();
});
