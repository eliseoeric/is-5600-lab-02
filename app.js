/* add your code here */

document.addEventListener('DOMContentLoaded', () => {
    const stocksData = JSON.parse(stockContent);
    const userData = JSON.parse(userContent);
    generateUserList(userData, stocksData);

    const deleteButton = document.querySelector("#btnDelete");
    const saveButton = document.querySelector("#btnSave");

    // Register the event listener on the delete button
    deleteButton.addEventListener("click", (event) => {
      event.preventDefault();

      //find the index of the user in the data array
      const userId = document.querySelector("#userID").value;
      const userIndex = userData.findIndex((user) => user.id == userId);
      //remove the user from the data array
      userData.splice(userIndex, 1);
      // render the user list
      generateUserList(userData, stocksData);
    });

    saveButton.addEventListener('click', (event) => {
        event.preventDefault();
        const id = document.querySelector('#userID').value;

        for (let i=0; i<users.length; i++) {
            if (users[i].id == id) {

                users[i].user.firstname = document.querySelector('#firstname').value;
                users[i].user.lastname = document.querySelector('#lastname').value;
                users[i].user.address = document.querySelector('#address').value;
                users[i].user.city = document.querySelector('#city').value;
                users[i].user.email = document.querySelector('#email').value;     

                generateUserList(users, stocks);
            }
        }
      });

      function generateUserList(users, stocks) {
        const userList = document.querySelector('.user-list');
        userList.innerHTML = ''; // Clear existing list
  
        // Create list items for each user
        users.map(({ user, id }) => {
          const listItem = document.createElement('li');
          listItem.innerText = user.lastname + ', ' + user.firstname; // Display name
          listItem.setAttribute('id', id); // Set ID for identifying the user
          userList.appendChild(listItem); // Append item to the user list
        });
  
        // Add event listener to handle clicks on the user list
        userList.addEventListener('click', (event) => handleUserListClick(event, users, stocks));
      }

      function handleUserListClick(event, users, stocks) {
        const userId = event.target.id; // Get the ID of the clicked user
        const user = users.find(user => user.id == userId); // Find the corresponding user
        populateForm(user); // Populate the form with user data
        renderPortfolio(user, stocks); // Render the user's portfolio
      }

      function populateForm(data) {
        const { user, id } = data;
      
        document.querySelector("#userID").value = id;
        document.querySelector("#firstname").value = user.firstname;
        document.querySelector("#lastname").value = user.lastname;
        document.querySelector("#address").value = user.address;
        document.querySelector("#city").value = user.city;
        document.querySelector("#email").value = user.email;
      }

    function renderPortfolio(user, stocks) {
        const { portfolio } = user;
        const portfolioDetails = document.querySelector(".portfolio-list");
        portfolioDetails.innerHTML = ""; // Clear previous render
      
        portfolio.forEach(({ symbol, owned }) => {
          const symbolEl = document.createElement("p");
          const sharesEl = document.createElement("p");
          const actionEl = document.createElement("button");
      
          symbolEl.innerText = `Symbol: ${symbol}`;
          sharesEl.innerText = `Shares: ${owned}`;
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
        const stock = stocks.find((s) => s.symbol == symbol);
        const stockArea = document.querySelector(".stock-form");
      
        if (stock) {
          stockArea.style.display = "block";
          document.querySelector("#stockName").textContent = stock.name;
          document.querySelector("#stockSector").textContent = stock.sector;
          document.querySelector("#stockIndustry").textContent = stock.subIndustry;
          document.querySelector("#stockAddress").textContent = stock.address;
          document.querySelector("#logo").src = `logos/${symbol}.svg`;
        }
      }
  });