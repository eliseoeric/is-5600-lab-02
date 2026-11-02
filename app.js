/* add your code here */
document.addEventListener('DOMContentLoaded', () => {
  const stocksData = JSON.parse(stockContent);
  const userData = JSON.parse(userContent);

  const userList = document.querySelector('.user-list');
  const portfolioList = document.querySelector('.portfolio-list');

  const field = (id) => document.getElementById(id);

  // Step 1: Display all users
  function displayUsers() {
    userList.innerHTML = '';

    userData.forEach(({ user, id }) => {
      const li = document.createElement('li');
      li.id = id;
      li.innerText = user.lastname + ', ' + user.firstname;
      userList.appendChild(li);
    });
  }

  // Step 2: Display user information
  function displayUser(data) {
    const { user, id } = data;

    field('userID').value = id;
    field('firstname').value = user.firstname;
    field('lastname').value = user.lastname;
    field('address').value = user.address;
    field('city').value = user.city;
    field('email').value = user.email;

    displayPortfolio(data.portfolio);
    clearStockDetails();
  }

  // Step 3: Display portfolio
  function displayPortfolio(portfolio = []) {
    portfolioList.querySelectorAll('p, button')
      .forEach(element => element.remove());

    portfolio.forEach(({ symbol, owned }) => {
      const symbolEl = document.createElement('p');
      const sharesEl = document.createElement('p');
      const button = document.createElement('button');

      symbolEl.innerText = symbol;
      sharesEl.innerText = owned;
      button.innerText = 'View';
      button.id = symbol;

      portfolioList.appendChild(symbolEl);
      portfolioList.appendChild(sharesEl);
      portfolioList.appendChild(button);
    });
  }

  // Step 4: Display stock details
  function clearStockDetails() {
    ['stockName', 'stockSector', 'stockIndustry',
      'stockAddress'].forEach(id => {
      field(id).textContent = '';
    });
    field('logo').removeAttribute('src');
  }

  portfolioList.addEventListener('click', (event) => {
    if (event.target.tagName !== 'BUTTON') return;

    const symbol = event.target.id;
    const stock = stocksData.find(
      item => item.symbol === symbol
    );

    if (stock) {
      field('stockName').textContent = stock.name;
      field('stockSector').textContent = stock.sector;
      field('stockIndustry').textContent = stock.subIndustry;
      field('stockAddress').textContent = stock.address;
      field('logo').src = `logos/${symbol}.svg`;
    }
  });

  // Select a user
  userList.addEventListener('click', (event) => {
    const li = event.target.closest('li');
    if (!li) return;

    const selectedUser = userData.find(
      item => item.id == li.id
    );

    if (selectedUser) {
      displayUser(selectedUser);
    }
  });

  // Step 5: Save user changes
  field('btnSave').addEventListener('click', (event) => {
    event.preventDefault();

    const id = field('userID').value;
    const selectedUser = userData.find(
      item => item.id == id
    );

    if (!selectedUser) return;

    selectedUser.user.firstname = field('firstname').value;
    selectedUser.user.lastname = field('lastname').value;
    selectedUser.user.address = field('address').value;
    selectedUser.user.city = field('city').value;
    selectedUser.user.email = field('email').value;

    displayUsers();
    alert('User information saved successfully!');
  });

  // Step 6: Delete selected user
  field('btnDelete').addEventListener('click', (event) => {
    event.preventDefault();

    const id = field('userID').value;
    const index = userData.findIndex(
      item => item.id == id
    );

    if (index === -1) return;

    userData.splice(index, 1);

    displayUsers();
    displayPortfolio();
    clearStockDetails();

    field('userID').value = '';
    ['firstname', 'lastname', 'address', 'city',
      'email'].forEach(id => {
      field(id).value = '';
    });

    alert('User deleted successfully!');
  });

  // Initial user list
  displayUsers();
}); 
