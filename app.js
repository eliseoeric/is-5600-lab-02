/* add your code here */
document.addEventListener('DOMContentLoaded', () => {
    // Parse JSON data for stocks and user information
    const stocksData = JSON.parse(stockContent);
    const userData = JSON.parse(userContent);

    // Select the delete and save buttons
    const deleteButton = document.querySelector('#btnDelete');
    const saveButton = document.querySelector('#btnSave');

    // Generate the initial user list
    generateUserList(userData, stocksData);

    // Event listener for the delete button
    deleteButton.addEventListener('click', (event) => {
      event.preventDefault(); // Prevent default form submission
      const userId = document.querySelector('#userID').value; // Get user ID from the input
      const userIndex = userData.findIndex(user => user.id == userId); // Find index of the user to delete

      // Remove user from the data array
      userData.splice(userIndex, 1);

      // Update the displayed user list
      generateUserList(userData, stocksData);
    });

    // Event listener for the save button
    saveButton.addEventListener('click', (event) => {
      event.preventDefault(); // Prevent default form submission
      const id = document.querySelector('#userID').value; // Get user ID from the input

      // Loop through user data to find the matching user
      for (let i = 0; i < userData.length; i++) {
        if (userData[i].id == id) {
          // Update user details with values from the form inputs
          userData[i].user.firstname = document.querySelector('#firstname').value;
          userData[i].user.lastname = document.querySelector('#lastname').value;
          userData[i].user.address = document.querySelector('#address').value;
          userData[i].user.city = document.querySelector('#city').value;
          userData[i].user.email = document.querySelector('#email').value;

          // Update the displayed user list
          generateUserList(userData, stocksData);
        }
      }
    });

    // Function to generate and display the user list
    function generateUserList(users, stocks) {
      const userList = document.querySelector('.user-list');
      userList.innerHTML = ''; // Clear existing list

      // Create list items for each user
      users.map(({ user, id }) => {
        const listItem = document.createElement('li');
        listItem.innerText = user.lastname + ', ' + user.firstname; // Display name
        listItem.setAttribute('id', id); // Set ID for identifying the user
        userList.appendChild(listItem); // Append item to the user list
      });

      // Add event listener to handle clicks on the user list
      userList.addEventListener('click', (event) => handleUserListClick(event, users, stocks));
    }

    // Function to handle clicks on the user list
    function handleUserListClick(event, users, stocks) {
      const userId = event.target.id; // Get the ID of the clicked user
      const user = users.find(user => user.id == userId); // Find the corresponding user
      populateForm(user); // Populate the form with user data
      renderPortfolio(user, stocks); // Render the user's portfolio
    }

    // Function to render the user's portfolio
    function renderPortfolio(user, stocks) {
      const { portfolio } = user; // Destructure the portfolio from user data
      const portfolioDetails = document.querySelector('.portfolio-list');
      portfolioDetails.innerHTML = ''; // Clear existing portfolio details

      // Create elements for each stock in the portfolio
      portfolio.map(({ symbol, owned }) => {
        const symbolEl = document.createElement('p');
        const sharesEl = document.createElement('p');
        const actionEl = document.createElement('button');

        symbolEl.innerText = symbol; // Display stock symbol
        sharesEl.innerText = owned; // Display number of owned shares
        actionEl.innerText = 'View'; // Button to view stock details
        actionEl.setAttribute('id', symbol); // Set ID for the stock

        // Append elements to the portfolio details
        portfolioDetails.appendChild(symbolEl);
        portfolioDetails.appendChild(sharesEl);
        portfolioDetails.appendChild(actionEl);
      });

      // Add event listener to handle clicks on stock buttons
      portfolioDetails.addEventListener('click', (event) => {
        if (event.target.tagName === 'BUTTON') {
          viewStock(event.target.id, stocks); // View stock details when button is clicked
        }
      });
    }

    // Function to populate the form with user data
    function populateForm(data) {
      const { user, id } = data; // Destructure user data and ID
      document.querySelector('#userID').value = id; // Set user ID
      document.querySelector('#firstname').value = user.firstname; // Set first name
      document.querySelector('#lastname').value = user.lastname; // Set last name
      document.querySelector('#address').value = user.address; // Set address
      document.querySelector('#city').value = user.city; // Set city
      document.querySelector('#email').value = user.email; // Set email
    }

    // Function to view stock details
    function viewStock(symbol, stocks) {
      const stockArea = document.querySelector('.stock-form'); // Select the stock details area
      if (stockArea) {
        const stock = stocks.find(s => s.symbol == symbol); // Find stock by symbol

        // Populate stock details
        document.querySelector('#stockName').textContent = stock.name;
        document.querySelector('#stockSector').textContent = stock.sector;
        document.querySelector('#stockIndustry').textContent = stock.subIndustry;
        document.querySelector('#stockAddress').textContent = stock.address;
        document.querySelector('#logo').src = `logos/${symbol}.svg`; // Set logo image
      }
    }
  });