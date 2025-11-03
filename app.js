/* add your code here */

document.addEventListener("DOMContentLoaded", () => {
  const stocksData = JSON.parse(stockContent);
  const userData = JSON.parse(userContent);

  console.log({ userData });
  console.log({ stocksData });

  generateUserList(userData, stocksData);

  const deleteButton = document.querySelector("#btnDelete");
  const saveButton = document.querySelector("#btnSave");

  deleteButton.addEventListener("click", (event) => {
    event.preventDefault();

    const userId = document.querySelector("#userID").value;
    const userIndex = userData.findIndex((user) => user.id == userId);

    if (userIndex !== -1) {
      userData.splice(userIndex, 1);
      generateUserList(userData, stocksData);
      clearForm();
    }
  });

  
  saveButton.addEventListener("click", (event) => {
    event.preventDefault();

    const id = document.querySelector("#userID").value;
    const existingUser = userData.find((u) => u.id == id);

    if (existingUser) {
      existingUser.user.firstname = document.querySelector("#firstname").value;
      existingUser.user.lastname = document.querySelector("#lastname").value;
      existingUser.user.address = document.querySelector("#address").value;
      existingUser.user.city = document.querySelector("#city").value;
      existingUser.user.email = document.querySelector("#email").value;

      generateUserList(userData, stocksData);
    }
  });
});


function generateUserList(users, stocks) {
  const userList = document.querySelector(".user-list");
  userList.innerHTML = "";

  users.forEach(({ user, id }) => {
    const listItem = document.createElement("li");
    listItem.textContent = `${user.lastname}, ${user.firstname}`;
    listItem.setAttribute("data-id", id);
    userList.appendChild(listItem);
  });

  userList.onclick = (event) => handleUserListClick(event, users, stocks);
}


function handleUserListClick(event, users, stocks) {
  const userId = event.target.getAttribute("data-id");
  if (!userId) return;

  const user = users.find((u) => u.id == userId);
  if (!user) return;

  populateForm(user);
  renderPortfolio(user, stocks);
}


function populateForm(data) {
  const { user, id } = data;
  document.querySelector("#userID").value = id;
  document.querySelector("#firstname").value = user.firstname;
  document.querySelector("#lastname").value = user.lastname;
  document.querySelector("#address").value = user.address;
  document.querySelector("#city").value = user.city;
  document.querySelector("#email").value = user.email;
}


function clearForm() {
  document.querySelector("#userID").value = "";
  document.querySelector("#firstname").value = "";
  document.querySelector("#lastname").value = "";
  document.querySelector("#address").value = "";
  document.querySelector("#city").value = "";
  document.querySelector("#email").value = "";
}


function renderPortfolio(user, stocks) {
  const { portfolio } = user;
  const portfolioDetails = document.querySelector(".portfolio-list");
  portfolioDetails.innerHTML = "";

  portfolio.forEach(({ symbol, owned }) => {
    const container = document.createElement("div");
    container.classList.add("portfolio-item");

    const symbolEl = document.createElement("p");
    symbolEl.textContent = `Symbol: ${symbol}`;

    const sharesEl = document.createElement("p");
    sharesEl.textContent = `Owned: ${owned}`;

    const actionEl = document.createElement("button");
    actionEl.textContent = "View";
    actionEl.dataset.symbol = symbol;

    container.appendChild(symbolEl);
    container.appendChild(sharesEl);
    container.appendChild(actionEl);
    portfolioDetails.appendChild(container);
  });

  portfolioDetails.onclick = (event) => {
    if (event.target.tagName === "BUTTON") {
      viewStock(event.target.dataset.symbol, stocks);
    }
  };
}


function viewStock(symbol, stocks) {
  const stockArea = document.querySelector(".stock-form");
  if (!stockArea) return;

  const stock = stocks.find((s) => s.symbol === symbol);
  if (!stock) return;

  document.querySelector("#stockName").textContent = stock.name;
  document.querySelector("#stockSector").textContent = stock.sector;
  document.querySelector("#stockIndustry").textContent = stock.subIndustry;
  document.querySelector("#stockAddress").textContent = stock.address;
  document.querySelector("#logo").src = `logos/${symbol}.svg`;
}
