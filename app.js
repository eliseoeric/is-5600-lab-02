/**
 * Loops through the users and renders a ul with li elements for each user
 * @param {*} users
 */
function generateUserList(users) {
  const userList = document.querySelector('.user-list');
  userList.innerHTML = '';

  users.forEach(({ user, id }) => {
    const listItem = document.createElement('li');
    listItem.innerText = `${user.lastname}, ${user.firstname}`;
    listItem.setAttribute('id', id);
    userList.appendChild(listItem);
  });
}

/**
 * Handles the click event on the user list
 * @param {*} event
 * @param {*} users
 * @param {*} stocks
 */
function handleUserListClick(event, users, stocks) {
  const listItem = event.target.closest('li');
  if (!listItem) {
    return;
  }

  const userId = listItem.id;
  const user = users.find((user) => user.id == userId);
  if (!user) {
    return;
  }

  populateForm(user);
  renderPortfolio(user);
}

/**
 * Populates the form with the user's data
 * @param {*} data
 */
function populateForm(data) {
  const { user, id } = data;

  document.querySelector('#userID').value = id;
  document.querySelector('#firstname').value = user.firstname;
  document.querySelector('#lastname').value = user.lastname;
  document.querySelector('#address').value = user.address;
  document.querySelector('#city').value = user.city;
  document.querySelector('#email').value = user.email;
}

/**
 * Renders the portfolio items for the user
 * @param {*} user
 */
function renderPortfolio(user) {
  const portfolioDetails = document.querySelector('.portfolio-list');
  portfolioDetails.innerHTML = '';

  const headings = ['Symbol', '# Shares', 'Actions'];
  headings.forEach((headingText) => {
    const heading = document.createElement('h3');
    heading.innerText = headingText;
    portfolioDetails.appendChild(heading);
  });

  user.portfolio.forEach(({ symbol, owned }) => {
    const symbolEl = document.createElement('p');
    const sharesEl = document.createElement('p');
    const actionEl = document.createElement('button');

    symbolEl.innerText = symbol;
    sharesEl.innerText = owned;
    actionEl.innerText = 'View';
    actionEl.setAttribute('id', symbol);
    actionEl.setAttribute('type', 'button');

    portfolioDetails.appendChild(symbolEl);
    portfolioDetails.appendChild(sharesEl);
    portfolioDetails.appendChild(actionEl);
  });
}

/**
 * Renders the stock information for the symbol
 * @param {*} symbol
 * @param {*} stocks
 */
function viewStock(symbol, stocks) {
  const stockArea = document.querySelector('.stock-form');
  if (!stockArea) {
    return;
  }

  const stock = stocks.find((s) => s.symbol === symbol);
  if (!stock) {
    return;
  }

  document.querySelector('#stockName').textContent = stock.name;
  document.querySelector('#stockSector').textContent = stock.sector;
  document.querySelector('#stockIndustry').textContent = stock.subIndustry;
  document.querySelector('#stockAddress').textContent = stock.address;
  document.querySelector('#logo').src = `logos/${symbol}.svg`;
}

document.addEventListener('DOMContentLoaded', () => {
  const stocksData = JSON.parse(stockContent);
  const userData = JSON.parse(userContent);

  const userList = document.querySelector('.user-list');
  const portfolioDetails = document.querySelector('.portfolio-list');
  const saveButton = document.querySelector('#btnSave');
  const deleteButton = document.querySelector('#btnDelete');

  generateUserList(userData);

  userList.addEventListener('click', (event) => {
    handleUserListClick(event, userData, stocksData);
  });

  portfolioDetails.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
      viewStock(event.target.id, stocksData);
    }
  });

  saveButton.addEventListener('click', (event) => {
    event.preventDefault();

    const id = document.querySelector('#userID').value;
    if (!id) {
      return;
    }

    const userIndex = userData.findIndex((user) => user.id == id);
    if (userIndex === -1) {
      return;
    }

    userData[userIndex].user.firstname = document.querySelector('#firstname').value;
    userData[userIndex].user.lastname = document.querySelector('#lastname').value;
    userData[userIndex].user.address = document.querySelector('#address').value;
    userData[userIndex].user.city = document.querySelector('#city').value;
    userData[userIndex].user.email = document.querySelector('#email').value;

    generateUserList(userData);
  });

  deleteButton.addEventListener('click', (event) => {
    event.preventDefault();

    const id = document.querySelector('#userID').value;
    if (!id) {
      return;
    }

    const userIndex = userData.findIndex((user) => user.id == id);
    if (userIndex === -1) {
      return;
    }

    userData.splice(userIndex, 1);
    generateUserList(userData);
    portfolioDetails.innerHTML = '';
    document.querySelector('#userID').value = '';
    document.querySelector('#firstname').value = '';
    document.querySelector('#lastname').value = '';
    document.querySelector('#address').value = '';
    document.querySelector('#city').value = '';
    document.querySelector('#email').value = '';
    document.querySelector('#stockName').textContent = '';
    document.querySelector('#stockSector').textContent = '';
    document.querySelector('#stockIndustry').textContent = '';
    document.querySelector('#stockAddress').textContent = '';
    document.querySelector('#logo').src = '';
  });
});

