// Sample Data (you can replace with repo data if provided)
let users = [
  { id: 1, name: "John Doe", email: "john@example.com", portfolio: [1, 2] },
  { id: 2, name: "Jane Smith", email: "jane@example.com", portfolio: [2, 3] }
];

let stocks = [
  { id: 1, symbol: "AAPL", price: 180 },
  { id: 2, symbol: "GOOG", price: 2800 },
  { id: 3, symbol: "TSLA", price: 750 }
];

let selectedUser = null;

// DOM Elements
const userList = document.getElementById("user-list");
const stockList = document.getElementById("stock-list");
const portfolioDiv = document.getElementById("portfolio");
const stockInfoDiv = document.getElementById("stock-info");

const nameInput = document.getElementById("name");
const emailInput = document.getElementById("email");
const saveBtn = document.getElementById("save-btn");

// ----------------------
// Render Users
// ----------------------
function renderUsers() {
  userList.innerHTML = "";

  users.forEach(user => {
    const li = document.createElement("li");
    li.textContent = user.name;

    // Select user
    li.addEventListener("click", () => selectUser(user));

    // Delete button
    const delBtn = document.createElement("button");
    delBtn.textContent = "Delete";
    delBtn.onclick = (e) => {
      e.stopPropagation();
      deleteUser(user.id);
    };

    li.appendChild(delBtn);
    userList.appendChild(li);
  });
}

// ----------------------
// Select User
// ----------------------
function selectUser(user) {
  selectedUser = user;

  nameInput.value = user.name;
  emailInput.value = user.email;

  renderPortfolio(user);
}

// ----------------------
// Render Portfolio
// ----------------------
function renderPortfolio(user) {
  portfolioDiv.innerHTML = "";

  user.portfolio.forEach(stockId => {
    const stock = stocks.find(s => s.id === stockId);

    const div = document.createElement("div");
    div.textContent = stock.symbol;

    div.addEventListener("click", () => showStock(stock));

    portfolioDiv.appendChild(div);
  });
}

// ----------------------
// Render Stocks List
// ----------------------
function renderStocks() {
  stockList.innerHTML = "";

  stocks.forEach(stock => {
    const li = document.createElement("li");
    li.textContent = stock.symbol;

    li.addEventListener("click", () => showStock(stock));

    stockList.appendChild(li);
  });
}

// ----------------------
// Show Stock Info
// ----------------------
function showStock(stock) {
  stockInfoDiv.innerHTML = `
    <h3>${stock.symbol}</h3>
    <p>Price: $${stock.price}</p>
  `;
}

// ----------------------
// Save User Changes
// ----------------------
saveBtn.addEventListener("click", () => {
  if (!selectedUser) return;

  selectedUser.name = nameInput.value;
  selectedUser.email = emailInput.value;

  renderUsers();
});

// ----------------------
// Delete User
// ----------------------
function deleteUser(id) {
  users = users.filter(user => user.id !== id);

  selectedUser = null;
  portfolioDiv.innerHTML = "";
  nameInput.value = "";
  emailInput.value = "";

  renderUsers();
}

// ----------------------
// Init
// ----------------------
renderUsers();
renderStocks();