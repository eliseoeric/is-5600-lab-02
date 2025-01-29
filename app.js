document.addEventListener('DOMContentLoaded', () => {
    const stocksData = JSON.parse(stockContent); // Loaded from stocks-complete.js
    const userData = JSON.parse(userContent); // Loaded from users.js
  
    // Initialize user list and register event listeners
    generateUserList(userData, stocksData);
  
    // Register save and delete button event listeners
    document.querySelector('#save').addEventListener('click', handleSaveClick);
    document.querySelector('#delete').addEventListener('click', handleDeleteClick);
  
    /**
     * Handles the save button click event
     * @param {Event} e
     */
    function handleSaveClick(e) {
      e.preventDefault();
      const id = document.querySelector('#userID').value;
  
      const user = userData.find(user => user.id == id);
      if (user) {
        const formFields = ['firstname', 'lastname', 'address', 'city', 'email'];
        formFields.forEach(field => {
          user.user[field] = document.querySelector(`#${field}`).value;
        });
  
        generateUserList(userData, stocksData);
      }
    }

    /**
     * Handles the delete button click event
     * @param {Event} e
     */
    function handleDeleteClick(e) {
      e.preventDefault();
      const userId = document.querySelector('#userID').value;
      const userIndex = userData.findIndex(user => user.id == userId);
  
      if (userIndex > -1) {
        userData.splice(userIndex, 1);
        generateUserList(userData, stocksData);
        document.querySelector('form').reset(); // Clear the form
      }
    }
  });

  /**
   * Renders the user list
   * @param {Array} users - User data array
   * @param {Array} stocks - Stocks data array
   */
  function generateUserList(users, stocks) {
    const userList = document.querySelector('.user-list');
    userList.innerHTML = ''; // Clear the list before rendering
  
    users.forEach(({ user, id }) => {
      const listItem = document.createElement('li');
      listItem.innerText = `${user.lastname}, ${user.firstname}`;
      listItem.setAttribute('id', id);
      userList.appendChild(listItem);
    });

    // Add event listener to handle user clicks
    userList.removeEventListener('click', userListClickHandler);
    userList.addEventListener('click', (event) => userListClickHandler(event, users, stocks));
  }

  /**
   * Handles user list click
   * @param {Event} event
   * @param {Array} users - User data array
   * @param {Array} stocks - Stocks data array
   */
  function userListClickHandler(event, users, stocks) {
    const userId = event.target.id;
    const user = users.find(user => user.id == userId);
  
    if (user) {
      populateForm(user);
      renderPortfolio(user, stocks);
    }
  }
  
  /**
   * Populates the form with the selected user's data
   * @param {Object} data - User object
   */
  function populateForm(data) {
    const { user, id } = data;
    const formFields = ['userID', 'firstname', 'lastname', 'address', 'city', 'email'];
  
    formFields.forEach(field => {
      document.querySelector(`#${field}`).value = field === 'userID' ? id : user[field];
    });
  }
  
  /**
   * Renders the portfolio for the selected user
   * @param {Object} user - User object
   * @param {Array} stocks - Stocks data array
   */
  function renderPortfolio(user, stocks) {
    const portfolioDetails = document.querySelector('.portfolio-list');
    portfolioDetails.innerHTML = ''; // Clear previous render
  
    user.portfolio.forEach(({ symbol, owned }) => {
      const symbolEl = document.createElement('p');
      const sharesEl = document.createElement('p');
      const actionEl = document.createElement('button');
  
      symbolEl.innerText = `Symbol: ${symbol}`;
      sharesEl.innerText = `Shares: ${owned}`;
      actionEl.innerText = 'View';
      actionEl.setAttribute('id', symbol);
  
      portfolioDetails.appendChild(symbolEl);
      portfolioDetails.appendChild(sharesEl);
      portfolioDetails.appendChild(actionEl);
    });
  
    portfolioDetails.removeEventListener('click', portfolioClickHandler);
    portfolioDetails.addEventListener('click', (event) => portfolioClickHandler(event, stocks));
  }
  
  /**
   * Handles portfolio list click
   * @param {Event} event
   * @param {Array} stocks - Stocks data array
   */
  function portfolioClickHandler(event, stocks) {
    if (event.target.tagName === 'BUTTON') {
      viewStock(event.target.id, stocks);
    }
  }
  
  /**
   * Displays stock information for the selected symbol
   * @param {string} symbol - Stock symbol
   * @param {Array} stocks - Stocks data array
   */
  function viewStock(symbol, stocks) {
    const stock = stocks.find(s => s.symbol == symbol);
    const stockArea = document.querySelector('.stock-form');
  
    if (stock) {
      stockArea.style.display = 'block';
      const stockFields = ['stockName', 'stockSector', 'stockIndustry', 'stockAddress'];
  
      stockFields.forEach(field => {
        const key = field.replace('stock', '').toLowerCase();
        document.querySelector(`#${field}`).textContent = stock[key];
      });
  
      document.querySelector('#logo').src = `logos/${symbol}.svg`;
    }
  }
  

