/* add your code here */
document.addEventListener('DOMContentLoaded', () => {
    const usersData = JSON.parse(userContent); // Parses user data
    const stocksData = JSON.parse(stockContent); // Parses stock data
  
    // Initialize user list display
    renderUserList(usersData, stocksData);
  
    // Event listener for Save and Delete buttons
    document.querySelector('#saveButton').addEventListener('click', (e) => {
      e.preventDefault();
      updateUser(usersData, stocksData);
    });
  
    document.querySelector('#deleteButton').addEventListener('click', (e) => {
      e.preventDefault();
      deleteUser(usersData, stocksData);
    });
  });
  
 // 2 Render User list
 function renderUserList(users, stocks) {
    const userListElement = document.querySelector('.user-list');
    userListElement.innerHTML = ''; // Clear previous list
  
    users.forEach(({ user, id }) => {
      const userItem = document.createElement('li');
      userItem.textContent = `${user.lastname}, ${user.firstname}`;
      userItem.dataset.userId = id; // Set user ID for identification
      userListElement.appendChild(userItem);
    });
  
    // Add click event listener to display selected user info
    userListElement.addEventListener('click', (event) => {
      if (event.target.tagName === 'LI') {
        displayUserDetails(event.target.dataset.userId, users, stocks);
      }
    });
  }
  
  // 3  User Details
  function displayUserDetails(userId, users, stocks) {
    const selectedUser = users.find(user => user.id == userId);
  
    if (selectedUser) {
      document.querySelector('#userID').value = selectedUser.id;
      document.querySelector('#firstname').value = selectedUser.user.firstname;
      document.querySelector('#lastname').value = selectedUser.user.lastname;
      document.querySelector('#address').value = selectedUser.user.address;
      document.querySelector('#city').value = selectedUser.user.city;
      document.querySelector('#email').value = selectedUser.user.email;
  
      // Display the user's stock portfolio
      renderPortfolio(selectedUser, stocks);
    }
  }

  // Render Portfolio
  function renderPortfolio(user, stocks) {
    const portfolioContainer = document.querySelector('.portfolio-list');
    portfolioContainer.innerHTML = ''; // Clear previous entries
  
    user.portfolio.forEach(({ symbol, owned }) => {
      const stockElement = document.createElement('div');
      stockElement.classList.add('portfolio-item');
      
      const symbolText = document.createElement('p');
      symbolText.textContent = `Symbol: ${symbol}`;
      const sharesText = document.createElement('p');
      sharesText.textContent = `Owned: ${owned}`;
      const viewButton = document.createElement('button');
      viewButton.textContent = 'View';
      viewButton.dataset.symbol = symbol; // Attach symbol to button
  
      // Append elements to portfolio item
      stockElement.append(symbolText, sharesText, viewButton);
      portfolioContainer.appendChild(stockElement);
    });
  
    // View button event delegation for stock details
    portfolioContainer.addEventListener('click', (event) => {
      if (event.target.tagName === 'BUTTON') {
        viewStockDetails(event.target.dataset.symbol, stocks);
      }
    });
  }
  
  // 5 View Stock Details
  function viewStockDetails(symbol, stocks) {
    const stockData = stocks.find(stock => stock.symbol === symbol);
  
    if (stockData) {
      document.querySelector('#stockName').textContent = stockData.name;
      document.querySelector('#stockSector').textContent = stockData.sector;
      document.querySelector('#stockIndustry').textContent = stockData.subIndustry;
      document.querySelector('#stockAddress').textContent = stockData.address;
      document.querySelector('#logo').src = `logos/${symbol}.svg`;
    }
  }

  