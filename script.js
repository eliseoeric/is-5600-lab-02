// ===========================================
// IS-5600 Lab 02: Stock Portfolio Dashboard
// JavaScript, DOM Manipulation, and Event Handling
// ===========================================

// ----- SAMPLE DATA -----
const users = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    portfolio: [
      { symbol: "AAPL", shares: 10, price: 175 },
      { symbol: "TSLA", shares: 5, price: 240 }
    ]
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob@example.com",
    portfolio: [
      { symbol: "AMZN", shares: 3, price: 3200 },
      { symbol: "NFLX", shares: 4, price: 620 }
    ]
  },
  {
    id: 3,
    name: "Charlie Davis",
    email: "charlie@example.com",
    portfolio: [
      { symbol: "MSFT", shares: 6, price: 320 },
      { symbol: "GOOG", shares: 2, price: 2800 }
    ]
  }
];

// ----- DOM ELEMENTS -----
const userList = document.getElementById("user-list");
const stockList = document.getElementById("stock-list");
const stockInfo = document.getElementById("stock-info");

const userForm = document.getElementById("user-form");
const nameInput = document.getElementById("user-name");
const emailInput = document.getElementById("user-email");
const deleteBtn = document.getElementById("delete-user");

// ----- STATE -----
let selectedUser = null;
let selectedStock = null;

// ----- FUNCTIONS -----

// Populate user list
function renderUsers() {
  userList.innerHTML = "";
  users.forEach(user => {
    const li = document.createElement("li");
    li.textContent = user.name;
    li.classList.add("user-item");
    li.addEventListener("click", () => selectUser(user.id));
    userList.appendChild(li);
  });
}

// Select a user
function selectUser(userId) {
  selectedUser = users.find(u => u.id === userId);
  if (!selectedUser) return;

  // Fill form with user info
  nameInput.value = selectedUser.name;
  emailInput.value = selectedUser.email;

  // Show portfolio
  renderPortfolio(selectedUser.portfolio);

  // Clear stock info when switching users
  stockInfo.innerHTML = "";
}

// Display the user’s portfolio
function renderPortfolio(portfolio) {
  stockList.innerHTML = "";
  portfolio.forEach(stock => {
    const li = document.createElement("li");
    li.textContent = ${stock.symbol} (${stock.shares} shares);
    li.classList.add("stock-item");
    li.addEventListener("click", () => selectStock(stock));
    stockList.appendChild(li);
  });
}

// Select a stock and show its info
function selectStock(stock) {
  selectedStock = stock;
  stockInfo.innerHTML = `
    <h3>${stock.symbol}</h3>
    <p>Shares: ${stock.shares}</p>
    <p>Price: $${stock.price}</p>
    <p>Total Value: $${(stock.shares * stock.price).toFixed(2)}</p>
  `;
}

// Save user info
userForm.addEventListener("submit", e => {
  e.preventDefault();
  if (!selectedUser) {
    alert("Select a user first!");
    return;
  }

  selectedUser.name = nameInput.value.trim();
  selectedUser.email = emailInput.value.trim();

  renderUsers();
  alert("User information updated!");
});

// Delete selected user
deleteBtn.addEventListener("click", () => {
  if (!selectedUser) {
    alert("Select a user to delete!");
    return;
  }

  const index = users.findIndex(u => u.id === selectedUser.id);
  if (index !== -1) users.splice(index, 1);

  // Clear display and refresh
  selectedUser = null;
  userForm.reset();
  stockList.innerHTML = "";
  stockInfo.innerHTML = "";
  renderUsers();

  alert("User deleted successfully!");
});

// ----- INITIALIZE -----
renderUsers();