const users = [
    {
        id: 1,
        name: { first: "Naveen", last: "K" },
        email: "naveen.k@email.com",
        address: {
            street: "123 Renault St",
            city: "St Louis",
            state: "M)", 
            zip: "63146"
        },
        portfolio: [
            { symbol: "AAPL", shares: 10 },
            { symbol: "GOOGL", shares: 5 }
        ]
    },
    {
        id: 2,
        name: { first: "Prathap", last: "P" },
        email: "prathap.p@email.com",
        address: {
            street: "456 Washington Ave",
            city: "New York",
            state: "NY",
            zip: "10001"
        },
        portfolio: [
            { symbol: "MSFT", shares: 8 },
            { symbol: "TSLA", shares: 15 }
        ]
    }
];

const stocks = [
    {
        symbol: "AAPL",
        companyName: "Apple Inc.",
        sector: "Technology",
        industry: "Consumer Electronics",
        address: "One Apple Park Way, Cupertino, CA 95014"
    },
    {
        symbol: "GOOGL",
        companyName: "Alphabet Inc.",
        sector: "Technology", 
        industry: "Internet Content & Information",
        address: "1600 Amphitheatre Parkway, Mountain View, CA 94043"
    },
    {
        symbol: "MSFT",
        companyName: "Microsoft Corporation",
        sector: "Technology",
        industry: "Software—Infrastructure", 
        address: "One Microsoft Way, Redmond, WA 98052"
    },
    {
        symbol: "TSLA",
        companyName: "Tesla Inc.",
        sector: "Automotive",
        industry: "Auto Manufacturers",
        address: "3500 Deer Creek Road, Palo Alto, CA 94304"
    }
];

// app.js - Stock Portfolio Dashboard

// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing application...');
    initializeApp();
});

function initializeApp() {
    console.log('Initializing Stock Portfolio Dashboard...');
    
    // Display initial users
    displayUsers();
    
    // Set up event listeners
    setupEventListeners();
    
    // Select first user by default if users exist
    if (users.length > 0) {
        selectUser(users[0].id);
    }
    
    console.log('Application initialized successfully');
}

// Function to display users in the user list
function displayUsers() {
    const userList = document.querySelector('.user-list');
    if (!userList) {
        console.error('User list element not found');
        return;
    }
    
    // Clear existing users
    userList.innerHTML = '';
    
    // Add each user to the list
    users.forEach(user => {
        const userItem = document.createElement('li');
        // Make sure we're using the updated name
        userItem.textContent = `${user.name.first} ${user.name.last}`;
        userItem.dataset.userId = user.id;
        
        // Add click event to select user
        userItem.addEventListener('click', function() {
            selectUser(user.id);
        });
        
        userList.appendChild(userItem);
    });
    
    console.log(`Displayed ${users.length} users`);
}

// Function to handle user selection
function selectUser(userId) {
    console.log('Selecting user:', userId);
    
    // Find the selected user
    const selectedUser = users.find(user => user.id === userId);
    if (!selectedUser) {
        console.error('User not found:', userId);
        return;
    }
    
    // Update active state in user list
    document.querySelectorAll('.user-list li').forEach(item => {
        item.classList.remove('active');
        if (item.dataset.userId == userId) { // Use == for string/number comparison
            item.classList.add('active');
        }
    });
    
    // Populate user form with user data
    populateUserForm(selectedUser);
    
    // Display user's portfolio
    displayPortfolio(selectedUser.portfolio);
    
    // Clear stock details
    clearStockDetails();
    
    console.log('User selected successfully:', selectedUser.name.first, selectedUser.name.last);
}

// Function to populate user form with data
function populateUserForm(user) {
    console.log('Populating form for user:', user.name.first, user.name.last);
    
    document.getElementById('userID').value = user.id;
    document.getElementById('firstname').value = user.name.first;
    document.getElementById('lastname').value = user.name.last;
    document.getElementById('address').value = user.address.street;
    document.getElementById('city').value = `${user.address.city}, ${user.address.state} ${user.address.zip}`;
    document.getElementById('email').value = user.email;
}

// Function to display user's portfolio
function displayPortfolio(portfolio) {
    const portfolioList = document.querySelector('.portfolio-list');
    if (!portfolioList) {
        console.error('Portfolio list element not found');
        return;
    }
    
    // Clear existing portfolio items (keep headers)
    const headers = portfolioList.querySelectorAll('h3');
    portfolioList.innerHTML = '';
    
    // Add back headers
    headers.forEach(header => {
        portfolioList.appendChild(header);
    });
    
    // Add each stock in portfolio
    portfolio.forEach(holding => {
        // Find stock details
        const stock = stocks.find(s => s.symbol === holding.symbol);
        if (!stock) {
            console.warn('Stock not found:', holding.symbol);
            return;
        }
        
        // Create portfolio row
        const symbolElement = document.createElement('div');
        symbolElement.textContent = holding.symbol;
        symbolElement.className = 'portfolio-item';
        
        const sharesElement = document.createElement('div');
        sharesElement.textContent = holding.shares;
        sharesElement.className = 'portfolio-item';
        
        const actionsElement = document.createElement('div');
        actionsElement.className = 'portfolio-item';
        
        // Create view button
        const viewButton = document.createElement('button');
        viewButton.textContent = 'View';
        viewButton.addEventListener('click', function() {
            selectStock(holding.symbol);
        });
        
        actionsElement.appendChild(viewButton);
        
        // Add to portfolio list
        portfolioList.appendChild(symbolElement);
        portfolioList.appendChild(sharesElement);
        portfolioList.appendChild(actionsElement);
    });
    
    console.log(`Displayed ${portfolio.length} stocks in portfolio`);
}

// Function to handle stock selection
function selectStock(symbol) {
    console.log('Selecting stock:', symbol);
    
    // Find the stock
    const stock = stocks.find(s => s.symbol === symbol);
    if (!stock) {
        console.error('Stock not found:', symbol);
        return;
    }
    
    // Display stock details
    displayStockDetails(stock);
}

// Function to display stock details
function displayStockDetails(stock) {
    document.getElementById('stockName').textContent = stock.companyName;
    document.getElementById('stockSector').textContent = stock.sector;
    document.getElementById('stockIndustry').textContent = stock.industry;
    document.getElementById('stockAddress').textContent = stock.address;
    
    // Set logo if available
    const logoElement = document.getElementById('logo');
    if (stock.logo) {
        logoElement.src = stock.logo;
        logoElement.style.display = 'block';
    } else {
        logoElement.style.display = 'none';
    }
    
    console.log('Displayed stock details for:', stock.companyName);
}

// Function to clear stock details
function clearStockDetails() {
    document.getElementById('stockName').textContent = '';
    document.getElementById('stockSector').textContent = '';
    document.getElementById('stockIndustry').textContent = '';
    document.getElementById('stockAddress').textContent = '';
    document.getElementById('logo').style.display = 'none';
}

// Function to set up all event listeners
function setupEventListeners() {
    // Save button event
    const saveButton = document.getElementById('btnSave');
    if (saveButton) {
        saveButton.addEventListener('click', handleSaveUser);
    }
    
    // Delete button event
    const deleteButton = document.getElementById('btnDelete');
    if (deleteButton) {
        deleteButton.addEventListener('click', handleDeleteUser);
    }
    
    // Form submit event
    const userForm = document.querySelector('.userEntry');
    if (userForm) {
        userForm.addEventListener('submit', function(e) {
            e.preventDefault();
            handleSaveUser();
        });
    }
}

// Function to handle saving user data
function handleSaveUser() {
    const userId = document.getElementById('userID').value;
    if (!userId) {
        alert('Please select a user first');
        return;
    }
    
    // Convert userId to number for comparison
    const userIndex = users.findIndex(user => user.id == userId);
    if (userIndex === -1) {
        alert('User not found');
        return;
    }
    
    // Get form values
    const firstName = document.getElementById('firstname').value;
    const lastName = document.getElementById('lastname').value;
    const address = document.getElementById('address').value;
    const city = document.getElementById('city').value;
    const email = document.getElementById('email').value;
    
    // Validate required fields
    if (!firstName || !lastName || !email) {
        alert('Please fill in all required fields: First Name, Last Name, and Email');
        return;
    }
    
    // Update user data from form
    users[userIndex].name.first = firstName;
    users[userIndex].name.last = lastName;
    users[userIndex].email = email;
    users[userIndex].address.street = address;
    
    // Parse city, state, zip (handle the city field)
    if (city) {
        const cityParts = city.split(', ');
        if (cityParts.length === 2) {
            users[userIndex].address.city = cityParts[0];
            const stateZip = cityParts[1].split(' ');
            if (stateZip.length >= 2) {
                users[userIndex].address.state = stateZip[0];
                users[userIndex].address.zip = stateZip[1] || '';
            }
        } else {
            // If not in "City, State Zip" format, just use as city
            users[userIndex].address.city = city;
        }
    }
    
    console.log('Updated user:', users[userIndex]);
    
    // Refresh the user list to show updated names
    displayUsers();
    
    // Reselect the updated user to show changes
    selectUser(parseInt(userId));
    
    alert('User information saved successfully!');
    console.log('User updated:', users[userIndex].name.first, users[userIndex].name.last);
}

// Function to handle deleting a user
function handleDeleteUser() {
    const userId = document.getElementById('userID').value;
    if (!userId) {
        alert('Please select a user first');
        return;
    }
    
    if (!confirm('Are you sure you want to delete this user?')) {
        return;
    }
    
    const userIndex = users.findIndex(user => user.id === userId);
    if (userIndex === -1) {
        alert('User not found');
        return;
    }
    
    // Remove user from array
    users.splice(userIndex, 1);
    
    // Clear the form
    clearUserForm();
    
    // Refresh user list
    displayUsers();
    
    // Clear portfolio and stock details
    const portfolioList = document.querySelector('.portfolio-list');
    if (portfolioList) {
        const headers = portfolioList.querySelectorAll('h3');
        portfolioList.innerHTML = '';
        headers.forEach(header => {
            portfolioList.appendChild(header);
        });
    }
    clearStockDetails();
    
    // Select first user if any users remain
    if (users.length > 0) {
        selectUser(users[0].id);
    }
    
    alert('User deleted successfully!');
    console.log('User deleted. Remaining users:', users.length);
}

// Function to clear user form
function clearUserForm() {
    document.getElementById('userID').value = '';
    document.getElementById('firstname').value = '';
    document.getElementById('lastname').value = '';
    document.getElementById('address').value = '';
    document.getElementById('city').value = '';
    document.getElementById('email').value = '';
}

// Replace the existing style section at the bottom of app.js with this:
const style = document.createElement('style');
style.textContent = `
    .user-list li {
        padding: 10px;
        border-bottom: 1px solid #eee;
        cursor: pointer;
        transition: background-color 0.2s;
    }
    
    .user-list li:hover {
        background-color: #f5f5f5;
    }
    
    .user-list li.active {
        background-color: #1181B2 !important;
        color: white;
        font-weight: bold;
    }
    
    .portfolio-item {
        padding: 0.5em;
        border-bottom: 1px solid #eee;
    }
    
    .portfolio-item button {
        padding: 0.25em 0.5em;
        font-size: 0.9em;
        background-color: #44449B;
        color: white;
        border: none;
        border-radius: 3px;
        cursor: pointer;
    }
    
    .portfolio-item button:hover {
        background-color: #33338A;
    }
    
    /* Highlight form fields when user is selected */
    .userEntry input {
        border: 1px solid #ccc;
        padding: 8px;
    }
    
    .userEntry input:focus {
        border-color: #1181B2;
        outline: none;
    }
`;
document.head.appendChild(style);