document.addEventListener('DOMContentLoaded', () => {
    // This is the entry point for your script
    const stocksData = JSON.parse(stockContent);
const userData = JSON.parse(userContent);

console.log('Users:', userData);
console.log('Stocks:', stocksData);

    console.log('DOM fully loaded and parsed!');
    generateUserList(userData, stocksData);

    document.querySelector('.portfolio-list').addEventListener('click', (event) => {
        if (event.target.classList.contains('view-stock')) {
          const symbol = event.target.dataset.symbol;
          viewStock(symbol, stocksData);
        }
      });
      document.querySelector('#saveUser').addEventListener('click', () => saveUser(userData));
document.querySelector('#deleteUser').addEventListener('click', () => deleteUser(userData));


  });
  
  function generateUserList(users) {
    const userList = document.querySelector('.user-list');
  
    users.forEach(({ user, id }) => {
      const listItem = document.createElement('li');
      listItem.innerText = `${user.lastname}, ${user.firstname}`;
      listItem.setAttribute('id', id);
      userList.appendChild(listItem);
      userList.addEventListener('click', (event) => handleUserListClick(event, userData));

    });
  }
  

  function handleUserListClick(event, users) {
    const userId = event.target.id;
    const user = users.find((u) => u.id == userId);
  
    if (user) {
      populateForm(user);
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
  
  function renderPortfolio(user) {
    const portfolioList = document.querySelector('.portfolio-list');
    portfolioList.innerHTML = '';
      user.portfolio.forEach(({ symbol, owned }) => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
          ${symbol}: ${owned} shares
          <button class="view-stock" data-symbol="${symbol}">View</button>
        `;
        portfolioList.appendChild(listItem);
      });
      
    });
    
  }

  function handleUserListClick(event, users) {
    const userId = event.target.id;
    const user = users.find((u) => u.id == userId);
  
    if (user) {
      populateForm(user);
      renderPortfolio(user);
    }
  }

  function viewStock(symbol, stocks) {
    const stock = stocks.find((s) => s.symbol === symbol);
  
    if (stock) {
      document.querySelector('#stockName').textContent = stock.name;
      document.querySelector('#stockSector').textContent = stock.sector;
      document.querySelector('#stockIndustry').textContent = stock.subIndustry;
      document.querySelector('#stockAddress').textContent = stock.address;
      document.querySelector('#logo').src = `logos/${symbol}.svg`;
    }
  }
  
  function saveUser(users) {
    const id = document.querySelector('#userID').value;
    const user = users.find((u) => u.id == id);
  
    if (user) {
      user.user.firstname = document.querySelector('#firstname').value;
      user.user.lastname = document.querySelector('#lastname').value;
      user.user.address = document.querySelector('#address').value;
      user.user.city = document.querySelector('#city').value;
      user.user.email = document.querySelector('#email').value;
    }
  }
  
  function deleteUser(users) {
    const id = document.querySelector('#userID').value;
    const index = users.findIndex((u) => u.id == id);
  
    if (index > -1) {
      users.splice(index, 1);
      document.querySelector('.user-list').innerHTML = '';
      generateUserList(users);
      document.querySelector('.portfolio-list').innerHTML = '';
      document.querySelector('form').reset();
    }
  }
  