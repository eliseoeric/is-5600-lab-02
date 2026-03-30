document.addEventListener('DOMContentLoaded', function () {

  const stocksData = JSON.parse(stockContent);
  const userData = JSON.parse(userContent);

  const userList = document.querySelector('.user-list');
  const portfolioList = document.querySelector('.portfolio-list');

  // ===== SHOW USERS =====
  function showUsers() {
    userList.innerHTML = '';

    for (let i = 0; i < userData.length; i++) {
      const li = document.createElement('li');
      li.textContent = userData[i].user.lastname + ', ' + userData[i].user.firstname;
      li.id = userData[i].id;
      userList.appendChild(li);
    }
  }

  showUsers();

  // ===== CLICK USER =====
  userList.addEventListener('click', function (event) {
    const id = event.target.id;

    let selectedUser = null;

    for (let i = 0; i < userData.length; i++) {
      if (userData[i].id == id) {
        selectedUser = userData[i];
        break;
      }
    }

    if (!selectedUser) return;

    // fill form
    document.querySelector('#userID').value = selectedUser.id;
    document.querySelector('#firstname').value = selectedUser.user.firstname;
    document.querySelector('#lastname').value = selectedUser.user.lastname;
    document.querySelector('#address').value = selectedUser.user.address;
    document.querySelector('#city').value = selectedUser.user.city;
    document.querySelector('#email').value = selectedUser.user.email;

    // show portfolio
    portfolioList.innerHTML = '';

    for (let i = 0; i < selectedUser.portfolio.length; i++) {
      const item = selectedUser.portfolio[i];

      const p1 = document.createElement('p');
      const p2 = document.createElement('p');
      const btn = document.createElement('button');

      p1.textContent = item.symbol;
      p2.textContent = item.owned;
      btn.textContent = 'View';
      btn.id = item.symbol;

      portfolioList.appendChild(p1);
      portfolioList.appendChild(p2);
      portfolioList.appendChild(btn);
    }
  });

  // ===== VIEW STOCK =====
  portfolioList.addEventListener('click', function (event) {
    if (event.target.tagName !== 'BUTTON') return;

    const symbol = event.target.id;

    let stock = null;

    for (let i = 0; i < stocksData.length; i++) {
      if (stocksData[i].symbol == symbol) {
        stock = stocksData[i];
        break;
      }
    }

    if (!stock) return;

    document.querySelector('#stockName').textContent = stock.name;
    document.querySelector('#stockSector').textContent = stock.sector;
    document.querySelector('#stockIndustry').textContent = stock.subIndustry;
    document.querySelector('#stockAddress').textContent = stock.address;
    document.querySelector('#logo').src = "logos/" + symbol + ".svg";
  });

  // ===== DELETE USER =====
  document.querySelector('#delete').addEventListener('click', function (event) {
    event.preventDefault();

    const id = document.querySelector('#userID').value;

    for (let i = 0; i < userData.length; i++) {
      if (userData[i].id == id) {
        userData.splice(i, 1);
        break;
      }
    }

    showUsers();
    document.querySelector('form').reset();
    portfolioList.innerHTML = '';
  });

  // ===== SAVE USER =====
  document.querySelector('#save').addEventListener('click', function (event) {
    event.preventDefault();

    const id = document.querySelector('#userID').value;

    for (let i = 0; i < userData.length; i++) {
      if (userData[i].id == id) {

        userData[i].user.firstname = document.querySelector('#firstname').value;
        userData[i].user.lastname = document.querySelector('#lastname').value;
        userData[i].user.address = document.querySelector('#address').value;
        userData[i].user.city = document.querySelector('#city').value;
        userData[i].user.email = document.querySelector('#email').value;

        break;
      }
    }

    showUsers();
  });

});