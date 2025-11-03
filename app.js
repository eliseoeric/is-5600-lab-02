document.addEventListener('DOMContentLoaded', function() {
  const allStocks = JSON.parse(stockContent);
  const allUsers = JSON.parse(userContent);

  displayUsers(allUsers, allStocks);
  
  handleSave(allUsers, allStocks);
  handleDelete(allUsers, allStocks);
});

function handleSave(users, stocks) {
  const saveButton = document.querySelector('#btnSave');
  
  saveButton.addEventListener('click', function(event) {
    event.preventDefault();
    
    const formData = {
      id: document.querySelector('#userID').value,
      firstname: document.querySelector('#firstname').value,
      lastname: document.querySelector('#lastname').value,
      address: document.querySelector('#address').value,
      city: document.querySelector('#city').value,
      email: document.querySelector('#email').value
    };
    
    users.forEach(function(userObj, idx) {
      if (userObj.id == formData.id) {
        users[idx].user.firstname = formData.firstname;
        users[idx].user.lastname = formData.lastname;
        users[idx].user.address = formData.address;
        users[idx].user.city = formData.city;
        users[idx].user.email = formData.email;
        displayUsers(users, stocks);
      }
    });
  });
}

function handleDelete(users, stocks) {
  const deleteButton = document.querySelector('#btnDelete');
  
  deleteButton.addEventListener('click', function(event) {
    event.preventDefault();
    
    const userToDelete = document.querySelector('#userID').value;
    const position = users.findIndex(function(u) {
      return u.id == userToDelete;
    });
    
    if (position !== -1) {
      users.splice(position, 1);
      displayUsers(users, stocks);
    }
  });
}

function displayUsers(users, stocks) {
  const userListContainer = document.querySelector('.user-list');
  userListContainer.innerHTML = '';
  
  for (let idx = 0; idx < users.length; idx++) {
    const person = users[idx];
    const listElement = document.createElement('li');
    listElement.textContent = person.user.lastname + ', ' + person.user.firstname;
    listElement.id = person.id;
    userListContainer.appendChild(listElement);
  }
  
  userListContainer.onclick = function(evt) {
    handleUserSelection(evt, users, stocks);
  };
}

function handleUserSelection(evt, users, stocks) {
  const selectedId = evt.target.id;
  
  let foundUser = null;
  for (let idx = 0; idx < users.length; idx++) {
    if (users[idx].id == selectedId) {
      foundUser = users[idx];
      break;
    }
  }
  
  if (foundUser) {
    updateForm(foundUser);
    displayUserPortfolio(foundUser, stocks);
  }
}

function updateForm(userObject) {
  const personData = userObject.user;
  const personId = userObject.id;
  
  document.querySelector('#userID').value = personId;
  document.querySelector('#firstname').value = personData.firstname;
  document.querySelector('#lastname').value = personData.lastname;
  document.querySelector('#address').value = personData.address;
  document.querySelector('#city').value = personData.city;
  document.querySelector('#email').value = personData.email;
}

function displayUserPortfolio(userObject, stocks) {
  const investments = userObject.portfolio;
  const portfolioSection = document.querySelector('.portfolio-list');
  portfolioSection.innerHTML = '';
  
  const header1 = document.createElement('h3');
  const header2 = document.createElement('h3');
  const header3 = document.createElement('h3');
  
  header1.textContent = 'Symbol';
  header2.textContent = '# Shares';
  header3.textContent = 'Actions';
  
  portfolioSection.appendChild(header1);
  portfolioSection.appendChild(header2);
  portfolioSection.appendChild(header3);
  
  investments.forEach(function(investment) {
    const tickerElement = document.createElement('p');
    const quantityElement = document.createElement('p');
    const actionButton = document.createElement('button');
    
    tickerElement.textContent = investment.symbol;
    quantityElement.textContent = investment.owned;
    actionButton.textContent = 'View';
    actionButton.id = investment.symbol;
    
    portfolioSection.appendChild(tickerElement);
    portfolioSection.appendChild(quantityElement);
    portfolioSection.appendChild(actionButton);
  });
  
  portfolioSection.onclick = function(evt) {
    if (evt.target.nodeName === 'BUTTON') {
      showStockDetails(evt.target.id, stocks);
    }
  };
}

function showStockDetails(ticker, stocks) {
  const detailsSection = document.querySelector('.stock-form');
  
  if (detailsSection) {
    let stockInfo = null;
    
    for (let idx = 0; idx < stocks.length; idx++) {
      if (stocks[idx].symbol == ticker) {
        stockInfo = stocks[idx];
        break;
      }
    }
    
    if (stockInfo) {
      document.querySelector('#stockName').textContent = stockInfo.name;
      document.querySelector('#stockSector').textContent = stockInfo.sector;
      document.querySelector('#stockIndustry').textContent = stockInfo.subIndustry;
      document.querySelector('#stockAddress').textContent = stockInfo.address;
      document.querySelector('#logo').src = `logos/${ticker}.svg`;
    }
  }
}
