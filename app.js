document.addEventListener('DOMContentLoaded', () => {
  let stocksData = JSON.parse(stockContent);
  let userData = JSON.parse(userContent);

  renderUserList(userData, stocksData);

  document.querySelector('#btnSave').addEventListener('click', (e) => {
    e.preventDefault();

    const userIdValue = document.querySelector('#userID').value;
    const firstNameValue = document.querySelector('#firstname').value;
    const lastNameValue = document.querySelector('#lastname').value;
    const addressValue = document.querySelector('#address').value;
    const cityValue = document.querySelector('#city').value;
    const emailValue = document.querySelector('#email').value;

    userData.forEach((item) => {
      if (item.id == userIdValue) {
        item.user.firstname = firstNameValue;
        item.user.lastname = lastNameValue;
        item.user.address = addressValue;
        item.user.city = cityValue;
        item.user.email = emailValue;
        renderUserList(userData, stocksData);
      }
    });
  });

  document.querySelector('#btnDelete').addEventListener('click', (e) => {
    e.preventDefault();

    const idToDelete = document.querySelector('#userID').value;
    const indexToRemove = userData.findIndex((u) => u.id == idToDelete);
    userData.splice(indexToRemove, 1);
    renderUserList(userData, stocksData);
  });
});

function renderUserList(users, stocks) {
  const userListElement = document.querySelector('.user-list');
  userListElement.innerHTML = '';

  users.forEach((userData) => {
    const newListItem = document.createElement('li');
    newListItem.innerText = `${userData.user.lastname}, ${userData.user.firstname}`;
    newListItem.setAttribute('id', userData.id);
    userListElement.appendChild(newListItem);
  });

  userListElement.addEventListener('click', (e) => onUserClick(e, users, stocks));
}

function onUserClick(event, users, stocks) {
  const targetId = event.target.id;
  const matchedUser = users.find((u) => u.id == targetId);
  loadUserData(matchedUser);
  showPortfolio(matchedUser, stocks);
}

function loadUserData(data) {
  const userDetails = data.user;
  const userIdentifier = data.id;

  const userIdField = document.querySelector('#userID');
  const firstNameField = document.querySelector('#firstname');
  const lastNameField = document.querySelector('#lastname');
  const addressField = document.querySelector('#address');
  const cityField = document.querySelector('#city');
  const emailField = document.querySelector('#email');

  userIdField.value = userIdentifier;
  firstNameField.value = userDetails.firstname;
  lastNameField.value = userDetails.lastname;
  addressField.value = userDetails.address;
  cityField.value = userDetails.city;
  emailField.value = userDetails.email;
}

function showPortfolio(user, stocks) {
  const userStocks = user.portfolio;
  const portfolioContainer = document.querySelector('.portfolio-list');
  portfolioContainer.innerHTML = '';

  const symbolHeader = document.createElement('h3');
  const sharesHeader = document.createElement('h3');
  const actionsHeader = document.createElement('h3');
  
  symbolHeader.innerText = 'Symbol';
  sharesHeader.innerText = '# Shares';
  actionsHeader.innerText = 'Actions';
  
  portfolioContainer.appendChild(symbolHeader);
  portfolioContainer.appendChild(sharesHeader);
  portfolioContainer.appendChild(actionsHeader);

  userStocks.forEach((stock) => {
    const symbolElement = document.createElement('p');
    const sharesElement = document.createElement('p');
    const viewButton = document.createElement('button');

    symbolElement.innerText = stock.symbol;
    sharesElement.innerText = stock.owned;
    viewButton.innerText = 'View';
    viewButton.setAttribute('id', stock.symbol);

    portfolioContainer.appendChild(symbolElement);
    portfolioContainer.appendChild(sharesElement);
    portfolioContainer.appendChild(viewButton);
  });

  portfolioContainer.addEventListener('click', (e) => {
    if (e.target.tagName === 'BUTTON') {
      loadStockInfo(e.target.id, stocks);
    }
  });
}

function loadStockInfo(symbol, stocks) {
  const stockFormArea = document.querySelector('.stock-form');
  if (stockFormArea) {
      const stockData = stocks.find((stockItem) => {
        return stockItem.symbol == symbol;
      });

      const nameElement = document.querySelector('#stockName');
      const sectorElement = document.querySelector('#stockSector');
      const industryElement = document.querySelector('#stockIndustry');
      const addressElement = document.querySelector('#stockAddress');
      const logoElement = document.querySelector('#logo');

      nameElement.textContent = stockData.name;
      sectorElement.textContent = stockData.sector;
      industryElement.textContent = stockData.subIndustry;
      addressElement.textContent = stockData.address;
      logoElement.src = `logos/${symbol}.svg`;
  }
}