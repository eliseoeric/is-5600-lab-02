/* add your code here */
// Parse data provided by data/users.js and data/stocks-complete.js
const users = JSON.parse(userContent);
const stocks = JSON.parse(stockContent);

// DOM refs
const userList = document.querySelector(".user-list");
const idEl = document.querySelector("#userID");
const fnEl = document.querySelector("#firstname");
const lnEl = document.querySelector("#lastname");
const addrEl = document.querySelector("#address");
const cityEl = document.querySelector("#city");
const emailEl = document.querySelector("#email");

const btnSave = document.querySelector("#btnSave");
const btnDelete = document.querySelector("#btnDelete");
const portfolioList = document.querySelector(".portfolio-list");

// Initial list build
renderUsers();

// ======================
// Display user list
// ======================
function renderUsers() {
  userList.innerHTML = "";
  users.forEach((u, i) => {
    const li = document.createElement("li");
    li.textContent = `${u.user.lastname}, ${u.user.firstname}`;
    li.dataset.idx = i;
    userList.appendChild(li);
  });
}

// ======================
// Click on user → populate form + portfolio
// ======================
userList.addEventListener("click", (e) => {
  const li = e.target.closest("li");
  if (!li) return;
  const i = Number(li.dataset.idx);
  fillForm(i);
  renderPortfolio(users[i]);
});

// ======================
// Fill form fields
// ======================
function fillForm(i) {
  const u = users[i];
  idEl.value = u.id;
  fnEl.value = u.user.firstname;
  lnEl.value = u.user.lastname;
  addrEl.value = u.user.address;
  cityEl.value = u.user.city;
  emailEl.value = u.user.email;
}

// ======================
// Portfolio table
// ======================
function renderPortfolio(u) {
  portfolioList.innerHTML = `
    <h3>Symbol</h3><h3># Shares</h3><h3>Actions</h3>
  `;
  (u.portfolio || []).forEach(({ symbol, owned }) => {
    const sym = document.createElement("p"); sym.textContent = symbol;
    const num = document.createElement("p"); num.textContent = owned;
    const btn = document.createElement("button");
    btn.textContent = "View";
    btn.dataset.symbol = symbol;
    portfolioList.append(sym, num, btn);
  });
}

// ======================
// Save button behavior
// ======================
btnSave.addEventListener("click", (e) => {
  e.preventDefault();
  const id = Number(idEl.value);
  const i = users.findIndex(u => u.id === id);
  if (i < 0) return;

  users[i].user.firstname = fnEl.value;
  users[i].user.lastname  = lnEl.value;
  users[i].user.address   = addrEl.value;
  users[i].user.city      = cityEl.value;
  users[i].user.email     = emailEl.value;

  renderUsers();
});

// ======================
// Delete user
// ======================
btnDelete.addEventListener("click", (e) => {
  e.preventDefault();
  const id = Number(idEl.value);
  const i = users.findIndex(u => u.id === id);
  if (i < 0) return;

  users.splice(i, 1);
  renderUsers();
  document.querySelector(".userEntry").reset();
});

// ======================
// View stock details
// ======================
portfolioList.addEventListener("click", (e) => {
  if (e.target.tagName !== "BUTTON") return;
  const symbol = e.target.dataset.symbol;
  const s = stocks.find(st => st.symbol === symbol);
  if (!s) return;

  document.querySelector("#stockName").textContent = s.name;
  document.querySelector("#stockSector").textContent = s.sector;
  document.querySelector("#stockIndustry").textContent = s.subIndustry;
  document.querySelector("#stockAddress").textContent = s.address;

  const img = document.querySelector("#logo");
  img.src = `logos/${symbol}.svg`;
  img.onerror = () => img.removeAttribute("src");
});

