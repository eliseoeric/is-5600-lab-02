// Wait for the DOM to fully load before running any code
document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // GET REFERENCES TO ALL HTML ELEMENTS
    // ============================================
    
    // User section elements
    const userSelect = document.getElementById('user-select');
    const userNameInput = document.getElementById('user-name');
    const userEmailInput = document.getElementById('user-email');
    const saveUserBtn = document.getElementById('save-user');
    const deleteUserBtn = document.getElementById('delete-user');
    
    // Stock section elements
    const stockSelect = document.getElementById('stock-select');
    const stockSymbolSpan = document.getElementById('stock-symbol');
    const stockNameSpan = document.getElementById('stock-name');
    const stockPriceSpan = document.getElementById('stock-price');
    
    // Portfolio display elements
    const portfolioTableBody = document.getElementById('portfolio-table-body');
    const portfolioTotalSpan = document.getElementById('portfolio-total');
    
    // ============================================
    // DISPLAY PORTFOLIO FOR SELECTED USER
    // ============================================
    
    function displayPortfolio(userId) {
        const selectedUser = users.find(user => user.id === parseInt(userId));
        
        if (!selectedUser) {
            portfolioTableBody.innerHTML = '';
            portfolioTotalSpan.textContent = '$0.00';
            return;
        }
        
        portfolioTableBody.innerHTML = '';
        let totalValue = 0;
        
        selectedUser.portfolio.forEach(holding => {
            const stockInfo = stocks.find(stock => stock.symbol === holding.symbol);
            
            if (stockInfo) {
                const value = stockInfo.price * holding.shares;
                totalValue += value;
                
                const row = portfolioTableBody.insertRow();
                row.insertCell(0).textContent = holding.symbol;
                row.insertCell(1).textContent = holding.shares;
                row.insertCell(2).textContent = `$${value.toFixed(2)}`;
                row.insertCell(3).textContent = `$${stockInfo.price.toFixed(2)}`;
            }
        });
        
        portfolioTotalSpan.textContent = `$${totalValue.toFixed(2)}`;
    }
    
    // ============================================
    // POPULATE DROPDOWN MENUS
    // ============================================
    
    function populateUserDropdown() {
        userSelect.innerHTML = '<option value="">-- Select a user --</option>';
        
        users.forEach(user => {
            const option = document.createElement('option');
            option.value = user.id;
            option.textContent = user.name;
            userSelect.appendChild(option);
        });
    }
    
    function populateStockDropdown() {
        stockSelect.innerHTML = '<option value="">-- Select a stock --</option>';
        
        stocks.forEach(stock => {
            const option = document.createElement('option');
            option.value = stock.symbol;
            option.textContent = `${stock.symbol} - ${stock.name}`;
            stockSelect.appendChild(option);
        });
    }
    
    // ============================================
    // DISPLAY STOCK INFORMATION
    // ============================================
    
    function displayStockInfo(symbol) {
        const stock = stocks.find(s => s.symbol === symbol);
        
        if (stock) {
            stockSymbolSpan.textContent = stock.symbol;
            stockNameSpan.textContent = stock.name;
            stockPriceSpan.textContent = `$${stock.price.toFixed(2)}`;
        } else {
            stockSymbolSpan.textContent = '—';
            stockNameSpan.textContent = '—';
            stockPriceSpan.textContent = '—';
        }
    }
    
    // ============================================
    // LOAD USER DATA INTO FORM
    // ============================================
    
    function loadUserToForm(userId) {
        const user = users.find(u => u.id === parseInt(userId));
        
        if (user) {
            userNameInput.value = user.name;
            userEmailInput.value = user.email;
        } else {
            userNameInput.value = '';
            userEmailInput.value = '';
        }
    }
    
    // ============================================
    // EVENT HANDLERS
    // ============================================
    
    function onUserSelectChange() {
        const selectedUserId = userSelect.value;
        
        if (selectedUserId) {
            displayPortfolio(selectedUserId);
            loadUserToForm(selectedUserId);
        } else {
            portfolioTableBody.innerHTML = '';
            portfolioTotalSpan.textContent = '$0.00';
            userNameInput.value = '';
            userEmailInput.value = '';
        }
    }
    
    function onStockSelectChange() {
        const selectedStockSymbol = stockSelect.value;
        displayStockInfo(selectedStockSymbol);
    }
    
    function onSaveUser() {
        const selectedUserId = userSelect.value;
        
        if (!selectedUserId) {
            alert('Please select a user first');
            return;
        }
        
        const updatedName = userNameInput.value.trim();
        const updatedEmail = userEmailInput.value.trim();
        
        if (!updatedName || !updatedEmail) {
            alert('Please fill in both name and email fields');
            return;
        }
        
        const user = users.find(u => u.id === parseInt(selectedUserId));
        
        if (user) {
            user.name = updatedName;
            user.email = updatedEmail;
            
            const currentSelection = userSelect.value;
            populateUserDropdown();
            userSelect.value = currentSelection;
            
            alert('User information saved successfully!');
        }
    }
    
    function onDeleteUser() {
        const selectedUserId = userSelect.value;
        
        if (!selectedUserId) {
            alert('Please select a user first');
            return;
        }
        
        const confirmDelete = confirm(`Are you sure you want to delete this user?`);
        
        if (confirmDelete) {
            const userIndex = users.findIndex(u => u.id === parseInt(selectedUserId));
            
            if (userIndex !== -1) {
                users.splice(userIndex, 1);
                
                userNameInput.value = '';
                userEmailInput.value = '';
                portfolioTableBody.innerHTML = '';
                portfolioTotalSpan.textContent = '$0.00';
                populateUserDropdown();
                userSelect.value = '';
                
                alert('User deleted successfully!');
            }
        }
    }
    
    // ============================================
    // ATTACH EVENT LISTENERS
    // ============================================
    
    userSelect.addEventListener('change', onUserSelectChange);
    stockSelect.addEventListener('change', onStockSelectChange);
    saveUserBtn.addEventListener('click', onSaveUser);
    deleteUserBtn.addEventListener('click', onDeleteUser);
    
    // ============================================
    // INITIALIZE THE DASHBOARD
    // ============================================
    
    populateUserDropdown();
    populateStockDropdown();
    
    stockSymbolSpan.textContent = '—';
    stockNameSpan.textContent = '—';
    stockPriceSpan.textContent = '—';
    portfolioTableBody.innerHTML = '';
    portfolioTotalSpan.textContent = '$0.00';
});