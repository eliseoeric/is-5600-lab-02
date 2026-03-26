/* --- HELPER FUNCTIONS (Defined outside) --- */

/**
 * Loops through the users and renders a ul with li elements for each user
 */
function generateUserList(users, stocks) {
  const userList = document.querySelector('.user-list');
  // Step 9: Clear the list before re-rendering to prevent stacking
  userList.innerHTML = '';

  users.map(({ user, id }) => {
    const listItem = document.createElement('li');
    listItem.innerText = user.lastname + ', ' + user.firstname;
    listItem.setAttribute('id', id);
    userList.appendChild(listItem);
  });

  // Register the event listener on the list (Event Delegation)
  userList.addEventListener('click', (event) => handleUserListClick(event, users, stocks));
}

/**
 * Handles the click event on the user list
 */
function handleUserListClick(event, users, stocks) {
  const userId = event.target.id;
  // Find the user object that matches the ID clicked
  const user = users.find(user => user.id == userId);
  
  if (user) {
    populateForm(user);
    renderPortfolio(user, stocks);
  }
}

/**
 * Populates the form with the user's data
 */
function populateForm(data) {
  const { user, id } = data;
  document.querySelector('#userID').value = id;
  document.querySelector('#firstname').value = user.firstname;
  document.querySelector('#lastname').value = user.lastname;
  document.querySelector('#address').value = user.address;
  document.querySelector('#city').value = user.city;
  document.querySelector('#email').value = user.email;
}

/**
 * Renders the portfolio items for the user
 */
function renderPortfolio(user, stocks) {
  const { portfolio } = user;
  const portfolioDetails = document.querySelector('.portfolio-list');
  portfolioDetails.innerHTML = ''; // Clear previous render

  portfolio.map(({ symbol, owned }) => {
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

  // Step 8: Register event listener for "View" buttons
  portfolioDetails.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
      viewStock(event.target.id, stocks);
    }
  });
}

/**
 * Renders the stock information for the symbol
 */
function viewStock(symbol, stocks) {
  const stockArea = document.querySelector('.stock-form');
  if (stockArea) {
    const stock = stocks.find(s => s.symbol == symbol);

    document.querySelector('#stockName').textContent = stock.name;
    document.querySelector('#stockSector').textContent = stock.sector;
    document.querySelector('#stockIndustry').textContent = stock.subIndustry;
    document.querySelector('#stockAddress').textContent = stock.address;
    document.querySelector('#logo').src = `logos/${symbol}.svg`;
  }
}

/* --- MAIN APPLICATION LOGIC --- */

document.addEventListener('DOMContentLoaded', () => {
  // Step 4: Parse the global data strings into objects
  // These variables (stockContent, userContent) come from your data files
  const stocksData = JSON.parse(stockContent);
  const userData = JSON.parse(userContent);

  // Initial render of the user list
  generateUserList(userData, stocksData);

  // Step 9: Delete Functionality
  const deleteButton = document.querySelector('#deleteButton');
  const saveButton = document.querySelector('#saveButton');

  deleteButton.addEventListener('click', (event) => {
    event.preventDefault();
    const userId = document.querySelector('#userID').value;
    const userIndex = userData.findIndex(user => user.id == userId);
    
    if (userIndex > -1) {
      userData.splice(userIndex, 1); // Remove user from array
      generateUserList(userData, stocksData); // Re-render
    }
  });

  // Step 9: Save Functionality
  saveButton.addEventListener('click', (event) => {
    event.preventDefault();
    const id = document.querySelector('#userID').value;

    for (let i = 0; i < userData.length; i++) {
      if (userData[i].id == id) {
        userData[i].user.firstname = document.querySelector('#firstname').value;
        userData[i].user.lastname = document.querySelector('#lastname').value;
        userData[i].user.address = document.querySelector('#address').value;
        userData[i].user.city = document.querySelector('#city').value;
        userData[i].user.email = document.querySelector('#email').value;

        generateUserList(userData, stocksData);
      }
    }
  });
});