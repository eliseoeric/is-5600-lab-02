/* add your code here */

document.addEventListener('DOMContentLoaded', () => {
    const stocksData = JSON.parse(stockContent);
    const userData = JSON.parse(userContent);

    function generateUserList(users, stocks) {
      const userList = document.querySelector('.user-list');
      userList.innerHTML = '';  
      users.map(({ user, id }) => {
        const listItem = document.createElement('li');
        listItem.innerText = user.lastname + ', ' + user.firstname;
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
      portfolio.map(({ symbol, owned }) => {
        const symbolEl = document.createElement('p');
        const sharesEl = document.createElement('p');
        const actionEl = document.createElement('button');
        symbolEl.innerText = `Stock: ${symbol}`;
        sharesEl.innerText = `Shares Owned: ${owned}`;
        actionEl.innerText = 'View Details';
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
      const stockArea = document.querySelector('.stock-form');
      const stock = stocks.find(stock => stock.symbol === symbol);
      if (stock) {
        document.querySelector('#stockName').textContent = `Name: ${stock.name}`;
        document.querySelector('#stockSector').textContent = `Sector: ${stock.sector}`;
        document.querySelector('#stockIndustry').textContent = `Industry: ${stock.subIndustry}`;
        document.querySelector('#stockAddress').textContent = `Address: ${stock.address}`;
      }
    }

    generateUserList(userData, stocksData);
  });