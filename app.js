document.addEventListener('DOMContentLoaded', () => {
    // Load the provided JSON data
    const stocksData = JSON.parse(stockContent);
    let userData = JSON.parse(userContent);

    // Get the main dashboard elements
    const userList = document.querySelector('.user-list');
    const portfolioDetails = document.querySelector('.portfolio-list');
    const stockArea = document.querySelector('.stock-form');

    // Find buttons using their IDs or visible text
    function findButton(ids, text) {
        let button = document.querySelector(ids);

        if (!button) {
            button = Array.from(document.querySelectorAll('button'))
                .find(btn => btn.textContent.trim().toLowerCase() === text);
        }

        return button;
    }

    const saveButton = findButton(
        '#saveButton, #save, #saveUser, [name="save"]',
        'save'
    );

    const deleteButton = findButton(
        '#deleteButton, #delete, #deleteUser, [name="delete"]',
        'delete'
    );

    // Generate the list of users
    function generateUserList(users) {
        userList.innerHTML = '';

        users.forEach(({ user, id }) => {
            const listItem = document.createElement('li');

            listItem.textContent =
                user.lastname + ', ' + user.firstname;

            listItem.setAttribute('id', id);
            userList.appendChild(listItem);
        });
    }

    // Populate the form with the selected user's information
    function populateForm(data) {
        if (!data) return;

        const { user, id } = data;

        document.querySelector('#userID').value = id;
        document.querySelector('#firstname').value = user.firstname;
        document.querySelector('#lastname').value = user.lastname;
        document.querySelector('#address').value = user.address;
        document.querySelector('#city').value = user.city;
        document.querySelector('#email').value = user.email;
    }

    // Display the selected user's stock portfolio
    function renderPortfolio(user, stocks) {
        portfolioDetails.innerHTML = '';

        if (!user || !user.portfolio) return;

        user.portfolio.forEach(({ symbol, owned }) => {
            const symbolEl = document.createElement('p');
            const sharesEl = document.createElement('p');
            const viewButton = document.createElement('button');

            symbolEl.textContent = symbol;
            sharesEl.textContent = owned;
            viewButton.textContent = 'View';
            viewButton.setAttribute('id', symbol);
            viewButton.type = 'button';

            portfolioDetails.appendChild(symbolEl);
            portfolioDetails.appendChild(sharesEl);
            portfolioDetails.appendChild(viewButton);
        });
    }

    // Display information about the selected stock
    function viewStock(symbol, stocks) {
        const stock = stocks.find(
            item => item.symbol === symbol
        );

        if (!stock) {
            console.error('Stock not found:', symbol);
            return;
        }

        if (stockArea) {
            stockArea.style.display = '';
        }

        document.querySelector('#stockName').textContent =
            stock.name || '';

        document.querySelector('#stockSector').textContent =
            stock.sector || '';

        document.querySelector('#stockIndustry').textContent =
            stock.subIndustry || '';

        document.querySelector('#stockAddress').textContent =
            stock.address || '';

        const logo = document.querySelector('#logo');

        if (logo) {
            logo.src = `logos/${symbol}.svg`;
            logo.alt = `${symbol} logo`;

            logo.onerror = function () {
                this.style.display = 'none';
            };

            logo.style.display = '';
        }
    }

    // Handle clicks on the user list
    userList.addEventListener('click', event => {
        const clickedItem = event.target.closest('li');

        if (!clickedItem || !userList.contains(clickedItem)) {
            return;
        }

        const selectedUser = userData.find(
            user => String(user.id) === clickedItem.id
        );

        if (!selectedUser) return;

        populateForm(selectedUser);
        renderPortfolio(selectedUser, stocksData);
    });

    // Handle clicks on portfolio View buttons
    portfolioDetails.addEventListener('click', event => {
        const button = event.target.closest('button');

        if (!button || !portfolioDetails.contains(button)) {
            return;
        }

        viewStock(button.id, stocksData);
    });

    // Save changes to the selected user's information
    if (saveButton) {
        saveButton.addEventListener('click', event => {
            event.preventDefault();

            const id = document.querySelector('#userID').value;

            const selectedUser = userData.find(
                user => String(user.id) === String(id)
            );

            if (!selectedUser) {
                alert('Please select a user first.');
                return;
            }

            selectedUser.user.firstname =
                document.querySelector('#firstname').value;

            selectedUser.user.lastname =
                document.querySelector('#lastname').value;

            selectedUser.user.address =
                document.querySelector('#address').value;

            selectedUser.user.city =
                document.querySelector('#city').value;

            selectedUser.user.email =
                document.querySelector('#email').value;

            // Refresh the user list and keep the selected user visible
            generateUserList(userData);
            populateForm(selectedUser);

            alert('User information updated successfully.');
        });
    } else {
        console.warn('Save button not found. Check its HTML selector.');
    }

    // Delete the selected user
    if (deleteButton) {
        deleteButton.addEventListener('click', event => {
            event.preventDefault();

            const id = document.querySelector('#userID').value;

            if (id === '') {
                alert('Please select a user first.');
                return;
            }

            const userIndex = userData.findIndex(
                user => String(user.id) === String(id)
            );

            if (userIndex === -1) {
                alert('User not found.');
                return;
            }

            userData.splice(userIndex, 1);

            // Refresh the user list and clear the dashboard
            generateUserList(userData);

            document.querySelector('#userID').value = '';
            document.querySelector('#firstname').value = '';
            document.querySelector('#lastname').value = '';
            document.querySelector('#address').value = '';
            document.querySelector('#city').value = '';
            document.querySelector('#email').value = '';

            portfolioDetails.innerHTML = '';

            if (stockArea) {
                stockArea.style.display = 'none';
            }

            alert('User deleted successfully.');
        });
    } else {
        console.warn('Delete button not found. Check its HTML selector.');
    }

    // Initially hide stock information until a stock is selected
    if (stockArea) {
        stockArea.style.display = 'none';
    }

    // Render the initial user list
    generateUserList(userData);
});


