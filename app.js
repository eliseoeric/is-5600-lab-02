document.addEventListener("DOMContentLoaded", () => {
    const stocksData = JSON.parse(stockContent);
    const userData = JSON.parse(userContent);
  
    // Initialize the user list on load with the parsed data
    generateUserList(userData, stocksData);
  
    // Setup event listeners for the save and delete buttons
    setupEventListeners(userData, stocksData);
  });
  
  function generateUserList(users, stocks) {
    const userList = document.querySelector(".user-list");
    userList.innerHTML = ""; // Clear the list before appending new elements
  
    users.forEach(({ user, id }) => {
      const listItem = document.createElement("li");
      listItem.innerText = `${user.lastname}, ${user.firstname}`;
      listItem.setAttribute("id", id);
      userList.appendChild(listItem);
    });
  
    // Add click event listener to the user list
    userList.addEventListener("click", (event) =>
      handleUserListClick(event, users, stocks),
    );
  }
  
  function handleUserListClick(event, users, stocks) {
    const userId = event.target.id;
    const user = users.find((user) => user.id == userId);
  
    if (user) {
      populateForm(user);
      renderPortfolio(user, stocks);
    }
  }
  
  function populateForm(data) {
    const { user, id } = data;
    console.log(data);
    document.querySelector("#userID").value = id;
    document.querySelector("#firstname").value = user.firstname;
    document.querySelector("#lastname").value = user.lastname;
    document.querySelector("#address").value = user.address;
    document.querySelector("#city").value = user.city;
    document.querySelector("#email").value = user.email;
  }
  
  function renderPortfolio(user, stocks) {
    const portfolioDetails = document.querySelector(".portfolio-list");
    portfolioDetails.innerHTML = ""; // Clear existing portfolio items
  
    user.portfolio.forEach(({ symbol, owned }) => {
      const symbolEl = document.createElement("p");
      const sharesEl = document.createElement("p");
      const actionEl = document.createElement("button");
  
      symbolEl.innerText = symbol;
      sharesEl.innerText = owned;
      actionEl.innerText = "View";
      actionEl.setAttribute("id", symbol);
  
      portfolioDetails.appendChild(symbolEl);
      portfolioDetails.appendChild(sharesEl);
      portfolioDetails.appendChild(actionEl);
    });
  
    portfolioDetails.addEventListener("click", (event) => {
      if (event.target.tagName === "BUTTON") {
        viewStock(event.target.id, stocks);
      }
    });
  }
  
  function viewStock(symbol, stocks) {
    const stockArea = document.querySelector(".stock-form");
    if (stockArea) {
      const stock = stocks.find((s) => s.symbol === symbol);
  
      document.querySelector("#stockName").textContent = stock.name;
      document.querySelector("#stockSector").textContent = stock.sector;
      document.querySelector("#stockIndustry").textContent = stock.subIndustry;
      document.querySelector("#stockAddress").textContent = stock.address;
      document.querySelector("#logo").src = `logos/${symbol}.svg`;
    }
  }
  
  function setupEventListeners(userData, stocksData) {
    const saveButton = document.querySelector("#btnSave");
    const deleteButton = document.querySelector("#btnDelete");
  
    console.log(userData);
    if (saveButton) {
      saveButton.addEventListener("click", (event) => {
        event.preventDefault();
        const id = document.querySelector("#userID").value;
        const userIndex = userData.findIndex((user) => user.id == id);
  
        if (userIndex !== -1) {
          userData[userIndex].user.firstname =
            document.querySelector("#firstname").value;
          userData[userIndex].user.lastname =
            document.querySelector("#lastname").value;
          userData[userIndex].user.address =
            document.querySelector("#address").value;
          userData[userIndex].user.city = document.querySelector("#city").value;
          userData[userIndex].user.email = document.querySelector("#email").value;
          console.log(userData);
  
          generateUserList(userData, stocksData); // Refresh the user list
        }
      });
    }
  
    if (deleteButton) {
      deleteButton.addEventListener("click", (event) => {
        event.preventDefault();
        const id = document.querySelector("#userID").value;
        const userIndex = userData.findIndex((user) => user.id == id);
  
        if (userIndex !== -1) {
          console.log(userIndex);
          userData.splice(userIndex, 1); // Remove the user from the array
          console.log(userData);
          generateUserList(userData, stocksData); // Refresh the user list
  
          // Clear the form since the user is deleted
          clearForm();
        }
      });
    }
  }
  
  function clearForm() {
    document.querySelector("#userID").value = "";
    document.querySelector("#firstname").value = "";
    document.querySelector("#lastname").value = "";
    document.querySelector("#address").value = "";
    document.querySelector("#city").value = "";
    document.querySelector("#email").value = "";
  }
  