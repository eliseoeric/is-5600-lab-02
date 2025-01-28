
/* add your code here */
document.addEventListener('DOMContentLoaded', () => {
    const stocksData = JSON.parse(stockContent); // Ensure stockContent is defined
    const userData = JSON.parse(userContent);    // Ensure userContent is defined
    const deleteButton = document.querySelector('#btnDelete');
    const saveButton = document.querySelector('#btnSave');

    generateUserList(userData);

    // Event listener for delete button
    deleteButton.addEventListener('click', (event) => {
        event.preventDefault();
        const userId = document.querySelector('#userID').value;
        const userIndex = userData.findIndex(user => user.id == userId);

        if (userIndex > -1) { // Ensure the user exists
            userData.splice(userIndex, 1);
            generateUserList(userData); // Update user list after deletion
        }
    });

    // Event listener for save button
    saveButton.addEventListener('click', (event) => {
        event.preventDefault();
        const id = document.querySelector('#userID').value;

        for (let i = 0; i < userData.length; i++) {
            if (userData[i].id == id) {
                userData[i].user.firstname = document.querySelector('#firstname').value;
                userData[i].user.lastname = document.querySelector('#lastname').value;
                userData[i].user.address = document.querySelector('#address').value;
                userData[i].user.city = document.querySelector('#city').value;
                userData[i].user.email = document.querySelector('#email').value;

                generateUserList(userData); // Refresh user list after update
            }
        }
    });

    // Function to generate the user list
    function generateUserList(users) {
        const userList = document.querySelector('.user-list');
        userList.innerHTML = ''; // Clear list

        users.map(({ user, id }) => {
            const listItem = document.createElement('li');
            listItem.innerText = `${user.lastname}, ${user.firstname}`;
            listItem.setAttribute('id', id);
            userList.appendChild(listItem);
        });
    }

    document.querySelector('.user-list').addEventListener('click', (event) => handleUserListClick(event, userData, stocksData));

    // Function to handle click on user list
    function handleUserListClick(event, users, stocks) {
        const userId = event.target.id;
        const user = users.find(user => user.id == userId);

        if (user) { // Ensure the user exists
            populateForm(user);
            renderPortfolio(user, stocks);
        }
    }

    // Function to render the user portfolio
    function renderPortfolio(user, stocks) {
        const { portfolio } = user;
        const portfolioDetails = document.querySelector('.portfolio-list');
        portfolioDetails.innerHTML = ''; // Clear previous items

        portfolio.map(({ symbol, owned }) => {
            const symbolEl = document.createElement('p');
            const sharesEl = document.createElement('p');
            const actionEl = document.createElement('button');

            symbolEl.innerText = symbol;
            sharesEl.innerText = owned;
            actionEl.innerText = 'View';
            actionEl.setAttribute('id', symbol);

            portfolioDetails.appendChild(symbolEl);
            portfolioDetails.appendChild(sharesEl);
            portfolioDetails.appendChild(actionEl);
        });
    }

    document.querySelector('.portfolio-list').addEventListener('click', (event) => {
        if (event.target.tagName === 'BUTTON') {
            viewStock(event.target.id, stocksData);
        }
    });

    // Function to populate the form with selected user data
    function populateForm(data) {
        const { user, id } = data;
        document.querySelector('#userID').value = id;
        document.querySelector('#firstname').value = user.firstname;
        document.querySelector('#lastname').value = user.lastname;
        document.querySelector('#address').value = user.address;
        document.querySelector('#city').value = user.city;
        document.querySelector('#email').value = user.email;
    }

    // Function to view stock details
    function viewStock(symbol, stocks) {
        const stockArea = document.querySelector('.stock-form');
        if (stockArea) {
            const stock = stocks.find(s => s.symbol == symbol);

            if (stock) { // Ensure the stock exists
                document.querySelector('#stockName').textContent = stock.name;
                document.querySelector('#stockSector').textContent = stock.sector;
                document.querySelector('#stockIndustry').textContent = stock.subIndustry;
                document.querySelector('#stockAddress').textContent = stock.address;
                document.querySelector('#logo').src = `logos/${symbol}.svg`; // Use template literal here
            } else {
                console.error(`Stock with symbol ${symbol} not found`);
            }
        }
    }
});