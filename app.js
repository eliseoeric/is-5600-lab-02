/* add your code here */
document.addEventListener('DOMContentLoaded', function() {
  const parsedStocks = JSON.parse(stockContent);
  const parsedUsers = JSON.parse(userContent);

  buildUserList(parsedUsers, parsedStocks);

  const saveBtn = document.querySelector('#btnSave');
  const deleteBtn = document.querySelector('#btnDelete');

  saveBtn.onclick = function(e) {
    e.preventDefault();

    const userId = document.querySelector('#userID').value;
    
    let userFound = false;
    let index = 0;
    
    while (index < parsedUsers.length && !userFound) {
      if (parsedUsers[index].id == userId) {
        parsedUsers[index].user.firstname = document.querySelector('#firstname').value;
        parsedUsers[index].user.lastname = document.querySelector('#lastname').value;
        parsedUsers[index].user.address = document.querySelector('#address').value;
        parsedUsers[index].user.city = document.querySelector('#city').value;
        parsedUsers[index].user.email = document.querySelector('#email').value;
        userFound = true;
        buildUserList(parsedUsers, parsedStocks);
      }
      index++;
    }
  };

  deleteBtn.onclick = function(e) {
    e.preventDefault();

    const currentUserId = document.querySelector('#userID').value;
    const position = parsedUsers.findIndex(function(user) {
      return user.id == currentUserId;
    });
    parsedUsers.splice(position, 1);
    buildUserList(parsedUsers, parsedStocks);
  };
});

function buildUserList(users, stocks) {
  const list = document.querySelector('.user-list');
  list.innerHTML = '';

  for (let i = 0; i < users.length; i++) {
    const userItem = document.createElement('li');
    userItem.innerText = users[i].user.lastname + ', ' + users[i].user.firstname;
    userItem.id = users[i].id;
    list.appendChild(userItem);
  }

  list.addEventListener('click', function(e) {
    clickUserList(e, users, stocks);
  });
}

function clickUserList(event, users, stocks) {
  const clickedId = event.target.id;
  const selectedUser = users.find(function(user) {
    return user.id == clickedId;
  });
  fillForm(selectedUser);
  displayPortfolio(selectedUser, stocks);
}

function fillForm(userData) {
  const userInfo = userData.user;
  const userId = userData.id;
  
  document.querySelector('#userID').value = userId;
  document.querySelector('#firstname').value = userInfo.firstname;
  document.querySelector('#lastname').value = userInfo.lastname;
  document.querySelector('#address').value = userInfo.address;
  document.querySelector('#city').value = userInfo.city;
  document.querySelector('#email').value = userInfo.email;
}

function displayPortfolio(user, stocks) {
  const stockList = user.portfolio;
  const container = document.querySelector('.portfolio-list');
  container.innerHTML = '';
  
  for (let i = 0; i < stockList.length; i++) {
    const sym = document.createElement('p');
    const shares = document.createElement('p');
    const btn = document.createElement('button');
    
    sym.innerText = stockList[i].symbol;
    shares.innerText = stockList[i].owned;
    btn.innerText = 'View';
    btn.id = stockList[i].symbol;
    
    container.appendChild(sym);
    container.appendChild(shares);
    container.appendChild(btn);
  }
  
  container.addEventListener('click', function(e) {
    if (e.target.tagName === 'BUTTON') {
      showStock(e.target.id, stocks);
    }
  });
}

function showStock(symbol, stocks) {
  const stockDisplay = document.querySelector('.stock-form');
  if (stockDisplay) {
      const foundStock = stocks.find(function(s) {
        return s.symbol == symbol;
      });

      document.querySelector('#stockName').textContent = foundStock.name;
      document.querySelector('#stockSector').textContent = foundStock.sector;
      document.querySelector('#stockIndustry').textContent = foundStock.subIndustry;
      document.querySelector('#stockAddress').textContent = foundStock.address;

      document.querySelector('#logo').src = `logos/${symbol}.svg`;
  }
}