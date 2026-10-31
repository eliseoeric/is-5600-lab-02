document.addEventListener("DOMContentLoaded", () => {
  const users = JSON.parse(userContent);
  const stocks = JSON.parse(stockContent);

  const userList = document.querySelector(".user-list");
  const portfolioList = document.querySelector(".portfolio-list");
  const form = document.querySelector(".userEntry");
  const saveButton = document.querySelector("#btnSave");
  const deleteButton = document.querySelector("#btnDelete");
  const stockArea = document.querySelector(".stock-form");
  const logo = document.querySelector("#logo");

  const fields = [
    "firstname",
    "lastname",
    "address",
    "city",
    "email"
  ];

  let selectedUserId = null;

  // Build the list from the current user data.
  function renderUsers() {
    userList.replaceChildren();

    users.forEach(({ id, user }) => {
      const item = document.createElement("li");
      item.id = String(id);
      item.textContent = `${user.lastname}, ${user.firstname}`;
      userList.appendChild(item);
    });
  }

  // Keep column headings whenever the portfolio is refreshed.
  function clearPortfolio() {
    portfolioList.replaceChildren();

    ["Symbol", "# Shares", "Actions"].forEach((label) => {
      const heading = document.createElement("h3");
      heading.textContent = label;
      portfolioList.appendChild(heading);
    });
  }

  function clearStockDetails() {
    stockArea.hidden = true;
    logo.removeAttribute("src");
    logo.alt = "";

    [
      "stockName",
      "stockSector",
      "stockIndustry",
      "stockAddress"
    ].forEach((id) => {
      document.getElementById(id).textContent = "";
    });
  }

  function renderPortfolio(portfolio) {
    clearPortfolio();

    portfolio.forEach(({ symbol, owned }) => {
      const symbolText = document.createElement("p");
      const sharesText = document.createElement("p");
      const viewButton = document.createElement("button");

      symbolText.textContent = symbol;
      sharesText.textContent = owned;
      viewButton.textContent = "View";
      viewButton.type = "button";
      viewButton.dataset.symbol = symbol;
      viewButton.setAttribute("aria-label", `View ${symbol}`);

      portfolioList.append(
        symbolText,
        sharesText,
        viewButton
      );
    });
  }

  function selectUser(person) {
    selectedUserId = person.id;
    document.querySelector("#userID").value = person.id;

    fields.forEach((field) => {
      document.getElementById(field).value =
        person.user[field] ?? "";
    });

    saveButton.disabled = false;
    deleteButton.disabled = false;

    clearStockDetails();
    renderPortfolio(person.portfolio);
  }

  // One delegated listener handles every user list item.
  userList.addEventListener("click", (event) => {
    const item = event.target.closest("li");

    if (!item || !userList.contains(item)) return;

    const person = users.find(
      (user) => String(user.id) === item.id
    );

    if (person) selectUser(person);
  });

  // One delegated listener handles every View button.
  portfolioList.addEventListener("click", (event) => {
    const button = event.target.closest("button[data-symbol]");

    if (!button || !portfolioList.contains(button)) return;

    const stock = stocks.find(
      (item) => item.symbol === button.dataset.symbol
    );

    clearStockDetails();
    if (!stock) return;

    document.querySelector("#stockName").textContent = stock.name;
    document.querySelector("#stockSector").textContent = stock.sector;
    document.querySelector("#stockIndustry").textContent =
      stock.subIndustry;
    document.querySelector("#stockAddress").textContent =
      stock.address;

    logo.hidden = false;
    logo.alt = `${stock.name} logo`;
    logo.src = `logos/${stock.symbol}.svg`;
    stockArea.hidden = false;
  });

  // Hide a missing logo without hiding the company information.
  logo.addEventListener("error", () => {
    logo.hidden = true;
  });

  // Saving updates the selected user's data and list entry.
  form.addEventListener("submit", (event) => {
    event.preventDefault();

    const person = users.find(
      (user) => user.id === selectedUserId
    );

    if (!person) return;

    fields.forEach((field) => {
      person.user[field] =
        document.getElementById(field).value.trim();
    });

    renderUsers();
  });

  // Delete must not also submit the form.
  deleteButton.type = "button";

  deleteButton.addEventListener("click", () => {
    const index = users.findIndex(
      (user) => user.id === selectedUserId
    );

    if (index === -1) return;

    users.splice(index, 1);
    selectedUserId = null;

    form.reset();
    document.querySelector("#userID").value = "";
    saveButton.disabled = true;
    deleteButton.disabled = true;

    renderUsers();
    clearPortfolio();
    clearStockDetails();
  });

  saveButton.disabled = true;
  deleteButton.disabled = true;

  renderUsers();
  clearPortfolio();
  clearStockDetails();
});

