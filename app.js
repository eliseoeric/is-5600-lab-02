// document.addEventListener("DOMContentLoaded", () => {
//   // --- DOM elements ---
//   const userList = document.querySelector(".user-list");
//   const portfolioList = document.querySelector(".portfolio-list");
//   const stockName = document.getElementById("stockName");
//   const stockSector = document.getElementById("stockSector");
//   const stockIndustry = document.getElementById("stockIndustry");
//   const stockAddress = document.getElementById("stockAddress");
//   const logoImg = document.getElementById("logo");

//   // --- Data ---
//   const users = userContent.map(u => ({
//     id: u.id.toString(),
//     firstname: u.user.firstname,
//     lastname: u.user.lastname,
//     portfolio: u.portfolio
//   }));

//   const stocks = JSON.parse(stockContent || "[]");

//   let selectedUser = null;

//   // --- Functions ---

//   // Render user list
//   function renderUsers() {
//     userList.innerHTML = "";
//     users.forEach(user => {
//       const li = document.createElement("li");
//       li.textContent = `${user.firstname} ${user.lastname}`;
//       li.dataset.id = user.id;
//       li.style.cursor = "pointer";
//       li.addEventListener("click", () => selectUser(user.id));
//       userList.appendChild(li);
//     });
//   }

//   // Select a user
//   function selectUser(id) {
//     selectedUser = users.find(u => u.id === id);
//     if (!selectedUser) return;

//     renderPortfolio();
//     clearStockDetails();
//   }

//   // Render portfolio for selected user
//   function renderPortfolio() {
//     if (!selectedUser) return;

//     // Header
//     portfolioList.innerHTML = `
//       <h3>Symbol</h3>
//       <h3># Shares</h3>
//       <h3>Actions</h3>
//     `;

//     // Portfolio items
//     selectedUser.portfolio.forEach((holding, index) => {
//       const div = document.createElement("div");
//       div.className = "portfolio-item";
//       div.innerHTML = `
//         <p>${holding.symbol}</p>
//         <p>${holding.owned}</p>
//         <p><button data-index="${index}" class="viewStock">View</button></p>
//       `;
//       portfolioList.appendChild(div);
//     });

//     // Add click events for each stock button
//     document.querySelectorAll(".viewStock").forEach(btn => {
//       btn.addEventListener("click", e => {
//         const index = e.target.dataset.index;
//         const symbol = selectedUser.portfolio[index].symbol;
//         showStockDetails(symbol);
//       });
//     });
//   }

//   // Show stock details
//   function showStockDetails(symbol) {
//     const stock = stocks.find(s => s.symbol === symbol);
//     if (!stock) {
//       stockName.textContent = "No data";
//       stockSector.textContent = "-";
//       stockIndustry.textContent = "-";
//       stockAddress.textContent = "-";
//       logoImg.src = "";
//       return;
//     }

//     stockName.textContent = stock.name;
//     stockSector.textContent = stock.sector;
//     stockIndustry.textContent = stock.subIndustry;
//     stockAddress.textContent = stock.address;
//     logoImg.src = `https://logo.clearbit.com/${stock.name.replace(/\s+/g, "")}.com`;
//   }

//   // Clear stock details
//   function clearStockDetails() {
//     stockName.textContent = "";
//     stockSector.textContent = "";
//     stockIndustry.textContent = "";
//     stockAddress.textContent = "";
//     logoImg.src = "";
//   }

//   // --- Initial render ---
//   renderUsers();
// });


document.addEventListener("DOMContentLoaded", () => {
  // --- DOM elements ---
  const userList = document.querySelector(".user-list");
  const portfolioList = document.querySelector(".portfolio-list");
  const stockName = document.getElementById("stockName");
  const stockSector = document.getElementById("stockSector");
  const stockIndustry = document.getElementById("stockIndustry");
  const stockAddress = document.getElementById("stockAddress");
  const logoImg = document.getElementById("logo");

  // User form elements
  const userIDInput = document.getElementById("userID");
  const firstnameInput = document.getElementById("firstname");
  const lastnameInput = document.getElementById("lastname");
  const addressInput = document.getElementById("address");
  const cityInput = document.getElementById("city");
  const emailInput = document.getElementById("email");
  const btnSave = document.getElementById("btnSave");
  const btnDelete = document.getElementById("btnDelete");

  // --- Data ---
  const users = userContent.map(u => ({
    id: u.id.toString(),
    firstname: u.user.firstname,
    lastname: u.user.lastname,
    email: u.user.email,
    address: u.user.address,
    city: u.user.city,
    portfolio: u.portfolio
  }));

  const stocks = JSON.parse(stockContent || "[]");

  let selectedUser = null;

  // --- Functions ---

  // Render user list
  function renderUsers() {
    userList.innerHTML = "";
    users.forEach(user => {
      const li = document.createElement("li");
      li.textContent = `${user.firstname} ${user.lastname}`;
      li.dataset.id = user.id;
      li.style.cursor = "pointer";
      li.addEventListener("click", () => selectUser(user.id));
      userList.appendChild(li);
    });
  }

  // Select a user
  function selectUser(id) {
    selectedUser = users.find(u => u.id === id);
    if (!selectedUser) return;

    renderPortfolio();
    fillUserForm(selectedUser);
    clearStockDetails();
  }

  // Fill the user form with selected user info
  function fillUserForm(user) {
    userIDInput.value = user.id;
    firstnameInput.value = user.firstname;
    lastnameInput.value = user.lastname;
    addressInput.value = user.address;
    cityInput.value = user.city;
    emailInput.value = user.email;
  }

  // Render portfolio for selected user
  function renderPortfolio() {
    if (!selectedUser) return;

    portfolioList.innerHTML = `
      <h3>Symbol</h3>
      <h3># Shares</h3>
      <h3>Actions</h3>
    `;

    selectedUser.portfolio.forEach((holding, index) => {
      const div = document.createElement("div");
      div.className = "portfolio-item";
      div.innerHTML = `
        <p>${holding.symbol}</p>
        <p>${holding.owned}</p>
        <p><button data-index="${index}" class="viewStock">View</button></p>
      `;
      portfolioList.appendChild(div);
    });

    document.querySelectorAll(".viewStock").forEach(btn => {
      btn.addEventListener("click", e => {
        const index = e.target.dataset.index;
        const symbol = selectedUser.portfolio[index].symbol;
        showStockDetails(symbol);
      });
    });
  }

  // Show stock details
  function showStockDetails(symbol) {
    const stock = stocks.find(s => s.symbol === symbol);
    if (!stock) {
      stockName.textContent = "No data";
      stockSector.textContent = "-";
      stockIndustry.textContent = "-";
      stockAddress.textContent = "-";
      logoImg.src = "";
      return;
    }

    stockName.textContent = stock.name;
    stockSector.textContent = stock.sector;
    stockIndustry.textContent = stock.subIndustry;
    stockAddress.textContent = stock.address;
    logoImg.src = `https://logo.clearbit.com/${stock.name.replace(/\s+/g, "")}.com`;
  }

  // Clear stock details
  function clearStockDetails() {
    stockName.textContent = "";
    stockSector.textContent = "";
    stockIndustry.textContent = "";
    stockAddress.textContent = "";
    logoImg.src = "";
  }

  // --- User Form Actions ---

  // Save button - update user info
  btnSave.addEventListener("click", e => {
    e.preventDefault();
    if (!selectedUser) return;

    selectedUser.firstname = firstnameInput.value;
    selectedUser.lastname = lastnameInput.value;
    selectedUser.address = addressInput.value;
    selectedUser.city = cityInput.value;
    selectedUser.email = emailInput.value;

    renderUsers();
    alert("User information updated!");
  });

  // Delete button - remove user
  btnDelete.addEventListener("click", e => {
    e.preventDefault();
    if (!selectedUser) return;

    const index = users.findIndex(u => u.id === selectedUser.id);
    if (index > -1) {
      users.splice(index, 1);
      selectedUser = null;
      renderUsers();
      portfolioList.innerHTML = "";
      clearStockDetails();
      // clear form
      firstnameInput.value = "";
      lastnameInput.value = "";
      addressInput.value = "";
      cityInput.value = "";
      emailInput.value = "";
      alert("User deleted!");
    }
  });

  // --- Initial render ---
  renderUsers();
});