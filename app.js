document.addEventListener('DOMContentLoaded', () => {
  // Parse JSON data from global variables
  const stocksData = JSON.parse(stockContent);
  const userData = JSON.parse(userContent);

  // Generate the user list and pass both datasets
  generateUserList(userData, stocksData);
});

/**
 * Loops through the users and renders a ul with li elements for each user
 * @param {*} users
 * @param {*} stocks
 */
function generateUserList(users, stocks) {
  const userList = document.querySelector('.user-list');
  users.map(({ user, id }) => {
    const listItem = document.createElement('li');
    listItem.innerText = user.lastname + ', ' + user.firstname;
    listItem.setAttribute('id', id);
    userList.appendChild(listItem);
  });

  // Register click event on the list
  userList.addEventListener('click', (event) => handleUserListClick(event, users, stocks));
}

/**
 * Handles the click event on the user list
 * @param {*} event
 * @param {*} users
 * @param {*} stocks
 */
function handleUserListClick(event, users, stocks) {
  const userId = event.target.id;
  const user = users.find(user => user.id == userId);
  populateForm(user);
  renderPortfolio(user, stocks);
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
 * @param {*} stocks
 */
function renderPortfolio(user, stocks) {
  const { portfolio } = user;
  const portfolioDetails = document.querySelector('.portfolio-list');
  portfolioDetails.innerHTML = ''; // Clear previous items

  portfolio.map(({ symbol, owned }) => {
    const symbolEl = document.createElement('p');
    const sharesEl = document.createElement('p');
    const actionEl = document.createElement('button');

    symbolEl.innerText = symbol;
    sharesEl.innerText = owned;
    actionEl.innerText = 'View';
    actionEl.setAttribute('id', symbol);

    // Add click event to show stock details
    actionEl.addEventListener('click', () => {
      const stock = stocks.find(s => s.symbol === symbol);
      renderStockDetails(stock);
    });

    portfolioDetails.appendChild(symbolEl);
    portfolioDetails.appendChild(sharesEl);
    portfolioDetails.appendChild(actionEl);
  });
}

/**
 * Renders stock details in the details section
 * @param {*} stock
 */
function renderStockDetails(stock) {
  document.querySelector('#logo').src = stock.logoUrl;
  document.querySelector('#stockName').innerText = stock.name;
  document.querySelector('#stockSector').innerText = stock.sector;
  document.querySelector('#stockIndustry').innerText = stock.industry;
  document.querySelector('#stockAddress').innerText = stock.address;
}