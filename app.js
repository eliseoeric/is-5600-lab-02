/* add your code here */
document.addEventListener('DOMContentLoaded', () => {
    const usersData = JSON.parse(userContent); // Parses user data
    const stocksData = JSON.parse(stockContent); // Parses stock data
  
    // Initialize user list display
    renderUserList(usersData, stocksData);
  
    // Event listener for Save and Delete buttons
    document.querySelector('#saveButton').addEventListener('click', (e) => {
      e.preventDefault();
      updateUser(usersData, stocksData);
    });
  
    document.querySelector('#deleteButton').addEventListener('click', (e) => {
      e.preventDefault();
      deleteUser(usersData, stocksData);
    });
  });
  
 
  