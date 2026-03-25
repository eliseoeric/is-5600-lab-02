function generateUserList(users, stocks) {
  const userList = document.querySelector('.user-list');

  // Clear old list
  userList.innerHTML = '';

  users.forEach(({ user, id }) => {
    const li = document.createElement('li');
    li.innerText = `${user.lastname}, ${user.firstname}`;
    li.setAttribute('id', id);
    userList.appendChild(li);
  });

  // Event Delegation
  userList.addEventListener('click', (event) =>
    handleUserListClick(event, users, stocks)
  );
}