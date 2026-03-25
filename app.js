/* add your code here */
document.addEventListener('DOMContentLoaded', () => {

  const stocksData = JSON.parse(stockContent);
  const userData = JSON.parse(userContent);

  const deleteButton = document.querySelector('#deleteBtn');
  const saveButton = document.querySelector('#saveBtn');

  // Initial render
  generateUserList(userData, stocksData);

  // DELETE USER
  deleteButton.addEventListener('click', (event) => {
    event.preventDefault();

    const userId = document.querySelector('#userID').value;
    const userIndex = userData.findIndex(user => user.id == userId);

    if (userIndex !== -1) {
      userData.splice(userIndex, 1);
      generateUserList(userData, stocksData);

      // Clear form + portfolio
      document.querySelector('form').reset();
      document.querySelector('.portfolio-list').innerHTML = '';
    }
  });

  // SAVE USER
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
      }
    }
  });

});
