document.addEventListener('DOMContentLoaded', () => {

  const stocksData = JSON.parse(stockContent);
  const userData = JSON.parse(userContent);

  const saveButton = document.querySelector('#save');
  const deleteButton = document.querySelector('#delete');

  generateUserList(userData, stocksData);

  // DELETE USER
  deleteButton.addEventListener('click', (event) => {
    event.preventDefault();

    const userId = document.querySelector('#userID').value;
    const index = userData.findIndex(u => u.id == userId);

    if (index !== -1) {
      userData.splice(index, 1);
      generateUserList(userData, stocksData);

      // clear form + portfolio
      document.querySelector('form').reset();
      document.querySelector('.portfolio-list').innerHTML = '';
    }
  });

  // SAVE USER
  saveButton.addEventListener('click', (event) => {
    event.preventDefault();

    const id = document.querySelector('#userID').value;

    userData.forEach(u => {
      if (u.id == id) {
        u.user.firstname = document.querySelector('#firstname').value;
        u.user.lastname = document.querySelector('#lastname').value;
        u.user.address = document.querySelector('#address').value;
        u.user.city = document.querySelector('#city').value;
        u.user.email = document.querySelector('#email').value;
      }
    });

    generateUserList(userData, stocksData);
  });

});


/* ---------------- USER LIST ---------------- */

function generateUserList(users, stocks) {
  const userList = document.querySelector('.user-list');

  userList.innerHTML = ''; // clear list

  users.forEach(({ user, id }) => {
    const li = document.createElement('li');
    li.innerText = `${user.lastname}, ${user.firstname}`;
    li.setAttribute('id', id);
    userList.appendChild(li);
  });

  userList.addEventListener('click', (event) => {
    handleUserListClick(event, users, stocks);
  });
}


/* ---------------- USER CLICK ---------------- */

function handleUserListClick(event, users, stocks) {
  const userId = event.target.id;

  const user = users.find(u => u.id == userId);

  if (!user) return;

  populateForm(user);
  renderPortfolio(user, stocks);
}


/* ---------------- FORM ---------------- */

function populateForm(data) {
  const { user, id } = data;

  document.querySelector('#userID').value = id;
  document.querySelector('#firstname').value = user.firstname;
  document.querySelector('#lastname').value = user.lastname;
  document.querySelector('#address').value = user.address;
  document.querySelector('#city').value = user.city;
  document.querySelector('#email').value = user.email;
}


/* ---------------- PORTFOLIO ---------------- */

function renderPortfolio(user, stocks) {
  const portfolioList = document.querySelector('.portfolio-list');

  portfolioList.innerHTML = '';

  user.portfolio.forEach(({ symbol, owned }) => {
    const symbolEl = document.createElement('p');
    const sharesEl = document.createElement('p');
    const btn = document.createElement('button');

    symbolEl.innerText = symbol;
    sharesEl.innerText = owned;
    btn.innerText = 'View';
    btn.setAttribute('id', symbol);

    portfolioList.appendChild(symbolEl);
    portfolioList.appendChild(sharesEl);
    portfolioList.appendChild(btn);
  });

  // EVENT DELEGATION FOR STOCK VIEW
  portfolioList.addEventListener('click', (event) => {
    if (event.target.tagName === 'BUTTON') {
      viewStock(event.target.id, stocks);
    }
  });
}


/* ---------------- STOCK VIEW ---------------- */

function viewStock(symbol, stocks) {
  const stock = stocks.find(s => s.symbol == symbol);

  if (!stock) return;

  document.querySelector('#stockName').textContent = stock.name;
  document.querySelector('#stockSector').textContent = stock.sector;
  document.querySelector('#stockIndustry').textContent = stock.subIndustry;
  document.querySelector('#stockAddress').textContent = stock.address;

  document.querySelector('#logo').src = `logos/${symbol}.svg`;
}