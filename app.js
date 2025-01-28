/* add your code here */
document.addEventListener('DOMContentLoaded', () => {
    const stocksData = JSON.parse(stockContent); // Loaded from stocks-complete.js
    const userData = JSON.parse(userContent); // Loaded from users.js
  
    // Initialize user list and register event listeners
    generateUserList(userData, stocksData);
  
    // Register save and delete button event listeners
    const saveButton = document.querySelector('#save');
    const deleteButton = document.querySelector('#delete');
    saveButton.addEventListener('click', (e) => {
        e.preventDefault();
        const id = document.querySelector('#userID').value;
    
        // Update user details
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
      deleteButton.addEventListener('click', (e) => {
        e.preventDefault();
        const userId = document.querySelector('#userID').value;
        const userIndex = userData.findIndex(user => user.id == userId);
    
        if (userIndex > -1) {
          userData.splice(userIndex, 1);
          generateUserList(userData, stocksData);
          document.querySelector('form').reset(); // Clear the form
        }
      });
    });    