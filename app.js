// ===========================
// APPLICATION INITIALIZATION
// ===========================
document.addEventListener('DOMContentLoaded', () => {
  // This event fires when the DOM is fully loaded
  // All code for the stock portfolio dashboard runs here

  // ===========================
  // LOAD AND PARSE DATA
  // ===========================
  // Access JSON data from external JavaScript files (users.js and stocks-complete.js)
  // These files define global variables: userContent and stockContent (JSON strings)
  
  let stocksData = [];
  let userData = [];

  // Parse JSON strings into usable JavaScript objects
  try {
    stocksData = JSON.parse(stockContent);
    console.log(`✓ Stocks data loaded: ${stocksData.length} stocks available`);
  } catch (error) {
    console.error('Error parsing stocks data:', error);
  }

  try {
    userData = JSON.parse(userContent);
    console.log(`✓ Users data loaded: ${userData.length} users available`);
  } catch (error) {
    console.error('Error parsing users data:', error);
  }

  // Verify data was loaded successfully
  if (stocksData.length === 0 || userData.length === 0) {
    console.warn('Warning: Data may not have loaded correctly');
  }

  // Get references to DOM elements
  const saveButton = document.querySelector('#btnSave');
  const deleteButton = document.querySelector('#btnDelete');

  // Initialize the application
  initializeApp();

  // ===========================
  // EVENT LISTENERS
  // ===========================

  // Handle User Selection with Event Delegation
  // Add a single click listener to the parent .user-list element
  // This is more efficient than adding listeners to each list item
  const userListElement = document.querySelector('.user-list');
  userListElement.addEventListener('click', (event) => {
    // Check if a list item was clicked
    if (event.target && event.target.matches('li')) {
      // Retrieve the user ID from the clicked element's ID attribute
      const userId = parseInt(event.target.id.replace('user-', ''));
      
      // Find the corresponding user object in the data
      const user = userData.find(u => u.id === userId);
      
      if (user) {
        // Populate the form and display portfolio
        selectUser(user, stocksData);
      }
    }
  });

  // Handle Stock Selection with Event Delegation
  // Add a single click listener to the portfolio container
  // This efficiently handles clicks on dynamically created View buttons
  const portfolioList = document.querySelector('.portfolio-list');
  portfolioList.addEventListener('click', (event) => {
    // Check if a button was clicked (specifically looking for "View" buttons)
    if (event.target && event.target.matches('button.portfolio-view-btn')) {
      // Capture the stock symbol from the button's ID attribute
      const symbol = event.target.id;
      console.log(`Portfolio View button clicked - Symbol: ${symbol}`);
      
      // Find the stock object in the stocks data array
      const stock = stocksData.find(s => s.symbol === symbol);
      
      if (stock) {
        // Call function to display stock details
        displayStockDetails(stock);
        console.log(`✓ Stock view requested: ${symbol}`);
      } else {
        console.warn(`Stock symbol ${symbol} not found in data`);
        console.warn(`Available stock count: ${stocksData.length}`);
        console.warn(`Sample symbols: ${stocksData.slice(0, 5).map(s => s.symbol).join(', ')}`);
      }
    }
  });

  // Save button - update user information
  saveButton.addEventListener('click', (event) => {
    event.preventDefault();

    // Get current form data
    const userId = document.querySelector('#userID').value;
    
    if (!userId) {
      console.warn('No user selected. Please select a user first.');
      alert('Please select a user before saving changes.');
      return;
    }

    // Collect form data
    const formData = {
      firstname: document.querySelector('#firstname').value,
      lastname: document.querySelector('#lastname').value,
      address: document.querySelector('#address').value,
      city: document.querySelector('#city').value,
      email: document.querySelector('#email').value
    };

    // Call function to update user data
    const updateSuccess = updateUserData(userId, formData);
    
    if (updateSuccess) {
      // Refresh the user list display
      generateUserList(userData, stocksData);
      
      // Re-select the user to show updated information
      const updatedUser = userData.find(u => u.id == userId);
      if (updatedUser) {
        selectUser(updatedUser, stocksData);
        alert(`User ${formData.firstname} ${formData.lastname} has been updated successfully.`);
        console.log(`✓ User ${userId} updated successfully`);
      }
    } else {
      alert('Failed to update user. Please check your information and try again.');
      console.error(`Failed to update user ${userId}`);
    }
  });

  // Delete a User
  // Event listener for delete button
  deleteButton.addEventListener('click', (event) => {
    // Prevent default form submission behavior
    event.preventDefault();

    // Retrieve the selected user ID from the form
    const userId = document.querySelector('#userID').value;
    
    // Validate that a user is selected
    if (!userId) {
      console.warn('No user selected. Please select a user before deleting.');
      alert('Please select a user to delete.');
      return;
    }

    // Confirm deletion with user
    const userToDelete = userData.find(u => u.id == userId);
    if (!userToDelete) {
      console.error(`User with ID ${userId} not found`);
      alert('User not found.');
      return;
    }

    const confirmMessage = `Are you sure you want to delete:\n\n${userToDelete.user.firstname} ${userToDelete.user.lastname}?\n\nThis action cannot be undone.`;
    
    if (confirm(confirmMessage)) {
      // Call dedicated delete function
      const deleteSuccess = deleteUser(userId);
      
      if (deleteSuccess) {
        // Clear the UI
        clearUI();
        
        // Re-render the updated user list
        generateUserList(userData, stocksData);
        
        alert(`User ${userToDelete.user.firstname} ${userToDelete.user.lastname} has been deleted.`);
        console.log(`✓ User ${userId} deleted successfully`);
      } else {
        alert('Failed to delete user. Please try again.');
        console.error(`Failed to delete user ${userId}`);
      }
    } else {
      console.log('User deletion cancelled');
    }
  });

  // ===========================
  // HELPER FUNCTIONS
  // ===========================

  /**
   * Initialize the application by rendering the initial user list
   */
  function initializeApp() {
    generateUserList(userData, stocksData);
  }

  /**
   * Generate and display the user list
   * @param {Array} users - Array of user objects
   * @param {Array} stocks - Array of stock objects
   */
  function generateUserList(users, stocks) {
    // RENDER THE USER LIST
    
    // Get reference to the user list container
    const userListElement = document.querySelector('.user-list');
    
    // Clear the list to prevent duplication
    userListElement.innerHTML = '';
    
    // Loop through each user and create a list item
    users.forEach(user => {
      // Destructure user data for easier access
      const { id, user: userInfo } = user;
      const { firstname, lastname } = userInfo;
      
      // Create list item element
      const listItem = document.createElement('li');
      
      // Assign unique ID to list item (format: user-{userId})
      listItem.id = `user-${id}`;
      
      // Set display text as "Last Name, First Name"
      listItem.textContent = `${lastname}, ${firstname}`;
      
      // Append to the list
      // Note: Click handlers are now managed by event delegation on the parent
      userListElement.appendChild(listItem);
    });
    
    console.log(`✓ User list rendered: ${users.length} users displayed`);
  }

  /**
   * Select a user and populate the form with their information
   * Also displays the user's portfolio
   * @param {Object} user - The selected user object
   * @param {Array} stocks - Array of stock objects (for portfolio display)
   */
  function selectUser(user, stocks) {
    const { id, user: userInfo, portfolio } = user;
    
    // Populate the Form
    // Call dedicated function to fill form fields with user data
    populateForm(id, userInfo);
    
    // Highlight the selected user in the list
    const listItems = document.querySelectorAll('.user-list li');
    listItems.forEach(item => item.classList.remove('selected'));
    document.querySelector(`#user-${id}`).classList.add('selected');
    
    // Display the user's portfolio
    displayPortfolio(portfolio, stocks);
    
    console.log(`✓ User selected: ${userInfo.firstname} ${userInfo.lastname}`);
  }

  /**
   * Populate the Form with user data
   * Fills all form fields with the selected user's information
   * @param {number} id - The user's unique identifier
   * @param {Object} userInfo - Object containing user details:
   *   - firstname: User's first name
   *   - lastname: User's last name
   *   - address: User's street address
   *   - city: User's city
   *   - email: User's email address
   */
  function populateForm(id, userInfo) {
    // Validate input parameters
    if (!userInfo) {
      console.error('Cannot populate form: userInfo is undefined');
      return;
    }
    
    // Get all form input elements
    const userId = document.querySelector('#userID');
    const firstnameInput = document.querySelector('#firstname');
    const lastnameInput = document.querySelector('#lastname');
    const addressInput = document.querySelector('#address');
    const cityInput = document.querySelector('#city');
    const emailInput = document.querySelector('#email');
    
    // Validate all elements exist
    if (!userId || !firstnameInput || !lastnameInput || !addressInput || !cityInput || !emailInput) {
      console.error('One or more form elements not found in the DOM');
      return;
    }
    
    // Populate each form field with user data
    // Using empty string as default if data is undefined
    userId.value = id || '';
    firstnameInput.value = userInfo.firstname || '';
    lastnameInput.value = userInfo.lastname || '';
    addressInput.value = userInfo.address || '';
    cityInput.value = userInfo.city || '';
    emailInput.value = userInfo.email || '';
    
    console.log(`✓ Form populated with user data (ID: ${id})`);
  }

  /**
   * Update user data in the userData array with form input values
   * @param {number} userId - The user's unique identifier
   * @param {Object} formData - Object containing form field values:
   *   - firstname: Updated first name
   *   - lastname: Updated last name
   *   - address: Updated address
   *   - city: Updated city
   *   - email: Updated email
   */
  function updateUserData(userId, formData) {
    // Validate inputs
    if (!userId || !formData) {
      console.error('Invalid parameters for updateUserData');
      return false;
    }
    
    // Validate email format (basic validation)
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      console.warn('Invalid email format');
      alert('Please enter a valid email address.');
      return false;
    }
    
    // Find the user in the userData array and update their information
    const userIndex = userData.findIndex(user => user.id == userId);
    
    if (userIndex !== -1) {
      // Update the user's information with values from the form
      userData[userIndex].user.firstname = formData.firstname || '';
      userData[userIndex].user.lastname = formData.lastname || '';
      userData[userIndex].user.address = formData.address || '';
      userData[userIndex].user.city = formData.city || '';
      userData[userIndex].user.email = formData.email || '';
      
      console.log(`✓ User ${userId} data updated: ${formData.firstname} ${formData.lastname}`);
      return true;
    } else {
      console.error(`User with ID ${userId} not found`);
      return false;
    }
  }

  /**
   *  Delete a User
   * Removes a user from the userData array by their ID
   * @param {number} userId - The user's unique identifier
   * @returns {boolean} True if user was deleted successfully, false otherwise
   */
  function deleteUser(userId) {
    // Validate user ID
    if (!userId) {
      console.error('Invalid user ID provided to deleteUser');
      return false;
    }

    // Find the index of the user in the userData array
    const userIndex = userData.findIndex(user => user.id == userId);

    // Check if user was found
    if (userIndex === -1) {
      console.error(`User with ID ${userId} not found in userData array`);
      return false;
    }

    // Get user information before deletion (for logging)
    const deletedUser = userData[userIndex];
    const userFullName = `${deletedUser.user.firstname} ${deletedUser.user.lastname}`;

    // Remove the user from the userData array
    // splice() modifies the array in place and returns the removed elements
    userData.splice(userIndex, 1);

    console.log(`✓ User deleted from array: ID ${userId} (${userFullName})`);
    console.log(`✓ Remaining users: ${userData.length}`);

    return true;
  }

  /**
   * Render Portfolio Data
   * Display the selected user's stock portfolio with all holdings
   * @param {Array} portfolio - Array of portfolio items with symbol and owned shares
   * @param {Array} stocks - Array of all stock objects to find matching stocks
   */
  function displayPortfolio(portfolio, stocks) {
    const portfolioList = document.querySelector('.portfolio-list');
    
    // Clear previous portfolio items (keep the header row)
    // The header row consists of the first 3 h3 elements (Symbol, # Shares, Actions)
    while (portfolioList.children.length > 3) {
      portfolioList.removeChild(portfolioList.lastChild);
    }
    
    // Handle empty portfolio
    if (!portfolio || portfolio.length === 0) {
      // Display message if user has no portfolio
      const emptyMsg = document.createElement('p');
      emptyMsg.textContent = 'No portfolio items';
      emptyMsg.style.gridColumn = '1 / -1';
      emptyMsg.style.padding = '1em';
      portfolioList.appendChild(emptyMsg);
      console.log('Portfolio is empty');
      return;
    }
    
    // Loop through each portfolio item and create a row
    portfolio.forEach(item => {
      const { symbol, owned } = item;
      
      // Find the stock details from the stocks array
      const stock = stocks.find(s => s.symbol === symbol);
      
      if (stock) {
        // Create symbol cell - display the stock symbol
        const symbolCell = document.createElement('p');
        symbolCell.textContent = symbol;
        symbolCell.className = 'portfolio-symbol';
        symbolCell.style.padding = '0.5em';
        symbolCell.style.borderBottom = '1px solid #eee';
        symbolCell.style.margin = '0';
        
        // Create shares cell - display number of shares owned
        const sharesCell = document.createElement('p');
        sharesCell.textContent = owned;
        sharesCell.className = 'portfolio-shares';
        sharesCell.style.padding = '0.5em';
        sharesCell.style.textAlign = 'center';
        sharesCell.style.borderBottom = '1px solid #eee';
        sharesCell.style.margin = '0';
        
        // Create "View" button with stock symbol as ID
        const viewButton = document.createElement('button');
        viewButton.textContent = 'View';
        viewButton.id = symbol;  // Assign stock symbol as button ID
        viewButton.className = 'portfolio-view-btn';
        
        // Note: Click listeners are now handled by event delegation on the portfolio container
        
        // Append cells to portfolio list
        portfolioList.appendChild(symbolCell);
        portfolioList.appendChild(sharesCell);
        portfolioList.appendChild(viewButton);
      } else {
        console.warn(`Stock with symbol ${symbol} not found in stocks data`);
      }
    });
    
    console.log(`✓ Portfolio rendered: ${portfolio.length} items displayed`);
  }

  /**
   * Display Stock Information
   * Retrieves stock details using the symbol and updates the UI
   * @param {Object} stock - The stock object to display containing:
   *   - symbol: Stock ticker symbol
   *   - name: Company name
   *   - sector: Industry sector
   *   - subIndustry: Specific industry classification
   *   - address: Company headquarters address
   */
  function displayStockDetails(stock) {
    // Validate stock object exists
    if (!stock) {
      console.error('Cannot display stock details: stock object is undefined');
      return;
    }

    console.log('✓ displayStockDetails called with stock:', stock);

    const { symbol, name, sector, subIndustry, address } = stock;

    // Get references to UI elements
    const logoImg = document.querySelector('#logo');
    const nameElement = document.querySelector('#stockName');
    const sectorElement = document.querySelector('#stockSector');
    const industryElement = document.querySelector('#stockIndustry');
    const addressElement = document.querySelector('#stockAddress');

    // Debug: Log element querySelections
    console.log('✓ Element queries:');
    console.log('  - #logo:', logoImg ? 'FOUND' : 'NOT FOUND');
    console.log('  - #stockName:', nameElement ? 'FOUND' : 'NOT FOUND');
    console.log('  - #stockSector:', sectorElement ? 'FOUND' : 'NOT FOUND');
    console.log('  - #stockIndustry:', industryElement ? 'FOUND' : 'NOT FOUND');
    console.log('  - #stockAddress:', addressElement ? 'FOUND' : 'NOT FOUND');

    // Validate all UI elements exist
    if (!logoImg || !nameElement || !sectorElement || !industryElement || !addressElement) {
      console.error('One or more stock details UI elements not found in the DOM');
      console.error('Make sure the following IDs exist in HTML: stockName, stockSector, stockIndustry, stockAddress, logo');
      return;
    }

    // Update stock name
    nameElement.textContent = name || 'N/A';
    console.log('✓ Name updated:', name);

    // Update sector
    sectorElement.textContent = sector || 'N/A';
    console.log('✓ Sector updated:', sector);

    // Update industry
    industryElement.textContent = subIndustry || 'N/A';
    console.log('✓ Industry updated:', subIndustry);

    // Update address
    addressElement.textContent = address || 'N/A';
    console.log('✓ Address updated:', address);

    // Update company logo
    // Create a placeholder SVG with the stock symbol
    if (symbol) {
      // Generate a placeholder SVG with the stock symbol
      // This ensures the logo always displays reliably
      const svgContent = `<svg xmlns='http://www.w3.org/2000/svg' width='200' height='150'><defs><linearGradient id='grad' x1='0%' y1='0%' x2='100%' y2='100%'><stop offset='0%' style='stop-color:%231181B2;stop-opacity:1' /><stop offset='100%' style='stop-color:%230d5a7a;stop-opacity:1' /></linearGradient></defs><rect width='200' height='150' fill='url(%23grad)'/><text x='100' y='75' font-size='48' font-weight='bold' fill='white' text-anchor='middle' dominant-baseline='middle'>${symbol}</text></svg>`;
      const encodedSvg = btoa(svgContent);
      logoImg.src = `data:image/svg+xml;base64,${encodedSvg}`;
      logoImg.alt = `${symbol} logo`;
      console.log(`✓ Logo placeholder created for ${symbol}`);
    } else {
      // Clear logo if no symbol is available
      logoImg.src = '';
      logoImg.alt = 'Stock logo';
    }

    console.log(`✓ Stock details displayed: ${symbol} (${name})`);
  }

  /**
   * Retrieve stock data by symbol
   * Helper function to find a stock in the stocks array
   * @param {string} symbol - The stock ticker symbol to search for
   * @param {Array} stocks - Array of stock objects to search in
   * @returns {Object|null} The stock object if found, null otherwise
   */
  function getStockBySymbol(symbol, stocks) {
    if (!symbol || !stocks || !Array.isArray(stocks)) {
      return null;
    }
    
    const stock = stocks.find(s => s.symbol === symbol);
    
    if (stock) {
      console.log(`✓ Stock found: ${symbol}`);
      return stock;
    } else {
      console.warn(`Stock not found: ${symbol}`);
      return null;
    }
  }

  /**
   * Clear the UI elements and form fields
   */
  function clearUI() {
    // Clear all form input fields
    document.querySelector('#userID').value = '';
    document.querySelector('#firstname').value = '';
    document.querySelector('#lastname').value = '';
    document.querySelector('#address').value = '';
    document.querySelector('#city').value = '';
    document.querySelector('#email').value = '';
    
    // Remove selection highlighting from all list items
    const listItems = document.querySelectorAll('.user-list li');
    listItems.forEach(item => item.classList.remove('selected'));
    
    // Clear portfolio display
    const portfolioList = document.querySelector('.portfolio-list');
    while (portfolioList.children.length > 3) {
      portfolioList.removeChild(portfolioList.lastChild);
    }
    
    // Clear stock details and logo
    document.querySelector('#logo').src = '';
    document.querySelector('#logo').alt = '';
    document.querySelector('#stockName').textContent = '';
    document.querySelector('#stockSector').textContent = '';
    document.querySelector('#stockIndustry').textContent = '';
    document.querySelector('#stockAddress').textContent = '';
    
    console.log('✓ UI cleared');
  }

  /**
   * Verify and display data structure information
   * This confirms the JSON data was parsed correctly
   */
  function verifyDataStructure() {
    if (userData.length > 0) {
      console.log('User example:', userData[0]);
      console.log('User properties: id, user (firstname, lastname, email, address, city, state, zip), portfolio');
    }
    
    if (stocksData.length > 0) {
      console.log('Stock example:', stocksData[0]);
      console.log('Stock properties: symbol, name, sector, subIndustry, address, etc.');
    }
  }

  // Verify data loaded with correct structure
  verifyDataStructure();

});

