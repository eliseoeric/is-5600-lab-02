/* add your code here */

let selectedUser = null;

// get DOM elements (already in your HTML)
const userList = document.querySelector("#user-list");
const stockList = document.querySelector("#stock-list");
const stockDetails = document.querySelector("#stock-details");

const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const ageInput = document.querySelector("#age");

const saveBtn = document.querySelector("#save-btn");
const deleteBtn = document.querySelector("#delete-btn");

// IMPORTANT: your repo already has data folder
// so we use this (preloaded data)
import users from "./data/users.js";

// ======================
// Show users
// ======================
function renderUsers() {
  userList.innerHTML = "";

  users.forEach((user) => {
    const li = document.createElement("li");
    li.textContent = user.name;

    li.addEventListener("click", () => {
      selectedUser = user;

      // fill form
      nameInput.value = user.name;
      emailInput.value = user.email;
      ageInput.value = user.age;

      renderPortfolio(user);
      stockDetails.innerHTML = "<p>Select a stock</p>";
    });

    userList.appendChild(li);
  });
}

// ======================
// Show portfolio
// ======================
function renderPortfolio(user) {
  stockList.innerHTML = "";

  user.portfolio.forEach((stock) => {
    const li = document.createElement("li");
    li.textContent = `${stock.symbol} - ${stock.shares}`;

    li.addEventListener("click", () => {
      stockDetails.innerHTML = `
        <h3>${stock.symbol}</h3>
        <p>Company: ${stock.company}</p>
        <p>Shares: ${stock.shares}</p>
        <p>Price: $${stock.price}</p>
        <p>Total: $${stock.shares * stock.price}</p>
      `;
    });

    stockList.appendChild(li);
  });
}

// ======================
// Save user
// ======================
saveBtn.addEventListener("click", () => {
  if (!selectedUser) return;

  selectedUser.name = nameInput.value;
  selectedUser.email = emailInput.value;
  selectedUser.age = Number(ageInput.value);

  renderUsers();
  renderPortfolio(selectedUser);
});

// ======================
// Delete user
// ======================
deleteBtn.addEventListener("click", () => {
  if (!selectedUser) return;

  const index = users.indexOf(selectedUser);
  if (index > -1) {
    users.splice(index, 1);
  }

  selectedUser = null;

  userList.innerHTML = "";
  stockList.innerHTML = "";
  stockDetails.innerHTML = "";

  nameInput.value = "";
  emailInput.value = "";
  ageInput.value = "";

  renderUsers();
});

// ======================
// Start app
// ======================
renderUsers();