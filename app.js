/* add your code here */

/* add your code here */

document.addEventListener('DOMContentLoaded', () => {
  const stocksData = JSON.parse(stockContent);
  const userData = JSON.parse(userContent);

  const saveButton = document.querySelector('#btnSave');
  const deleteButton = document.querySelector('#btnDelete');

  generateUserList(userData, stocksData);

  saveButton.addEventListener('click', (e) => onSave(e, userData, stocksData));
  deleteButton.addEventListener('click', (e) => onDelete(e, userData, stocksData));
});


function generateUserList(users, stocks) {
  const userList = document.querySelector('.user-list');
  userList.innerHTML = '';
  users.map(({ user, id }) => {
    const li = document.createElement('li');
    li.textContent = `${user.lastname}, ${user.firstname}`;
    li.id = id;
    userList.appendChild(li);
  });
  userList.addEventListener('click', (e) => handleUserListClick(e, users, stocks));
}

function handleUserListClick(event, users, stocks) {
  const userId = event.target.id;
  if (!userId) return;
  const user = users.find(u => u.id == userId);
  if (!user) return;
  populateForm(user);
  renderPortfolio(user, stocks);
}

function populateForm(data) {
  const { user, id } = data;
  document.querySelector('#userID').value = id;
  document.querySelector('#firstname').value = user.firstname;
  document.querySelector('#lastname').value = user.lastname;
  document.querySelector('#address').value = user.address;
  document.querySelector('#city').value = user.city;
  document.querySelector('#email').value = user.email;
}

function renderPortfolio(user, stocks) {
  const { portfolio } = user;
  const list = document.querySelector('.portfolio-list');
  list.innerHTML = '';
  portfolio.map(({ symbol, owned }) => {
    const sym = document.createElement('p');
    const qty = document.createElement('p');
    const btn = document.createElement('button');
    sym.textContent = symbol;
    qty.textContent = owned;
    btn.textContent = 'View';
    btn.id = symbol;
    list.append(sym, qty, btn);
  });
  list.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') viewStock(e.target.id, stocks);
  });
}

function viewStock(symbol, stocks) {
  const stock = stocks.find(s => s.symbol == symbol);
  if (!stock) return;
  document.querySelector('#stockName').textContent = stock.name;
  document.querySelector('#stockSector').textContent = stock.sector;
  document.querySelector('#stockIndustry').textContent = stock.subIndustry;
  document.querySelector('#stockAddress').textContent = stock.address;
 document.querySelector('#logo').src = `/logos/${symbol}.svg`;

}

function onSave(e, users, stocks) {
  e.preventDefault();
  const id = document.querySelector('#userID').value;
  for (let i = 0; i < users.length; i++) {
    if (users[i].id == id) {
      users[i].user.firstname = document.querySelector('#firstname').value;
      users[i].user.lastname = document.querySelector('#lastname').value;
      users[i].user.address = document.querySelector('#address').value;
      users[i].user.city = document.querySelector('#city').value;
      users[i].user.email = document.querySelector('#email').value;
      generateUserList(users, stocks);
      populateForm(users[i]);
      renderPortfolio(users[i], stocks);
      break;
    }
  }
}

function onDelete(e, users, stocks) {
  e.preventDefault();
  const id = document.querySelector('#userID').value;
  const idx = users.findIndex(u => u.id == id);
  if (idx === -1) return;
  users.splice(idx, 1);
  generateUserList(users, stocks);
  document.querySelector('#userID').value = '';
  document.querySelector('#firstname').value = '';
  document.querySelector('#lastname').value = '';
  document.querySelector('#address').value = '';
  document.querySelector('#city').value = '';
  document.querySelector('#email').value = '';
  document.querySelector('.portfolio-list').innerHTML = '';
  document.querySelector('#stockName').textContent = '';
  document.querySelector('#stockSector').textContent = '';
  document.querySelector('#stockIndustry').textContent = '';
  document.querySelector('#stockAddress').textContent = '';
  document.querySelector('#logo').src = '';
}
