/* add your code here */

document.addEventListener('DOMContentLoaded', () => {
    const stocksData = JSON.parse(stockContent);  // Assuming stockContent is a global variable
    const userData = JSON.parse(userContent);    // Assuming userContent is a global variable
  
    const deleteButton = document.querySelector('#btnDelete');
    const saveButton = document.querySelector('#btnSave');
    generateUserList(userData, stocksData);  // Generate initial user list
  
    // Delete button event handler
    deleteButton.addEventListener('click', (event) => {
        event.preventDefault();
        const userId = document.querySelector('#userID').value;
        const userIndex = userData.findIndex(user => user.id == userId);
        if (userIndex !== -1) {
            userData.splice(userIndex, 1);
            generateUserList(userData, stocksData);  // Refresh user list after deletion
        }
    });
  
    // Save button event handler
    saveButton.addEventListener('click', (event) => {
        event.preventDefault();
        const id = document.querySelector('#userID').value;
        const user = userData.find(u => u.id == id);
        if (user) {
            user.user.firstname = document.querySelector('#firstname').value;
            user.user.lastname = document.querySelector('#lastname').value;
            user.user.address = document.querySelector('#address').value;
            user.user.city = document.querySelector('#city').value;
            user.user.email = document.querySelector('#email').value;
            generateUserList(userData, stocksData);  // Refresh user list after saving
        }
    });
  
    // Function to generate the user list
    function generateUserList(users, stocks) {
        const userList = document.querySelector('.user-list');
        userList.innerHTML = '';  // Clear the existing user list
        users.forEach(({ user, id }) => {
            const listItem = document.createElement('li');
            listItem.innerText = `${user.lastname}, ${user.firstname}`;
            listItem.setAttribute('id', id);
            userList.appendChild(listItem);
        });
  
        // Click event for user list
        userList.addEventListener('click', (event) => handleUserListClick(event, users, stocks));
    }
  
    // Handle the user click to populate the form and render portfolio
    function handleUserListClick(event, users, stocks) {
        const userId = event.target.id;
        const user = users.find(user => user.id == userId);
        if (user) {
            populateForm(user);
            renderPortfolio(user, stocks);  // Render portfolio of the clicked user
        }
    }
  
    // Function to render the portfolio
    function renderPortfolio(user, stocks) {
        const { portfolio } = user;
        const portfolioDetails = document.querySelector('.portfolio-list');
        portfolioDetails.innerHTML = '';  // Clear existing portfolio
  
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
  
        // Click event to view stock details
        portfolioDetails.addEventListener('click', (event) => {
            if (event.target.tagName === 'BUTTON') {
                viewStock(event.target.id, stocks);
            }
        });
    }
  
    // Populate the user form with the selected user's data
    function populateForm(data) {
        const { user, id } = data;
        document.querySelector('#userID').value = id;
        document.querySelector('#firstname').value = user.firstname;
        document.querySelector('#lastname').value = user.lastname;
        document.querySelector('#address').value = user.address;
        document.querySelector('#city').value = user.city;
        document.querySelector('#email').value = user.email;
    }
  
    // Function to view stock details by symbol
    function viewStock(symbol, stocks) {
        const stockArea = document.querySelector('.stock-form');
        if (stockArea) {
            const stock = stocks.find(s => s.symbol === symbol);
            if (stock) {
                document.querySelector('#stockName').textContent = stock.name;
                document.querySelector('#stockSector').textContent = stock.sector;
                document.querySelector('#stockIndustry').textContent = stock.subIndustry;
                document.querySelector('#stockAddress').textContent = stock.address;
                document.querySelector('#logo').src = `logos/${symbol}.svg`;  // Using template literals
            }
        }
    }
  });