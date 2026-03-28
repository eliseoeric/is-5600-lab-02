/* add your code here */
// ===== SELECT ELEMENTS =====
const userList = document.querySelector(".user-list");
const portfolioList = document.querySelector(".portfolio-list");

const userID = document.getElementById("userID");
const firstName = document.getElementById("firstname");
const lastName = document.getElementById("lastname");
const address = document.getElementById("address");
const city = document.getElementById("city");
const email = document.getElementById("email");

const btnSave = document.getElementById("btnSave");
const btnDelete = document.getElementById("btnDelete");

const logo = document.getElementById("logo");
const stockName = document.getElementById("stockName");
const stockSector = document.getElementById("stockSector");
const stockIndustry = document.getElementById("stockIndustry");
const stockAddress = document.getElementById("stockAddress");

let selectedUser = null;


// ===== RENDER USERS =====
function renderUsers() {
  userList.innerHTML = "";

  users.forEach(user => {
    const li = document.createElement("li");
    li.textContent = user.firstname + " " + user.lastname;

    li.addEventListener("click", () => {
      selectUser(user);
    });

    userList.appendChild(li);
  });
}


// ===== SELECT USER =====
function selectUser(user) {
  selectedUser = user;

  // fill form
  userID.value = user.id;
  firstName.value = user.firstname;
  lastName.value = user.lastname;
  address.value = user.address;
  city.value = user.city;
  email.value = user.email;

  displayPortfolio(user);
}


// ===== DISPLAY PORTFOLIO =====
function displayPortfolio(user) {
  portfolioList.innerHTML = `
    <h3>Symbol</h3>
    <h3># Shares</h3>
    <h3>Actions</h3>
  `;

  user.portfolio.forEach(item => {
    const stock = stocks.find(s => s.symbol === item.symbol);

    const row = document.createElement("div");
    row.innerHTML = `
      <p>${item.symbol}</p>
      <p>${item.shares}</p>
      <button>View</button>
    `;

    row.querySelector("button").addEventListener("click", () => {
      showStock(stock);
    });

    portfolioList.appendChild(row);
  });
}


// ===== SHOW STOCK DETAILS =====
function showStock(stock) {
  stockName.textContent = stock.name;
  stockSector.textContent = stock.sector;
  stockIndustry.textContent = stock.industry;
  stockAddress.textContent = stock.address;

  logo.src = `/logos/${stock.symbol}.png`;
}


// ===== SAVE USER =====
btnSave.addEventListener("click", (e) => {
  e.preventDefault();

  if (selectedUser) {
    selectedUser.firstname = firstName.value;
    selectedUser.lastname = lastName.value;
    selectedUser.address = address.value;
    selectedUser.city = city.value;
    selectedUser.email = email.value;

    renderUsers();
  }
});


// ===== DELETE USER =====
btnDelete.addEventListener("click", (e) => {
  e.preventDefault();

  if (selectedUser) {
    const index = users.findIndex(u => u.id == selectedUser.id);
    users.splice(index, 1);

    selectedUser = null;

    renderUsers();
    portfolioList.innerHTML = "";
  }
});


// ===== INITIAL LOAD =====
renderUsers();
