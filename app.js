/* add your code here */
document.addEventListener('DOMContentLoaded', () => {
  // Parse the JSON data from our data files
  const stocksData = JSON.parse(stockContent);
  const userData = JSON.parse(userContent);
  
  // Get reference to action buttons
  const saveButton = document.querySelector('#btnSave');
  const deleteButton = document.querySelector('#btnDelete');

  // Initialize the user list
  displayUserList();

  // 1. Handle user selection
  document.querySelector('.user-list').addEventListener('click', (e) => {
    if (e.target.tagName === 'LI') {
      const selectedUserId = e.target.getAttribute('id');
      const selectedUser = userData.find(user => user.id == selectedUserId);
      
      if (selectedUser) {
        // Display user's info in form
        populateUserForm(selectedUser);
        // Display user's portfolio
        displayPortfolio(selectedUser);
      }
    }
  });

  // 2. Handle stock selection
  document.querySelector('.portfolio-list').addEventListener('click', (e) => {
    if (e.target.classList.contains('view-stock-btn')) {
      const stockSymbol = e.target.getAttribute('data-symbol');
      const stockInfo = stocksData.find(stock => stock.symbol === stockSymbol);
      
      if (stockInfo) {
        displayStockInfo(stockInfo);
      }
    }
  });

  // 3. Handle save user modifications
  saveButton.addEventListener('click', (e) => {
    e.preventDefault();
    
    const userId = document.querySelector('#userID').value;
    console.log("In app ", userId)
    const updatedUser = {
      id: userId,
      user: {
        firstname: document.querySelector('#firstname').value,
        lastname: document.querySelector('#lastname').value,
        address: document.querySelector('#address').value,
        city: document.querySelector('#city').value,
        email: document.querySelector('#email').value
      }
    };

    // Find and update user in data
    const userIndex = userData.findIndex(user => user.id == userId);
    if (userIndex !== -1) {
      // Preserve the portfolio when updating user info
      updatedUser.portfolio = userData[userIndex].portfolio;
      userData[userIndex] = updatedUser;
      
      // Refresh the display
      displayUserList();
      displayPortfolio(updatedUser);
    }
  });

  // 4. Handle user deletion
  deleteButton.addEventListener('click', (e) => {
    e.preventDefault();
    
    const userId = document.querySelector('#userID').value;
    const userIndex = userData.findIndex(user => user.id == userId);
    
    if (userIndex !== -1) {
      // Remove user from data
      userData.splice(userIndex, 1);
      
      // Clear displays
      clearUserForm();
      clearPortfolioDisplay();
      clearStockDisplay();
      
      // Refresh user list
      displayUserList();
    }
  });

  // Helper Functions
  function displayUserList() {
    const userList = document.querySelector('.user-list');
    userList.innerHTML = '';
    
    userData.forEach(user => {
      const li = document.createElement('li');
      li.textContent = `${user.user.lastname}, ${user.user.firstname}`;
      li.setAttribute('id', user.id);
      userList.appendChild(li);
    });
  }

  function populateUserForm(userData) {
    const { user, id } = userData;
    document.querySelector('#userID').value = id;
    document.querySelector('#firstname').value = user.firstname;
    document.querySelector('#lastname').value = user.lastname;
    document.querySelector('#address').value = user.address;
    document.querySelector('#city').value = user.city;
    document.querySelector('#email').value = user.email;
  }

  function displayPortfolio(userData) {
    const portfolioList = document.querySelector('.portfolio-list');
    portfolioList.innerHTML = '';
    
    userData.portfolio.forEach(holding => {
      const div = document.createElement('div');
      div.className = 'portfolio-item';
      
      div.innerHTML = `
        <span>${holding.symbol}</span>
        <span>${holding.owned} shares</span>
        <button class="view-stock-btn" data-symbol="${holding.symbol}">View</button>
      `;
      
      portfolioList.appendChild(div);
    });
  }

  function displayStockInfo(stock) {
    document.querySelector('#stockName').textContent = stock.name;
    document.querySelector('#stockSector').textContent = stock.sector;
    document.querySelector('#stockIndustry').textContent = stock.subIndustry;
    document.querySelector('#stockAddress').textContent = stock.address;
    document.querySelector('#logo').src = `logos/${stock.symbol}.svg`;
  }

  function clearUserForm() {
    document.querySelector('#userID').value = '';
    document.querySelector('#firstname').value = '';
    document.querySelector('#lastname').value = '';
    document.querySelector('#address').value = '';
    document.querySelector('#city').value = '';
    document.querySelector('#email').value = '';
  }

  function clearPortfolioDisplay() {
    document.querySelector('.portfolio-list').innerHTML = '';
  }

  function clearStockDisplay() {
    document.querySelector('#stockName').textContent = '';
    document.querySelector('#stockSector').textContent = '';
    document.querySelector('#stockIndustry').textContent = '';
    document.querySelector('#stockAddress').textContent = '';
    document.querySelector('#logo').src = '';
  }
});
