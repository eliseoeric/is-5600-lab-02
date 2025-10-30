/* add your code here */
document.addEventListener('DOMContentLoaded', () => {
  // function will go here
  const stocksData = JSON.parse(stockContent);
  const userData = JSON.parse(userContent);
});

/**
 * Loops through the users and renders a ul with li elements for each user
 * @param {*} users 
 */
function generateUserList(users) {
  // get the list element and for each user create a list item and append it to the list
  const userList = document.querySelector('.user-list');
  
  users.map(({user, id}) => {
    const listItem = document.createElement('li');
    listItem.innerText = user.lastname + ', ' + user.firstname;
    listItem.setAttribute('id', id);
    userList.appendChild(listItem);
  });
}

