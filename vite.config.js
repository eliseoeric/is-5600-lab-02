export default {
  server: {
    host: '0.0.0.0',
    hmr: {
      clientPort: 443,
    }
  }
}
// Sample data for users and stocks
const users = [
  { id: 1, name: "John Doe", portfolio: [{ stock: "AAPL", shares: 50 }, { stock: "GOOGL", shares: 30 }] },
  { id: 2, name: "Jane Smith", portfolio: [{ stock: "AMZN", shares: 20 }, { stock: "TSLA", shares: 10 }] },
];

const stocks = [
  { symbol: "AAPL", name: "Apple Inc.", price: 150 },
  { symbol: "GOOGL", name: "Google", price: 2800 },
  { symbol: "AMZN", name: "Amazon", price: 3400 },
  { symbol: "TSLA", name: "Tesla", price: 700 },
];

// Cache DOM elements
const userSelect = document.getElementById("user-select");
const stockSelect = document.getElementById("stock-select");
const portfolioDetails = document.getElementById("portfolio-details");
const stockInfo = document.getElementById("stock-info");
const userNameInput = document.getElementById("user-name");
const userForm = document.getElementById("user-form");
const deleteUserButton = document.getElementById("delete-user");

// Populate user select options
function populateUserSelect() {
  userSelect.innerHTML = "<option value=''>-- Select User --</option>";
  users.forEach(user => {
    const option = document.createElement("option");
    option.value = user.id;
    option.textContent = user.name;
    userSelect.appendChild(option);
  });
}

// Populate stock select options
function populateStockSelect() {
  stockSelect.innerHTML = "<option value=''>-- Select Stock --</option>";
  stocks.forEach(stock => {
    const option = document.createElement("option");
    option.value = stock.symbol;
    option.textContent = stock.name;
    stockSelect.appendChild(option);
  });
}

// Display portfolio for selected user
function displayPortfolio(userId) {
  const user = users.find(u => u.id === userId);
  if (user) {
    portfolioDetails.innerHTML = `
      <h3>Portfolio for ${user.name}</h3>
      <ul>
        ${user.portfolio.map(item => `<li>${item.stock}: ${item.shares} shares</li>`).join('')}
      </ul>
    `;
  }
}

// Display stock info for selected stock
function displayStockInfo(stockSymbol) {
  const stock = stocks.find(s => s.symbol === stockSymbol);
  if (stock) {
    stockInfo.innerHTML = `
      <h3>${stock.name} (${stock.symbol})</h3>
      <p>Price: $${stock.price}</p>
    `;
  }
}

// Update user information
function saveUserInfo(event) {
  event.preventDefault();
  const selectedUserId = userSelect.value;
  if (selectedUserId) {
    const user = users.find(u => u.id === parseInt(selectedUserId));
    if (user) {
      user.name = userNameInput.value;
      alert(`User information updated: ${user.name}`);
    }
  }
}

// Delete selected user
function deleteUser() {
  const selectedUserId = userSelect.value;
  if (selectedUserId) {
    const index = users.findIndex(u => u.id === parseInt(selectedUserId));
    if (index !== -1) {
      users.splice(index, 1); // Remove the user from the list
      populateUserSelect(); // Re-populate user dropdown
      portfolioDetails.innerHTML = ''; // Clear portfolio details
      alert("User deleted successfully");
    }
  }
}

// Event listeners
userSelect.addEventListener("change", (event) => {
  const userId = parseInt(event.target.value);
  if (userId) {
    displayPortfolio(userId);
  } else {
    portfolioDetails.innerHTML = '';
  }
});

stockSelect.addEventListener("change", (event) => {
  const stockSymbol = event.target.value;
  if (stockSymbol) {
    displayStockInfo(stockSymbol);
  } else {
    stockInfo.innerHTML = '';
  }
});

userForm.addEventListener("submit", saveUserInfo);
deleteUserButton.addEventListener("click", deleteUser);

// Initial population of dropdowns
populateUserSelect();
populateStockSelect();
