
document.addEventListener("DOMContentLoaded", () => {
  const users = JSON.parse(userContent);
  const stocks = JSON.parse(stockContent);

  initializeUserList(users, stocks);
  setupButtons(users, stocks);
});


function initializeUserList(users, stocks) {
  const userList = document.querySelector(".user-list");
  userList.innerHTML = "";

  users.forEach(({ id, user }) => {
    const li = document.createElement("li");
    li.textContent = `${user.lastname}, ${user.firstname}`;
    li.dataset.id = id;
    li.classList.add("user-item");
    userList.appendChild(li);
  });

 
  userList.addEventListener("click", (e) => {
    if (e.target.classList.contains("user-item")) {
      const selectedId = e.target.dataset.id;
      const selectedUser = users.find(u => u.id == selectedId);
      if (selectedUser) {
        fillUserForm(selectedUser);
        renderPortfolio(selectedUser, stocks);
      }
    }
  });
}

// -------------------- USER FORM --------------------
function fillUserForm({ id, user }) {
  document.querySelector("#userID").value = id;
  document.querySelector("#firstname").value = user.firstname;
  document.querySelector("#lastname").value = user.lastname;
  document.querySelector("#address").value = user.address;
  document.querySelector("#city").value = user.city;
  document.querySelector("#email").value = user.email;
}

// -------------------- PORTFOLIO SECTION --------------------
function renderPortfolio(user, stocks) {
  const portfolioList = document.querySelector(".portfolio-list");
  portfolioList.innerHTML = `
    <h3>Symbol</h3>
    <h3># Shares</h3>
    <h3>Actions</h3>
  `;

  user.portfolio.forEach(item => {
    const stockRow = document.createElement("div");
    stockRow.classList.add("portfolio-row");

    const symbol = document.createElement("p");
    symbol.textContent = item.symbol;

    const owned = document.createElement("p");
    owned.textContent = item.owned;

    const button = document.createElement("button");
    button.textContent = "View";
    button.dataset.symbol = item.symbol;
    button.classList.add("view-btn");

    stockRow.append(symbol, owned, button);
    portfolioList.appendChild(stockRow);
  });

  // Click on "View" button to show stock details
  portfolioList.addEventListener("click", (e) => {
    if (e.target.classList.contains("view-btn")) {
      const symbol = e.target.dataset.symbol;
      showStockDetails(symbol, stocks);
    }
  });
}

// -------------------- STOCK DETAILS --------------------
function showStockDetails(symbol, stocks) {
  const stock = stocks.find(s => s.symbol == symbol);
  if (!stock) return;

  document.querySelector("#logo").src = `logos/${symbol}.svg`;
  document.querySelector("#stockName").textContent = stock.name;
  document.querySelector("#stockSector").textContent = stock.sector;
  document.querySelector("#stockIndustry").textContent = stock.subIndustry;
  document.querySelector("#stockAddress").textContent = stock.address;
}

// -------------------- BUTTON HANDLERS --------------------
function setupButtons(users, stocks) {
  const saveBtn = document.querySelector("#btnSave");
  const deleteBtn = document.querySelector("#btnDelete");

  // Save User Updates
  saveBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const id = document.querySelector("#userID").value;

    const user = users.find(u => u.id == id);
    if (user) {
      user.user.firstname = document.querySelector("#firstname").value;
      user.user.lastname = document.querySelector("#lastname").value;
      user.user.address = document.querySelector("#address").value;
      user.user.city = document.querySelector("#city").value;
      user.user.email = document.querySelector("#email").value;
    }

    initializeUserList(users, stocks);
    alert("User details saved successfully!");
  });

  // Delete User
  deleteBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const id = document.querySelector("#userID").value;

    const index = users.findIndex(u => u.id == id);
    if (index !== -1) {
      users.splice(index, 1);
      initializeUserList(users, stocks);
      document.querySelector(".portfolio-list").innerHTML = "";
      document.querySelector(".userEntry").reset();
      alert("User deleted!");
    }
  });
}
