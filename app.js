

/**
* @param {*} data
 */
function populateForm(data) {
	if (!data) return;
	const { user, id } = data;
	const q = (sel) => document.querySelector(sel);
	q('#userID').value = id;
	q('#firstname').value = user.firstname || '';
	q('#lastname').value = user.lastname || '';
	q('#address').value = user.address || '';
	q('#city').value = user.city || '';
	q('#email').value = user.email || '';
}

/**
 * Renders the stock information for the symbol
 * @param {string} symbol
 * @param {Array} stocks
 */
function viewStock(symbol, stocks) {
	const stockArea = document.querySelector('.stock-form');
	if (!stockArea) return;
	const stock = stocks.find((s) => s.symbol == symbol);
	if (!stock) {
		document.querySelector('#stockName').textContent = 'N/A';
		document.querySelector('#stockSector').textContent = '';
		document.querySelector('#stockIndustry').textContent = '';
		document.querySelector('#stockAddress').textContent = '';
		document.querySelector('#logo').src = '';
		return;
	}

	document.querySelector('#stockName').textContent = stock.name || '';
	document.querySelector('#stockSector').textContent = stock.sector || '';
	document.querySelector('#stockIndustry').textContent = stock.subIndustry || '';
	document.querySelector('#stockAddress').textContent = stock.address || '';

	const logoEl = document.querySelector('#logo');
	if (logoEl) logoEl.src = `logos/${symbol}.svg`;
}

/**
 * Renders the portfolio items for the user
 * @param {*} userDataItem
 * @param {Array} stocks
 */
function renderPortfolio(userDataItem, stocks) {
	if (!userDataItem) return;
	const { portfolio } = userDataItem;
	const portfolioDetails = document.querySelector('.portfolio-list');
	if (!portfolioDetails) return;
	portfolioDetails.innerHTML = '';

	portfolio.map(({ symbol, owned }) => {
		const wrapper = document.createElement('div');
		wrapper.className = 'portfolio-row';

		const symbolEl = document.createElement('p');
		symbolEl.innerText = symbol;
		symbolEl.className = 'portfolio-symbol';

		const sharesEl = document.createElement('p');
		sharesEl.innerText = owned;
		sharesEl.className = 'portfolio-shares';

		const actionEl = document.createElement('button');
		actionEl.innerText = 'View';
		actionEl.setAttribute('id', symbol);
		actionEl.className = 'view-stock-btn';

		wrapper.appendChild(symbolEl);
		wrapper.appendChild(sharesEl);
		wrapper.appendChild(actionEl);

		portfolioDetails.appendChild(wrapper);
	});

	portfolioDetails.addEventListener('click', (event) => {
		if (event.target && event.target.tagName === 'BUTTON') {
			viewStock(event.target.id, stocks);
		}
	});
}

/**
 * Handles the click event on the user list
 * @param {*} event
 * @param {Array} users
 * @param {Array} stocks
 */
function handleUserListClick(event, users, stocks) {
	const userId = event.target.id;
	const user = users.find((u) => u.id == userId);
	if (!user) return;
	populateForm(user);
	renderPortfolio(user, stocks);
}

/**
 * Loops through the users and renders a ul with li elements for each user
 * @param {Array} users
 * @param {Array} stocks
 */
function generateUserList(users, stocks) {
	const userList = document.querySelector('.user-list');
	if (!userList) return;
	userList.innerHTML = '';

	users.map(({ user, id }) => {
		const listItem = document.createElement('li');
		listItem.innerText = user.lastname + ', ' + user.firstname;
		listItem.setAttribute('id', id);
		userList.appendChild(listItem);
	});

	// register the event listener on the list (delegated)
	userList.addEventListener('click', (event) => handleUserListClick(event, users, stocks));
}

document.addEventListener('DOMContentLoaded', () => {
	// Parse data that is loaded via the script tags in index.html
	let stocksData = [];
	let userData = [];

	try {
		if (typeof stockContent !== 'undefined') stocksData = JSON.parse(stockContent);
	} catch (e) {
		console.error('Failed to parse stockContent', e);
	}

	try {
		if (typeof userContent !== 'undefined') userData = JSON.parse(userContent);
	} catch (e) {
		console.error('Failed to parse userContent', e);
	}

	// initial render of user list
	generateUserList(userData, stocksData);

	// Wire up save and delete buttons (they live in the form)
	const saveButton = document.querySelector('#save');
	const deleteButton = document.querySelector('#delete');

	if (deleteButton) {
		deleteButton.addEventListener('click', (event) => {
			event.preventDefault();
			const userId = document.querySelector('#userID').value;
			const userIndex = userData.findIndex((u) => u.id == userId);
			if (userIndex > -1) {
				userData.splice(userIndex, 1);
				generateUserList(userData, stocksData);
				// clear form and portfolio area
				populateForm({ user: { firstname: '', lastname: '', address: '', city: '', email: '' }, id: '' });
				const portfolioDetails = document.querySelector('.portfolio-list');
				if (portfolioDetails) portfolioDetails.innerHTML = '';
			}
		});
	}

	if (saveButton) {
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

					generateUserList(userData, stocksData);
					break;
				}
			}
		});
	}
});

