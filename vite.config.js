export default {
  server: {
    host: '0.0.0.0',
    hmr: {
      clientPort: 443,
    }
  }
}
// Sample data for users and stocks
const users = [
  { id: 1, name: 'Alice', portfolio: [{ stock: 'AAPL', shares: 10 }, { stock: 'GOOGL', shares: 5 }] },
  { id: 2, name: 'Bob', portfolio: [{ stock: 'MSFT', shares: 15 }] },
];

const stocks = {
  AAPL: { name: 'Apple Inc.', price: 150 },
  GOOGL: { name: 'Alphabet Inc.', price: 2800 },
  MSFT: { name: 'Microsoft Corp.', price: 300 },
};

// DOM Elements
const userList = document.getElementById('users');
const stockList = document.getElementById('stocks');
const stockDetails = document.getElementById('stock-details');
const userNameInput = document.getElementById('user-name');
const saveUser Button = document.getElementById('save-user');
const deleteUser Button = document.getElementById('delete-user');

let selectedUser  = null;

// Function to render users
function renderUsers() {
  userList.innerHTML = '';
  users.forEach(user => {
      const li = document.createElement('li');
      li.textContent = user.name;
      li.dataset.id = user.id;
      li.addEventListener('click', () => selectUser (user.id));
      userList.appendChild(li);
  });
}

// Function to render stocks for the selected user
function renderStocks() {
  if (!selectedUser ) return;
  const user = users.find(u => u.id === selectedUser );
  stockList.innerHTML = '';
  user.portfolio.forEach(stock => {
      const li = document.createElement('li');
      li.textContent = `${stock.stock} (${stock.shares} shares)`;
      li.dataset.stock = stock.stock;
      li.addEventListener('click', () => showStockInfo(stock.stock));
      stockList.appendChild(li);
  });
}

// Function to show stock information
function showStockInfo(stockSymbol) {
  const stock = stocks[stockSymbol];
  if (stock) {
      stockDetails.innerHTML = `<h3>${stock.name}</h3><p>Price: $${stock.price}</p>`;
  }
}

// Function to select a user
function selectUser (userId) {
  selectedUser  = userId;
  renderStocks();
}

// Function to save user information
saveUser Button.addEventListener('click', () => {
  if (selectedUser ) {
      const user = users.find(u => u.id === selectedUser );
      user.name = userNameInput.value;
      renderUsers();
      userNameInput.value = '';
  }
});

// Function to delete a user
deleteUser Button.addEventListener('click', () => {
  if (selectedUser ) {
      const userIndex = users.findIndex(u => u.id === selectedUser );
      if (userIndex > -1) {
          users.splice(userIndex, 1);
          selectedUser  = null;
          stockList.innerHTML = '';
          stockDetails.innerHTML = '';
          renderUsers();
      }
  }
});

// Initial render
renderUsers();