document.addEventListener('DOMContentLoaded', () => {
    const stocksData = JSON.parse(stockContent);
    const userData = JSON.parse(userContent);
  
    generateUserList(userData, stocksData);
    setupEventListeners(userData, stocksData);
  });
  function generateUserList(users, stocks) {
    const userList = document.querySelector('.user-list');
    userList.innerHTML = ''; // Clear any previous list items
  
    users.forEach(({ user, id }) => {
      const listItem = document.createElement('li');
      listItem.innerText = ${user.lastname}, ${user.firstname};
      listItem.setAttribute('id', id);
      userList.appendChild(listItem);
    });
  
    // Attach click event handler
    userList.addEventListener('click', (event) => handleUserListClick(event, users, stocks));
  }
  function handleUserListClick(event, users, stocks) {
    const userId = event.target.id;
    const user = users.find(user => user.id == userId);
    populateForm(user);
    renderPortfolio(user, stocks);
  }
  function populateForm(data) {
    const { user, id } = data;
    const fields = ['firstname', 'lastname', 'address', 'city', 'email'];
    document.querySelector('#userID').value = id;
  
    fields.forEach(field => {
      document.querySelector(#${field}).value = user[field];
    });
  }
  function renderPortfolio(user, stocks) {
    const { portfolio } = user;
    const portfolioDetails = document.querySelector('.portfolio-list');
    portfolioDetails.innerHTML = ''; // Clear previous items
  
    portfolio.forEach(({ symbol, owned }) => {
      const symbolEl = document.createElement('p');
      const sharesEl = document.createElement('p');
      const actionEl = document.createElement('button');
  
      symbolEl.innerText = symbol;
      sharesEl.innerText = owned;
      actionEl.innerText = 'View';
      actionEl.setAttribute('id', symbol);
  
      portfolioDetails.appendChild(symbolEl);
      portfolioDetails.appendChild(sharesEl);
      portfolioDetails.appendChild(actionEl);
    });
  
    // Event delegation for view buttons
    portfolioDetails.addEventListener('click', (event) => {
      if (event.target.tagName === 'BUTTON') {
        viewStock(event.target.id, stocks);
      }
    });
  }
  function viewStock(symbol, stocks) {
    const stockArea = document.querySelector('.stock-form');
    if (stockArea) {
      const stock = stocks.find(function(s) {return s.symbol == symbol});
      document.querySelector('#stockName').textContent = stock.name;
      document.querySelector('#stockSector').textContent = stock.sector;
      document.querySelector('#stockIndustry').textContent = stock.subIndustry;
      document.querySelector('#stockAddress').textContent = stock.address;
      document.querySelector('#logo').src = logos/${symbol}.svg;
    }
  }
  function setupEventListeners(users, stocks) {
    const saveButton = document.querySelector('#saveButton');
    const deleteButton = document.querySelector('#deleteButton');
  
    saveButton.addEventListener('click', (event) => {
      event.preventDefault();
      const id = document.querySelector('#userID').value;
      const userIndex = users.findIndex(user => user.id == id);
  
      if (userIndex !== -1) {
        users[userIndex] = {
          ...users[userIndex],
          user: {
            firstname: document.querySelector('#firstname').value,
            lastname: document.querySelector('#lastname').value,
            address: document.querySelector('#address').value,
            city: document.querySelector('#city').value,
            email: document.querySelector('#email').value
          }
        };
        generateUserList(users, stocks);
      }
    });
  
    deleteButton.addEventListener('click', (event) => {
      event.preventDefault();
      const userId = document.querySelector('#userID').value;
      const userIndex = users.findIndex(user => user.id == userId);
      users.splice(userIndex, 1);
      generateUserList(users, stocks);
    });
  }
  function populateForm(data) {
    const { user, id } = data;
    const fields = ['firstname', 'lastname', 'address', 'city', 'email'];
    document.querySelector('#userID').value = id;
    fields.forEach(field => {
      document.querySelector(#${field}).value = user[field];
    });
  }