document.addEventListener("DOMContentLoaded", () => {
  // DOM element references
  const userList = document.querySelector(".user-list");
  const portfolioList = document.querySelector(".portfolio-list");
  const stockLogo = document.querySelector("#logo");
  const stockName = document.querySelector("#stockName");
  const stockSector = document.querySelector("#stockSector");
  const stockIndustry = document.querySelector("#stockIndustry");
  const stockAddress = document.querySelector("#stockAddress");

  const firstNameInput = document.querySelector("#firstname");
  const lastNameInput = document.querySelector("#lastname");
  const addressInput = document.querySelector("#address");
  const cityInput = document.querySelector("#city");
  const emailInput = document.querySelector("#email");
  const userIDInput = document.querySelector("#userID");

  const saveBtn = document.querySelector("#btnSave");
  const deleteBtn = document.querySelector("#btnDelete");

  let selectedUser = null;

  // ---------- Load and Render Users ----------
  function renderUsers() {
    userList.innerHTML = "";
    users.forEach(user => {
      const li = document.createElement("li");
      li.textContent = `${user.firstname} ${user.lastname}`;
      li.addEventListener("click", () => selectUser(user));
      userList.appendChild(li);
    });
  }

  // ---------- Select User ----------
  function selectUser(user) {
    selectedUser = user;
    userIDInput.value = user.id;
    firstNameInput.value = user.firstname;
    lastNameInput.value = user.lastname;
    addressInput.value = user.address;
    cityInput.value = user.city;
    emailInput.value = user.email;

    renderPortfolio(user.portfolio);
  }

  // ---------- Render Portfolio ----------
  function renderPortfolio(portfolio) {
    // Keep headers
    const headers = portfolioList.querySelectorAll("h3");
    portfolioList.innerHTML = "";
    headers.forEach(h => portfolioList.appendChild(h));

    portfolio.forEach(stockItem => {
      const row = document.createElement("div");
      row.classList.add("portfolio-row");

      const symbol = document.createElement("p");
      symbol.textContent = stockItem.symbol;

      const shares = document.createElement("p");
      shares.textContent = stockItem.shares;

      const viewBtn = document.createElement("button");
      viewBtn.textContent = "View";
      viewBtn.addEventListener("click", () => showStockDetails(stockItem.symbol));

      row.append(symbol, shares, viewBtn);
      portfolioList.appendChild(row);
    });
  }

  // ---------- Show Stock Details ----------
function showStockDetails(symbol) {
  const stock = stocks.find(s => s.symbol.toUpperCase() === symbol.toUpperCase());

  const nameEl = document.getElementById("stockName");
  const sectorEl = document.getElementById("stockSector");
  const industryEl = document.getElementById("stockIndustry");
  const addressEl = document.getElementById("stockAddress");
  const logoEl = document.getElementById("logo");

  if (stock) {
    nameEl.textContent = stock.name || "N/A";
    sectorEl.textContent = stock.sector || "N/A";
    industryEl.textContent = stock.subIndustry || "N/A"; // ✅ corrected
    addressEl.textContent = stock.address || "N/A";
    logoEl.src = stock.logo || "";
  } else {
    nameEl.textContent = "Not found";
    sectorEl.textContent = "";
    industryEl.textContent = "";
    addressEl.textContent = "";
    logoEl.src = "";
  }
}


  // ---------- Save User ----------
  saveBtn.addEventListener("click", (e) => {
    e.preventDefault();

    if (selectedUser) {
      selectedUser.firstname = firstNameInput.value;
      selectedUser.lastname = lastNameInput.value;
      selectedUser.address = addressInput.value;
      selectedUser.city = cityInput.value;
      selectedUser.email = emailInput.value;

      renderUsers();
      alert("✅ User information updated successfully!");
    } else {
      alert("⚠️ Please select a user first.");
    }
  });

  // ---------- Delete User ----------
  deleteBtn.addEventListener("click", (e) => {
    e.preventDefault();

    if (selectedUser) {
      const index = users.findIndex(u => u.id === selectedUser.id);
      if (index !== -1) {
        users.splice(index, 1);
        alert("🗑️ User deleted!");
      }

      selectedUser = null;
      clearForm();
      renderUsers();
      portfolioList.innerHTML = `
        <h3>Symbol</h3>
        <h3># Shares</h3>
        <h3>Actions</h3>
      `;
    } else {
      alert("⚠️ Please select a user to delete.");
    }
  });

  // ---------- Clear Form ----------
  function clearForm() {
    userIDInput.value = "";
    firstNameInput.value = "";
    lastNameInput.value = "";
    addressInput.value = "";
    cityInput.value = "";
    emailInput.value = "";

    stockLogo.src = "";
    stockName.textContent = "";
    stockSector.textContent = "";
    stockIndustry.textContent = "";
    stockAddress.textContent = "";
  }

  // ---------- Initialize ----------
  renderUsers();
});
