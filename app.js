function generateUserList(users, stocks) {
  const userList = document.querySelector('.user-list');
  userList.innerHTML = '';
  users.forEach(({ user, id }) => {
    const listItem = document.createElement('li');
    listItem.innerText = `${user.lastname}, ${user.firstname}`;
    listItem.id = id;
    userList.appendChild(listItem);
  });
  userList.addEventListener('click', (event) => handleUserListClick(event, users, stocks));
}

function handleUserListClick(event, users, stocks) {
  const userId = event.target.id;
  const user = users.find(u => u.id == userId);
  populateForm(user);
  renderPortfolio(user, stocks);
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

function renderPortfolio(user, stocks) {
  const { portfolio } = user;
  const portfolioDetails = document.querySelector('.portfolio-list');
  portfolioDetails.innerHTML = '';
  
  portfolio.forEach(({ symbol, owned }) => {
    const container = document.createElement('div');
    container.className = 'portfolio-item';
    
    const symbolEl = document.createElement('p');
    symbolEl.innerText = symbol;
    
    const sharesEl = document.createElement('p');
    sharesEl.innerText = owned;
    
    const actionEl = document.createElement('button');
    actionEl.innerText = 'View';
    actionEl.id = symbol;
    
    container.appendChild(symbolEl);
    container.appendChild(sharesEl);
    container.appendChild(actionEl);
    portfolioDetails.appendChild(container);
  });
  
  portfolioDetails.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
      viewStock(event.target.id, stocks);
    }
  });
}

function viewStock(symbol, stocks) {
  const stockArea = document.querySelector('.stock-form');
  if (stockArea) {
    const stock = stocks.find(s => s.symbol == symbol);
    document.querySelector('#stockName').textContent = stock.name;
    document.querySelector('#stockSector').textContent = stock.sector;
    document.querySelector('#stockIndustry').textContent = stock.subIndustry;
    document.querySelector('#stockAddress').textContent = stock.address;
    document.querySelector('#logo').src = `logos/${symbol}.svg`;
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const stocksData = JSON.parse(stockContent);
  const userData = JSON.parse(userContent);
  generateUserList(userData, stocksData);
  
  const deleteButton = document.querySelector('#delete');
  const saveButton = document.querySelector('#save');
  
  deleteButton.addEventListener('click', (event) => {
    event.preventDefault();
    const userId = document.querySelector('#userID').value;
    const userIndex = userData.findIndex(u => u.id == userId);
    if (userIndex > -1) {
      userData.splice(userIndex, 1);
      generateUserList(userData, stocksData);
    }
  });
  
  saveButton.addEventListener('click', (event) => {
    event.preventDefault();
    const id = document.querySelector('#userID').value;
    const user = userData.find(u => u.id == id);
    if (user) {
      user.user.firstname = document.querySelector('#firstname').value;
      user.user.lastname = document.querySelector('#lastname').value;
      user.user.address = document.querySelector('#address').value;
      user.user.city = document.querySelector('#city').value;
      user.user.email = document.querySelector('#email').value;
      generateUserList(userData, stocksData);
    }
  });
});