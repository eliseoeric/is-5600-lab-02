
document.addEventListener('DOMContentLoaded', () => {
    const stocksData = JSON.parse(stockContent);
    const userData = JSON.parse(userContent);

    const userList = document.querySelector('.user-list');
    const portfolioList = document.querySelector('.portfolio-list');

    const saveButton = document.querySelector('#btnSave');
    const deleteButton = document.querySelector('#btnDelete');

    // Display all users
    function generateUserList() {
        userList.innerHTML = '';

        userData.forEach(({ user, id }) => {
            const listItem = document.createElement('li');
            listItem.innerText = user.lastname + ', ' + user.firstname;
            listItem.setAttribute('id', id);
            userList.appendChild(listItem);
        });
    }

    // Fill the form with selected user's information
    function populateForm(data) {
        const { user, id } = data;

        document.querySelector('#userID').value = id;
        document.querySelector('#firstname').value = user.firstname;
        document.querySelector('#lastname').value = user.lastname;
        document.querySelector('#address').value = user.address;
        document.querySelector('#city').value = user.city;
        document.querySelector('#email').value = user.email;
    }

    // Display selected user's portfolio
    function renderPortfolio(data) {
        portfolioList.innerHTML = '';

        data.portfolio.forEach(({ symbol, owned }) => {
            const symbolEl = document.createElement('p');
            const sharesEl = document.createElement('p');
            const actionEl = document.createElement('button');

            symbolEl.innerText = symbol;
            sharesEl.innerText = owned;
            actionEl.innerText = 'View';
            actionEl.setAttribute('id', symbol);

            portfolioList.appendChild(symbolEl);
            portfolioList.appendChild(sharesEl);
            portfolioList.appendChild(actionEl);
        });
    }

    // Display information about a stock
    function viewStock(symbol) {
        const stock = stocksData.find(s => s.symbol === symbol);

        if (!stock) {
            return;
        }

        document.querySelector('#stockName').textContent = stock.name;
        document.querySelector('#stockSector').textContent = stock.sector;
        document.querySelector('#stockIndustry').textContent = stock.subIndustry;
        document.querySelector('#stockAddress').textContent = stock.address;
        document.querySelector('#logo').src = `logos/${symbol}.svg`;
    }

    // Select a user
    userList.addEventListener('click', (event) => {
        const listItem = event.target.closest('li');

        if (!listItem) {
            return;
        }

        const selectedUser = userData.find(
            item => item.id == listItem.id
        );

        if (selectedUser) {
            populateForm(selectedUser);
            renderPortfolio(selectedUser);
        }
    });

    // View stock details
    portfolioList.addEventListener('click', (event) => {
        if (event.target.tagName === 'BUTTON') {
            viewStock(event.target.id);
        }
    });

    // Save updated user information
    if (saveButton) {
        saveButton.addEventListener('click', (event) => {
            event.preventDefault();

            const userId = document.querySelector('#userID').value;

            const selectedUser = userData.find(
                item => item.id == userId
            );

            if (!selectedUser) {
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

            generateUserList();
        });
    }

    // Delete selected user
    if (deleteButton) {
        deleteButton.addEventListener('click', (event) => {
            event.preventDefault();

            const userId = document.querySelector('#userID').value;

            const userIndex = userData.findIndex(
                item => item.id == userId
            );

            if (userIndex === -1) {
                return;
            }

            userData.splice(userIndex, 1);

            generateUserList();

            portfolioList.innerHTML = '';

            document.querySelector('#userID').value = '';
            document.querySelector('#firstname').value = '';
            document.querySelector('#lastname').value = '';
            document.querySelector('#address').value = '';
            document.querySelector('#city').value = '';
            document.querySelector('#email').value = '';

            document.querySelector('#stockName').textContent = '';
            document.querySelector('#stockSector').textContent = '';
            document.querySelector('#stockIndustry').textContent = '';
            document.querySelector('#stockAddress').textContent = '';
            document.querySelector('#logo').removeAttribute('src');
        });
    }

    // Initial dashboard
    generateUserList();
});
