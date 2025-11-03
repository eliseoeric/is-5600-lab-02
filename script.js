// ===== LAB 02: STOCK DASHBOARD =====

// --- 1) Load users and stocks from the global data files ---
const USERS = window.USERS || [];
const STOCKS = window.STOCKS || [];

// --- 2) Get references to all key DOM elements ---
const userList = document.querySelector("#user-list");
const stockList = document.querySelector("#stock-list");
const userID = document.querySelector("#userID");
const first = document.querySelector("#firstname");
const last = document.querySelector("#lastname");
const address = document.querySelector("#address");
const city = document.querySelector("#city");
const email = document.querySelector("#email");
const btnSave = document.querySelector("#btnSave");
const btnDelete = document.querySelector("#btnDelete");
const portfolioBox = document.querySelector(".Portfolio");

// --- 3) Global State ---
let activeUserId = null;
let activeStockSymbol = null;

// --- 4) Render User List ---
function renderUsers() {
  userList.innerHTML = "";
  USERS.forEach(user => {
    const li = document.createElement("li");
    li.textContent = `${user.user.firstname} ${user.user.lastname}`;
    li.dataset.id = user.id;
    li.addEventListener("click", () => selectUser(user.id));
    userList.appendChild(li);
  });
}

// --- 5) Render Stock List ---
function renderStocks() {
  stockList.innerHTML = "";
  STOCKS.forEach(stock => {
    const li = document.createElement("li");
    li.textContent = `${stock.symbol} - ${stock.name}`;
    li.dataset.symbol = stock.symbol;
    li.addEventListener("click", () => selectStock(stock.symbol));
    stockList.appendChild(li);
  });
}

// --- 6) Select User ---
function selectUser(id) {
  const user = USERS.find(u => u.id === id);
  if (!user) return;

  activeUserId = id;
  userID.value = user.id;
  first.value = user.user.firstname;
  last.value = user.user.lastname;
  address.value = `${user.user.address}, ${user.user.city}, ${user.user.state} ${user.user.zip}`;
  email.value = user.user.email;

  renderPortfolio(user.portfolio);
}

// --- 7) Select Stock ---
function selectStock(symbol) {
  const stock = STOCKS.find(s => s.symbol === symbol);
  if (!stock) return;
  activeStockSymbol = symbol;
  document.querySelector("#stockName").textContent = stock.name || "N/A";
  document.querySelector("#stockSector").textContent = stock.sector || "N/A";
  document.querySelector("#stockIndustry").textContent = stock.industry || "N/A";
  document.querySelector("#stockAddress").textContent = stock.address || "";
}

// --- 8) Render Portfolio ---
function renderPortfolio(portfolio) {
  portfolioBox.innerHTML = `
    <h3>Portfolio</h3>
    <table>
      <thead>
        <tr><th>Symbol</th><th># Shares</th><th>Actions</th></tr>
      </thead>
      <tbody>
        ${portfolio
          .map(
            p => `
          <tr>
            <td>${p.symbol}</td>
            <td>${p.owned}</td>
            <td><button onclick="selectStock('${p.symbol}')">View</button></td>
          </tr>`
          )
          .join("")}
      </tbody>
    </table>`;
}

// --- 9) Save Updated User Info ---
btnSave.addEventListener("click", () => {
  const user = USERS.find(u => u.id === activeUserId);
  if (!user) return alert("Select a user first");

  user.user.firstname = first.value;
  user.user.lastname = last.value;
  user.user.email = email.value;
  alert("User information saved successfully!");
  renderUsers();
});

// --- 10) Delete User ---
btnDelete.addEventListener("click", () => {
  if (!activeUserId) return alert("Select a user first!");
  const idx = USERS.findIndex(u => u.id === activeUserId);
  if (idx === -1) return;
  USERS.splice(idx, 1);
  activeUserId = null;
  renderUsers();
  portfolioBox.innerHTML = "";
  alert("User deleted!");
});

// --- 11) Initial Render ---
renderUsers();
renderStocks();

// Auto-select first user/stock
if (USERS.length > 0) selectUser(USERS[0].id);
if (STOCKS.length > 0) selectStock(STOCKS[0].symbol);
