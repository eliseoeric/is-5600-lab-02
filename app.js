document.addEventListener('DOMContentLoaded', () => {
    const stocksData = JSON.parse(stockContent);
    const userData = JSON.parse(userContent);

    generateUserList(userData, stocksData);
    const deleteButton = document.querySelector('#btnDelete');
    const saveButton = document.querySelector('#btnSave');

    deleteButton.addEventListener('click', (event) => {
        event.preventDefault();
    
        const userId = document.querySelector('#userID').value;
        const userIndex = userData.findIndex(user => user.id == userId);
        
        if (userIndex !== -1) {  // Check if user is found
            userData.splice(userIndex, 1);
            generateUserList(userData, stocksData);
        } else {
            console.error("User not found for deletion.");
        }
    });

    saveButton.addEventListener('click', (event) => {
        event.preventDefault();
        const id = document.querySelector('#userID').value;
        const userIndex = userData.findIndex(user => user.id == id);
        
        if (userIndex !== -1) {
            const newUsers = [
                ...userData.slice(0, userIndex),
                {
                    ...userData[userIndex],
                    user: {
                        firstname: document.querySelector('#firstname').value,
                        lastname: document.querySelector('#lastname').value,
                        address: document.querySelector('#address').value,
                        city: document.querySelector('#city').value,
                        email: document.querySelector('#email').value,
                    },
                },
                ...userData.slice(userIndex + 1)
            ];
            generateUserList(newUsers, stocksData);
        } else {
            console.error("User not found for updating.");
        }
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
        } else {
            console.error("User not found.");
        }
    }

    function renderPortfolio(user, stocks) {
        const { portfolio } = user;
        const portfolioDetails = document.querySelector('.portfolio-list');
        portfolioDetails.innerHTML = '';

        portfolio?.forEach(({ symbol, owned }) => {
            const symbolEl = document.createElement('p');
            const sharesEl = document.createElement('p');
            const actionEl = document.createElement('button');
            symbolEl.innerText = symbol;
            sharesEl.innerText = owned;
            actionEl.innerText = 'View';
            actionEl.setAttribute('id', symbol);
            actionEl.classList.add('view-button');
            portfolioDetails.appendChild(symbolEl);
            portfolioDetails.appendChild(sharesEl);
            portfolioDetails.appendChild(actionEl);
        });

        portfolioDetails.addEventListener('click', (event) => {
            if (event.target.tagName === 'BUTTON' && event.target.classList.contains('view-button')) {
                viewStock(event.target.id, stocks);
            }
        });
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

    function viewStock(symbol, stocks) {
        const stockArea = document.querySelector('.stock-form');
        if (stockArea) {
            const stock = stocks.find(s => s.symbol == symbol);
            if (stock) {
                document.querySelector('#stockName').textContent = stock.name;
                document.querySelector('#stockSector').textContent = stock.sector;
                document.querySelector('#stockIndustry').textContent = stock.subIndustry;
                document.querySelector('#stockAddress').textContent = stock.address;
                document.querySelector('#logo').src = `logos/${symbol}.svg`; // Use template literals
            } else {
                console.error("Stock not found.");
            }
        }
    }
});
