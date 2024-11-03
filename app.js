document.addEventListener('DOMContentLoaded', () => {
    const stocksData = JSON.parse(stockContent);
    const userData = JSON.parse(userContent);
    generateUserList(userData, stocksData);
  
    // Get the save and delete buttons
    const saveButton = document.querySelector('#saveButton');
    const deleteButton = document.querySelector('#deleteButton');
  
    // Register the event listener on the delete button
    deleteButton.addEventListener('click', (event) => {
      event.preventDefault();
  
      // Find the index of the user in the data array 
      const userId = document.querySelector('#userID').value;
      const userIndex = userData.findIndex(user => user.id == userId);
      
      // Remove the user from the array
      userData.splice(userIndex, 1);
      
      // Render the updated user list
      generateUserList(userData, stocksData);
    });
  
    // Register the event listener on the save button
    saveButton.addEventListener('click', (event) => {
      // Prevent the form from submitting
      event.preventDefault();

      const id = document.querySelector('#userID').value;
  
      for (let i = 0; i < userData.length; i++) {
        if (userData[i].id == id) {
          userData[i].user.firstname = document.querySelector('#firstname').value;
          userData[i].user.lastname = document.querySelector('#lastname').value;
          userData[i].user.address = document.querySelector('#address').value;
          userData[i].user.city = document.querySelector('#city').value;
          userData[i].user.email = document.querySelector('#email').value;     
  
          // Render the updated user list
          generateUserList(userData, stocksData);
        }
      }
    });
});
  
/**
 * Loops through the users and renders a ul with li elements for each user
 * @param {*} users 
 * @param {*} stocks 
 */
function generateUserList(users, stocks) {
    const userList = document.querySelector('.user-list');
    // Clear out the list from previous render
    userList.innerHTML = '';
  
    users.map(({ user, id }) => {
      const listItem = document.createElement('li');
      listItem.innerText = user.lastname + ', ' + user.firstname;
      listItem.setAttribute('id', id);
      userList.appendChild(listItem);
    });
  
    // Register the event listener on the list
    userList.addEventListener('click', (event) => handleUserListClick(event, users, stocks));
}
  
/**
 * Handles the click event on the user list
 * @param {*} event 
 * @param {*} users 
 * @param {*} stocks 
 */
function handleUserListClick(event, users, stocks) {
    // Get the user ID from the list item
    const userId = event.target.id;
    // Find the user in the userData array
    const user = users.find(user => user.id == userId);
    
    // Populate the form with the user's data
    populateForm(user);
  
    // Render the portfolio items for the user
    renderPortfolio(user, stocks);
}
  
/**
 * Populates the form with the user's data
 * @param {*} user 
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
 * @param {*} user 
 * @param {*} stocks 
 */
function renderPortfolio(user, stocks) {
    const { portfolio } = user;
    const portfolioDetails = document.querySelector('.portfolio-list');
    portfolioDetails.innerHTML = ''; // Clear previous portfolio items
  
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
  
    // Register the event listener on the portfolio details for viewing stock info
    portfolioDetails.addEventListener('click', (event) => {
      if (event.target.tagName === 'BUTTON') {
        viewStock(event.target.id, stocks);
      }
    });
}
  
/**
 * Renders the stock information for the symbol
 * @param {*} symbol 
 * @param {*} stocks 
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
