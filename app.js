document.addEventListener('DOMContentLoaded', () => {
    const stocksData = JSON.parse(stockContent);
    const userData = JSON.parse(userContent);

    // Function to generate the user list
    function generateUserList(users, stocks) {
        const userList = document.querySelector('.user-list');
        userList.innerHTML = '';

        users.forEach(user => {
            const listItem = document.createElement('li');
            listItem.textContent = `${user.user.lastname}, ${user.user.firstname}`;
            listItem.setAttribute('id', user.id);
            userList.appendChild(listItem);

            listItem.addEventListener('click', () => {
                populateForm(user);
                renderPortfolio(user, stocks);
            });
        });
    }

    // Function  to populate the user form
    function populateForm(user) {
        document.querySelector('#userID').value = user.id;
        document.querySelector('#firstname').value = user.user.firstname;
        document.querySelector('#lastname').value = user.user.lastname;
        document.querySelector('#address').value = user.user.address;
        document.querySelector('#city').value = user.user.city;
        document.querySelector('#email').value = user.user.email;
    }

    // Function to render the user's portfolio
    function renderPortfolio(user, stocks) {
        const portfolioList = document.querySelector('.portfolio-list');
        portfolioList.innerHTML = '';

        user.portfolio.forEach(stock => {
            const symbolEl = document.createElement('p');
            const sharesEl = document.createElement('p');
            const actionEl = document.createElement('button');

            symbolEl.textContent = stock.symbol;
            sharesEl.textContent = stock.owned;
            actionEl.textContent = 'View';
            actionEl.setAttribute('id', stock.symbol);

            portfolioList.appendChild(symbolEl);
            portfolioList.appendChild(sharesEl);
            portfolioList.appendChild(actionEl);

            actionEl.addEventListener('click', () => {
                viewStock(stock.symbol, stocks);
            });
        });
    }

    // Function to view stock details
    function viewStock(symbol, stocks) {
        const stockArea = document.querySelector('.stock-form');
        const stock = stocks.find(stock => stock.symbol === symbol);

        if (stock) {
            document.querySelector('#stockName').textContent = stock.name;
            document.querySelector('#stockSector').textContent = stock.sector;
            document.querySelector('#stockIndustry').textContent = stock.subIndustry;
            document.querySelector('#stockAddress').textContent = stock.address;
            document.querySelector('#logo').src = `logos/${symbol}.svg`;
        }
    }

    // Event listeners for delete and save buttons
    const deleteButton = document.getElementById('btnDelete');
    const saveButton = document.getElementById('btnSave');

    deleteButton.addEventListener('click', (event) => {
        event.preventDefault();
        const userId = document.querySelector('#userID').value;
        const userIndex = userData.findIndex(user => user.id == userId);
        userData.splice(userIndex, 1);
        generateUserList(userData, stocksData);
    });

    saveButton.addEventListener('click', (event) => {
        event.preventDefault();
        const userId = document.querySelector('#userID').value;

        userData.forEach(user => {
            if (user.id == userId) {
                user.user.firstname = document.querySelector('#firstname').value;
                user.user.lastname = document.querySelector('#lastname').value;
                user.user.address = document.querySelector('#address').value;
                user.user.city = document.querySelector('#city').value;
                user.user.email = document.querySelector('#email').value;
                generateUserList(userData, stocksData);
            }
        });
    });

    generateUserList(userData, stocksData);
  });