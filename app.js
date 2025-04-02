/* add your code here */
let users = [
    {
        id: '1',
        name: 'Himani',
        portfolio: [
            { id: 's1', name: 'Samsung', quantity: 50 },
            { id: 's2', name: 'Tesla', quantity: 30 }
        ]
    },
    {
        id: '2',
        name: 'Yash',
        portfolio: [
            { id: 's3', name: 'Amazon', quantity: 20 },
            { id: 's4', name: 'Microsoft', quantity: 10 }
        ]
    }
];

let stocks = [
    { id: 's1', name: 'Samsung', price: 330 },
    { id: 's2', name: 'Tesla', price: 750 },
    { id: 's3', name: 'Amazon', price: 4300 },
    { id: 's4', name: 'Microsoft', price: 590 }
];

// DOM elements
const userSelect = document.getElementById('userSelect');
const stockSelect = document.getElementById('stockSelect');
const portfolioContainer = document.getElementById('portfolio');
const stockInfoContainer = document.getElementById('stockInfo');
const editForm = document.getElementById('editForm');
const userNameInput = document.getElementById('userName');
const deleteButton = document.getElementById('deleteButton');

// Initialize the user list
function initializeDashboard() {
    // Populate the user dropdown
    users.forEach(user => {
        const option = document.createElement('option');
        option.value = user.id;
        option.textContent = user.name;
        userSelect.appendChild(option);
    });
}

// Display portfolio for the selected user
function displayUserPortfolio(userId) {
    const user = users.find(u => u.id === userId);
    portfolioContainer.innerHTML = ''; // Clear existing portfolio
    user.portfolio.forEach(stock => {
        const stockElement = document.createElement('div');
        stockElement.textContent = `${stock.name} - ${stock.quantity}`;
        portfolioContainer.appendChild(stockElement);
    });

    // Populate stock dropdown based on the selected user's portfolio
    stockSelect.innerHTML = '<option value="">Select a stock</option>';
    user.portfolio.forEach(stock => {
        const option = document.createElement('option');
        option.value = stock.id;
        option.textContent = stock.name;
        stockSelect.appendChild(option);
    });
}

// Display information about the selected stock
function displayStockInfo(stockId) {
    const stock = stocks.find(s => s.id === stockId);
    stockInfoContainer.innerHTML = `
        <p>Name: ${stock.name}</p>
        <p>Price: $${stock.price}</p>
    `;
}

// Event listener for when a user is selected
userSelect.addEventListener('change', (e) => {
    const userId = e.target.value;
    if (userId) {
        displayUserPortfolio(userId);
    } else {
        portfolioContainer.innerHTML = '';
    }
});

// Event listener for when a stock is selected
stockSelect.addEventListener('change', (e) => {
    const stockId = e.target.value;
    if (stockId) {
        displayStockInfo(stockId);
    } else {
        stockInfoContainer.innerHTML = '';
    }
});

// Event listener for updating user information
editForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const userId = userSelect.value;
    const user = users.find(u => u.id === userId);
    user.name = userNameInput.value;
    alert(`User name updated to: ${user.name}`);
});

// Event listener for deleting the selected user
deleteButton.addEventListener('click', () => {
    const userId = userSelect.value;
    users = users.filter(u => u.id !== userId);
    initializeDashboard(); // Re-initialize the dashboard after user deletion
    portfolioContainer.innerHTML = ''; // Clear the portfolio section
    stockInfoContainer.innerHTML = ''; // Clear the stock information section
});

// Initialize the dashboard by populating the user list
initializeDashboard();
