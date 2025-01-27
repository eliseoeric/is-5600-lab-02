document.addEventListener('DOMContentLoaded', () => {
    const stocksData = JSON.parse(stockContent);
    const userData = JSON.parse(userContent);

    generateUserList(userData, stocksData);

    const saveButton = document.getElementById('btnSave');
    const deleteButton = document.getElementById('btnDelete');

    // Save button functionality
    saveButton.addEventListener('click', (e) => {
      e.preventDefault();
      const id = document.querySelector('#userID').value;
      const user = userData.find(u => u.id == id);
      if (user) {
        user.user.firstname = document.querySelector('#firstname').value;
        user.user.lastname = document.querySelector('#lastname').value;
        user.user.address = document.querySelector('#address').value;
        user.user.city = document.querySelector('#city').value;
        user.user.email = document.querySelector('#email').value;
        generateUserList(userData, stocksData);
      }
    });

    // Delete button functionality
    deleteButton.addEventListener('click', (e) => {
      e.preventDefault();
      const id = document.querySelector('#userID').value;
      const index = userData.findIndex(u => u.id == id);
      if (index !== -1) {
        userData.splice(index, 1);
        generateUserList(userData, stocksData);
        clearFormAndPortfolio();
      }
    });
  });

  function generateUserList(users, stocks) {
    const userList = document.querySelector('.user-list');
    userList.innerHTML = '';

    users.forEach(({ user, id }) => {
      const listItem = document.createElement('li');
      listItem.innerText = `${user.lastname}, ${user.firstname}`;
      listItem.setAttribute('id', id);
      userList.appendChild(listItem);
    });

    userList.addEventListener('click', (event) => handleUserListClick(event, users, stocks));
  }

  function handleUserListClick(event, users, stocks) {
    const userId = event.target.id;
    const user = users.find(user => user.id == userId);
    if (user) {
      populateForm(user);
      renderPortfolio(user, stocks);
    }
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
    const portfolioDetails = document.querySelector('.portfolio-list');
    portfolioDetails.innerHTML = '';

    user.portfolio.forEach(({ symbol, owned }) => {
      const symbolEl = document.createElement('p');
      const sharesEl = document.createElement('p');
      const actionEl = document.createElement('button');
      symbolEl.innerText = symbol;
      sharesEl.innerText = owned;
      actionEl.innerText = 'View';
      actionEl.setAttribute('id', symbol);
      actionEl.classList.add('view-btn');
      portfolioDetails.appendChild(symbolEl);
      portfolioDetails.appendChild(sharesEl);
      portfolioDetails.appendChild(actionEl);
    });

    portfolioDetails.addEventListener('click', (event) => {
      if (event.target.classList.contains('view-btn')) {
        viewStock(event.target.id, stocks);
      }
    });
  }

  function viewStock(symbol, stocks) {
    const stock = stocks.find(s => s.symbol == symbol);
    if (stock) {
      document.querySelector('#stockName').textContent = stock.name;
      document.querySelector('#stockSector').textContent = stock.sector;
      document.querySelector('#stockIndustry').textContent = stock.subIndustry;
      document.querySelector('#stockAddress').textContent = stock.address;
      document.querySelector('#logo').src = `logos/${symbol}.svg`;
    }
  }

  function clearFormAndPortfolio() {
    document.querySelector('#userID').value = '';
    document.querySelector('#firstname').value = '';
    document.querySelector('#lastname').value = '';
    document.querySelector('#address').value = '';
    document.querySelector('#city').value = '';
    document.querySelector('#email').value = '';
    document.querySelector('.portfolio-list').innerHTML = '';
  }