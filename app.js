document.addEventListener('DOMContentLoaded', () => {
    const stocksData = JSON.parse(stockContent);
    const userData = JSON.parse(userContent);
  
    generateUserList(userData, stocksData);
  
    const saveButton = document.querySelector('#saveButton');
    const deleteButton = document.querySelector('#deleteButton');
  
    saveButton.addEventListener('click', (event) => {
      event.preventDefault(); 
      const id = document.querySelector('#userID').value;
  
      userData.forEach(user => {
        if (user.id == id) {
          user.user.firstname = document.querySelector('#firstname').value;
          user.user.lastname = document.querySelector('#lastname').value;
          user.user.address = document.querySelector('#address').value;
          user.user.city = document.querySelector('#city').value;
          user.user.email = document.querySelector('#email').value;
        }
      });
      
      generateUserList(userData, stocksData); 
    });
  
    deleteButton.addEventListener('click', (event) => {
      event.preventDefault(); 
      const userId = document.querySelector('#userID').value;
      const userIndex = userData.findIndex(user => user.id == userId);
      userData.splice(userIndex, 1); 
      generateUserList(userData, stocksData); 
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
    const user = users.find(user => user.id == userId);
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
      const item = document.createElement('div');
      item.innerHTML = `<p>${symbol} - ${owned} shares <button id="${symbol}">View</button></p>`;
      portfolioDetails.appendChild(item);
    });
  
    portfolioDetails.addEventListener('click', (event) => {
      if (event.target.tagName === 'BUTTON') {
        viewStock(event.target.id, stocks);
      }
    });
  }
  
  function viewStock(symbol, stocks) {
    const stock = stocks.find(s => s.symbol === symbol);
    if (stock) {
      document.querySelector('#stockName').textContent = stock.name;
      document.querySelector('#stockSector').textContent = stock.sector;
      document.querySelector('#stockIndustry').textContent = stock.subIndustry;
      document.querySelector('#stockAddress').textContent = stock.address;
      document.querySelector('#logo').src = `logos/${symbol}.svg`;
    }
  }
  