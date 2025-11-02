// ===================== LAB 02: STOCK PORTFOLIO DASHBOARD =====================

// Run after page and assets load
document.addEventListener("DOMContentLoaded", () => {
  // Parse JSON data from included JS files
  const stocksData = JSON.parse(stockContent);
  const userData = JSON.parse(userContent);

  // Match IDs from index.html
  const saveButton = document.querySelector("#btnSave");
  const deleteButton = document.querySelector("#btnDelete");

  // Initial user list render
  generateUserList(userData, stocksData);

  // ==================== SAVE USER INFO ====================
  saveButton.addEventListener("click", (e) => {
    e.preventDefault();

    const id = document.querySelector("#userID").value;
    if (!id) return; // No user selected

    // Update matching user object
    for (let i = 0; i < userData.length; i++) {
      if (userData[i].id == id) {
        const u = userData[i].user;
        u.firstname = document.querySelector("#firstname").value;
        u.lastname = document.querySelector("#lastname").value;
        u.address = document.querySelector("#address").value;
        u.city = document.querySelector("#city").value;
        u.email = document.querySelector("#email").value;
      }
    }

    // Refresh sidebar
    generateUserList(userData, stocksData);
  });

  // ==================== DELETE USER ====================
  deleteButton.addEventListener("click", (e) => {
    e.preventDefault();

    const id = document.querySelector("#userID").value;
    if (!id) return; // No user selected

    const index = userData.findIndex((user) => user.id == id);

    if (index > -1) {
      // Remove from data
      userData.splice(index, 1);

      // Clear form + portfolio
      clearForm();
      document.querySelector(".portfolio-list").innerHTML = "";

      // Refresh sidebar
      generateUserList(userData, stocksData);
    }
  });
});

// ===================== FUNCTIONS =====================

// Render sidebar user list
function generateUserList(users, stocks) {
  const userList = document.querySelector(".user-list");
  userList.innerHTML = "";

  users.forEach(({ user, id }) => {
    const li = document.createElement("li");
    li.textContent = `${user.lastname}, ${user.firstname}`;
    li.dataset.id = id;
    userList.appendChild(li);
  });

  // Attach click handler for selecting a user
  userList.onclick = (event) => {
    const clicked = event.target.closest("li");
    if (!clicked) return;

    const user = users.find((u) => u.id == clicked.dataset.id);
    if (user) {
      populateForm(user);
      renderPortfolio(user, stocks);
    }
  };
}

// Populate user form with selected data
function populateForm(data) {
  const { user, id } = data;
  document.querySelector("#userID").value = id;
  document.querySelector("#firstname").value = user.firstname;
  document.querySelector("#lastname").value = user.lastname;
  document.querySelector("#address").value = user.address;
  document.querySelector("#city").value = user.city;
  document.querySelector("#email").value = user.email;
}

// Render portfolio items for user
function renderPortfolio(user, stocks) {
  const { portfolio } = user;
  const portfolioDetails = document.querySelector(".portfolio-list");
  portfolioDetails.innerHTML = "";

  portfolio.forEach(({ symbol, owned }) => {
    const symbolEl = document.createElement("p");
    const sharesEl = document.createElement("p");
    const actionEl = document.createElement("button");

    symbolEl.innerText = symbol;
    sharesEl.innerText = owned;
    actionEl.innerText = "View";
    actionEl.id = symbol;

    portfolioDetails.appendChild(symbolEl);
    portfolioDetails.appendChild(sharesEl);
    portfolioDetails.appendChild(actionEl);
  });

  // Handle "View" button clicks
  portfolioDetails.onclick = (event) => {
    if (event.target.tagName === "BUTTON") {
      viewStock(event.target.id, stocks);
    }
  };
}

// Display stock info when "View" clicked
function viewStock(symbol, stocks) {
  const stock = stocks.find((s) => s.symbol == symbol);
  if (!stock) return;

  document.querySelector("#stockName").textContent = stock.name;
  document.querySelector("#stockSector").textContent = stock.sector;
  document.querySelector("#stockIndustry").textContent = stock.subIndustry;
  document.querySelector("#stockAddress").textContent = stock.address;
  document.querySelector("#logo").src = `logos/${symbol}.svg`;
}

// Clear the user form
function clearForm() {
  document.querySelector("#userID").value = "";
  document.querySelector("#firstname").value = "";
  document.querySelector("#lastname").value = "";
  document.querySelector("#address").value = "";
  document.querySelector("#city").value = "";
  document.querySelector("#email").value = "";
}
