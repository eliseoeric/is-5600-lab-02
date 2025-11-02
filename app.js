/**
 * Populates the form with the user's data (from Step 6)
 * @param {*} user 
 */
function populateForm(data) {
    // use destructuring to get the user and id from the data object
    const { user, id } = data;
    document.querySelector('#userID').value = id;
    document.querySelector('#firstname').value = user.firstname;
    document.querySelector('#lastname').value = user.lastname;
    document.querySelector('#address').value = user.address;
    document.querySelector('#city').value = user.city;
    document.querySelector('#email').value = user.email;
}

/**
 * Renders the stock information for the symbol (from Step 8)
 * @param {*} symbol 
 */
function viewStock(symbol, stocks) {
    // begin by hiding the stock area until a stock is viewed
    const stockArea = document.querySelector('.stock-form');
    if (stockArea) {
        // find the stock object for this symbol
        const stock = stocks.find(function (s) { return s.symbol == symbol; });

        document.querySelector('#stockName').textContent = stock.name;
        document.querySelector('#stockSector').textContent = stock.sector;
        document.querySelector('#stockIndustry').textContent = stock.subIndustry;
        document.querySelector('#stockAddress').textContent = stock.address;

        document.querySelector('#logo').src = `logos/${symbol}.svg`;
    }
}

/**
 * Renders the portfolio items for the user (from Step 7, updated with click handler in Step 8)
 * @param {*} user 
 */
function renderPortfolio(user, stocks) {
    // get the user's stock data
    const { portfolio } = user;
    // get the portfolio list element
    const portfolioDetails = document.querySelector('.portfolio-list');
    // clear the list from previous render
    portfolioDetails.innerHTML = '';
    // map over portfolio items and render them
    portfolio.map(({ symbol, owned }) => {
        // create a list item and append it to the list
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

    // register the event listener on the list
    portfolioDetails.addEventListener('click', (event) => {
        // let's make sure we only handle clicks on the buttons
        if (event.target.tagName === 'BUTTON') {
            viewStock(event.target.id, stocks);
        }
    });
}

/**
 * Handles the click event on the user list (from Step 6, updated in Step 7)
 * @param {*} event 
 */
function handleUserListClick(event, users, stocks) { // Added stocks parameter
    // get the user id from the list item
    const userId = event.target.id;
    // find the user in the userData array
    // we use a "truthy" comparison here because the user id is a number and the event target id is a string
    const user = users.find(user => user.id == userId);
    // populate the form with the user's data
    populateForm(user);
    // render the portfolio items for the user (Step 7 addition)
    renderPortfolio(user, stocks);
}

/**
 * Loops through the users and renders a ul with li elements for each user (from Step 5, updated in Step 7 and 9)
 * @param {*} users 
 */
function generateUserList(users, stocks) { // Updated to accept stocks
    // get the list element and for each user create a list item and append it to the list
    const userList = document.querySelector('.user-list');
    // clear out the list from previous render (Step 9 addition)
    userList.innerHTML = '';
    users.map(({ user, id }) => {
        const listItem = document.createElement('li');
        listItem.innerText = user.lastname + ', ' + user.firstname;
        listItem.setAttribute('id', id);
        userList.appendChild(listItem);
    });

    // register the event listener on the list (Step 6 addition, updated in Step 7)
    userList.addEventListener('click', (event) => handleUserListClick(event, users, stocks));
}

// DOMContentLoaded event handler (Steps 3, 4, 7, 9)
document.addEventListener('DOMContentLoaded', () => {
    // 4. Access and parse the JSON data
    const stocksData = JSON.parse(stockContent);
    const userData = JSON.parse(userContent);

    // Initial call to render the user list (updated in step 7)
    generateUserList(userData, stocksData);

    // Get buttons for event registration
    const deleteButton = document.querySelector('#btnDelete');
    const saveButton = document.querySelector('#btnSave');


    // Register the event listener on the delete button (Step 9)
    deleteButton.addEventListener('click', (event) => {
        // we don't want the form to submit (since we will lose form state)
        event.preventDefault();

        // find the index of the user in the data array 
        const userId = document.querySelector('#userID').value;
        const userIndex = userData.findIndex(user => user.id == userId);
        // remove the user from the array
        userData.splice(userIndex, 1);
        // render the user list
        generateUserList(userData, stocksData);
    });

    // Register the event listener on the save button (Step 9)
    saveButton.addEventListener('click', (event) => {
        // we don't want the form to submit (since we will lose form state)
        // Note: The original prompt snippet used 'e.preventDefault()' and 'users', 
        // which has been corrected here to 'event.preventDefault()' and 'userData' for runnability.
        event.preventDefault();

        // find the user object in our data
        const id = document.querySelector('#userID').value;

        for (let i = 0; i < userData.length; i++) {
            // found relevant user, so update object at this index and redisplay
            if (userData[i].id == id) {

                userData[i].user.firstname = document.querySelector('#firstname').value;
                userData[i].user.lastname = document.querySelector('#lastname').value;
                userData[i].user.address = document.querySelector('#address').value;
                userData[i].user.city = document.querySelector('#city').value;
                userData[i].user.email = document.querySelector('#email').value;

                generateUserList(userData, stocksData);
            }
        }
    });
});
