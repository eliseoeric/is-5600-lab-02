/* add your code here */

document.addEventListener('DOMContentLoaded', () => {
    const stocksData = JSON.parse(stockContent);
    const userData = JSON.parse(userContent);
  
    generateUserList(userData, stocksData);
  
    const saveButton = document.querySelector('#saveButton');
    const deleteButton = document.querySelector('#deleteButton');
  
    saveButton.addEventListener('click', (e) => {
      e.preventDefault();
      const id = document.querySelector('#userID').value;
  
      userData.forEach((user) => {
        if (user.id == id) {
          const updatedUser = document.querySelector('#firstname').value;
          user.user.firstname = updatedUser;
          user.user.lastname = document.querySelector('#lastname').value;
          user.user.address = document.querySelector('#address').value;
          user.user.city = document.querySelector('#city').value;
          user.user.email = document.querySelector('#email').value;
          generateUserList(userData, stocksData);
        }
      });
    });
  
    deleteButton.addEventListener('click', (e) => {
      e.preventDefault();
      const userId = document.querySelector('#userID').value;
  
      const index = userData.findIndex((user) => user.id == userId);
      if (index !== -1) {
        userData.splice(index, 1);
        generateUserList(userData, stocksData);
        clearForm();
        clearPortfolio();
      }
    });
  });
  
  function generateUserList(users, stocks) {
    const userList = document.querySelector('.user-list');
    userList.innerHTML = '';
  
    users.forEach(({ user, id }) => {
      const listItem = document.createElement('li');
      listItem.innerText = `${user.lastname}, ${user.firstname}`;
      listItem.setAttribute('id', id);
      userList.appendChild(listItem);
    });
  
    userList.addEventListener('click', (event) => handleUserListClick(event, users, stocks));
  }
  
  function handleUserListClick(event, users, stocks) {
    const userId = event.target.id;
    const user = users.find((user) => user.id == userId);
  
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
  
  function renderPortfolio(user, stocks) {
    const { portfolio } = user;
    const portfolioDetails = document.querySelector('.portfolio-list');
    portfolioDetails.innerHTML = '';
  
    portfolio.forEach(({ symbol, owned }) => {
      const symbolEl = document.createElement('p');
      const sharesEl = document.createElement('p');
      const actionEl = document.createElement('button');
  
      symbolEl.innerText = `Stock: ${symbol}`;
      sharesEl.innerText = `Shares: ${owned}`;
      actionEl.innerText = 'View';
      actionEl.setAttribute('id', symbol);
  
      portfolioDetails.appendChild(symbolEl);
      portfolioDetails.appendChild(sharesEl);
      portfolioDetails.appendChild(actionEl);
    });
  
    portfolioDetails.addEventListener('click', (event) => {
      if (event.target.tagName === 'BUTTON') {
        viewStock(event.target.id, stocks);
      }
    });
  }
  
  function viewStock(symbol, stocks) {
    const stock = stocks.find((stock) => stock.symbol == symbol);
    const stockArea = document.querySelector('.stock-form');
  
    if (stock) {
      document.querySelector('#stockName').textContent = stock.name;
      document.querySelector('#stockSector').textContent = stock.sector;
      document.querySelector('#stockIndustry').textContent = stock.subIndustry;
      document.querySelector('#stockAddress').textContent = stock.address;
      document.querySelector('#logo').src = `logos/${symbol}.svg`;
      stockArea.style.display = 'block';
    }
  }
  
  function clearForm() {
    document.querySelector('#userID').value = '';
    document.querySelector('#firstname').value = '';
    document.querySelector('#lastname').value = '';
    document.querySelector('#address').value = '';
    document.querySelector('#city').value = '';
    document.querySelector('#email').value = '';
  }
  
  function clearPortfolio() {
    document.querySelector('.portfolio-list').innerHTML = '';
  }
  