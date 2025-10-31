/* add your code here */
document.addEventListener('DOMContentLoaded', () => {
  const stocksData = JSON.parse(stockContent);
  const userData = JSON.parse(userContent);

  const deleteButton = document.querySelector('#deleteUser');
  const saveButton = document.querySelector('#saveUser');

  generateUserList(userData, stocksData);

  function generateUserList(users, stocks) {
    const userList = document.querySelector('.user-list');
    userList.innerHTML = '';

    users.forEach(({ user, id }) => {
      const li = document.createElement('li');
      li.innerHTML = `
        <div style="
          background: linear-gradient(90deg, #2193b0, #6dd5ed);
          color: white;
          padding: 8px;
          margin: 5px 0;
          border-radius: 8px;
          cursor: pointer;
          box-shadow: 0 2px 5px rgba(0,0,0,0.1);
          transition: transform 0.2s;
        ">
          <strong>${user.firstname} ${user.lastname}</strong>
        </div>`;
      li.id = id;
      li.addEventListener('mouseenter', () => li.firstElementChild.style.transform = 'scale(1.05)');
      li.addEventListener('mouseleave', () => li.firstElementChild.style.transform = 'scale(1)');
      userList.appendChild(li);
    });

    userList.addEventListener('click', (e) => handleUserListClick(e, users, stocks));
  }

  function handleUserListClick(e, users, stocks) {
    const id = e.target.closest('li')?.id;
    if (!id) return;
    const user = users.find(u => u.id == id);
    populateForm(user);
    renderPortfolio(user, stocks);
  }

  function populateForm({ user, id }) {
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
      const card = document.createElement('div');
      card.className = 'portfolio-item';
      card.style.cssText = `
        background: white;
        border-radius: 10px;
        box-shadow: 0 3px 6px rgba(0,0,0,0.1);
        padding: 10px;
        margin-bottom: 10px;
        transition: transform 0.2s, box-shadow 0.2s;
      `;
      card.innerHTML = `
        <h4 style="color:#007bff">${symbol}</h4>
        <p><b>Shares:</b> ${owned}</p>
        <button id="${symbol}" style="
          background:#007bff;
          color:white;
          border:none;
          border-radius:5px;
          padding:5px 10px;
          cursor:pointer;
        ">View</button>
      `;
      card.addEventListener('mouseenter', () => card.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)');
      card.addEventListener('mouseleave', () => card.style.boxShadow = '0 3px 6px rgba(0,0,0,0.1)');
      container.appendChild(card);
    });

    container.addEventListener('click', (e) => {
      if (e.target.tagName === 'BUTTON') viewStock(e.target.id, stocks);
    });
  }

  function viewStock(symbol, stocks) {
    const stock = stocks.find(s => s.symbol === symbol);
    if (!stock) return;
    document.querySelector('#stockName').textContent = stock.name;
    document.querySelector('#stockSector').textContent = stock.sector;
    document.querySelector('#stockIndustry').textContent = stock.subIndustry;
    document.querySelector('#stockAddress').textContent = stock.address;
    document.querySelector('#logo').src = `logos/${symbol}.svg`;
  }

  deleteButton.addEventListener('click', (e) => {
    e.preventDefault();
    const id = document.querySelector('#userID').value;
    const index = userData.findIndex(u => u.id == id);
    if (index > -1) {
      userData.splice(index, 1);
      generateUserList(userData, stocksData);
      toast('User deleted 🗑️', '#ff5e57');
    }
  });

  saveButton.addEventListener('click', (e) => {
    e.preventDefault();
    const id = document.querySelector('#userID').value;
    const u = userData.find(x => x.id == id);
    if (u) {
      u.user.firstname = document.querySelector('#firstname').value;
      u.user.lastname = document.querySelector('#lastname').value;
      u.user.address = document.querySelector('#address').value;
      u.user.city = document.querySelector('#city').value;
      u.user.email = document.querySelector('#email').value;
      generateUserList(userData, stocksData);
      toast('Changes saved 💾', '#28a745');
    }
  });

  // Small toast notification
  function toast(msg, color = '#007bff') {
    const note = document.createElement('div');
    note.textContent = msg;
    note.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: ${color};
      color: white;
      padding: 10px 20px;
      border-radius: 8px;
      box-shadow: 0 2px 5px rgba(0,0,0,0.2);
      z-index: 9999;
      animation: fadeOut 3s forwards;
    `;
    document.body.appendChild(note);
    setTimeout(() => note.remove(), 3000);
  }
});

