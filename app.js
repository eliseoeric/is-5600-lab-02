document.addEventListener("DOMContentLoaded", () => {

  console.log("APP JS LOADED");

  const userList = document.querySelector(".user-list");
  const portfolioList = document.querySelector(".portfolio-list");

  const stockName = document.getElementById("stockName");
  const stockSector = document.getElementById("stockSector");
  const stockIndustry = document.getElementById("stockIndustry");
  const stockAddress = document.getElementById("stockAddress");

  // ===== FORM INPUTS =====
  const firstNameInput = document.getElementById("firstname");
  const lastNameInput = document.getElementById("lastname");
  const addressInput = document.getElementById("address");
  const cityInput = document.getElementById("city");
  const emailInput = document.getElementById("email");

  const saveBtn = document.getElementById("btnSave");
  const deleteBtn = document.getElementById("btnDelete");

  let selectedUser = null;

  // ================= USERS =================
  function renderUsers() {
    userList.innerHTML = "";

    userContent.forEach(item => {
      const li = document.createElement("li");

      li.textContent = item.user.firstname + " " + item.user.lastname;

      li.addEventListener("click", () => {
        selectedUser = item;

        renderPortfolio(item);

        // ===== FILL FORM =====
        firstNameInput.value = item.user.firstname;
        lastNameInput.value = item.user.lastname;
        addressInput.value = item.user.address;
        cityInput.value = item.user.city;
        emailInput.value = item.user.email;
      });

      userList.appendChild(li);
    });
  }

  // ================= PORTFOLIO =================
  function renderPortfolio(user) {

    portfolioList.innerHTML = `
      <h3>Symbol</h3>
      <h3># Shares</h3>
      <h3>Actions</h3>
    `;

    user.portfolio.forEach(p => {

      const stock = stockContent.find(s => s.symbol === p.symbol);

      const symbol = document.createElement("p");
      symbol.textContent = p.symbol;

      const shares = document.createElement("p");
      shares.textContent = p.owned;

      const btn = document.createElement("button");
      btn.textContent = "View";

      btn.addEventListener("click", () => {
        if (stock) {
          renderStockDetails(stock);
        }
      });

      portfolioList.appendChild(symbol);
      portfolioList.appendChild(shares);
      portfolioList.appendChild(btn);
    });
  }

  // ================= DETAILS =================
  function renderStockDetails(stock) {
    stockName.textContent = stock.name;
    stockSector.textContent = stock.sector;
    stockIndustry.textContent = stock.industry;
    stockAddress.textContent = stock.address;
  }

  // ================= SAVE =================
  saveBtn.addEventListener("click", (e) => {
    e.preventDefault();

    if (!selectedUser) return;

    selectedUser.user.firstname = firstNameInput.value;
    selectedUser.user.lastname = lastNameInput.value;
    selectedUser.user.address = addressInput.value;
    selectedUser.user.city = cityInput.value;
    selectedUser.user.email = emailInput.value;

    renderUsers();
  });

  // ================= DELETE =================
  deleteBtn.addEventListener("click", () => {

    if (!selectedUser) return;

    userContent = userContent.filter(u => u.id !== selectedUser.id);

    selectedUser = null;

    renderUsers();
    portfolioList.innerHTML = "";
  });

  // ================= INIT =================
  renderUsers();

});