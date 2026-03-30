
document.addEventListener('DOMContentLoaded', () => {

  // Parse JSON data into JavaScript objects
  const stocksData = JSON.parse(stockContent);
  const userData = JSON.parse(userContent);

  // Buttons
  const saveButton = document.querySelector('#saveBtn');
  const deleteButton = document.querySelector('#deleteBtn');

  // Generate initial user list
  generateUserList(userData, stocksData);

  // ================= DELETE USER =================
  deleteButton.addEventListener('click', (event) => {
    event.preventDefault();

    const userId = document.querySelector('#userID').value;

    const index = userData.findIndex(user => user.id == userId);

    if (index !== -1) {
      userData.splice(index, 1);
      generateUserList(userData, stocksData);

      // Clear form + portfolio after delete
      document.querySelector('form').reset();
      document.querySelector('.portfolio-list').innerHTML = '';
    }
  });

  // ================= SAVE USER =================
  saveButton.addEventListener('click', (e) => {
    e.preventDefault();

    const id = document.querySelector('#userID').value;

    for (let i = 0; i < userData.length; i++) {
      if (userData[i].id == id) {

        userData[i].user.firstname = document.querySelector('#firstname').value;
        userData[i].user.lastname = document.querySelector('#lastname').value;
        userData[i].user.address = document.querySelector('#address').value;
        userData[i].user.city = document.querySelector('#city').value;
        userData[i].user.email = document.querySelector('#email').value;

        // Refresh list
        generateUserList(userData, stocksData);
        break;
      }
    }
  });

});


// ================= USER LIST =================
function generateUserList(users, stocks) {
  const userList = document.querySelector('.user-list');

  // Clear old list
  userList.innerHTML = '';

  users.forEach(({ user, id }) => {
    const li = document.createElement('li');
    li.innerText = `${user.lastname}, ${user.firstname}`;
    li.setAttribute('id', id);
    userList.appendChild(li);
  });

  // Event delegation
  userList.addEventListener('click', (event) => {
    handleUserListClick(event, users, stocks);
  });
}


// ================= HANDLE USER CLICK =================
function handleUserListClick(event, users, stocks) {
  const userId = event.target.id;

  if (!userId) return;

  const selectedUser = users.find(user => user.id == userId);

  if (!selectedUser) return;

  populateForm(selectedUser);
  renderPortfolio(selectedUser, stocks);
}


// ================= POPULATE FORM =================
function populateForm(data) {
  const { user, id } = data;

  document.querySelector('#userID').value = id;
  document.querySelector('#firstname').value = user.firstname;
  document.querySelector('#lastname').value = user.lastname;
  document.querySelector('#address').value = user.address;
  document.querySelector('#city').value = user.city;
  document.querySelector('#email').value = user.email;
}


// ================= RENDER PORTFOLIO =================
function renderPortfolio(user, stocks) {
  const { portfolio } = user;

  const portfolioDetails = document.querySelector('.portfolio-list');

  // Clear previous portfolio
  portfolioDetails.innerHTML = '';

  portfolio.forEach(({ symbol, owned }) => {

    const symbolEl = document.createElement('p');
    const sharesEl = document.createElement('p');
    const buttonEl = document.createElement('button');

    symbolEl.innerText = symbol;
    sharesEl.innerText = owned;
    buttonEl.innerText = 'View';
    buttonEl.setAttribute('id', symbol);

    portfolioDetails.appendChild(symbolEl);
    portfolioDetails.appendChild(sharesEl);
    portfolioDetails.appendChild(buttonEl);
  });

  // Event delegation for stock buttons
  portfolioDetails.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
      viewStock(event.target.id, stocks);
    }
  });
}


// ================= VIEW STOCK =================
function viewStock(symbol, stocks) {
  const stock = stocks.find(s => s.symbol == symbol);

  if (!stock) return;

  document.querySelector('#stockName').textContent = stock.name;
  document.querySelector('#stockSector').textContent = stock.sector;
  document.querySelector('#stockIndustry').textContent = stock.subIndustry;
  document.querySelector('#stockAddress').textContent = stock.address;

  document.querySelector('#logo').src = `logos/${symbol}.svg`;
}

