// -------------------- GLOBALS --------------------
let selectedUser = null;

// DOM elements
const userList = document.querySelector(".user-list");
const portfolioList = document.querySelector(".portfolio-list");

const firstNameInput = document.getElementById("firstname");
const lastNameInput = document.getElementById("lastname");
const addressInput = document.getElementById("address");
const cityInput = document.getElementById("city");
const emailInput = document.getElementById("email");

const btnSave = document.getElementById("btnSave");
const btnDelete = document.getElementById("btnDelete");

// Stock detail elements
const stockName = document.getElementById("stockName");
const stockSector = document.getElementById("stockSector");
const stockIndustry = document.getElementById("stockIndustry");
const stockAddress = document.getElementById("stockAddress");
const logo = document.getElementById("logo");

// -------------------- RENDER USERS --------------------
function renderUsers() {
  userList.innerHTML = "";

  users.forEach(user => {
    const li = document.createElement("li");
    li.textContent = `${user.firstname} ${user.lastname}`;

    li.addEventListener("click", () => {
      selectUser(user);
    });

    userList.appendChild(li);
  });
}

// -------------------- SELECT USER --------------------
function selectUser(user) {
  selectedUser = user;

  // Fill form
  firstNameInput.value = user.firstname;
  lastNameInput.value = user.lastname;
  addressInput.value = user.address;
  cityInput.value = user.city;
  emailInput.value = user.email;

  renderPortfolio(user);
}

// -------------------- RENDER PORTFOLIO --------------------
function renderPortfolio(user) {
  // keep headers
  portfolioList.innerHTML = `
    <h3>Symbol</h3>
    <h3># Shares</h3>
    <h3>Actions</h3>
  `;

  user.portfolio.forEach(item => {
    const row = document.createElement("div");

    const symbol = document.createElement("p");
    symbol.textContent = item.symbol;

    const shares = document.createElement("p");
    shares.textContent = item.shares;

    const action = document.createElement("button");
    action.textContent = "View";

    action.addEventListener("click", () => {
      const stock = stocks.find(s => s.symbol === item.symbol);
      showStockDetails(stock);
    });

    row.appendChild(symbol);
    row.appendChild(shares);
    row.appendChild(action);

    portfolioList.appendChild(row);
  });
}

// -------------------- SHOW STOCK DETAILS --------------------
function showStockDetails(stock) {
  if (!stock) return;

  stockName.textContent = stock.name;
  stockSector.textContent = stock.sector;
  stockIndustry.textContent = stock.industry;
  stockAddress.textContent = stock.address;
  logo.src = stock.logo;
}

// -------------------- SAVE USER --------------------
btnSave.addEventListener("click", (e) => {
  e.preventDefault();

  if (!selectedUser) return;

  selectedUser.firstname = firstNameInput.value;
  selectedUser.lastname = lastNameInput.value;
  selectedUser.address = addressInput.value;
  selectedUser.city = cityInput.value;
  selectedUser.email = emailInput.value;

  renderUsers();
});

// -------------------- DELETE USER --------------------
btnDelete.addEventListener("click", (e) => {
  e.preventDefault();

  if (!selectedUser) return;

  const index = users.findIndex(u => u.id === selectedUser.id);

  if (index !== -1) {
    users.splice(index, 1);
  }

  selectedUser = null;

  // Clear UI
  firstNameInput.value = "";
  lastNameInput.value = "";
  addressInput.value = "";
  cityInput.value = "";
  emailInput.value = "";

  portfolioList.innerHTML = "";
  renderUsers();
});

// -------------------- INIT --------------------
renderUsers();