document.addEventListener('DOMContentLoaded', () => {
  const stocksData = JSON.parse(stockContent);
  const userData = JSON.parse(userContent);

  generateUserList(userData, stocksData);
});

function generateUserList(users, stocks) {
  const userList = document.querySelector('.user-list');
  userList.innerHTML = '';

  users.forEach(({ user, id }) => {
    const li = document.createElement('li');
    li.innerText = `${user.lastname}, ${user.firstname}`;
    li.setAttribute('id', id);
    userList.appendChild(li);
  });

  userList.addEventListener('click', (e) => {
    const userId = e.target.id;
    const selectedUser = users.find(u => u.id == userId);
    if (!selectedUser) return;

    populateForm(selectedUser);
    renderPortfolio(selectedUser, stocks);
  });
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
  const container = document.querySelector('.portfolio-list');
  container.innerHTML = '';

  user.portfolio.forEach(({ symbol, owned }) => {
    const p1 = document.createElement('p');
    p1.innerText = symbol;

    const p2 = document.createElement('p');
    p2.innerText = owned;

    const btn = document.createElement('button');
    btn.innerText = 'View';
    btn.setAttribute('id', symbol);

    container.appendChild(p1);
    container.appendChild(p2);
    container.appendChild(btn);
  });

  container.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
      viewStock(e.target.id, stocks);
    }
  });
}

function viewStock(symbol, stocks) {
  const stock = stocks.find(s => s.symbol == symbol);
  if (!stock) return;

  document.querySelector('#stockName').textContent = stock.name;
  document.querySelector('#stockSector').textContent = stock.sector;
  document.querySelector('#stockIndustry').textContent = stock.subIndustry;
  document.querySelector('#stockAddress').textContent = stock.address;
  document.querySelector('#logo').src = `logos/${symbol}.svg`;
}
// Lab 02 completed by Neha
