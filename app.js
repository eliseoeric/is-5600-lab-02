/** =============================== *
 *  is-5600-lab-02 / app.js (clean)
 *  Everything lives in this file.
 *  - Loads users/stocks from users.js / stocks-complete.js
 *  - Renders user list
 *  - Click to load user into form + portfolio
 *  - Add User button (clears form + portfolio; Save creates a new user)
 *  - Save (create/update) with validation
 *  - Delete current user
 *  - Portfolio editor with "Select stock" + shares, View, Delete-row
 *  - Simple client-side validation
 *  =============================== */

/* ---------- Utility: validation ---------- */

function isAlphabetOnly(value) {
  return /^[A-Za-z\s]+$/.test(value);
}

function isEmailFormat(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function markInvalid(el, focus = false) {
  if (!el) return;
  el.style.border = "2px solid red";
  if (focus) el.focus();
}

function clearInvalid(el) {
  if (!el) return;
  el.style.border = "";
}

/* ---------- Populate user form ---------- */

function populateForm(data) {
  const { user, id } = data;
  document.querySelector("#userID").value = id ?? "";
  document.querySelector("#firstname").value = user?.firstname ?? "";
  document.querySelector("#lastname").value = user?.lastname ?? "";
  document.querySelector("#address").value = user?.address ?? "";
  document.querySelector("#city").value = user?.city ?? "";
  document.querySelector("#email").value = user?.email ?? "";
}

/* ---------- Name blur validation ---------- */

function attachNameValidation() {
  const firstnameField = document.querySelector("#firstname");
  const lastnameField = document.querySelector("#lastname");

  [firstnameField, lastnameField].forEach((field) => {
    if (!field) return;
    field.addEventListener("blur", () => {
      if (field.value && !isAlphabetOnly(field.value)) {
        alert("Please use alphabets only for the name field.");
        field.value = "";
        markInvalid(field, true);
      } else {
        clearInvalid(field);
      }
    });
  });
}

/* ---------- Render portfolio + editor ---------- */

function renderPortfolio(user, stocks) {
  const portfolio = Array.isArray(user?.portfolio) ? user.portfolio : [];
  const portfolioDetails = document.querySelector(".portfolio-list");
  if (!portfolioDetails) return;

  portfolioDetails.innerHTML = "";

  // ---- Add Stock UI (select + shares + button)
  const addContainer = document.createElement("div");
  addContainer.className = "add-stock-container";
  addContainer.style.display = "flex";
  addContainer.style.flexDirection = "column";
  addContainer.style.gap = "6px";
  addContainer.style.marginBottom = "12px";

  const stockSelect = document.createElement("select");
  stockSelect.setAttribute("aria-label", "Select stock to add");

  const defaultOpt = document.createElement("option");
  defaultOpt.value = "";
  defaultOpt.innerText = "-- Select stock --";
  stockSelect.appendChild(defaultOpt);

  // Populate select from stocks
  stocks.forEach((s) => {
    const opt = document.createElement("option");
    opt.value = s.symbol;
    opt.innerText = `${s.symbol} — ${s.name}`;
    stockSelect.appendChild(opt);
  });

  const sharesInputNew = document.createElement("input");
  sharesInputNew.type = "number";
  sharesInputNew.placeholder = "Shares";
  sharesInputNew.min = "0";
  sharesInputNew.style.width = "120px";

  const addBtn = document.createElement("button");
  addBtn.type = "button";
  addBtn.innerText = "Add Stock";

  addContainer.appendChild(stockSelect);
  addContainer.appendChild(sharesInputNew);
  addContainer.appendChild(addBtn);
  portfolioDetails.appendChild(addContainer);

  // Add stock handler
  addBtn.addEventListener("click", () => {
    const chosenSymbol = stockSelect.value;
    const sharesRaw = sharesInputNew.value.trim();
    const sharesVal = sharesRaw === "" ? 0 : parseInt(sharesRaw, 10);

    if (!chosenSymbol) {
      alert("Please select a stock symbol to add.");
      return;
    }
    if (sharesRaw !== "" && (isNaN(sharesVal) || sharesVal < 0)) {
      alert("Please enter a non-negative integer for shares.");
      sharesInputNew.focus();
      return;
    }

    // prevent duplicate symbols in UI
    const existingSymbols = Array.from(
      portfolioDetails.querySelectorAll(".portfolio-row .symbol-text")
    ).map((el) => el.innerText);

    if (existingSymbols.includes(chosenSymbol)) {
      alert("This stock is already in the portfolio.");
      return;
    }

    const row = createPortfolioRow(chosenSymbol, sharesVal, stocks);
    portfolioDetails.appendChild(row);

    stockSelect.value = "";
    sharesInputNew.value = "";
  });

  // Existing rows
  portfolio.forEach(({ symbol, owned }) => {
    const row = createPortfolioRow(symbol, owned, stocks);
    portfolioDetails.appendChild(row);
  });

  function createPortfolioRow(symbol, shares, stocksRef) {
    const row = document.createElement("div");
    row.className = "portfolio-row";
    row.style.display = "flex";
    row.style.flexDirection = "column";
    row.style.gap = "4px";
    row.style.padding = "6px 0";
    row.style.borderTop = "1px solid #eee";

    const symbolEl = document.createElement("span");
    symbolEl.className = "symbol-text";
    symbolEl.innerText = symbol;
    symbolEl.style.fontWeight = "600";

    const sharesLabel = document.createElement("label");
    sharesLabel.textContent = "Shares";
    sharesLabel.style.fontSize = "12px";

    const sharesEl = document.createElement("input");
    sharesEl.type = "number";
    sharesEl.min = "0";
    sharesEl.className = "shares-input";
    sharesEl.value = shares ?? 0;
    sharesEl.style.width = "120px";

    const btnRow = document.createElement("div");
    btnRow.style.display = "flex";
    btnRow.style.gap = "6px";

    const viewBtn = document.createElement("button");
    viewBtn.type = "button";
    viewBtn.innerText = "View";
    viewBtn.addEventListener("click", () => viewStock(symbol, stocksRef));

    const deleteBtn = document.createElement("button");
    deleteBtn.type = "button";
    deleteBtn.innerText = "Delete";
    deleteBtn.addEventListener("click", () => row.remove());

    btnRow.appendChild(viewBtn);
    btnRow.appendChild(deleteBtn);

    row.appendChild(symbolEl);
    row.appendChild(sharesLabel);
    row.appendChild(sharesEl);
    row.appendChild(btnRow);

    return row;
  }
}

/* ---------- View stock details ---------- */

function viewStock(symbol, stocks) {
  const stockArea = document.querySelector(".stock-form");
  if (!stockArea) return;

  const stock = stocks.find((s) => s.symbol === symbol);
  if (!stock) return;

  document.querySelector("#stockName").textContent = stock.name || "";
  document.querySelector("#stockSector").textContent = stock.sector || "";
  document.querySelector("#stockIndustry").textContent = stock.subIndustry || "";
  document.querySelector("#stockAddress").textContent = stock.address || "";

  const logo = document.querySelector("#logo");
  if (logo) logo.src = `logos/${symbol}.svg`;
}

/* ---------- User list + click handling ---------- */

function handleUserListClick(event, users, stocks) {
  const userId = event.target.id;
  if (!userId) return;

  const user = users.find((u) => String(u.id) === String(userId));
  if (!user) return;

  populateForm(user);
  renderPortfolio(user, stocks);
}

function generateUserList(users, stocks) {
  const userList = document.querySelector(".user-list");
  if (!userList) return;

  // clear old
  userList.innerHTML = "";

  users.forEach(({ user, id }) => {
    const li = document.createElement("li");
    li.innerText = `${user.lastname}, ${user.firstname}`;
    li.setAttribute("id", id);
    userList.appendChild(li);
  });

  // Delegate click
  userList.onclick = (e) => handleUserListClick(e, users, stocks);
}

/* ---------- Helper: clear the form ---------- */

function clearUserForm() {
  const fields = ["#userID", "#firstname", "#lastname", "#address", "#city", "#email"];
  fields.forEach((sel) => {
    const el = document.querySelector(sel);
    if (el) {
      el.value = "";
      clearInvalid(el);
    }
  });
}

/* ---------- MAIN ---------- */

document.addEventListener("DOMContentLoaded", () => {
  // Parse global JSON strings exposed by the two script tags
  // (data/stocks-complete.js sets window.stockContent; data/users.js sets window.userContent)
  const stocksData = JSON.parse(typeof stockContent !== "undefined" ? stockContent : "[]");
const userData   = JSON.parse(typeof userContent  !== "undefined" ? userContent  : "[]");

  // Expose for reuse in handlers
  window.__stocks = stocksData;
  window.__users = userData;

  // Basic form safety
  const form = document.querySelector("form");
  if (form) form.addEventListener("submit", (e) => e.preventDefault());

  // Try to find Save/Delete buttons in multiple common ways (class/id/name)
  function findButton(selectorCandidates, textFallbackRegex) {
    for (const s of selectorCandidates) {
      const el = document.querySelector(s);
      if (el) return el;
    }
    if (textFallbackRegex) {
      const btns = Array.from(document.querySelectorAll("button"));
      return btns.find((b) => textFallbackRegex.test(b.textContent.trim()));
    }
    return null;
  }

  const saveButton = findButton(
    ["#save", "button[name='save']", "button.save", "input#save[type='button']"],
    /^save$/i
  );
  const deleteButton = findButton(
    ["#delete", "button[name='delete']", "button.delete", "input#delete[type='button']"],
    /^delete$/i
  );

  // Build User List & wire name validation
  generateUserList(userData, stocksData);
  attachNameValidation();

  // Create a visible "+ Add New User" button above the list (since HTML doesn't include one)
  const userListEl = document.querySelector(".user-list");
  if (userListEl && userListEl.parentElement) {
    const userListContainer = userListEl.parentElement;
    const newUserBtn = document.createElement("button");
    newUserBtn.id = "addUser";
    newUserBtn.innerText = "+ Add New User";
    newUserBtn.style.marginBottom = "8px";
    newUserBtn.style.display = "block";
    newUserBtn.style.width = "100%";
    newUserBtn.style.background = "#007bff";
    newUserBtn.style.color = "white";
    newUserBtn.style.padding = "6px";
    newUserBtn.style.border = "none";
    newUserBtn.style.cursor = "pointer";
    userListContainer.prepend(newUserBtn);

    // Add User handler: clear form & render empty portfolio
    newUserBtn.onclick = (e) => {
      e.preventDefault();
      clearUserForm();
      renderPortfolio({ portfolio: [] }, stocksData);
      const first = document.querySelector("#firstname");
      if (first) first.focus();
    };
  }

  /* ------ Delete User ------ */
  if (deleteButton) {
    deleteButton.addEventListener("click", (event) => {
      event.preventDefault();

      const userId = document.querySelector("#userID")?.value;
      if (!userId) {
        alert("No user selected to delete.");
        return;
      }

      const idx = userData.findIndex((u) => String(u.id) === String(userId));
      if (idx === -1) {
        alert("Selected user not found.");
        return;
      }

      userData.splice(idx, 1);
      generateUserList(userData, stocksData);

      clearUserForm();
      const portfolioList = document.querySelector(".portfolio-list");
      if (portfolioList) portfolioList.innerHTML = "";
    });
  }

  /* ------ Save (Create/Update) ------ */
  if (saveButton) {
    saveButton.addEventListener("click", (event) => {
      event.preventDefault();

      const getEl = (sel) => document.querySelector(sel);
      const getVal = (sel) => getEl(sel)?.value || "";

      // clear prior invalid styles
      ["#firstname", "#lastname", "#address", "#city", "#email"].forEach((sel) => {
        clearInvalid(getEl(sel));
      });

      const idField = getEl("#userID");
      const idVal = idField?.value || "";
      const firstname = getVal("#firstname").trim();
      const lastname = getVal("#lastname").trim();
      const address = getVal("#address").trim();
      const city = getVal("#city").trim();
      const email = getVal("#email").trim();

      // Required checks
      if (!firstname) {
        alert("First Name cannot be empty");
        markInvalid(getEl("#firstname"), true);
        return;
      }
      if (!lastname) {
        alert("Last Name cannot be empty");
        markInvalid(getEl("#lastname"), true);
        return;
      }
      if (!email) {
        alert("Email cannot be empty");
        markInvalid(getEl("#email"), true);
        return;
      }

      // Length checks (simple)
      if (firstname.length > 20) {
        alert("First Name must be 20 characters or fewer.");
        markInvalid(getEl("#firstname"), true);
        return;
      }
      if (lastname.length > 20) {
        alert("Last Name must be 20 characters or fewer.");
        markInvalid(getEl("#lastname"), true);
        return;
      }
      if (address.length > 50) {
        alert("Address must be 50 characters or fewer.");
        markInvalid(getEl("#address"), true);
        return;
      }
      if (city.length > 25) {
        alert("City must be 25 characters or fewer.");
        markInvalid(getEl("#city"), true);
        return;
      }
      if (email.length > 40) {
        alert("Email must be 40 characters or fewer.");
        markInvalid(getEl("#email"), true);
        return;
      }

      // Format checks
      if (!isAlphabetOnly(firstname)) {
        alert("First Name must contain alphabets only.");
        markInvalid(getEl("#firstname"), true);
        return;
      }
      if (!isAlphabetOnly(lastname)) {
        alert("Last Name must contain alphabets only.");
        markInvalid(getEl("#lastname"), true);
        return;
      }
      if (!isEmailFormat(email)) {
        alert("Please enter a valid email address (e.g., user@example.com).");
        markInvalid(getEl("#email"), true);
        return;
      }

      // Build portfolio from UI
      const portfolioDetails = document.querySelector(".portfolio-list");
      const portfolioRows = portfolioDetails
        ? Array.from(portfolioDetails.querySelectorAll(".portfolio-row"))
        : [];
      const builtPortfolio = [];

      for (const row of portfolioRows) {
        const symbolEl = row.querySelector(".symbol-text");
        const sharesInput = row.querySelector(".shares-input");
        if (!symbolEl || !sharesInput) continue;

        const symbol = symbolEl.innerText;
        const sharesRaw = sharesInput.value.trim();
        const sharesNum = sharesRaw === "" ? 0 : parseInt(sharesRaw, 10);

        if (sharesRaw !== "" && (isNaN(sharesNum) || sharesNum < 0)) {
          alert(`Invalid shares for ${symbol}. Please enter a non-negative integer.`);
          markInvalid(sharesInput, true);
          return;
        }

        builtPortfolio.push({ symbol, owned: sharesNum });
      }

      // Create new or update existing
      if (!idVal) {
        // new user
        const existingIds = userData
          .map((u) => parseInt(u.id, 10))
          .filter((v) => !isNaN(v));
        const maxId = existingIds.length ? Math.max(...existingIds) : 0;
        const newId = String(maxId + 1);

        const newUser = {
          id: newId,
          user: { firstname, lastname, address, city, email },
          portfolio: builtPortfolio,
        };

        userData.push(newUser);
        generateUserList(userData, stocksData);
        populateForm(newUser);
        renderPortfolio(newUser, stocksData);
      } else {
        // update
        const idx = userData.findIndex((u) => String(u.id) === String(idVal));
        if (idx === -1) {
          alert("Selected user not found.");
          return;
        }

        userData[idx].user.firstname = firstname;
        userData[idx].user.lastname = lastname;
        userData[idx].user.address = address;
        userData[idx].user.city = city;
        userData[idx].user.email = email;
        userData[idx].portfolio = builtPortfolio;

        generateUserList(userData, stocksData);
        populateForm(userData[idx]);
        renderPortfolio(userData[idx], stocksData);
      }
    });
  }
});
