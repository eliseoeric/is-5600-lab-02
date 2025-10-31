// ==============================
// SAMPLE DATA (replace with lab data if provided)
// ==============================
let users = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    portfolio: [
      { id: 101, symbol: "AAPL", company: "Apple Inc.", shares: 25, price: 180 },
      { id: 102, symbol: "TSLA", company: "Tesla Inc.", shares: 10, price: 250 }
    ]
  },
  {
    id: 2,
    name: "Bob Smith",
    email: "bob@example.com",
    portfolio: [
      { id: 201, symbol: "GOOGL", company: "Alphabet Inc.", shares: 8, price: 2800 },
      { id: 202, symbol: "MSFT", company: "Microsoft Corp.", shares: 15, price: 340 }
    ]
  }
];

// ==============================
// DOM references
// ==============================
const userList = document.getElementById("user-list");
const stockList = document.getElementById("stock-list");
const stockInfo = document.getElementById("stock-info");
const userForm = document.getElementById("user-form");
const userNameInput = document.getElementById("user-name");
const userEmailInput = document.getElementById("user-email");
const saveBtn = document.getElementById("save-btn");
const deleteBtn = document.getElementById("delete-btn");
const addUserBtn = document.getElementById("add-user-btn");

let selectedUserId = null;
let selectedStockId = null;

// ==============================
// Utilities
// ==============================
function findUserIndexById(id) {
  return users.findIndex(u => u.id === Number(id));
}
function findUserById(id) {
  return users.find(u => u.id === Number(id));
}
function createElem(tag, text, classes = []) {
  const el = document.createElement(tag);
  el.textContent = text;
  classes.forEach(c => el.classList.add(c));
  return el;
}

// ==============================
// Render functions
// ==============================
function loadUsers() {
  userList.innerHTML = "";
  users.forEach(user => {
    const li = document.createElement("li");
    li.textContent = user.name;
    li.dataset.id = user.id;
    li.classList.add("user-item");
    if (Number(selectedUserId) === user.id) li.classList.add("user-item--selected");
    userList.appendChild(li);
  });

  // clear portfolio if no user selected
  if (!selectedUserId) {
    stockList.innerHTML = "";
    stockInfo.innerHTML = "Select a stock to see details.";
  }
}

function displayPortfolio(userId) {
  selectedUserId = Number(userId);
  selectedStockId = null; // reset stock selection
  const user = findUserById(userId);
  stockList.innerHTML = "";

  if (!user) return;

  user.portfolio.forEach(stock => {
    const li = document.createElement("li");
    li.textContent = `${stock.symbol} - ${stock.company}`;
    li.dataset.id = stock.id;
    li.classList.add("stock-item");
    stockList.appendChild(li);
  });

  // populate form
  userNameInput.value = user.name;
  userEmailInput.value = user.email;
  stockInfo.innerHTML = "Select a stock to see details.";

  // update user list highlight
  Array.from(userList.children).forEach(li => {
    li.classList.toggle("user-item--selected", Number(li.dataset.id) === user.id);
  });
}

function displayStockInfo(stockId) {
  if (!selectedUserId) return;
  selectedStockId = Number(stockId);
  const user = findUserById(selectedUserId);
  if (!user) return;

  const stock = user.portfolio.find(s => s.id === Number(stockId));
  if (!stock) return;

  stockInfo.innerHTML = `
    <h4>${stock.company} (${stock.symbol})</h4>
    <p>Shares: ${stock.shares}</p>
    <p>Price per Share: $${stock.price}</p>
    <p>Total Value: $${(stock.shares * stock.price).toFixed(2)}</p>
  `;

  // update stock highlight
  Array.from(stockList.children).forEach(li => {
    li.classList.toggle("stock-item--selected", Number(li.dataset.id) === stock.id);
  });
}

// ==============================
// Mutation functions
// ==============================
function saveUserInfo(e) {
  e.preventDefault();
  if (!selectedUserId) {
    alert("Select a user first.");
    return;
  }

  const idx = findUserIndexById(selectedUserId);
  if (idx === -1) return;

  users[idx].name = userNameInput.value.trim();
  users[idx].email = userEmailInput.value.trim();

  // re-render user list (keeps selection)
  loadUsers();
  // re-apply portfolio view for the selected user so form & highlights stay in sync
  displayPortfolio(selectedUserId);
  alert("User information updated successfully!");
}

function deleteUser() {
  if (!selectedUserId) {
    alert("Select a user first.");
    return;
  }
  const idx = findUserIndexById(selectedUserId);
  if (idx === -1) return;

  // remove user
  users.splice(idx, 1);

  // clear selection + UI
  selectedUserId = null;
  selectedStockId = null;
  userNameInput.value = "";
  userEmailInput.value = "";
  stockList.innerHTML = "";
  stockInfo.innerHTML = "Select a stock to see details.";
  loadUsers();

  alert("User deleted successfully!");
}

function addDemoUser() {
  // small helper to add a demo user so you can test add/delete quickly
  const newId = users.length ? Math.max(...users.map(u => u.id)) + 1 : 1;
  const newStockIdBase = users.flatMap(u => u.portfolio.map(p => p.id)).reduce((a,b) => Math.max(a,b), 100) + 1;
  const newUser = {
    id: newId,
    name: `Demo User ${newId}`,
    email: `demo${newId}@example.com`,
    portfolio: [
      { id: newStockIdBase, symbol: "DME", company: "Demo Corp", shares: 10, price: 10 }
    ]
  };
  users.push(newUser);
  loadUsers();
}

// ==============================
// Event listeners (delegation)
// ==============================
userList.addEventListener("click", (e) => {
  const li = e.target.closest("li");
  if (!li) return;
  const id = li.dataset.id;
  displayPortfolio(id);
});

stockList.addEventListener("click", (e) => {
  const li = e.target.closest("li");
  if (!li) return;
  const id = li.dataset.id;
  displayStockInfo(id);
});

userForm.addEventListener("submit", saveUserInfo);
deleteBtn.addEventListener("click", deleteUser);
addUserBtn.addEventListener("click", addDemoUser);

// Initialize
loadUsers();
console.log("Dashboard ready!");
