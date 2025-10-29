/* add your code here */
// Sample user data
const users = [
  {
    id: 1,
    name: "Sarah",
    email: "sarah@example.com",
    portfolio: [
      { symbol: "AAPL", shares: 10, price: 180 },
      { symbol: "TSLA", shares: 5, price: 250 },
    ],
  },
  {
    id: 2,
    name: "James",
    email: "james@example.com",
    portfolio: [
      { symbol: "AMZN", shares: 8, price: 120 },
      { symbol: "MSFT", shares: 4, price: 330 },
    ],
  },
  {
    id: 3,
    name: "Olivia",
    email: "olivia@example.com",
    portfolio: [
      { symbol: "NFLX", shares: 12, price: 400 },
      { symbol: "NVDA", shares: 6, price: 450 },
    ],
  },
];

let selectedUser = null;

// DOM elements
const userList = document.getElementById("user-list");
const portfolioList = document.getElementById("portfolio-list");
const userForm = document.getElementById("user-form");
const stockInfo = document.getElementById("stock-info");
const deleteButton = document.getElementById("delete-user");

// ------------------------------
// Render user list
// ------------------------------
function renderUserList() {
  userList.innerHTML = "";
  users.forEach((user) => {
    const li = document.createElement("li");
    li.textContent = user.name;
    li.addEventListener("click", () => selectUser(user.id));
    userList.appendChild(li);
  });
}

// ------------------------------
// Select user and show portfolio
// ------------------------------
function selectUser(id) {
  selectedUser = users.find((u) => u.id === id);
  document.getElementById("user-name").value = selectedUser.name;
  document.getElementById("user-email").value = selectedUser.email;
  renderPortfolio(selectedUser);
  stockInfo.textContent = "";
}

// ------------------------------
// Render portfolio list
// ------------------------------
function renderPortfolio(user) {
  portfolioList.innerHTML = "";
  user.portfolio.forEach((stock) => {
    const li = document.createElement("li");
    li.textContent = `${stock.symbol} (${stock.shares} shares)`;
    li.addEventListener("click", () => showStockInfo(stock));
    portfolioList.appendChild(li);
  });
}

// ------------------------------
// Show stock details
// ------------------------------
function showStockInfo(stock) {
  stockInfo.textContent = `${stock.symbol}: ${stock.shares} shares @ $${stock.price} → Total Value: $${stock.shares * stock.price}`;
}

// ------------------------------
// Save updated user info
// ------------------------------
userForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!selectedUser) return alert("Please select a user first.");

  const name = document.getElementById("user-name").value.trim();
  const email = document.getElementById("user-email").value.trim();

  selectedUser.name = name;
  selectedUser.email = email;

  renderUserList();
  alert("User information updated successfully!");
});

// ------------------------------
// Delete user
// ------------------------------
deleteButton.addEventListener("click", () => {
  if (!selectedUser) return alert("Please select a user first.");

  const confirmDelete = confirm(`Are you sure you want to delete ${selectedUser.name}?`);
  if (confirmDelete) {
    const index = users.findIndex((u) => u.id === selectedUser.id);
    if (index > -1) {
      users.splice(index, 1);
      selectedUser = null;
      portfolioList.innerHTML = "";
      stockInfo.textContent = "";
      document.getElementById("user-name").value = "";
      document.getElementById("user-email").value = "";
      renderUserList();
      alert("User deleted successfully!");
    }
  }
});

// Initialize
renderUserList();
