"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const stocksData = JSON.parse(stockContent);
  const userData = JSON.parse(userContent);
  const userList = document.querySelector(".user-list");
  const portfolioList = document.querySelector(".portfolio-list");
  const userForm = document.querySelector(".userEntry");
  const saveButton = document.querySelector("#btnSave");
  const deleteButton = document.querySelector("#btnDelete");
  let selectedUserId = null;

  // Register delegated listeners once, even when lists are re-rendered.
  userList.addEventListener("click", (event) => {
    selectUser(event.target.closest("li"));
  });
  userList.addEventListener("keydown", (event) => {
    if (event.key === "Enter" || event.key === " ") {
      const item = event.target.closest("li");
      if (item) {
        event.preventDefault();
        selectUser(item);
      }
    }
  });

  function selectUser(item) {
    if (!item || !userList.contains(item)) return;
    const selectedUser = userData.find((entry) => String(entry.id) === item.id);
    if (!selectedUser) return;

    selectedUserId = selectedUser.id;
    populateForm(selectedUser);
    renderPortfolio(selectedUser);
    clearStockDetails();
    generateUserList(userData, selectedUserId);
    saveButton.disabled = false;
    deleteButton.disabled = false;
  }

  portfolioList.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-symbol]");
    if (button && portfolioList.contains(button)) {
      viewStock(button.dataset.symbol, stocksData);
    }
  });

  // Form submission handles both Save clicks and the Enter key.
  userForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const selectedUser = userData.find((entry) => entry.id === selectedUserId);
    if (!selectedUser) return;

    for (const field of ["firstname", "lastname", "address", "city", "email"]) {
      selectedUser.user[field] = document.querySelector(`#${field}`).value.trim();
    }
    populateForm(selectedUser);
    generateUserList(userData, selectedUserId);
  });

  // Delete is not a submit action and should not trigger form validation.
  deleteButton.type = "button";
  deleteButton.addEventListener("click", () => {
    const userIndex = userData.findIndex((entry) => entry.id === selectedUserId);
    if (userIndex === -1) return;

    userData.splice(userIndex, 1);
    selectedUserId = null;
    generateUserList(userData);
    userForm.reset();
    document.querySelector("#userID").value = "";
    renderPortfolio(null);
    clearStockDetails();
    saveButton.disabled = true;
    deleteButton.disabled = true;
  });

  // Initial state: display users and wait for a selection.
  generateUserList(userData);
  renderPortfolio(null);
  clearStockDetails();
  saveButton.disabled = true;
  deleteButton.disabled = true;
});

/** Render users without duplicating previous list items. */
function generateUserList(users, selectedId = null) {
  const userList = document.querySelector(".user-list");
  const fragment = document.createDocumentFragment();

  users.forEach(({ user, id }) => {
    const item = document.createElement("li");
    item.id = String(id);
    item.textContent = `${user.lastname}, ${user.firstname}`;
    item.tabIndex = 0;
    item.setAttribute("role", "button");
    if (id === selectedId) item.setAttribute("aria-current", "true");
    fragment.append(item);
  });
  userList.replaceChildren(fragment);
}

/** Copy the selected user's data into the provided form. */
function populateForm(data) {
  document.querySelector("#userID").value = data.id;
  for (const field of ["firstname", "lastname", "address", "city", "email"]) {
    document.querySelector(`#${field}`).value = data.user[field] ?? "";
  }
}

/** Keep the column headings while replacing the portfolio rows. */
function renderPortfolio(data) {
  const portfolioList = document.querySelector(".portfolio-list");
  const fragment = document.createDocumentFragment();
  for (const heading of ["Symbol", "# Shares", "Actions"]) {
    const title = document.createElement("h3");
    title.textContent = heading;
    fragment.append(title);
  }

  if (data) {
    data.portfolio.forEach(({ symbol, owned }) => {
      const symbolElement = document.createElement("p");
      symbolElement.textContent = symbol;
      const sharesElement = document.createElement("p");
      sharesElement.textContent = owned;
      const viewButton = document.createElement("button");
      viewButton.type = "button";
      viewButton.textContent = "View";
      viewButton.dataset.symbol = symbol;
      viewButton.setAttribute("aria-label", `View ${symbol} stock details`);
      fragment.append(symbolElement, sharesElement, viewButton);
    });
  }
  portfolioList.replaceChildren(fragment);
}

/** Remove stale details when switching users or deleting the selection. */
function clearStockDetails() {
  document.querySelector(".stock-form").style.display = "none";
  for (const field of ["stockName", "stockSector", "stockIndustry", "stockAddress"]) {
    document.querySelector(`#${field}`).textContent = "";
  }
  const logo = document.querySelector("#logo");
  logo.removeAttribute("src");
  logo.alt = "";
  logo.style.display = "none";
}

/** Display company information for the clicked holding. */
function viewStock(symbol, stocks) {
  clearStockDetails();
  const stock = stocks.find((entry) => entry.symbol === symbol);
  document.querySelector(".stock-form").style.display = "";
  if (!stock) {
    document.querySelector("#stockName").textContent = `${symbol}: information unavailable`;
    return;
  }

  document.querySelector("#stockName").textContent = stock.name;
  document.querySelector("#stockSector").textContent = stock.sector;
  document.querySelector("#stockIndustry").textContent = stock.subIndustry;
  document.querySelector("#stockAddress").textContent = stock.address;
  const logo = document.querySelector("#logo");
  logo.alt = `${stock.name} logo`;
  logo.onerror = () => { logo.style.display = "none"; };
  logo.style.display = "";
  logo.src = `logos/${symbol}.svg`;
}
