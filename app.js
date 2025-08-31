/* add your code here */
// =====================
// Stock Portfolio Dashboard
// =====================

// Elements
const userList = document.querySelector(".user-list");
const portfolioDiv = document.querySelector(".portfolio-list");
const userForm = document.querySelector(".userEntry");

// Inputs
const userIDInput = document.getElementById("userID");
const firstnameInput = document.getElementById("firstname");
const lastnameInput = document.getElementById("lastname");
const addressInput = document.getElementById("address");
const cityInput = document.getElementById("city");
const emailInput = document.getElementById("email");

// Buttons
const btnSave = document.getElementById("btnSave");
const btnDelete = document.getElementById("btnDelete");

// Stock details
const stockName = document.getElementById("stockName");
const stockSector = document.getElementById("stockSector");
const stockIndustry = document.getElementById("stockIndustry");
const stockAddress = document.getElementById("stockAddress");
const stockLogo = document.getElementById("logo");

// =====================
// Initialize
// =====================
function init() {
  renderUserList();
}

// =====================
// Render User List
// =====================
function renderUserList() {
  userList.innerHTML = "";

  users.forEach(user => {
    const li = document.createElement("li");
    li.textContent = `${user.firstname} ${user.lastname}`;
    li.dataset.id = user.id;
    li.addEventListener("click", () => loadUser(user));
    userList.appendChild(li);
  });
}

// =====================
// Load User Info + Portfolio
// =====================
function loadUser(user) {
  userIDInput.value = user.id;
  firstnameInput.value = user.firstname;
  lastnameInput.value = user.lastname;
  addressInput.value = user.address;
  cityInput.value = user.city;
  emailInput.value = user.email;

  loadPortfolio(user.portfolio);
}

// =====================
// Load Portfolio Stocks
// =====================
function loadPortfolio(portfolio) {
  portfolioDiv.innerHTML = `
    <h3>Symbol</h3><h3># Shares</h3><h3>Actions</h3>
  `;

  portfolio.forEach(stock => {
    const row = document.createElement("div");
    row.classList.add("portfolio-row");

    row.innerHTML = `
      <p>${stock.symbol}</p>
      <p>${stock.shares}</p>
      <button>View</button>
    `;

    row.querySelector("button").addEventListener("click", () => loadStockDetails(stock.symbol));
    portfolioDiv.appendChild(row);
  });
}

// =====================
// Load Stock Details
// =====================
function loadStockDetails(symbol) {
  const stock = stocks.find(s => s.symbol === symbol);
  if (!stock) return;

  stockName.textContent = stock.name;
  stockSector.textContent = stock.sector;
  stockIndustry.textContent = stock.industry;
  stockAddress.textContent = stock.address;
  stockLogo.src = stock.logo;
}

// =====================
// Save User Updates
// =====================
btnSave.addEventListener("click", (e) => {
  e.preventDefault();
  const id = userIDInput.value;
  const user = users.find(u => u.id == id);

  if (user) {
    user.firstname = firstnameInput.value;
    user.lastname = lastnameInput.value;
    user.address = addressInput.value;
    user.city = cityInput.value;
    user.email = emailInput.value;
  }

  renderUserList();
});

// =====================
// Delete User
// =====================
btnDelete.addEventListener("click", (e) => {
  e.preventDefault();
  const id = userIDInput.value;
  const index = users.findIndex(u => u.id == id);

  if (index !== -1) {
    users.splice(index, 1);
    renderUserList();

    // Clear form and portfolio
    userForm.reset();
    portfolioDiv.innerHTML = `
      <h3>Symbol</h3><h3># Shares</h3><h3>Actions</h3>
    `;

    // Clear stock details
    stockName.textContent = "";
    stockSector.textContent = "";
    stockIndustry.textContent = "";
    stockAddress.textContent = "";
    stockLogo.src = "";
  }
});

// =====================
// Start App
// =====================
init();

