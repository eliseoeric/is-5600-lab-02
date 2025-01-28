/* add your code here */
document.addEventListener('DOMContentLoaded', () => {
    const stocksData = JSON.parse(stockContent); // Loaded from stocks-complete.js
    const userData = JSON.parse(userContent); // Loaded from users.js
  
    // Initialize user list and register event listeners
    generateUserList(userData, stocksData);
  
    // Register save and delete button event listeners
    const saveButton = document.querySelector('#save');
    const deleteButton = document.querySelector('#delete');
