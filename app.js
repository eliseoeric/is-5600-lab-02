// Wait until the HTML has been loaded.
document.addEventListener('DOMContentLoaded', () => {
  // Convert the supplied JSON strings into JavaScript arrays.
  const stocksData = JSON.parse(stockContent);
  const userData = JSON.parse(userContent);

  // Display the users in the sidebar.
  generateUserList(userData);
    // Delete the selected user and clear the dashboard.
  document.querySelector('#btnDelete').addEventListener('click', (event) => {
    event.preventDefault();

    const selectedID = document.querySelector('#userID').value;

    const userIndex = userData.findIndex(
      (person) => String(person.id) === selectedID
    );

    // Do nothing if no user is selected.
    if (userIndex === -1) return;

    userData.splice(userIndex, 1);
    generateUserList(userData);

    // Clear the form, including the hidden user ID.
    document.querySelector('.userEntry').reset();

    // Clear the portfolio while keeping its headings.
    document.querySelector('.portfolio-list').innerHTML = `
      <h3>Symbol</h3>
      <h3># Shares</h3>
      <h3>Actions</h3>
    `;

    // Clear the stock details and logo.
    document.querySelector('#stockName').textContent = '';
    document.querySelector('#stockSector').textContent = '';
    document.querySelector('#stockIndustry').textContent = '';
    document.querySelector('#stockAddress').textContent = '';

    const logo = document.querySelector('#logo');
    logo.removeAttribute('src');
    logo.alt = '';
  });
    // Save changes without reloading the page.
  document.querySelector('.userEntry').addEventListener('submit', (event) => {
    event.preventDefault();
  });

  document.querySelector('#btnSave').addEventListener('click', (event) => {
    event.preventDefault();

    const selectedID = document.querySelector('#userID').value;

    const selectedUser = userData.find(
      (person) => String(person.id) === selectedID
    );

    if (!selectedUser) return;

    selectedUser.user.firstname = document.querySelector('#firstname').value;
    selectedUser.user.lastname = document.querySelector('#lastname').value;
    selectedUser.user.address = document.querySelector('#address').value;
    selectedUser.user.city = document.querySelector('#city').value;
    selectedUser.user.email = document.querySelector('#email').value;

    // Show the updated name in the user list.
    generateUserList(userData);
  });

  // Display the selected user's form and portfolio.
  document.querySelector('.user-list').addEventListener('click', (event) => {
    const listItem = event.target.closest('li');
    if (!listItem) return;

    const selectedUser = userData.find(
      (person) => String(person.id) === listItem.id
    );

    if (!selectedUser) return;

    populateForm(selectedUser);
    renderPortfolio(selectedUser, stocksData);
  });
});

// Create a list item for each user.
function generateUserList(users) {
  const userList = document.querySelector('.user-list');

  // Remove previous names before rebuilding the list.
  userList.innerHTML = '';

  users.forEach(({ user, id }) => {
    const listItem = document.createElement('li');

    listItem.textContent = `${user.lastname}, ${user.firstname}`;
    listItem.id = id;

    userList.appendChild(listItem);
  });
}

// Display the selected user's information in the form.
function populateForm(person) {
  const { id, user } = person;

  document.querySelector('#userID').value = id;
  document.querySelector('#firstname').value = user.firstname;
  document.querySelector('#lastname').value = user.lastname;
  document.querySelector('#address').value = user.address;
  document.querySelector('#city').value = user.city;
  document.querySelector('#email').value = user.email;
}

// Display the selected user's stock holdings. 
function renderPortfolio(person, stocks) {
  const portfolioList = document.querySelector('.portfolio-list');

  // Rebuild the headings and remove previous holdings.
  portfolioList.innerHTML = `
    <h3>Symbol</h3>
    <h3># Shares</h3>
    <h3>Actions</h3>
  `;

  person.portfolio.forEach((holding) => {
    const symbol = document.createElement('p');
    symbol.textContent = holding.symbol;

    const shares = document.createElement('p');
    shares.textContent = holding.owned;

    const viewButton = document.createElement('button');
    viewButton.type = 'button';
    viewButton.textContent = 'View';
    viewButton.id = holding.symbol;

    // Display this stock's details when View is clicked.
viewButton.addEventListener('click', () => {
  const stock = stocks.find(
    (item) => item.symbol === holding.symbol
  );

  if (!stock) return;

  document.querySelector('#stockName').textContent = stock.name;
  document.querySelector('#stockSector').textContent = stock.sector;
  document.querySelector('#stockIndustry').textContent = stock.subIndustry;
  document.querySelector('#stockAddress').textContent = stock.address;

  const logo = document.querySelector('#logo');
  logo.src = `logos/${stock.symbol}.svg`;
  logo.alt = `${stock.name} logo`;
});

    portfolioList.append(symbol, shares, viewButton);
  });
}