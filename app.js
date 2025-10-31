/* add your code here */
// ======================================
// Stock Portfolio Dashboard
// ======================================

document.addEventListener('DOMContentLoaded', () => {

  // Parse JSON data provided by included JS files
  const stocksData = JSON.parse(stockContent);
  const userData = JSON.parse(userContent);

  // Get references to buttons
  const saveButton = document.querySelector('#saveButton');
  const deleteButton = document.querySelector('#deleteButton');

  // Initial user list render
  generateUserList(userData, stocksData);

  // ----------------------------
  // SAVE USER INFO
  // ----------------------------
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
      }
    }

    generateUserList(userData, stocksData);
    alert('✅ User details updated successfully!');
  });

  // ----------------------------
  // DELETE USER
  // ----------------------------
  deleteButton.addEventListener('click', (e) => {
    e.preventDefault();

    const userId = document.querySelector('#userID').value;
    const userIndex = userData.findIndex(user => user.id == userId);

    if (userIndex !== -1) {
      userData.splice(userIndex, 1);
      generateUserList(userData, stocksData);
      clearForm();
      document.querySelector('.portfolio-list').innerHTML = '';
      alert('🗑️ User deleted successfully!');
    }
  });
});

// ======================================
// FUNCTIONS
// ======================================

function generateUserList(users, stocks) {
  const userList = document.querySelector('.user-list');
  userList.innerHTML = ''; // Clear previous items

  users.map(({ user, id }) => {
    const listItem = document.createElement('li');
    listItem.innerText = `${user.lastname}, ${user.firstname}`;
    listItem.setAttribute('id', id);
    userList.appendChild(listItem);
  });

  // Add event listener for selecting users
  userList.addEventListener('click', (event) => handleUserListClick(event, users, stocks));
}

function handleUserListClick(event, users, stocks) {
  const userId = event.target.id;
  const user = users.find(u => u.id == userId);

  if (user) {
    populateForm(user);
    renderPortfolio(user, stocks);
  }
}

function populateForm(data) {
  const { user, id } = data;
  document.querySelector('#userID').value = id;
  document.querySelector('#firstname').value = user.firstname;
  document.querySelector('#lastname').value = user.lastname;
  document.querySelector('#address').value = user.address;
  document.querySelector('#city').value = user.city;
  document.querySelector('#email').value = user.email;
}

function clearForm() {
  document.querySelector('#userID').value = '';
  document.querySelector('#firstname').value = '';
  document.querySelector('#lastname').value = '';
  document.querySelector('#address').value = '';
  document.querySelector('#city').value = '';
  document.querySelector('#email').value = '';
}

function renderPortfolio(user, stocks) {
  const { portfolio } = user;
  const portfolioDetails = document.querySelector('.portfolio-list');
  portfolioDetails.innerHTML = '';

  portfolio.map(({ symbol, owned }) => {
    const div = document.createElement('div');
    div.classList.add('portfolio-item');

    const symbolEl = document.createElement('p');
    symbolEl.textContent = symbol;

    const sharesEl = document.createElement('p');
    sharesEl.textContent = `Shares: ${owned}`;

    const button = document.createElement('button');
    button.textContent = 'View';
    button.setAttribute('id', symbol);

    div.appendChild(symbolEl);
    div.appendChild(sharesEl);
    div.appendChild(button);

    portfolioDetails.appendChild(div);
  });

  // Handle clicking on stock “View” buttons
  portfolioDetails.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
      viewStock(event.target.id, stocks);
    }
  });
}

function viewStock(symbol, stocks) {
  const stock = stocks.find(s => s.symbol == symbol);
  const stockArea = document.querySelector('.stock-form');

  if (stockArea && stock) {
    document.querySelector('#stockName').textContent = stock.name;
    document.querySelector('#stockSector').textContent = stock.sector;
    document.querySelector('#stockIndustry').textContent = stock.subIndustry;
    document.querySelector('#stockAddress').textContent = stock.address;

    document.querySelector('#logo').src = `logos/${symbol}.svg`;
  }
}

