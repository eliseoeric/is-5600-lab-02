// app.js

// ---------- Sample Data ----------
const users = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    portfolio: [
      { symbol: "AAPL", name: "Apple Inc.", shares: 10, price: 180 },
      { symbol: "MSFT", name: "Microsoft Corp.", shares: 5, price: 400 },
    ],
  },
  {
    id: 2,
    name: "Brian Lee",
    email: "brian@example.com",
    portfolio: [
      { symbol: "AMZN", name: "Amazon", shares: 3, price: 170 },
      { symbol: "GOOGL", name: "Alphabet", shares: 4, price: 140 },
    ],
  },
];

let selectedUser = null;
let selectedStock = null;

// ---------- DOM References ----------
const userList = document.querySelector("#userList");
const portfolioList = document.querySelector("#portfolioList");
const stockInfo = document.querySelector("#stockInfo");
const form = document.querySelector("#userForm");
const nameInput = document.querySelector("#userName");
const emailInput = document.querySelector("#userEmail");

// ---------- Functions ----------
function renderUsers() {
  userList.innerHTML = "";
  users.forEach((user) => {
    const div = document.createElement("div");
    div.textContent = user.name;
    div.className = "user-item";
    div.onclick = () => selectUser(user);
    userList.appendChild(div);
  });
}

function selectUser(user) {
  selectedUser = user;
  nameInput.value = user.name;
  emailInput.value = user.email;
  renderPortfolio(user);
  stockInfo.innerHTML = "";
}

function renderPortfolio(user) {
  portfolioList.innerHTML = "";
  user.portfolio.forEach((stock) => {
    const item = document.createElement("div");
    item.textContent = `${stock.symbol} - ${stock.name}`;
    item.className = "stock-item";
    item.onclick = () => selectStock(stock);
    portfolioList.appendChild(item);
  });
}

function selectStock(stock) {
  selectedStock = stock;
  stockInfo.innerHTML = `
    <h3>${stock.name} (${stock.symbol})</h3>
    <p>Price: $${stock.price}</p>
    <p>Shares: ${stock.shares}</p>
    <p>Total Value: $${(stock.price * stock.shares).toFixed(2)}</p>
  `;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!selectedUser) return;
  selectedUser.name = nameInput.value;
  selectedUser.email = emailInput.value;
  renderUsers();
});

document.querySelector("#deleteBtn").addEventListener("click", () => {
  if (!selectedUser) return;
  const index = users.indexOf(selectedUser);
  if (index > -1) users.splice(index, 1);
  selectedUser = null;
  portfolioList.innerHTML = "";
  stockInfo.innerHTML = "";
  nameInput.value = "";
  emailInput.value = "";
  renderUsers();
});

// ---------- Initialize ----------
renderUsers();
