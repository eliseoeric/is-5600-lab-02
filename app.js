/* add your code here */

document.addEventListener('DOMContentLoaded', init);

function init() {
  const stocks = JSON.parse(stockContent);
  const users = JSON.parse(userContent);

  createUserList(users, stocks);
  setupSaveButton(users, stocks);
  setupDeleteButton(users, stocks);
}

function setupSaveButton(users, stocks) {
  const saveBtn = document.querySelector('#btnSave');
  
  saveBtn.addEventListener('click', function(e) {
    e.preventDefault();

    const id = document.querySelector('#userID').value;
    const firstname = document.querySelector('#firstname').value;
    const lastname = document.querySelector('#lastname').value;
    const address = document.querySelector('#address').value;
    const city = document.querySelector('#city').value;
    const email = document.querySelector('#email').value;

    for (let i = 0; i < users.length; i++) {
      const currentUser = users[i];
      if (currentUser.id == id) {
        currentUser.user.firstname = firstname;
        currentUser.user.lastname = lastname;
        currentUser.user.address = address;
        currentUser.user.city = city;
        currentUser.user.email = email;
        createUserList(users, stocks);
        break;
      }
    }
  });
}

function setupDeleteButton(users, stocks) {
  const delBtn = document.querySelector('#btnDelete');
  
  delBtn.addEventListener('click', function(e) {
    e.preventDefault();

    const currentId = document.querySelector('#userID').value;
    
    for (let i = 0; i < users.length; i++) {
      if (users[i].id == currentId) {
        users.splice(i, 1);
        break;
      }
    }
    createUserList(users, stocks);
  });
}

function createUserList(users, stocks) {
  const ul = document.querySelector('.user-list');
  ul.innerHTML = '';

  users.map(function(item) {
    const li = document.createElement('li');
    const fullName = item.user.lastname + ', ' + item.user.firstname;
    li.innerText = fullName;
    li.setAttribute('id', item.id);
    ul.appendChild(li);
  });

  ul.addEventListener('click', function(e) {
    handleClick(e, users, stocks);
  });
}

function handleClick(event, users, stocks) {
  const id = event.target.id;
  
  let selectedUser = null;
  
  for (let i = 0; i < users.length; i++) {
    if (users[i].id == id) {
      selectedUser = users[i];
      break;
    }
  }
  
  setFormData(selectedUser);
  createPortfolio(selectedUser, stocks);
}

function setFormData(data) {
  const u = data.user;
  const i = data.id;

  document.querySelector('#userID').value = i;
  document.querySelector('#firstname').value = u.firstname;
  document.querySelector('#lastname').value = u.lastname;
  document.querySelector('#address').value = u.address;
  document.querySelector('#city').value = u.city;
  document.querySelector('#email').value = u.email;
}

function createPortfolio(user, stocks) {
  const holdings = user.portfolio;
  const portfolioArea = document.querySelector('.portfolio-list');
  portfolioArea.innerHTML = '';

  holdings.map(function(holding) {
    const symbolPara = document.createElement('p');
    const ownedPara = document.createElement('p');
    const viewBtn = document.createElement('button');

    symbolPara.innerText = holding.symbol;
    ownedPara.innerText = holding.owned;
    viewBtn.innerText = 'View';
    viewBtn.setAttribute('id', holding.symbol);

    portfolioArea.appendChild(symbolPara);
    portfolioArea.appendChild(ownedPara);
    portfolioArea.appendChild(viewBtn);
  });

  portfolioArea.addEventListener('click', function(e) {
    const target = e.target;
    if (target.tagName === 'BUTTON') {
      displayStock(target.id, stocks);
    }
  });
}

function displayStock(symbol, stocks) {
  const form = document.querySelector('.stock-form');
  
  if (form) {
      let matchingStock = null;
      
      for (let i = 0; i < stocks.length; i++) {
        if (stocks[i].symbol == symbol) {
          matchingStock = stocks[i];
          break;
        }
      }

      document.querySelector('#stockName').textContent = matchingStock.name;
      document.querySelector('#stockSector').textContent = matchingStock.sector;
      document.querySelector('#stockIndustry').textContent = matchingStock.subIndustry;
      document.querySelector('#stockAddress').textContent = matchingStock.address;
      document.querySelector('#logo').src = `logos/${symbol}.svg`;
  }
}