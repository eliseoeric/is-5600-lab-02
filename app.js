document.addEventListener('DOMContentLoaded', () => {
    // Parse initial data
    const stocksData = JSON.parse(stockContent);
    const userData = JSON.parse(userContent);

    const deleteButton = document.querySelector('#btnDelete');
    const saveButton = document.querySelector('#btnSave');

    // Initialize the user list
    renderUserList(userData);

    // Delete user event
    deleteButton.addEventListener('click', (event) => {
        event.preventDefault();
        const userId = document.querySelector('#userID').value;
        deleteUser(userId);
    });

    // Save user event
    saveButton.addEventListener('click', (event) => {
        event.preventDefault();
        saveUser();
    });

    // Render the user list
    function renderUserList(users) {
        const userList = document.querySelector('.user-list');
        userList.innerHTML = ''; // Clear existing items

        users.forEach(({ user, id }) => {
            const listItem = document.createElement('li');
            listItem.textContent = `${user.lastname}, ${user.firstname}`;
            listItem.dataset.id = id;
            userList.appendChild(listItem);
        });

        // Attach click event to each list item for showing user and portfolio details
        userList.addEventListener('click', (event) => {
            if (event.target.tagName === 'LI') {
                const userId = event.target.dataset.id;
                const selectedUser = userData.find(u => u.id == userId);
                if (selectedUser) {
                    populateForm(selectedUser);
                    renderPortfolio(selectedUser);
                }
            }
        });
    }

    // Populate the form with selected user data
    function populateForm({ user, id }) {
        document.querySelector('#userID').value = id;
        document.querySelector('#firstname').value = user.firstname;
        document.querySelector('#lastname').value = user.lastname;
        document.querySelector('#address').value = user.address;
        document.querySelector('#city').value = user.city;
        document.querySelector('#email').value = user.email;
    }

    // Delete user from the list
    function deleteUser(userId) {
        const userIndex = userData.findIndex(user => user.id == userId);
        if (userIndex !== -1) {
            userData.splice(userIndex, 1);
            renderUserList(userData); // Update the list
        }
    }

    // Save updated user information
    function saveUser() {
        const id = document.querySelector('#userID').value;
        const userIndex = userData.findIndex(user => user.id == id);

        if (userIndex !== -1) {
            userData[userIndex].user = {
                firstname: document.querySelector('#firstname').value,
                lastname: document.querySelector('#lastname').value,
                address: document.querySelector('#address').value,
                city: document.querySelector('#city').value,
                email: document.querySelector('#email').value,
            };
            renderUserList(userData); // Refresh the user list
        }
    }

    // Render portfolio for selected user
    function renderPortfolio({ portfolio }) {
        const portfolioList = document.querySelector('.portfolio-list');
        portfolioList.innerHTML = ''; // Clear previous portfolio items

        portfolio.forEach(({ symbol, owned }) => {
            const symbolEl = document.createElement('p');
            const sharesEl = document.createElement('p');
            const viewButton = document.createElement('button');
            
            symbolEl.textContent = `Symbol: ${symbol}`;
            sharesEl.textContent = `Shares: ${owned}`;
            viewButton.textContent = 'View';
            viewButton.dataset.symbol = symbol;

            portfolioList.appendChild(symbolEl);
            portfolioList.appendChild(sharesEl);
            portfolioList.appendChild(viewButton);
        });

        portfolioList.addEventListener('click', (event) => {
            if (event.target.tagName === 'BUTTON') {
                const stockSymbol = event.target.dataset.symbol;
                viewStock(stockSymbol);
            }
        });
    }

    // Display stock details based on selected symbol
    function viewStock(symbol) {
        const stockInfo = stocksData.find(stock => stock.symbol === symbol);
        if (stockInfo) {
            document.querySelector('#stockName').textContent = stockInfo.name;
            document.querySelector('#stockSector').textContent = stockInfo.sector;
            document.querySelector('#stockIndustry').textContent = stockInfo.subIndustry;
            document.querySelector('#stockAddress').textContent = stockInfo.address;
            document.querySelector('#logo').src = `logos/${symbol}.svg`;
        }
    }
});
