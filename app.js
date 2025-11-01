/* add your code here */
document.addEventListener('DOMContentLoaded', () => {

  const userData = JSON.parse(userContent);
  const stocksData = JSON.parse(stockContent);

  // Build the user list on page load
  generateUserList(userData, stocksData);
   // ✅ SAVE USER CHANGES
const saveButton = document.querySelector('#btnSave');
saveButton.addEventListener('click', (event) => {
  event.preventDefault();

  const id = document.querySelector('#userID').value;

  for (let i = 0; i < userData.length; i++) {
    if (userData[i].id == id) {

      userData[i].user.firstname = document.querySelector('#firstname').value;
      userData[i].user.lastname = document.querySelector('#lastname').value;
      userData[i].user.address = document.querySelector('#address').value;
      userData[i].user.city = document.querySelector('#city').value;
      userData[i].user.email = document.querySelector('#email').value;

      // Refresh the user list
      generateUserList(userData, stocksData);
    }
  }
});


// ✅ DELETE USER
const deleteButton = document.querySelector('#btnDelete');
deleteButton.addEventListener('click', (event) => {
  event.preventDefault();

  const id = document.querySelector('#userID').value;
  const index = userData.findIndex(u => u.id == id);

  if (index > -1) {
    userData.splice(index, 1);
    generateUserList(userData, stocksData);

    // Clear UI after delete
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
});

function generateUserList(users, stocks) {
  const userList = document.querySelector('.user-list');

  // Clear before re-rendering
  userList.innerHTML = '';

  users.forEach(({ user, id }) => {
    const li = document.createElement('li');
    li.textContent = `${user.lastname}, ${user.firstname}`;
    li.setAttribute('id', id);
    userList.appendChild(li);
  });

  // When we click a user → show form + portfolio
  userList.addEventListener('click', (event) => {
    handleUserListClick(event, users, stocks);
  });
}
function handleUserListClick(event, users, stocks) {
  const userId = event.target.id;
  const selectedUser = users.find(u => u.id == userId);

  populateForm(selectedUser);
  renderPortfolio(selectedUser, stocks);
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
  const list = document.querySelector('.portfolio-list');
  list.innerHTML = '';

  user.portfolio.forEach(({ symbol, owned }) => {
    const row = document.createElement('tr');
    row.className = 'portfolio-row';

    const tdSymbol = document.createElement('td');
    tdSymbol.textContent = symbol;

    const tdShares = document.createElement('td');
    tdShares.textContent = owned;

    const tdActions = document.createElement('td');
    const btn = document.createElement('button');
    btn.className = 'view-stock-btn';
    btn.dataset.symbol = symbol;
    btn.textContent = 'View';
    tdActions.appendChild(btn);

    row.appendChild(tdSymbol);
    row.appendChild(tdShares);
    row.appendChild(tdActions);

    list.appendChild(row);
  });

  list.addEventListener('click', (e) => {
    if (e.target.classList.contains('view-stock-btn')) {
      viewStock(e.target.dataset.symbol, stocks);
    }
  });
}
function viewStock(symbol, stocks) {
  const stock = stocks.find(s => s.symbol === symbol);
  if (!stock) return;

  document.querySelector('#stockName').textContent = stock.name;
  document.querySelector('#stockSector').textContent = stock.sector;
  document.querySelector('#stockIndustry').textContent = stock.subIndustry;
  document.querySelector('#stockAddress').textContent = stock.address;

  const logoEl = document.querySelector('#logo');
  const clean = symbol.trim().toUpperCase();
  logoEl.onerror = () => { logoEl.src = 'logos/DEFAULT.svg'; };
  logoEl.src = `logos/${clean}.svg`;
}
});