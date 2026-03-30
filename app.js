/* add your code here */

function populateForm(data) {
  const { user, id } = data;

  document.querySelector('#userID').value = id;
  document.querySelector('#firstname').value = user.firstname;
  document.querySelector('#lastname').value = user.lastname;
  document.querySelector('#address').value = user.address;
  document.querySelector('#city').value = user.city;
  document.querySelector('#email').value = user.email;
}

function viewStock(symbol, stocks) {
  const stock = stocks.find((s) => s.symbol === symbol);
  if (!stock) return;

  document.querySelector('#stockName').textContent = stock.name;
  document.querySelector('#stockSector').textContent = stock.sector;
  document.querySelector('#stockIndustry').textContent = stock.subIndustry;
  document.querySelector('#stockAddress').textContent = stock.address;
  document.querySelector('#logo').src = `logos/${symbol}.svg`;
  document.querySelector('#logo').alt = `${stock.name} logo`;
}

function renderPortfolio(userDataItem, stocks) {
  const portfolioDetails = document.querySelector('.portfolio-list');

  portfolioDetails.innerHTML = `
    <h3>Symbol</h3>
    <h3># Shares</h3>
    <h3>Actions</h3>
  `;

  userDataItem.portfolio.forEach(({ symbol, owned }) => {
    const symbolEl = document.createElement('p');
    const sharesEl = document.createElement('p');
    const actionEl = document.createElement('button');

    symbolEl.textContent = symbol;
    sharesEl.textContent = owned;
    actionEl.textContent = 'View';
    actionEl.setAttribute('id', symbol);

    portfolioDetails.appendChild(symbolEl);
    portfolioDetails.appendChild(sharesEl);
    portfolioDetails.appendChild(actionEl);
  });

  portfolioDetails.onclick = (event) => {
    if (event.target.tagName === 'BUTTON') {
      viewStock(event.target.id, stocks);
    }
  };
}

function handleUserListClick(event, users, stocks) {
  if (event.target.tagName !== 'LI') return;

  const userId = event.target.id;
  const selectedUser = users.find((u) => u.id == userId);
  if (!selectedUser) return;

  populateForm(selectedUser);
  renderPortfolio(selectedUser, stocks);
}

function generateUserList(users, stocks) {
  const userList = document.querySelector('.user-list');
  userList.innerHTML = '';

  users.forEach(({ user, id }) => {
    const listItem = document.createElement('li');
    listItem.textContent = `${user.lastname}, ${user.firstname}`;
    listItem.setAttribute('id', id);
    userList.appendChild(listItem);
  });

  userList.onclick = (event) => handleUserListClick(event, users, stocks);
}

document.addEventListener('DOMContentLoaded', () => {
  const stocksData = JSON.parse(stockContent);
  const userData = JSON.parse(userContent);

  const saveButton = document.querySelector('#btnSave');
  const deleteButton = document.querySelector('#btnDelete');

  generateUserList(userData, stocksData);

  saveButton.addEventListener('click', (event) => {
    event.preventDefault();

    const id = document.querySelector('#userID').value;
    const userToUpdate = userData.find((u) => u.id == id);
    if (!userToUpdate) return;

    userToUpdate.user.firstname = document.querySelector('#firstname').value;
    userToUpdate.user.lastname = document.querySelector('#lastname').value;
    userToUpdate.user.address = document.querySelector('#address').value;
    userToUpdate.user.city = document.querySelector('#city').value;
    userToUpdate.user.email = document.querySelector('#email').value;

    generateUserList(userData, stocksData);
    populateForm(userToUpdate);
    renderPortfolio(userToUpdate, stocksData);
  });

  deleteButton.addEventListener('click', (event) => {
    event.preventDefault();

    const id = document.querySelector('#userID').value;
    const userIndex = userData.findIndex((u) => u.id == id);
    if (userIndex === -1) return;

    userData.splice(userIndex, 1);
    generateUserList(userData, stocksData);

    document.querySelector('.userEntry').reset();
    document.querySelector('#userID').value = '';

    document.querySelector('.portfolio-list').innerHTML = `
      <h3>Symbol</h3>
      <h3># Shares</h3>
      <h3>Actions</h3>
    `;

    document.querySelector('#stockName').textContent = '';
    document.querySelector('#stockSector').textContent = '';
    document.querySelector('#stockIndustry').textContent = '';
    document.querySelector('#stockAddress').textContent = '';
    document.querySelector('#logo').src = '';
    document.querySelector('#logo').alt = '';
  });
});

