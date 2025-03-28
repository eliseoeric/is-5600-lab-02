export default {
  server: {
    host: '0.0.0.0',
    hmr: {
      clientPort: 443,
    }
  }
}
// Sample data for users and stocks
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Stock Portfolio Dashboard</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div id="user-list">
        <h2>Users</h2>
        <ul id="users"></ul>
        <button id="delete-user">Delete User</button>
    </div>
    <div id="portfolio">
        <h2>Portfolio</h2>
        <ul id="stocks"></ul>
    </div>
    <div id="stock-info">
        <h2>Stock Information</h2>
        <div id="stock-details"></div>
    </div>
    <div id="user-form">
        <h2>User Information</h2>
        <input type="text" id="user-name" placeholder="User  Name">
        <button id="save-user">Save</button>
    </div>
    <script src="script.js"></script>
</body>
</html>