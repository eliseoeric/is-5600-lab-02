/* add your code here */
document.addEventListener("DOMContentLoaded", () => {
  // 1. parse the JSON strings from /data/*.js
  const usersData = JSON.parse(userContent);
  const stocksData = JSON.parse(stockContent);

  // render users on the left
  renderUserList(usersData, stocksData);

  // hook up SAVE
  const saveBtn = document.querySelector("#btnSave");
  saveBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const id = document.querySelector("#userID").value;
    if (!id) return;

    for (let i = 0; i < usersData.length; i++) {
      if (usersData[i].id == id) {
        usersData[i].user.firstname =
          document.querySelector("#firstname").value;
        usersData[i].user.lastname =
          document.querySelector("#lastname").value;
        usersData[i].user.address =
          document.querySelector("#address").value;
        usersData[i].user.city = document.querySelector("#city").value;
        usersData[i].user.email = document.querySelector("#email").value;
        break;
      }
    }

    renderUserList(usersData, stocksData);
  });

  // hook up DELETE
  const deleteBtn = document.querySelector("#btnDelete");
  deleteBtn.addEventListener("click", (e) => {
    e.preventDefault();
    const id = document.querySelector("#userID").value;
    if (!id) return;

    const index = usersData.findIndex((u) => u.id == id);
    if (index === -1) return;

    usersData.splice(index, 1);
    renderUserList(usersData, stocksData);

    clearForm();
    clearPortfolio();
    clearStockDetails();
  });
});

// ================= helper functions =================

function renderUserList(usersData, stocksData) {
  const userList = document.querySelector(".user-list");
  userList.innerHTML = ""; // prevent stacking

  usersData.forEach(({ user, id }) => {
    const li = document.createElement("li");
    li.textContent = `${user.lastname}, ${user.firstname}`;
    li.id = id;
    li.style.cursor = "pointer";
    userList.appendChild(li);
  });

  // one click handler for whole list
  userList.onclick = (e) => handleUserClick(e, usersData, stocksData);
}

function handleUserClick(event, usersData, stocksData) {
  const clickedId = event.target.id;
  if (!clickedId) return;

  const selectedUser = usersData.find((u) => u.id == clickedId);
  if (!selectedUser) return;

  populateForm(selectedUser);
  renderPortfolio(selectedUser, stocksData);
}

function populateForm(userObj) {
  const { user, id } = userObj;
  document.querySelector("#userID").value = id;
  document.querySelector("#firstname").value = user.firstname;
  document.querySelector("#lastname").value = user.lastname;
  document.querySelector("#address").value = user.address;
  document.querySelector("#city").value = user.city;
  document.querySelector("#email").value = user.email;
}

function renderPortfolio(userObj, stocksData) {
  const portfolioBox = document.querySelector(".portfolio-list");

  // reset header
  portfolioBox.innerHTML = `
    <h3>Symbol</h3>
    <h3># Shares</h3>
    <h3>Actions</h3>
  `;

  const portfolio = userObj.portfolio;
  if (!portfolio || portfolio.length === 0) {
    const p = document.createElement("p");
    p.textContent = "No stocks for this user.";
    portfolioBox.appendChild(p);
    return;
  }

  portfolio.forEach(({ symbol, owned }) => {
    const symbolEl = document.createElement("p");
    const sharesEl = document.createElement("p");
    const btnEl = document.createElement("button");

    symbolEl.textContent = symbol;
    sharesEl.textContent = owned;
    btnEl.textContent = "View";
    btnEl.id = symbol;

    portfolioBox.appendChild(symbolEl);
    portfolioBox.appendChild(sharesEl);
    portfolioBox.appendChild(btnEl);
  });

  // IMPORTANT: attach exactly once, right after we render
  portfolioBox.onclick = (e) => {
    if (e.target.tagName === "BUTTON") {
      const symbol = e.target.id;
      console.log("Stock clicked:", symbol); // <-- you should see this in console
      viewStock(symbol, stocksData);
    }
  };
}

function viewStock(symbol, stocksData) {
  // try to find matching stock
  const stock = stocksData.find((s) => s.symbol == symbol);

  const nameEl = document.querySelector("#stockName");
  const sectorEl = document.querySelector("#stockSector");
  const industryEl = document.querySelector("#stockIndustry");
  const addressEl = document.querySelector("#stockAddress");
  const logoEl = document.querySelector("#logo");

  if (!stock) {
    nameEl.textContent = `No data for ${symbol}`;
    sectorEl.textContent = "";
    industryEl.textContent = "";
    addressEl.textContent = "";
    logoEl.src = "";
    return;
  }

  nameEl.textContent = stock.name || symbol;
  sectorEl.textContent = stock.sector || "N/A";
  industryEl.textContent = stock.subIndustry || stock.industry || "N/A";
  addressEl.textContent = stock.address || "";

  // if your logos folder doesn’t have this symbol, it’ll just show broken image – that’s ok
  logoEl.src = `logos/${symbol}.svg`;
}

function clearForm() {
  document.querySelector("#userID").value = "";
  document.querySelector("#firstname").value = "";
  document.querySelector("#lastname").value = "";
  document.querySelector("#address").value = "";
  document.querySelector("#city").value = "";
  document.querySelector("#email").value = "";
}

function clearPortfolio() {
  document.querySelector(".portfolio-list").innerHTML = `
    <h3>Symbol</h3>
    <h3># Shares</h3>
    <h3>Actions</h3>
  `;
}

function clearStockDetails() {
  document.querySelector("#stockName").textContent = "";
  document.querySelector("#stockSector").textContent = "";
  document.querySelector("#stockIndustry").textContent = "";
  document.querySelector("#stockAddress").textContent = "";
  document.querySelector("#logo").src = "";
}

