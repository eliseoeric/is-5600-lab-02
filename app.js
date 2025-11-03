document.addEventListener("DOMContentLoaded", () => {
  // ------------------------------
  // Dataset (30 users)
  // ------------------------------
  const users = JSON.parse(`[
    {"user":{"firstname":"John","lastname":"Doe","email":"john@example.com","address":"123 Elm St","city":"New York","state":"NY","zip":"10001"},"portfolio":[{"symbol":"AAPL","owned":50},{"symbol":"GOOGL","owned":20}]},
    {"user":{"firstname":"Jane","lastname":"Smith","email":"jane@example.com","address":"456 Oak St","city":"Los Angeles","state":"CA","zip":"90001"},"portfolio":[{"symbol":"TSLA","owned":15},{"symbol":"AMZN","owned":25}]},
    {"user":{"firstname":"Michael","lastname":"Johnson","email":"michael@example.com","address":"789 Pine St","city":"Chicago","state":"IL","zip":"60601"},"portfolio":[{"symbol":"MSFT","owned":30},{"symbol":"NFLX","owned":10}]},
    {"user":{"firstname":"Emily","lastname":"Davis","email":"emily@example.com","address":"321 Maple St","city":"Houston","state":"TX","zip":"77001"},"portfolio":[{"symbol":"NVDA","owned":40},{"symbol":"META","owned":15}]},
    {"user":{"firstname":"Chris","lastname":"Brown","email":"chris@example.com","address":"654 Cedar St","city":"Phoenix","state":"AZ","zip":"85001"},"portfolio":[{"symbol":"INTC","owned":35},{"symbol":"ORCL","owned":10}]},
    {"user":{"firstname":"Olivia","lastname":"Wilson","email":"olivia@example.com","address":"987 Walnut St","city":"Philadelphia","state":"PA","zip":"19019"},"portfolio":[{"symbol":"PEP","owned":25},{"symbol":"KO","owned":40}]},
    {"user":{"firstname":"David","lastname":"Martinez","email":"david@example.com","address":"753 Birch St","city":"San Antonio","state":"TX","zip":"78201"},"portfolio":[{"symbol":"ADBE","owned":10},{"symbol":"CRM","owned":20}]},
    {"user":{"firstname":"Sophia","lastname":"Anderson","email":"sophia@example.com","address":"852 Spruce St","city":"San Diego","state":"CA","zip":"92101"},"portfolio":[{"symbol":"CSCO","owned":15},{"symbol":"IBM","owned":5}]},
    {"user":{"firstname":"James","lastname":"Garcia","email":"james@example.com","address":"951 Chestnut St","city":"Dallas","state":"TX","zip":"75201"},"portfolio":[{"symbol":"V","owned":18},{"symbol":"MA","owned":12}]},
    {"user":{"firstname":"Isabella","lastname":"Hernandez","email":"isabella@example.com","address":"159 Cypress St","city":"San Jose","state":"CA","zip":"95101"},"portfolio":[{"symbol":"PYPL","owned":8},{"symbol":"SHOP","owned":22}]},
    {"user":{"firstname":"Ethan","lastname":"Clark","email":"ethan@example.com","address":"753 Palm St","city":"Austin","state":"TX","zip":"73301"},"portfolio":[{"symbol":"BABA","owned":14},{"symbol":"NKE","owned":9}]},
    {"user":{"firstname":"Ava","lastname":"Lewis","email":"ava@example.com","address":"246 Oakwood St","city":"Columbus","state":"OH","zip":"43004"},"portfolio":[{"symbol":"DIS","owned":20},{"symbol":"WMT","owned":10}]},
    {"user":{"firstname":"William","lastname":"Lee","email":"william@example.com","address":"135 Poplar St","city":"Charlotte","state":"NC","zip":"28202"},"portfolio":[{"symbol":"SONY","owned":16},{"symbol":"BA","owned":12}]},
    {"user":{"firstname":"Mia","lastname":"Walker","email":"mia@example.com","address":"975 Redwood St","city":"Seattle","state":"WA","zip":"98101"},"portfolio":[{"symbol":"PFE","owned":19},{"symbol":"MRNA","owned":14}]},
    {"user":{"firstname":"Alexander","lastname":"Hall","email":"alex@example.com","address":"852 Aspen St","city":"Denver","state":"CO","zip":"80201"},"portfolio":[{"symbol":"UBER","owned":11},{"symbol":"LYFT","owned":9}]},
    {"user":{"firstname":"Charlotte","lastname":"Allen","email":"charlotte@example.com","address":"741 Willow St","city":"Boston","state":"MA","zip":"02101"},"portfolio":[{"symbol":"HPQ","owned":15},{"symbol":"DELL","owned":18}]},
    {"user":{"firstname":"Daniel","lastname":"Young","email":"daniel@example.com","address":"369 Elmwood St","city":"Detroit","state":"MI","zip":"48201"},"portfolio":[{"symbol":"T","owned":12},{"symbol":"VZ","owned":19}]},
    {"user":{"firstname":"Amelia","lastname":"King","email":"amelia@example.com","address":"147 Sprucewood St","city":"Portland","state":"OR","zip":"97035"},"portfolio":[{"symbol":"COST","owned":7},{"symbol":"HD","owned":11}]},
    {"user":{"firstname":"Benjamin","lastname":"Wright","email":"benjamin@example.com","address":"258 Maplewood St","city":"San Francisco","state":"CA","zip":"94101"},"portfolio":[{"symbol":"ZM","owned":6},{"symbol":"SNOW","owned":13}]},
    {"user":{"firstname":"Harper","lastname":"Scott","email":"harper@example.com","address":"951 Pinewood St","city":"Nashville","state":"TN","zip":"37201"},"portfolio":[{"symbol":"ABNB","owned":10},{"symbol":"BKNG","owned":9}]},
    {"user":{"firstname":"Elijah","lastname":"Green","email":"elijah@example.com","address":"753 Birchwood St","city":"Kansas City","state":"MO","zip":"64101"},"portfolio":[{"symbol":"CVX","owned":21},{"symbol":"XOM","owned":19}]},
    {"user":{"firstname":"Ella","lastname":"Baker","email":"ella@example.com","address":"654 Cedarwood St","city":"Atlanta","state":"GA","zip":"30301"},"portfolio":[{"symbol":"PG","owned":17},{"symbol":"JNJ","owned":8}]},
    {"user":{"firstname":"Logan","lastname":"Nelson","email":"logan@example.com","address":"852 Walnutwood St","city":"Miami","state":"FL","zip":"33101"},"portfolio":[{"symbol":"KO","owned":22},{"symbol":"PEP","owned":25}]},
    {"user":{"firstname":"Grace","lastname":"Carter","email":"grace@example.com","address":"357 Palmwood St","city":"Raleigh","state":"NC","zip":"27601"},"portfolio":[{"symbol":"MCD","owned":16},{"symbol":"YUM","owned":12}]},
    {"user":{"firstname":"Henry","lastname":"Mitchell","email":"henry@example.com","address":"159 Redwoodwood St","city":"Minneapolis","state":"MN","zip":"55401"},"portfolio":[{"symbol":"CAT","owned":14},{"symbol":"GE","owned":8}]},
    {"user":{"firstname":"Victoria","lastname":"Perez","email":"victoria@example.com","address":"951 Birchfield St","city":"Tampa","state":"FL","zip":"33601"},"portfolio":[{"symbol":"HON","owned":10},{"symbol":"MMM","owned":6}]},
    {"user":{"firstname":"Jack","lastname":"Roberts","email":"jack@example.com","address":"753 Maplefield St","city":"Indianapolis","state":"IN","zip":"46201"},"portfolio":[{"symbol":"AIG","owned":5},{"symbol":"AXP","owned":11}]},
    {"user":{"firstname":"Scarlett","lastname":"Turner","email":"scarlett@example.com","address":"654 Oakfield St","city":"Las Vegas","state":"NV","zip":"89101"},"portfolio":[{"symbol":"FDX","owned":9},{"symbol":"UPS","owned":10}]},
    {"user":{"firstname":"Lucas","lastname":"Phillips","email":"lucas@example.com","address":"852 Pinefield St","city":"New Orleans","state":"LA","zip":"70101"},"portfolio":[{"symbol":"C","owned":15},{"symbol":"BAC","owned":13}]},
    {"user":{"firstname":"Chloe","lastname":"Campbell","email":"chloe@example.com","address":"357 Elmfield St","city":"Cleveland","state":"OH","zip":"44101"},"portfolio":[{"symbol":"INTU","owned":7},{"symbol":"ADP","owned":9}]}
  ]`);

  // ------------------------------
  // DOM references
  // ------------------------------
  const userList = document.querySelector(".user-list");
  const userDetails = document.getElementById("user-details");
  const portfolioContainer = document.getElementById("portfolio");
  const stockInfo = document.getElementById("stock-info");
  const editForm = document.getElementById("edit-form");
  const saveBtn = document.getElementById("save-btn");
  const deleteBtn = document.getElementById("delete-btn");

  const fName = document.getElementById("first-name");
  const lName = document.getElementById("last-name");
  const email = document.getElementById("email");
  const address = document.getElementById("address");
  const city = document.getElementById("city");
  const state = document.getElementById("state");
  const zip = document.getElementById("zip");

  let currentUser = null;

  // ------------------------------
  // Display all users
  // ------------------------------
  function displayUsers() {
    userList.innerHTML = "";
    users.forEach((entry, index) => {
      const li = document.createElement("li");
      li.textContent = `${entry.user.firstname} ${entry.user.lastname}`;
      li.className = "user-item";
      li.style.cursor = "pointer";
      li.onclick = () => selectUser(index);
      userList.appendChild(li);
    });
  }

  function selectUser(index) {
    currentUser = users[index];
    showUserDetails(currentUser);
    showPortfolio(currentUser.portfolio);
    showEditForm(currentUser);
  }

  function showUserDetails(entry) {
    const u = entry.user;
    userDetails.innerHTML = `
      <h2>${u.firstname} ${u.lastname}</h2>
      <p><strong>Email:</strong> ${u.email}</p>
      <p><strong>Address:</strong> ${u.address}, ${u.city}, ${u.state} ${u.zip}</p>
    `;
  }

  function showPortfolio(portfolio) {
    portfolioContainer.innerHTML = "<h3>Portfolio</h3>";
    const table = document.createElement("table");
    table.innerHTML = `<tr><th>Symbol</th><th>Shares</th></tr>`;
    portfolio.forEach((stock) => {
      const row = document.createElement("tr");
      row.innerHTML = `<td>${stock.symbol}</td><td>${stock.owned}</td>`;
      row.onclick = () => showStockInfo(stock);
      table.appendChild(row);
    });
    portfolioContainer.appendChild(table);
  }

  function showStockInfo(stock) {
    stockInfo.innerHTML = `
      <h3>Selected Stock</h3>
      <p><strong>Symbol:</strong> ${stock.symbol}</p>
      <p><strong>Shares:</strong> ${stock.owned}</p>
    `;
  }

  function showEditForm(entry) {
    const u = entry.user;
    fName.value = u.firstname;
    lName.value = u.lastname;
    email.value = u.email;
    address.value = u.address;
    city.value = u.city;
    state.value = u.state;
    zip.value = u.zip;
  }

  saveBtn.onclick = function () {
    if (!currentUser) return;
    const u = currentUser.user;
    u.firstname = fName.value;
    u.lastname = lName.value;
    u.email = email.value;
    u.address = address.value;
    u.city = city.value;
    u.state = state.value;
    u.zip = zip.value;
    showUserDetails(currentUser);
    displayUsers();
    alert("User information updated!");
  };

  deleteBtn.onclick = function () {
    if (!currentUser) return;
    const index = users.indexOf(currentUser);
    users.splice(index, 1);
    displayUsers();
    userDetails.innerHTML = "";
    portfolioContainer.innerHTML = "";
    stockInfo.innerHTML = "";
    alert("User deleted!");
    currentUser = null;
  };

  displayUsers();
});
