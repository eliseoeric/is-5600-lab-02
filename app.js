// Track selected user
let selectedUser = null;

// Sample data (ONLY keep this if your repo does NOT already have users/stocks)
let users = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    portfolio: [
      { id: 1, symbol: "AAPL", shares: 10 },
      { id: 2, symbol: "GOOG", shares: 5 }
    ]
  },
  {
    id: 2,
    name: "Jane Smith",
    email: "jane@example.com",
    portfolio: [
      { id: 3, symbol: "TSLA", shares: 8 }
    ]
  }
];

let stocks = [
  { id: 1, name: "Apple", price: 180 },
  { id: 2, name: "Google", price: 2800 },
  { id: 3, name: "Tesla", price: 750 }
];


// =====================
// RENDER USERS
// =====================
function renderUsers() {
  const userList = document.getElementById("userList");
  userList.innerHTML = "";

  users.forEach(user => {
    const li = document.createElement("li");

    li.innerHTML = `
      ${user.name}
      <button onclick="selectUser(${user.id})">Select</button>
      <button onclick="deleteUser(${user.id})">Delete</button>
    `;

    userList.appendChild(li);
  });
}


// =====================
// SELECT USER
// =====================
function selectUser(userId) {
  selectedUser = users.find(u => u.id === userId);

  // Fill form with user data
  document.getElementById("name").value = selectedUser.name;
  document.getElementById("email").value = selectedUser.email;

  renderPortfolio();
}


// =====================
// RENDER PORTFOLIO
// =====================
function renderPortfolio() {
  const portfolioDiv = document.getElementById("portfolio");
  portfolioDiv.innerHTML = "";

  if (!selectedUser) return;

  selectedUser.portfolio.forEach(stock => {
    const div = document.createElement("div");

    div.innerHTML = `
      ${stock.symbol} - ${stock.shares} shares
      <button onclick="selectStock(${stock.id})">View</button>
    `;

    portfolioDiv.appendChild(div);
  });
}


// =====================
// SELECT STOCK
// =====================
function selectStock(stockId) {
  const stock = stocks.find(s => s.id === stockId);

  if (!stock) return;

  document.getElementById("stockDetails").innerHTML = `
    <h3>${stock.name}</h3>
    <p>Price: $${stock.price}</p>
  `;
}


// =====================
// UPDATE USER (FORM)
// =====================
document.getElementById("userForm").addEventListener("submit", function (e) {
  e.preventDefault();

  if (!selectedUser) return;

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;

  selectedUser.name = name;
  selectedUser.email = email;

  renderUsers();
});


// =====================
// DELETE USER
// =====================
function deleteUser(userId) {
  users = users.filter(u => u.id !== userId);

  // If deleted user was selected
  if (selectedUser && selectedUser.id === userId) {
    selectedUser = null;

    document.getElementById("portfolio").innerHTML = "";
    document.getElementById("stockDetails").innerHTML = "";
    document.getElementById("name").value = "";
    document.getElementById("email").value = "";
  }

  renderUsers();
}


// =====================
// INITIAL LOAD
// =====================
renderUsers();
