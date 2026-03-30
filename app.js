document.addEventListener("DOMContentLoaded", () => {
  // Parse JSON data from users.js and stocks-complete.js
  const stocksData = JSON.parse(stockContent);
  const userData = JSON.parse(userContent);

  // Buttons
  const saveButton = document.querySelector("#save");
  const deleteButton = document.querySelector("#delete");

  // Generate user list on load
  generateUserList(userData, stocksData);

  // SAVE Button functionality
  saveButton.addEventListener("click", (e) => {
    e.preventDefault();

    const id = document.querySelector("#userID").value;

    for (let i = 0; i < userData.length; i++) {
      if (userData[i].id == id) {
        userData[i].user.firstname = document.querySelector("#firstname").value;
        userData[i].user.lastname = document.querySelector("#lastname").value;
        userData[i].user.address = document.querySelector("#address").value;
        userData[i].user.city = document.querySelector("#city").value;
        userData[i].user.email = document.querySelector("#email").value;

        generateUserList(userData, stocksData);
      }
    }
  });

  // DELETE Button functionality
  deleteButton.addEventListener("click", (e) => {
    e.preventDefault();

    const userId = document.querySelector("#userID").value;
    const userIndex = userData.findIndex((u) => u.id == userId);

    if (userIndex !== -1) {
      userData.splice(userIndex, 1);
      generateUserList(userData, stocksData);

      // clear form + portfolio
      clearForm();
      document.querySelector(".portfolio-list").innerHTML = "";
    }
  });
});

/**
 * Generates the user list
 */
function generateUserList(users, stocks) {
  const userList = document.querySelector(".user-list");

  // clear previous list
  userList.innerHTML = "";

  users.map(({ user, id }) => {
    const listItem = document.createElement("li");
    listItem.innerText = user.lastname + ", " + user.firstname;
    listItem.setAttribute("id", id);
    userList.appendChild(listItem);
  });

  // event delegation click handler
  userList.addEventListener("click", (event) =>
    handleUserListClick(event, users, stocks)
  );
}

/**
 * Handles clicking on a user from the list
 */
function handleUserListClick(event, users, stocks) {
  const userId = event.target.id;

  if (!userId) return;

  const selectedUser = users.find((u) => u.id == userId);

  if (selectedUser) {
    populateForm(selectedUser);
    renderPortfolio(selectedUser, stocks);
  }
}

/**
 * Populates the form with user info
 */
function populateForm(data) {
  const { user, id } = data;

  document.querySelector("#userID").value = id;
  document.querySelector("#firstname").value = user.firstname;
  document.querySelector("#lastname").value = user.lastname;
  document.querySelector("#address").value = user.address;
  document.querySelector("#city").value = user.city;
  document.querySelector("#email").value = user.email;
}

/**
 * Renders portfolio items for a selected user
 */
function renderPortfolio(user, stocks) {
  const { portfolio } = user;

  const portfolioDetails = document.querySelector(".portfolio-list");

  // clear previous portfolio
  portfolioDetails.innerHTML = "";

  portfolio.map(({ symbol, owned }) => {
    const symbolEl = document.createElement("p");
    const sharesEl = document.createElement("p");
    const actionEl = document.createElement("button");

    symbolEl.innerText = symbol;
    sharesEl.innerText = owned;

    actionEl.innerText = "View";
    actionEl.setAttribute("id", symbol);

    portfolioDetails.appendChild(symbolEl);
    portfolioDetails.appendChild(sharesEl);
    portfolioDetails.appendChild(actionEl);
  });

  // Event delegation for view buttons
  portfolioDetails.addEventListener("click", (event) => {
    if (event.target.tagName === "BUTTON") {
      viewStock(event.target.id, stocks);
    }
  });
}

/**
 * Displays stock information when View button is clicked
 */
function viewStock(symbol, stocks) {
  const stockArea = document.querySelector(".stock-form");

  if (stockArea) {
    const stock = stocks.find((s) => s.symbol == symbol);

    if (stock) {
      document.querySelector("#stockName").textContent = stock.name;
      document.querySelector("#stockSector").textContent = stock.sector;
      document.querySelector("#stockIndustry").textContent = stock.subIndustry;
      document.querySelector("#stockAddress").textContent = stock.address;

      document.querySelector("#logo").src = `logos/${symbol}.svg`;
    }
  }
}

/**
 * Clears form fields
 */
function clearForm() {
  document.querySelector("#userID").value = "";
  document.querySelector("#firstname").value = "";
  document.querySelector("#lastname").value = "";
  document.querySelector("#address").value = "";
  document.querySelector("#city").value = "";
  document.querySelector("#email").value = "";
}

