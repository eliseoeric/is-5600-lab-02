// Wait for the HTML to load before running JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('Dashboard initialized');
    
    // Load users when page loads
    loadUserList();
    
    // Set up save button
    const saveButton = document.getElementById('saveUserBtn');
    if (saveButton) {
        saveButton.addEventListener('click', saveUserInfo);
    }
    
    // Set up delete button
    const deleteButton = document.getElementById('deleteUserBtn');
    if (deleteButton) {
        deleteButton.addEventListener('click', deleteUser);
    }
});

// Function to display all users in the list
function loadUserList() {
    const userList = document.getElementById('userList');
    if (!userList) return;
    
    // Clear current list
    userList.innerHTML = '';
    
    // Loop through each user and create a list item
    for (let i = 0; i < users.length; i++) {
        const user = users[i];
        
        // Create list item
        const li = document.createElement('li');
        li.textContent = user.name;
        li.dataset.userId = user.id;
        
        // Add click event to select this user
        li.addEventListener('click', function() {
            selectUser(user.id);
        });
        
        // Add to the list
        userList.appendChild(li);
    }
}

// Function called when a user is clicked
function selectUser(userId) {
    // Find the user in the users array
    const user = users.find(u => u.id === userId);
    if (!user) return;
    
    console.log('Selected user:', user.name);
    
    // Update the form with user info
    document.getElementById('userId').value = user.id;
    document.getElementById('userName').value = user.name;
    document.getElementById('userEmail').value = user.email;
    
    // Display the user's portfolio
    displayPortfolio(user.portfolio);
    
    // Highlight the selected user in the list
    highlightSelectedUser(userId);
}

// Function to show a user's stock portfolio
function displayPortfolio(portfolio) {
    const portfolioContainer = document.getElementById('portfolio');
    if (!portfolioContainer) return;
    
    // Clear current portfolio
    portfolioContainer.innerHTML = '';
    
    // If portfolio is empty, show message
    if (!portfolio || portfolio.length === 0) {
        portfolioContainer.innerHTML = '<p>No stocks in portfolio</p>';
        return;
    }
    
    // Create a table to display stocks
    const table = document.createElement('table');
    table.innerHTML = `
        <thead>
            <tr>
                <th>Symbol</th>
                <th>Shares</th>
                <th>Purchase Price</th>
                <th>Current Price</th>
                <th>Value</th>
            </tr>
        </thead>
        <tbody id="portfolioBody"></tbody>
    `;
    
    const tbody = table.querySelector('#portfolioBody');
    
    // Add each stock to the table
    for (let i = 0; i < portfolio.length; i++) {
        const holding = portfolio[i];
        
        // Find current stock info
        const stock = stocks.find(s => s.symbol === holding.symbol);
        if (!stock) continue;
        
        // Calculate current value
        const currentValue = stock.price * holding.shares;
        
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${holding.symbol}</strong></td>
            <td>${holding.shares}</td>
            <td>$${holding.purchasePrice.toFixed(2)}</td>
            <td>$${stock.price.toFixed(2)}</td>
            <td>$${currentValue.toFixed(2)}</td>
        `;
        
        tbody.appendChild(row);
    }
    
    portfolioContainer.appendChild(table);
    
    // Also populate stock list for this user's stocks
    loadStockList(portfolio);
}

// Function to show stocks owned by the selected user
function loadStockList(portfolio) {
    const stockList = document.getElementById('stockList');
    if (!stockList) return;
    
    // Clear current stock list
    stockList.innerHTML = '';
    
    // Add a header
    const header = document.createElement('li');
    header.textContent = '--- Your Stocks ---';
    header.style.fontWeight = 'bold';
    header.style.backgroundColor = '#f0f0f0';
    stockList.appendChild(header);
    
    // Add each stock from portfolio
    for (let i = 0; i < portfolio.length; i++) {
        const holding = portfolio[i];
        
        // Find full stock details
        const stock = stocks.find(s => s.symbol === holding.symbol);
        if (!stock) continue;
        
        const li = document.createElement('li');
        li.textContent = `${stock.symbol} - ${stock.company}`;
        li.dataset.symbol = stock.symbol;
        
        // Add click event to show stock info
        li.addEventListener('click', function() {
            displayStockInfo(stock.symbol);
        });
        
        stockList.appendChild(li);
    }
}

// Function to show details about a selected stock
function displayStockInfo(symbol) {
    const stock = stocks.find(s => s.symbol === symbol);
    if (!stock) return;
    
    const stockInfo = document.getElementById('stockInfo');
    if (!stockInfo) return;
    
    // Determine if stock price went up or down
    const changeColor = stock.change >= 0 ? 'green' : 'red';
    const changeSymbol = stock.change >= 0 ? '▲' : '▼';
    
    stockInfo.innerHTML = `
        <h3>${stock.symbol} - ${stock.company}</h3>
        <p><strong>Current Price:</strong> $${stock.price.toFixed(2)}</p>
        <p><strong>Change:</strong> <span style="color: ${changeColor}">${changeSymbol} $${Math.abs(stock.change).toFixed(2)}</span></p>
        <p><strong>Day Range:</strong> $${stock.dayLow} - $${stock.dayHigh}</p>
        <p><strong>Volume:</strong> ${(stock.volume / 1000000).toFixed(1)}M</p>
    `;
}

// Function to save edited user information
function saveUserInfo() {
    // Get values from form
    const userId = parseInt(document.getElementById('userId').value);
    const newName = document.getElementById('userName').value;
    const newEmail = document.getElementById('userEmail').value;
    
    // Validate input
    if (!newName || !newEmail) {
        alert('Please fill in both name and email');
        return;
    }
    
    // Find and update the user
    const user = users.find(u => u.id === userId);
    if (user) {
        user.name = newName;
        user.email = newEmail;
        
        // Refresh the user list display
        loadUserList();
        
        // Re-highlight the selected user
        highlightSelectedUser(userId);
        
        alert('User information saved successfully!');
        console.log('Updated user:', user);
    }
}

// Function to delete a user
function deleteUser() {
    const userId = parseInt(document.getElementById('userId').value);
    
    if (!userId) {
        alert('Please select a user first');
        return;
    }
    
    // Confirm deletion
    const confirmDelete = confirm('Are you sure you want to delete this user?');
    if (!confirmDelete) return;
    
    // Find user index
    const userIndex = users.findIndex(u => u.id === userId);
    
    if (userIndex !== -1) {
        // Remove the user
        users.splice(userIndex, 1);
        
        // Clear the form
        document.getElementById('userId').value = '';
        document.getElementById('userName').value = '';
        document.getElementById('userEmail').value = '';
        
        // Clear portfolio and stock info
        document.getElementById('portfolio').innerHTML = '<p>Select a user to view portfolio</p>';
        document.getElementById('stockList').innerHTML = '<li>Select a user to view stocks</li>';
        document.getElementById('stockInfo').innerHTML = '<p>Select a stock to view details</p>';
        
        // Refresh user list
        loadUserList();
        
        alert('User deleted successfully!');
    }
}

// Helper function to highlight the currently selected user
function highlightSelectedUser(userId) {
    const userList = document.getElementById('userList');
    if (!userList) return;
    
    // Remove highlight from all users
    const allUsers = userList.querySelectorAll('li');
    for (let i = 0; i < allUsers.length; i++) {
        allUsers[i].style.backgroundColor = '';
        allUsers[i].style.fontWeight = 'normal';
    }
    
    // Find and highlight selected user
    const selectedLi = Array.from(allUsers).find(li => li.dataset.userId == userId);
    if (selectedLi) {
        selectedLi.style.backgroundColor = '#e3f2fd';
        selectedLi.style.fontWeight = 'bold';
    }
}
