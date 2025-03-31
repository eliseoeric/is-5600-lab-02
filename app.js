document.addEventListener("DOMContentLoaded", () => {
    const userList = document.getElementById("user-list");
    const userDetails = document.getElementById("user-details");
    const stockDetails = document.getElementById("stock-details");
    const editForm = document.getElementById("edit-form");
    const deleteUserBtn = document.getElementById("delete-user");

    let selectedUser = null;

    // Sample Users & Stocks (Replace with fetched data if applicable)
    const users = [
        { id: 1, name: "Alice", email: "alice@example.com", portfolio: ["AAPL", "GOOG"] },
        { id: 2, name: "Bob", email: "bob@example.com", portfolio: ["TSLA", "MSFT"] }
    ];

    const stocks = {
        AAPL: { name: "Apple", price: "$150", change: "+1.5%" },
        GOOG: { name: "Google", price: "$2800", change: "-0.5%" },
        TSLA: { name: "Tesla", price: "$900", change: "+2.3%" },
        MSFT: { name: "Microsoft", price: "$320", change: "+0.8%" }
    };

    // Load users into the user list
    function populateUsers() {
        userList.innerHTML = "";
        users.forEach(user => {
            const li = document.createElement("li");
            li.textContent = user.name;
            li.dataset.id = user.id;
            li.addEventListener("click", () => selectUser(user));
            userList.appendChild(li);
        });
    }

    // Display user details and portfolio
    function selectUser(user) {
        selectedUser = user;
        userDetails.innerHTML = `
            <h3>${user.name}</h3>
            <p>Email: ${user.email}</p>
            <h4>Portfolio:</h4>
            <ul id="portfolio-list"></ul>
        `;

        const portfolioList = document.getElementById("portfolio-list");
        user.portfolio.forEach(stockSymbol => {
            const li = document.createElement("li");
            li.textContent = stockSymbol;
            li.addEventListener("click", () => selectStock(stockSymbol));
            portfolioList.appendChild(li);
        });

        editForm.name.value = user.name;
        editForm.email.value = user.email;
        deleteUserBtn.style.display = "block";
    }

    // Display stock details
    function selectStock(stockSymbol) {
        const stock = stocks[stockSymbol];
        if (stock) {
            stockDetails.innerHTML = `
                <h3>${stock.name} (${stockSymbol})</h3>
                <p>Price: ${stock.price}</p>
                <p>Change: ${stock.change}</p>
            `;
        }
    }

    // Handle updating user information
    editForm.addEventListener("submit", (event) => {
        event.preventDefault();
        if (selectedUser) {
            selectedUser.name = editForm.name.value;
            selectedUser.email = editForm.email.value;
            populateUsers();
            selectUser(selectedUser);
        }
    });

    // Handle user deletion
    deleteUserBtn.addEventListener("click", () => {
        if (selectedUser) {
            const index = users.findIndex(user => user.id === selectedUser.id);
            if (index !== -1) {
                users.splice(index, 1);
                userDetails.innerHTML = "<p>Select a user to view details.</p>";
                deleteUserBtn.style.display = "none";
                populateUsers();
            }
        }
    });

    // Initialize user list on page load
    populateUsers();
});
/* add your code here */

