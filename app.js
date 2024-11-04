document.addEventListener('DOMContentLoaded', () => {
    // Parse JSON data from stocks and users
    const stocksData = JSON.parse(stockContent);
    const userData = JSON.parse(userContent);
  
    // Generate user list in the sidebar
    generateUserList(userData);
  });
  
  // Function to generate the list of users
  function generateUserList(users) {
    const userList = document.querySelector('.user-list');
    userList.innerHTML = ''; // Clear any previous data
  
    users.forEach(({ user, id }) => {
      const listItem = document.createElement('li');
      listItem.innerText = `${user.lastname}, ${user.firstname}`;
      listItem.setAttribute('id', id);
      userList.appendChild(listItem);
    });
  
    // Add event listener for user click
    userList.addEventListener('click', (event) => handleUserListClick(event, users));
  }
  
  // Function to handle clicking on a user in the user list
  function handleUserListClick(event, users) {
    const userId = event.target.id;
    const user = users.find((user) => user.id == userId);
    
    if (user) {
      populateForm(user);      // Populate user form with selected user's data
      renderPortfolio(user);   // Render portfolio for the selected user
    }
  }
  
  // Function to populate user information in the form
  function populateForm(data) {
    const { user, id } = data;
    document.querySelector('#userID').value = id;
    document.querySelector('#firstname').value = user.firstname;
    document.querySelector('#lastname').value = user.lastname;
    document.querySelector('#address').value = user.address;
    document.querySelector('#city').value = user.city;
    document.querySelector('#email').value = user.email;
  }
  
  // Function to render the portfolio of the selected user
  function renderPortfolio(user) {
    const portfolioList = document.querySelector('.portfolio-list');
    portfolioList.innerHTML = ''; // Clear previous portfolio data
    
    user.portfolio.forEach(({ symbol, owned }) => {
      const stockEl = document.createElement('div');
      stockEl.innerHTML = `
        <p>Symbol: ${symbol}</p>
        <p>Shares: ${owned}</p>
        <button id="${symbol}">View</button>
      `;
      portfolioList.appendChild(stockEl);
    });
  
    // Add event listener for each "View" button click
    portfolioList.addEventListener('click', (event) => {
      if (event.target.tagName === 'BUTTON') {
        viewStock(event.target.id);  // Display stock details for the clicked stock symbol
      }
    });
  }
  
  // Function to view detailed stock information when "View" button is clicked
  function viewStock(symbol) {
    const stock = stocksData.find((s) => s.symbol === symbol);
    
    if (stock) {
      document.querySelector('#stockName').textContent = stock.name;
      document.querySelector('#stockSector').textContent = stock.sector;
      document.querySelector('#stockIndustry').textContent = stock.subIndustry;
      document.querySelector('#stockPrice').textContent = `Price: $${stock.price}`;
    }
  }
  