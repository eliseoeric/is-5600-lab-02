document.addEventListener('DOMContentLoaded', () => {

    const stocksData = JSON.parse(stockContent);
    const userData = JSON.parse(userContent);

    generateUserList(userData, stocksData);

    const saveButton = document.querySelector('#save');
    const deleteButton = document.querySelector('#delete');

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

    deleteButton.addEventListener('click', (e) => {
        e.preventDefault();

        const id = document.querySelector('#userID').value;

        const index = userData.findIndex(u => u.id == id);

        if (index !== -1) {
            userData.splice(index, 1);
            generateUserList(userData, stocksData);
        }
    });

});
function generateUserList(users, stocks) {
    const userList = document.querySelector('.user-list');
    userList.innerHTML = '';

    users.forEach(({ user, id }) => {
        const li = document.createElement('li');
        li.innerText = `${user.lastname}, ${user.firstname}`;
        li.id = id;
        userList.appendChild(li);
    });

    userList.addEventListener('click', (e) => {
        handleUserListClick(e, users, stocks);
    });
}
function handleUserListClick(event, users, stocks) {
    const id = event.target.id;
    const user = users.find(u => u.id == id);

    if (user) {
        populateForm(user);
        renderPortfolio(user, stocks);
    }
}
function populateForm(data) {
    document.querySelector('#userID').value = data.id;
    document.querySelector('#firstname').value = data.user.firstname;
    document.querySelector('#lastname').value = data.user.lastname;
    document.querySelector('#address').value = data.user.address;
    document.querySelector('#city').value = data.user.city;
    document.querySelector('#email').value = data.user.email;
}
function renderPortfolio(user, stocks) {
    const portfolioDetails = document.querySelector('.portfolio-list');
    portfolioDetails.innerHTML = '';

    user.portfolio.forEach(item => {
        const symbol = document.createElement('p');
        const owned = document.createElement('p');
        const btn = document.createElement('button');

        symbol.innerText = item.symbol;
        owned.innerText = item.owned;
        btn.innerText = 'View';
        btn.id = item.symbol;

        portfolioDetails.appendChild(symbol);
        portfolioDetails.appendChild(owned);
        portfolioDetails.appendChild(btn);
    });

    portfolioDetails.addEventListener('click', (e) => {
        if (e.target.tagName === 'BUTTON') {
            viewStock(e.target.id, stocks);
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
