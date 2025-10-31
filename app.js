// Lab 02 | Stock Portfolio Dashboard — app.js

document.addEventListener("DOMContentLoaded", () => {
  // 1) Parse JSON provided via <script> tags in index.html
  //    (index.html includes data/stocks-complete.js -> stockContent
  //     and data/users.js -> userContent)
  const stocksData = JSON.parse(stockContent); // array of stock objects
  const userData = JSON.parse(userContent);    // array of user objects

  // 2) Cache DOM elements (update selectors if your HTML differs)
  const els = {
    userList: document.querySelector(".user-list"),
    portfolioList: document.querySelector(".portfolio-list"),
    stockForm: document.querySelector(".stock-form"),
    // stock detail fields
    stockName: document.querySelector("#stockName"),
    stockSector: document.querySelector("#stockSector"),
    stockIndustry: document.querySelector("#stockIndustry"),
    stockAddress: document.querySelector("#stockAddress"),
    stockLogo: document.querySelector("#logo"),
    // user form fields
    userID: document.querySelector("#userID"),
    firstName: document.querySelector("#firstname"),
    lastName: document.querySelector("#lastname"),
    address: document.querySelector("#address"),
    city: document.querySelector("#city"),
    email: document.querySelector("#email"),
    // buttons (set these to the real IDs in your HTML)
    saveButton: document.querySelector("#saveButton"),     // <-- set correct selector
    deleteButton: document.querySelector("#deleteButton"), // <-- set correct selector
  };

  // ---------- Rendering: Users ----------
  /**
   * Loops through users and renders <li> for each
   * @param {Array} users
   */
  function generateUserList(users, stocks) {
    // Clear previous list to avoid stacking
    els.userList.innerHTML = "";

    users.forEach(({ user, id }) => {
      const li = document.createElement("li");
      li.textContent = `${user.lastname}, ${user.firstname}`;
      li.setAttribute("id", id); // used later to find the user
      els.userList.appendChild(li);
    });

    // Event delegation: click on any <li> in the list
    els.userList.addEventListener("click", (event) =>
      handleUserListClick(event, users, stocks)
    );
  }

  /**
   * On user click: find user, populate form, render portfolio
   */
  function handleUserListClick(event, users, stocks) {
    const userId = event.target.id;
    if (!userId) return;
    const user = users.find((u) => u.id == userId); // id may be string in DOM
    if (!user) return;

    populateForm(user);
    renderPortfolio(user, stocks);
    // Optional: visually mark active user
    [...els.userList.children].forEach((li) =>
      li.classList.toggle("selected", li.id == userId)
    );
  }

  /**
   * Fill the user form from a user object
   */
  function populateForm(data) {
    const { user, id } = data;
    els.userID.value = id ?? "";
    els.firstName.value = user.firstname ?? "";
    els.lastName.value = user.lastname ?? "";
    els.address.value = user.address ?? "";
    els.city.value = user.city ?? "";
    els.email.value = user.email ?? "";
  }

  // ---------- Rendering: Portfolio ----------
  /**
   * Render the selected user's portfolio with a "View" button per stock
   */
  function renderPortfolio(user, stocks) {
    const { portfolio = [] } = user;
    els.portfolioList.innerHTML = "";

    // Render each portfolio item as row with symbol, shares, and View button
    portfolio.forEach(({ symbol, owned }) => {
      const row = document.createElement("div");
      row.className = "portfolio-row";

      const symEl = document.createElement("p");
      symEl.textContent = symbol;

      const sharesEl = document.createElement("p");
      sharesEl.textContent = owned;

      const btn = document.createElement("button");
      btn.textContent = "View";
      btn.setAttribute("data-symbol", symbol);

      row.appendChild(symEl);
      row.appendChild(sharesEl);
      row.appendChild(btn);
      els.portfolioList.appendChild(row);
    });

    // Event delegation for "View" clicks
    els.portfolioList.addEventListener("click", (e) => {
      const target = e.target;
      if (target.tagName === "BUTTON") {
        const symbol = target.getAttribute("data-symbol");
        viewStock(symbol, stocks);
      }
    });
  }

  // ---------- Stock Detail ----------
  /**
   * Show stock details for a given symbol
   */
  function viewStock(symbol, stocks) {
    if (!els.stockForm) return;

    // stocksData is an array per lab starter; find by symbol
    const stock = stocks.find((s) => s.symbol == symbol);
    if (!stock) return;

    els.stockName.textContent = stock.name ?? "";
    els.stockSector.textContent = stock.sector ?? "";
    els.stockIndustry.textContent = stock.subIndustry ?? "";
    els.stockAddress.textContent = stock.address ?? "";
    if (els.stockLogo) els.stockLogo.src = `logos/${symbol}.svg`;
    // Ensure stock area is visible if your CSS hides it initially
    els.stockForm.style.display = "";
  }

  // ---------- Delete User ----------
  if (els.deleteButton) {
    els.deleteButton.addEventListener("click", (event) => {
      event.preventDefault();

      const userId = els.userID.value;
      if (!userId) return;

      const idx = userData.findIndex((u) => u.id == userId);
      if (idx >= 0) {
        userData.splice(idx, 1);
        // Clear form & portfolio
        clearUserForm();
        els.portfolioList.innerHTML = "";
        // Re-render list
        generateUserList(userData, stocksData);
      }
    });
  }

  function clearUserForm() {
    els.userID.value = "";
    els.firstName.value = "";
    els.lastName.value = "";
    els.address.value = "";
    els.city.value = "";
    els.email.value = "";
  }

  // ---------- Save (Update) User ----------
  if (els.saveButton) {
    els.saveButton.addEventListener("click", (event) => {
      event.preventDefault();

      const id = els.userID.value;
      if (!id) return;

      for (let i = 0; i < userData.length; i++) {
        if (userData[i].id == id) {
          userData[i].user.firstname = els.firstName.value.trim();
          userData[i].user.lastname = els.lastName.value.trim();
          userData[i].user.address = els.address.value.trim();
          userData[i].user.city = els.city.value.trim();
          userData[i].user.email = els.email.value.trim();
          break;
        }
      }
      // Refresh user list (so updated name shows)
      generateUserList(userData, stocksData);
    });
  }

  // ---------- Init ----------
  generateUserList(userData, stocksData);

  // Optionally auto-select the first user to show a complete screen on load
  if (userData.length > 0) {
    const firstId = userData[0].id;
    const firstLi = els.userList.querySelector(`[id="${firstId}"]`);
    if (firstLi) firstLi.click();
  }
});

