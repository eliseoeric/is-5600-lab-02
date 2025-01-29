/* add your code here */
document.addEventListener('DOMContentLoaded', () => {
    // Parse the data from included JSON or JavaScript variables
    const stocksData = JSON.parse(stockContent);
    const userData = JSON.parse(userContent);
  
    // Cache DOM elements
    const userList = document.querySelector('.user-list');
    const portfolioList = document.querySelector('.portfolio-list');
    const userForm = document.querySelector('.userEntry');
    const deleteButton = document.querySelector('#btnDelete');
    const saveButton = document.querySelector('#btnSave');
  
    const stockDetails = {
      logo: document.querySelector('#logo'),
      name: document.querySelector('#stockName'),
      sector: document.querySelector('#stockSector'),
      industry: document.querySelector('#stockIndustry'),
      address: document.querySelector('#stockAddress'),
    };
  
    // Generate the list of users
    function generateUserList(users) {
      // Clear existing list
      userList.innerHTML = '';
  
      // Loop through users and add them to the list
      users.forEach(({ id, user }) => {
        const listItem = document.createElement('li');
        listItem.innerText = `${user.lastname}, ${user.firstname}`;
        listItem.setAttribute('id', id);
        userList.appendChild(listItem);
      });
    }
  
    // Populate user form with selected user data
    function populateForm(user) {
      const { id, user: userInfo } = user;
      document.querySelector('#userID').value = id;
      document.querySelector('#firstname').value = userInfo.firstname;
      document.querySelector('#lastname').value = userInfo.lastname;
      document.querySelector('#address').value = userInfo.address;
      document.querySelector('#city').value = userInfo.city;
      document.querySelector('#email').value = userInfo.email;
    }
  
    // Render the user's portfolio
    function renderPortfolio(user) {
      // Clear existing portfolio
      portfolioList.innerHTML = '';
  
      // Add each stock in the user's portfolio
      user.portfolio.forEach(({ symbol, owned }) => {
        const symbolEl = document.createElement('p');
        const sharesEl = document.createElement('p');
        const actionEl = document.createElement('button');
  
        symbolEl.innerText = symbol;
        sharesEl.innerText = owned;
        actionEl.innerText = 'View';
        actionEl.setAttribute('id', symbol);
  
        portfolioList.appendChild(symbolEl);
        portfolioList.appendChild(sharesEl);
        portfolioList.appendChild(actionEl);
      });
  
      // Add event listener for stock view buttons
      portfolioList.addEventListener('click', (event) => {
        if (event.target.tagName === 'BUTTON') {
          viewStock(event.target.id);
        }
      });
    }
  
    // Display stock details
    function viewStock(symbol) {
      const stock = stocksData.find((s) => s.symbol === symbol);
  
      if (stock) {
        stockDetails.logo.src = `logos/${symbol}.svg`;
        stockDetails.name.textContent = stock.name;
        stockDetails.sector.textContent = stock.sector;
        stockDetails.industry.textContent = stock.subIndustry;
        stockDetails.address.textContent = stock.address;
      }
    }
  
    // Handle user selection from the list
    userList.addEventListener('click', (event) => {
      const selectedUser = userData.find((user) => user.id === Number(event.target.id));
      if (selectedUser) {
        populateForm(selectedUser);
        renderPortfolio(selectedUser);
      }
    });
  
    // Save user data
    saveButton.addEventListener('click', (event) => {
      event.preventDefault();
  
      const userId = Number(document.querySelector('#userID').value);
      const user = userData.find((u) => u.id === userId);
  
      if (user) {
        user.user.firstname = document.querySelector('#firstname').value;
        user.user.lastname = document.querySelector('#lastname').value;
        user.user.address = document.querySelector('#address').value;
        user.user.city = document.querySelector('#city').value;
        user.user.email = document.querySelector('#email').value;
  
        // Regenerate the user list to reflect changes
        generateUserList(userData);
      }
    });
  
    // Delete user data
    deleteButton.addEventListener('click', (event) => {
      event.preventDefault();
  
      const userId = Number(document.querySelector('#userID').value);
      const userIndex = userData.findIndex((u) => u.id === userId);
  
      if (userIndex !== -1) {
        userData.splice(userIndex, 1);
        generateUserList(userData);
        portfolioList.innerHTML = ''; // Clear portfolio display
        userForm.reset(); // Clear the form
      }
    });
  
    // Initialize the dashboard
    generateUserList(userData);
  });

