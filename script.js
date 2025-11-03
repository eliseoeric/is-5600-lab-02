// -------------------- Sample Users --------------------
const users = [
  {
    id: 1,
    firstname: "Alice",
    lastname: "Smith",
    address: "123 Main St",
    city: "New York",
    email: "alice@example.com",
    portfolio: [
      { symbol: "AAPL", shares: 10 },
      { symbol: "GOOG", shares: 5 }
    ]
  },
  {
    id: 2,
    firstname: "Bob",
    lastname: "Johnson",
    address: "456 Maple Ave",
    city: "Los Angeles",
    email: "bob@example.com",
    portfolio: [
      { symbol: "MSFT", shares: 8 },
      { symbol: "TSLA", shares: 12 }
    ]
  }
];

// -------------------- Sample Stocks --------------------
const stocks = {
  AAPL: { name: "Apple Inc.", sector: "Technology", industry: "Consumer Electronics", address: "Cupertino, CA" },
  GOOG: { name: "Alphabet Inc.", sector: "Technology", industry: "Internet Services", address: "Mountain View, CA" },
  MSFT: { name: "Microsoft Corp.", sector: "Technology", industry: "Software", address: "Redmond, WA" },
  TSLA: { name: "Tesla Inc.", sector: "Automotive", industry: "Electric Vehicles", address: "Palo Alto, CA" }
};

// -------------------- DOM Selectors --------------------
const userList = document.querySelector(".user-list");
const portfolioSection = document.querySelector(".portfolio-list");
const stockName = document.getElementById("stockName");
const stockSector = document.getElementById("stockSector");
const stockIndustry = document.getElementById("stockIndustry");
const stockAddress = document.getElementById("stockAddress");

// -------------------- Display Users --------------------
function showUsers() {
  userList.innerHTML = "";
  users.forEach(user => {
    const li = document.createElement("li");
    li.textContent = `${user.firstname} ${user.lastname}`;
    li.style.cursor = "pointer";
    li.addEventListener("click", () => selectUser(user.id));
    userList.appendChild(li);
  });
}

// -------------------- Select User --------------------
function selectUser(userId) {
  const user = users.find(u => u.id === userId);

  // Fill the form
  document.getElementById("userID").value = user.id;
  document.getElementById("firstname").value = user.firstname;
  document.getElementById("lastname").value = user.lastname;
  document.getElementById("address").value = user.address;
  document.getElementById("city").value = user.city;
  document.getElementById("email").value = user.email;

  // Display portfolio with #Shares and Actions
  portfolioSection.innerHTML = `
    <h3>Symbol</h3>
    <h3># Shares</h3>
    <h3>Actions</h3>
  `;
  user.portfolio.forEach(stock => {
    const div = document.createElement("div");
    div.classList.add("portfolio-item");
    div.style.display = "flex";
    div.style.justifyContent = "space-between";
    div.style.padding = "4px 0";

    // Symbol
    const sym = document.createElement("span");
    sym.textContent = stock.symbol;
    sym.style.cursor = "pointer";
    sym.addEventListener("click", () => showStockDetails(stock.symbol));

    // Shares
    const shares = document.createElement("span");
    shares.textContent = stock.shares;

    // Action: Remove stock
    const action = document.createElement("button");
    action.textContent = "Remove";
    action.style.cursor = "pointer";
    action.addEventListener("click", () => removeStock(userId, stock.symbol));

    div.appendChild(sym);
    div.appendChild(shares);
    div.appendChild(action);

    portfolioSection.appendChild(div);
  });
}

// -------------------- Show Stock Details --------------------
function showStockDetails(symbol) {
  const stock = stocks[symbol];
  if (!stock) return;

  stockName.textContent = stock.name;
  stockSector.textContent = stock.sector;
  stockIndustry.textContent = stock.industry;
  stockAddress.textContent = stock.address;
}

// -------------------- Save User Info --------------------
document.getElementById("btnSave").addEventListener("click", (e) => {
  e.preventDefault();
  const userId = Number(document.getElementById("userID").value);
  const user = users.find(u => u.id === userId);
  if (!user) return;

  user.firstname = document.getElementById("firstname").value;
  user.lastname = document.getElementById("lastname").value;
  user.address = document.getElementById("address").value;
  user.city = document.getElementById("city").value;
  user.email = document.getElementById("email").value;

  showUsers();
  alert("User info saved!");
});

// -------------------- Delete User --------------------
document.getElementById("btnDelete").addEventListener("click", (e) => {
  e.preventDefault();
  const userId = Number(document.getElementById("userID").value);
  const index = users.findIndex(u => u.id === userId);
  if (index > -1) {
    users.splice(index, 1);
    portfolioSection.innerHTML = `
      <h3>Symbol</h3>
      <h3># Shares</h3>
      <h3>Actions</h3>
    `;
    showUsers();
    alert("User deleted!");
  }
});

// -------------------- Remove Stock from Portfolio --------------------
function removeStock(userId, symbol) {
  const user = users.find(u => u.id === userId);
  if (!user) return;

  user.portfolio = user.portfolio.filter(s => s.symbol !== symbol);
  selectUser(userId);
}

// -------------------- Initialize --------------------
document.addEventListener("DOMContentLoaded", showUsers);