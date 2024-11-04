document.addEventListener('DOMContentLoaded', () => {
    const stocksData = JSON.parse(stockContent);
    const userData = JSON.parse(userContent);
    const saveButton = document.querySelector('#saveButton');
    const deleteButton = document.querySelector('#deleteButton');
    generateUserList(userData, stocksData);
    saveButton.addEventListener('click', (event) => {
      event.preventDefault();
      const id = document.querySelector('#userID').value;
      const userToUpdate = userData.find(user => user.id == id);
      if (userToUpdate) {
        userToUpdate.user.firstname = document.querySelector('#firstname').value;
        userToUpdate.user.lastname = document.querySelector('#lastname').value;
        userToUpdate.user.address = document.querySelector('#address').value;
        userToUpdate.user.city = document.querySelector('#city').value;
        userToUpdate.user.email = document.querySelector('#email').value;
        generateUserList(userData, stocksData);
      }
    });
    deleteButton.addEventListener('click', (event) => {
      event.preventDefault();
      const userId = document.querySelector('#userID').value;
      const userIndex = userData.findIndex(user => user.id == userId);

      if (userIndex !== -1) {
        userData.splice(userIndex, 1);
        generateUserList(userData, stocksData);
        
        document.querySelector('form').reset();

        document.querySelector('.portfolio-list').innerHTML = '';
        document.querySelector('.stock-form').innerHTML = '';
      }
    });
  });
  
  function generateUserList(users, stocks) {
    const userList = document.querySelector('.user-list');
    userList.innerHTML = ''; 
    
    users.forEach(({user, id}) => {
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
    const portfolioDetails = document.querySelector('.portfolio-list');
    portfolioDetails.innerHTML = '';
    
    user.portfolio.forEach(({ symbol, owned }) => {
      const row = document.createElement('div');
      row.className = 'portfolio-row';
      
      const symbolEl = document.createElement('p');
      const sharesEl = document.createElement('p');
      const actionEl = document.createElement('button');
      
      symbolEl.innerText = symbol;
      sharesEl.innerText = owned;
      actionEl.innerText = 'View';
      actionEl.setAttribute('id', symbol);
      actionEl.className = 'view-stock-btn';
      
      row.appendChild(symbolEl);
      row.appendChild(sharesEl);
      row.appendChild(actionEl);
      portfolioDetails.appendChild(row);
      
      actionEl.addEventListener('click', () => viewStock(symbol, stocks));
    });
  }
  
  function viewStock(symbol, stocks) {
    const stockArea = document.querySelector('.stock-form');
    const stock = stocks.find(s => s.symbol === symbol);
    
    if (stock && stockArea) {
      stockArea.style.display = 'block';
      document.querySelector('#stockName').textContent = stock.name;
      document.querySelector('#stockSector').textContent = stock.sector;
      document.querySelector('#stockIndustry').textContent = stock.subIndustry;
      document.querySelector('#stockAddress').textContent = stock.address;
      
      const logoImg = document.querySelector('#logo');
      if (logoImg) {
        logoImg.src = `logos/${symbol}.svg`;
        logoImg.alt = `${stock.name} logo`;
      }
    }
  }