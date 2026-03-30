/* add your code here */

document.addEventListener('DOMContentLoaded', () => {
  const stocksData = JSON.parse(stockContent);
  const userData = JSON.parse(userContent);

  generateUserList(userData, stocksData);

  // DELETE BUTTON
  const deleteButton = document.querySelector('#delete');
  deleteButton.addEventListener('click', (event) => {
    event.preventDefault();

    const userId = document.querySelector('#userID').value;
    const index = userData.findIndex(u => u.id == userId);

    if (index !== -1) {
      userData.splice(index, 1);

      generateUserList(userData, stocksData);

    
      document.querySelector('.portfolio-list').innerHTML = '';
      document.querySelector('#stockName').textContent = '';
      document.querySelector('#stockSector').textContent = '';
      document.querySelector('#stockIndustry').textContent = '';
      document.querySelector('#stockAddress').textContent = '';
      document.querySelector('#logo').src = '';
    }
  });

  // SAVE BUTTON
  const saveButton = document.querySelector('#save');
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

     
      generateUserList(userData, stocksData);

      
      populateForm(userData[i]);
      renderPortfolio(userData[i], stocksData);
    }
  }
});
});


function generateUserList(users, stocks) {
  const userList = document.querySelector('.user-list');
  userList.innerHTML = '';

  users.forEach(({ user, id }) => {
    const li = document.createElement('li');
    li.innerText = user.lastname + ', ' + user.firstname;
    li.setAttribute('id', id);
    userList.appendChild(li);
  });

  userList.onclick = (event) => handleUserClick(event, users, stocks);
}


function handleUserClick(event, users, stocks) {
  const userId = event.target.id;
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
  const container = document.querySelector('.portfolio-list');
  container.innerHTML = '';

  user.portfolio.forEach(({ symbol, owned }) => {
    const symbolEl = document.createElement('p');
    const sharesEl = document.createElement('p');
    const btn = document.createElement('button');

    symbolEl.innerText = symbol;
    sharesEl.innerText = owned;
    btn.innerText = 'View';
    btn.setAttribute('id', symbol);

    container.appendChild(symbolEl);
    container.appendChild(sharesEl);
    container.appendChild(btn);
  });

  container.onclick = (event) => {
    if (event.target.tagName === 'BUTTON') {
      viewStock(event.target.id, stocks);
    }
  };
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
