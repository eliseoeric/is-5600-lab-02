/* add your code here */

document.addEventListener('DOMContentLoaded', () => {
    // Parse the JSON data provided by users.js and stocks-complete.js
    const stocksData = JSON.parse(stockContent);
    const userData = JSON.parse(userContent);
  
    // Generate the user list
    generateUserList(userData, stocksData);
  
    // Handle user selection from the user list
    function handleUserListClick(event, users, stocks) {
      const userId = event.target.id;
      const user = users.find(user => user.id == userId);
      populateForm(user);
      renderPortfolio(user, stocks);
    }
  
    // Populate the form with the user's data
    function populateForm(data) {
      const { user, id } = data;
      document.querySelector('#userID').value = id;
      document.querySelector('#firstname').value = user.firstname;
      document.querySelector('#lastname').value = user.lastname;
      document.querySelector('#address').value = user.address;
      document.querySelector('#city').value = user.city;
      document.querySelector('#email').value = user.email;
    }
  
    // Generate the user list and handle click events
    function generateUserList(users, stocks) {
      const userList = document.querySelector('.user-list');
      userList.innerHTML = ''; // Clear existing list
  
      users.forEach(({ user, id }) => {
        const listItem = document.createElement('li');
        listItem.innerText = `${user.lastname}, ${user.firstname}`;
        listItem.setAttribute('id', id);
        userList.appendChild(listItem);
      });
  
      // Register click event on the user list
      userList.addEventListener('click', (event) => handleUserListClick(event, users, stocks));
    }
  
    // Render the user's portfolio
    function renderPortfolio(user, stocks) {
      const { portfolio } = user;
      const portfolioDetails = document.querySelector('.portfolio-list');
      portfolioDetails.innerHTML = ''; // Clear existing portfolio
  
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
  
      // Register click event for "View" button
      portfolioDetails.addEventListener('click', (event) => {
        if (event.target.tagName === 'BUTTON') {
          viewStock(event.target.id, stocks);
        }
      });
    }
  
    // View the stock information
    function viewStock(symbol, stocks) {
      const stockArea = document.querySelector('.stock-form');
      if (stockArea) {
        const stock = stocks.find(s => s.symbol === symbol);
        document.querySelector('#stockName').textContent = stock.name;
        document.querySelector('#stockSector').textContent = stock.sector;
        document.querySelector('#stockIndustry').textContent = stock.subIndustry;
        document.querySelector('#stockAddress').textContent = stock.address;
        document.querySelector('#logo').src = `logos/${symbol}.svg`;
      }
    }
  
    // Save user changes
    const saveButton = document.querySelector('#saveButton');
    if (saveButton) {
      saveButton.addEventListener('click', (e) => {
        e.preventDefault();
        const id = document.querySelector('#userID').value;
        const userIndex = userData.findIndex(user => user.id == id);
  
        if (userIndex !== -1) {
          // Update user info
          userData[userIndex].user.firstname = document.querySelector('#firstname').value;
          userData[userIndex].user.lastname = document.querySelector('#lastname').value;
          userData[userIndex].user.address = document.querySelector('#address').value;
          userData[userIndex].user.city = document.querySelector('#city').value;
          userData[userIndex].user.email = document.querySelector('#email').value;
  
          // Re-render the user list
          generateUserList(userData, stocksData);
        }
      });
    }
  
    // Delete user
    const deleteButton = document.querySelector('#deleteButton');
    if (deleteButton) {
      deleteButton.addEventListener('click', (e) => {
        e.preventDefault();
        const userId = document.querySelector('#userID').value;
        const userIndex = userData.findIndex(user => user.id == userId);
        
        if (userIndex !== -1) {
          // Remove user
          userData.splice(userIndex, 1);
  
          // Re-render the user list
          generateUserList(userData, stocksData);
        }
      });
    }
  });
  