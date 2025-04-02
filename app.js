document.addEventListener('DOMContentLoaded', () => {
    // Parse the JSON data
    const stocksData = JSON.parse(stockContent);
    const userData = JSON.parse(userContent);

    // Generate user list on the sidebar
    generateUserList(userData, stocksData);

    // Get form and button elements
    const saveButton = document.querySelector('#saveButton');
    const deleteButton = document.querySelector('#deleteButton');

    // Register the event listener on the save button
    saveButton.addEventListener('click', (e) => {
      // Prevent default form submission
      e.preventDefault();

      // Find user object by id and update its information
      const id = document.querySelector('#userID').value;

      for (let i = 0; i < userData.length; i++) {
        if (userData[i].id == id) {
          userData[i].user.firstname = document.querySelector('#firstname').value;
          userData[i].user.lastname = document.querySelector('#lastname').value;
          userData[i].user.address = document.querySelector('#address').value;
          userData[i].user.city = document.querySelector('#city').value;
          userData[i].user.email = document.querySelector('#email').value;

          // Refresh the user list after updating
          generateUserList(userData, stocksData);
        }
      }
    });

    // Register the event listener on the delete button
    deleteButton.addEventListener('click', (e) => {
      e.preventDefault(); // Prevent form submission

      // Find the user by id and remove from array
      const userId = document.querySelector('#userID').value;
      const userIndex = userData.findIndex((user) => user.id == userId);

      if (userIndex !== -1) {
        userData.splice(userIndex, 1);
        generateUserList(userData, stocksData); // Refresh list
      }
    });
  });

  /**
   * Generate the list of users and add event listener to handle clicks
   */
  function generateUserList(users, stocks) {
    const userList = document.querySelector('.user-list');
    userList.innerHTML = ''; // Clear the list

    users.map(({ user, id }) => {
      const listItem = document.createElement('li');
      listItem.innerText = ${user.lastname}, ${user.firstname};
      listItem.setAttribute('id', id);
      userList.appendChild(listItem);
    });

    // Add click event to the list
    userList.addEventListener('click', (event) => handleUserListClick(event, users, stocks));
  }

  /**
   * Handles the click event on the user list
   */
  function handleUserListClick(event, users, stocks) {
    const userId = event.target.id;
    const user = users.find((user) => user.id == userId);
    populateForm(user);
    renderPortfolio(user, stocks);
  }

  /**
   * Populate the form with the selected user's data
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
   * Render the portfolio of the selected user
   */
  function renderPortfolio(user, stocks) {
    const { portfolio } = user;
    const portfolioDetails = document.querySelector('.portfolio-list');
    portfolioDetails.innerHTML = ''; // Clear previous portfolio

    portfolio.map(({ symbol, owned }) => {
      const symbolEl = document.createElement('p');
      const sharesEl = document.createElement('p');
      const actionEl = document.createElement('button');
      symbolEl.innerText = Symbol: ${symbol};
      sharesEl.innerText = Shares: ${owned};
      actionEl.innerText = 'View';
      actionEl.setAttribute('id', symbol);
      portfolioDetails.appendChild(symbolEl);
      portfolioDetails.appendChild(sharesEl);
      portfolioDetails.appendChild(actionEl);
    });

    // Add event listener for stock details view
    portfolioDetails.addEventListener('click', (event) => {
      if (event.target.tagName === 'BUTTON') {
        viewStock(event.target.id, stocks);
      }
    });
  }

  /**
   * Render the selected stock's information
   */
  function viewStock(symbol, stocks) {
    const stockArea = document.querySelector('.stock-form');
    if (stockArea) {
      const stock = stocks.find((s) => s.symbol == symbol);
      document.querySelector('#stockName').textContent = stock.name;
      document.querySelector('#stockSector').textContent = stock.sector;
      document.querySelector('#stockIndustry').textContent = stock.subIndustry;
      document.querySelector('#stockAddress').textContent = stock.address;
      document.querySelector('#logo').src = logos/${symbol}.svg;
    }
  }