function handleUserListClick(event, users, stocks) {
  const userId = event.target.id;

  const user = users.find(u => u.id == userId);

  if (user) {
    populateForm(user);
    renderPortfolio(user, stocks);
  }
}