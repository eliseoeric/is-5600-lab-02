document.addEventListener("DOMContentLoaded", () => {
    // Parse the JSON data (assuming stockContent and userContent are JSON strings)
    const stocksData = JSON.parse(stockContent);
    const userData = JSON.parse(userContent);
  
    // Function to handle user list item click event
    function handleUserListClick(event, users, stocks) {
      if (event.target.tagName === "LI") { // Check if the clicked target is a list item (LI)
        const userId = event.target.id; // Get the user ID from the clicked list item
        const user = users.find((user) => user.id == userId); // Find the user by ID
        populateForm(user); // Populate form with user data
        renderPortfolio(user, stocks); // Render the user's portfolio
      }
    }
  
    // Generate the user list and render it
    generateUserList(userData, stocksData);
  
    // Register event listeners for Save and Delete buttons
    document.querySelector("#btnSave").addEventListener("click", handleSave);
    document.querySelector("#btnDelete").addEventListener("click", handleDelete);
  
    // Function to generate the user list
    function generateUserList(users, stocks) {
      const userList = document.querySelector(".user-list");
      userList.innerHTML = ""; // Clear the list before rendering
      users.map(({ user, id }) => {
        const listItem = document.createElement("li"); // Create a new list item
        listItem.innerText = `${user.lastname}, ${user.firstname}`; // Display user's name
        listItem.setAttribute("id", id); // Set the user ID as the list item's ID
        userList.appendChild(listItem); // Append the list item to the user list
      });
  
      // Register click event listener for the user list
      userList.addEventListener("click", (event) => {
        handleUserListClick(event, users, stocks); // Handle the click event
        clearStockDetails(); // Clear stock details when a new user is clicked
      });
    }
  
    // Function to populate the form with user data
    function populateForm(user) {
      const { user: userInfo, id } = user;
      document.querySelector("#userID").value = id;
      document.querySelector("#firstname").value = userInfo.firstname;
      document.querySelector("#lastname").value = userInfo.lastname;
      document.querySelector("#address").value = userInfo.address;
      document.querySelector("#city").value = userInfo.city;
      document.querySelector("#email").value = userInfo.email;
    }
  
    // Function to render the user's portfolio
    function renderPortfolio(user, stocks) {
      const portfolio = user.portfolio;
      const portfolioDetails = document.querySelector(".portfolio-list");
      portfolioDetails.innerHTML = ""; // Clear previous portfolio items
  
      portfolio.map(({ symbol, owned }) => {
        const symbolEl = document.createElement("p"); // Create symbol element
        const sharesEl = document.createElement("p"); // Create shares element
        const actionEl = document.createElement("button"); // Create action button
  
        symbolEl.innerText = symbol; // Set symbol text
        sharesEl.innerText = owned; // Set owned shares text
        actionEl.innerText = "View"; // Set button text
        actionEl.setAttribute("id", symbol); // Set symbol as the button's ID
  
        portfolioDetails.appendChild(symbolEl); // Append symbol to portfolio list
        portfolioDetails.appendChild(sharesEl); // Append shares to portfolio list
        portfolioDetails.appendChild(actionEl); // Append button to portfolio list
      });
  
      // Register click event listener for portfolio items
      portfolioDetails.addEventListener("click", (event) => {
        if (event.target.tagName === "BUTTON") { // If the clicked element is a button
          event.target.style.backgroundColor = "black"; // Change button color to black
          viewStock(event.target.id, stocks); // View stock details based on the symbol
  
          // Revert button color back to original after a short delay
          setTimeout(() => {
            event.target.style.backgroundColor = ""; // Revert button color
          }, 200);
        }
      });
    }
  
    // Function to view stock details based on symbol
    function viewStock(symbol, stocks) {
      const stock = stocks.find((s) => s.symbol == symbol); // Find the stock by symbol
      document.querySelector("#stockName").textContent = stock.name;
      document.querySelector("#stockSector").textContent = stock.sector;
      document.querySelector("#stockIndustry").textContent = stock.subIndustry;
      document.querySelector("#stockAddress").textContent = stock.address;
  
      const logoElement = document.querySelector("#logo");
      const logoSrc = `logos/${symbol}.svg`; // Set the logo source path
  
      // Check if the logo exists and fetch it
      fetch(logoSrc, { method: "HEAD" })
        .then((response) => {
          if (response.ok) {
            logoElement.src = logoSrc; // Set logo if available
          } else {
            logoElement.src = ""; // Clear logo src if not found
          }
        })
        .catch(() => {
          logoElement.src = ""; // Clear logo src in case of error
        });
    }
  
    // Function to handle Save button click
    function handleSave(event) {
      event.preventDefault(); // Prevent form submission
  
      const button = event.target;
      button.style.backgroundColor = "black"; // Change button color to black
  
      const id = document.querySelector("#userID").value;
      const user = userData.find((user) => user.id == id);
  
      if (user) {
        // Update user data with the form values
        user.user.firstname = document.querySelector("#firstname").value;
        user.user.lastname = document.querySelector("#lastname").value;
        user.user.address = document.querySelector("#address").value;
        user.user.city = document.querySelector("#city").value;
        user.user.email = document.querySelector("#email").value;
  
        generateUserList(userData, stocksData); // Re-render user list
      }
  
      // Revert button color back to original after a short delay
      setTimeout(() => {
        button.style.backgroundColor = ""; // Revert to original color
      }, 200);
    }
  
    // Function to clear stock details
    function clearStockDetails() {
      document.querySelector("#stockName").textContent = "";
      document.querySelector("#stockSector").textContent = "";
      document.querySelector("#stockIndustry").textContent = "";
      document.querySelector("#stockAddress").textContent = "";
      document.querySelector("#logo").src = "";
    }
  
    // Function to handle Delete button click
    function handleDelete(event) {
      event.preventDefault(); // Prevent form submission
  
      const button = event.target;
      button.style.backgroundColor = "black"; // Change button color to black
  
      const id = document.querySelector("#userID").value;
      const userIndex = userData.findIndex((user) => user.id == id);
  
      if (userIndex > -1) {
        userData.splice(userIndex, 1); // Remove user from the data array
        generateUserList(userData, stocksData); // Re-render user list
        clearForm(); // Clear form fields
        clearPortfolio(); // Clear portfolio list
        clearStockDetails(); // Clear stock details
      }
  
      // Revert button color back to original after a short delay
      setTimeout(() => {
        button.style.backgroundColor = ""; // Revert to original color
      }, 200);
    }
  
    // Function to clear the form fields
    function clearForm() {
      document.querySelector("#userID").value = "";
      document.querySelector("#firstname").value = "";
      document.querySelector("#lastname").value = "";
      document.querySelector("#address").value = "";
      document.querySelector("#city").value = "";
      document.querySelector("#email").value = "";
    }
  
    // Function to clear the portfolio list
    function clearPortfolio() {
      document.querySelector(".portfolio-list").innerHTML = "";
    }
  });
  