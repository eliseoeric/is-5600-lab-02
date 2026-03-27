/* Main Application Logic */

document.addEventListener('DOMContentLoaded', () => {
    const stocksData = JSON.parse(stockContent);
    const userData = JSON.parse(userContent);

    const deleteButton = document.querySelector('#btnDelete');
    const saveButton = document.querySelector('#btnSave');

    generateUserList(userData, stocksData);

    // ─── DELETE USER ──────────────────────────────────────────────
    deleteButton.addEventListener('click', (event) => {
        event.preventDefault();

        const userId = document.querySelector('#userID').value;
        const userIndex = userData.findIndex(user => user.id == userId);

        if (userIndex !== -1) {
            userData.splice(userIndex, 1);
            generateUserList(userData, stocksData);
            clearForm();
        } else {
            console.warn('No user found with ID:', userId);
        }
    });

    // ─── SAVE USER ────────────────────────────────────────────────
    saveButton.addEventListener('click', (event) => {
        event.preventDefault();

        const id = document.querySelector('#userID').value;
        const userIndex = userData.findIndex(user => user.id == id);

        if (userIndex !== -1) {
            const u = userData[userIndex].user;
            u.firstname = document.querySelector('#firstname').value;
            u.lastname  = document.querySelector('#lastname').value;
            u.address   = document.querySelector('#address').value;
            u.city      = document.querySelector('#city').value;
            u.email     = document.querySelector('#email').value;

            generateUserList(userData, stocksData);
        } else {
            console.warn('No user found with ID:', id);
        }
    });

    // ─── GENERATE USER LIST ───────────────────────────────────────
    // Use a named handler so we can remove + re-add cleanly (no stacking)
    function generateUserList(users, stocks) {
        const userList = document.querySelector('.user-list');
        userList.innerHTML = '';

        users.forEach(({ user, id }) => {
            const listItem = document.createElement('li');
            listItem.textContent = `${user.lastname}, ${user.firstname}`;
            listItem.setAttribute('id', id);
            userList.appendChild(listItem);
        });

        // Clone the node to remove all previously attached listeners before re-adding
        const freshUserList = userList.cloneNode(true);
        userList.parentNode.replaceChild(freshUserList, userList);
        freshUserList.addEventListener('click', (event) => {
            handleUserListClick(event, users, stocks);
        });
    }

    // ─── HANDLE USER LIST CLICK ───────────────────────────────────
    function handleUserListClick(event, users, stocks) {
        const userId = event.target.id;
        if (!userId) return; // clicked on the list container itself

        const user = users.find(u => u.id == userId);
        if (!user) return;

        populateForm(user);
        renderPortfolio(user, stocks);
    }

    // ─── RENDER PORTFOLIO ─────────────────────────────────────────
    function renderPortfolio(user, stocks) {
        const { portfolio } = user;
        const portfolioDetails = document.querySelector('.portfolio-list');
        portfolioDetails.innerHTML = '';

        portfolio.forEach(({ symbol, owned }) => {
            const symbolEl = document.createElement('p');
            const sharesEl = document.createElement('p');
            const actionEl = document.createElement('button');

            symbolEl.textContent = symbol;
            sharesEl.textContent = owned;
            actionEl.textContent = 'View';
            actionEl.setAttribute('id', symbol);

            portfolioDetails.appendChild(symbolEl);
            portfolioDetails.appendChild(sharesEl);
            portfolioDetails.appendChild(actionEl);
        });

        // Clone to prevent stacking click listeners on re-renders
        const freshPortfolio = portfolioDetails.cloneNode(true);
        portfolioDetails.parentNode.replaceChild(freshPortfolio, portfolioDetails);
        freshPortfolio.addEventListener('click', (event) => {
            if (event.target.tagName === 'BUTTON') {
                viewStock(event.target.id, stocks);
            }
        });
    }

    // ─── POPULATE FORM ────────────────────────────────────────────
    function populateForm(data) {
        const { user, id } = data;
        document.querySelector('#userID').value    = id;
        document.querySelector('#firstname').value = user.firstname;
        document.querySelector('#lastname').value  = user.lastname;
        document.querySelector('#address').value   = user.address;
        document.querySelector('#city').value      = user.city;
        document.querySelector('#email').value     = user.email;
    }

    // ─── CLEAR FORM ───────────────────────────────────────────────
    function clearForm() {
        ['#userID', '#firstname', '#lastname', '#address', '#city', '#email']
            .forEach(sel => document.querySelector(sel).value = '');
        document.querySelector('.portfolio-list').innerHTML = '';
    }

    // ─── VIEW STOCK ───────────────────────────────────────────────
    function viewStock(symbol, stocks) {
        const stockArea = document.querySelector('.stock-form');
        if (!stockArea) return;

        const stock = stocks.find(s => s.symbol === symbol);
        if (!stock) {
            console.warn('Stock not found:', symbol);
            return;
        }

        document.querySelector('#stockName').textContent     = stock.name;
        document.querySelector('#stockSector').textContent   = stock.sector;
        document.querySelector('#stockIndustry').textContent = stock.subIndustry;
        document.querySelector('#stockAddress').textContent  = stock.address;
        document.querySelector('#logo').src                  = `logos/${symbol}.svg`;
    }
});