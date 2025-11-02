// ======== Stock Sectors Mapping ========
const stockSectors = {
  "AAPL": "Technology",
  "MSFT": "Technology",
  "GOOGL": "Technology",
  "FB": "Technology",
  "NFLX": "Entertainment",
  "AMZN": "E-commerce",
  "TSLA": "Automotive",
  "NKE": "Apparel",
  "GE": "Industrial",
  "PEP": "Food & Beverage",
  "FDX": "Logistics",
  "INTC": "Technology",
  "IBM": "Technology",
  "JPM": "Financials",
  "WFC": "Financials",
  "DIS": "Entertainment",
  "MCD": "Food & Beverage",
  "TRIP": "Travel",
  "XEL": "Utilities",
  "HAL": "Energy",
  "AKAM": "Technology",
  "YUM": "Food & Beverage",
  "MA": "Financials",
  "BAX": "Healthcare",
  "APA": "Energy",
  "IP": "Materials",
  "UA": "Apparel",
  "EXPE": "Travel",
  "ADM": "Agriculture",
  "ED": "Utilities",
  "AJG": "Financials"
};
// ======== User JSON Content ========
const userContent = `
[
  {"id":1,"user":{"firstname":"Jacquette","lastname":"Marion","email":"jmarion0@nyu.edu","address":"207 Ryan Avenue","city":"Lubbock","state":"Texas","zip":"79491"},"portfolio":[{"symbol":"NKE","owned":483}]},
  {"id":2,"user":{"firstname":"Vaughan","lastname":"Main","email":"vmain1@alexa.com","address":"56 Loeprich Drive","city":"Midland","state":"Texas","zip":"79705"},"portfolio":[{"symbol":"HAL","owned":775},{"symbol":"FB","owned":459}]},
  {"id":3,"user":{"firstname":"Matthus","lastname":"Harnes","email":"mharnes2@newyorker.com","address":"75504 Briar Crest Plaza","city":"Arlington","state":"Texas","zip":"76016"},"portfolio":[{"symbol":"MCD","owned":825},{"symbol":"TRIP","owned":728},{"symbol":"XEL","owned":110}]},
  {"id":4,"user":{"firstname":"Bernette","lastname":"Manson","email":"bmanson3@macromedia.com","address":"1333 Red Cloud Avenue","city":"Seattle","state":"Washington","zip":"98115"},"portfolio":[{"symbol":"EBAY","owned":372},{"symbol":"NFLX","owned":801}]},
  {"id":5,"user":{"firstname":"Luisa","lastname":"Dungey","email":"ldungey4@oakley.com","address":"0799 Del Mar Crossing","city":"Houston","state":"Texas","zip":"77212"},"portfolio":[{"symbol":"YUM","owned":470},{"symbol":"ZION","owned":-69},{"symbol":"EBAY","owned":719}]},
  {"id":6,"user":{"firstname":"Yanaton","lastname":"Cockarill","email":"ycockarill5@parallels.com","address":"9207 Fairview Park","city":"New Haven","state":"Connecticut","zip":"06533"},"portfolio":[{"symbol":"AKAM","owned":535},{"symbol":"GE","owned":549}]},
  {"id":7,"user":{"firstname":"Goldia","lastname":"Krysiak","email":"gkrysiak6@desdev.cn","address":"65 Cordelia Court","city":"Rochester","state":"Minnesota","zip":"55905"},"portfolio":[{"symbol":"EA","owned":131},{"symbol":"AMZN","owned":210},{"symbol":"AAPL","owned":1061}]},
  {"id":8,"user":{"firstname":"Karolina","lastname":"Symes","email":"ksymes7@yolasite.com","address":"1 Badeau Drive","city":"Tulsa","state":"Oklahoma","zip":"74126"},"portfolio":[{"symbol":"JCI","owned":533},{"symbol":"VZ","owned":267}]},
  {"id":9,"user":{"firstname":"Ardella","lastname":"Bus","email":"abus8@istockphoto.com","address":"1 Grasskamp Street","city":"Cincinnati","state":"Ohio","zip":"45213"},"portfolio":[{"symbol":"PEP","owned":739},{"symbol":"FDX","owned":425}]},
  {"id":10,"user":{"firstname":"Ingelbert","lastname":"McGenis","email":"imcgenis9@bing.com","address":"8884 Thompson Circle","city":"San Antonio","state":"Texas","zip":"78225"},"portfolio":[{"symbol":"INTU","owned":277}]},
  {"id":11,"user":{"firstname":"Vaughn","lastname":"January","email":"vjanuarya@ucoz.ru","address":"59 Stephen Street","city":"Chattanooga","state":"Tennessee","zip":"37410"},"portfolio":[{"symbol":"IBM","owned":314},{"symbol":"APC","owned":860}]},
  {"id":12,"user":{"firstname":"Astrid","lastname":"Dik","email":"adikb@webmd.com","address":"335 Lawn Trail","city":"Mobile","state":"Alabama","zip":"36628"},"portfolio":[{"symbol":"TWX","owned":655},{"symbol":"TRIP","owned":839}]},
  {"id":13,"user":{"firstname":"Moina","lastname":"Kenset","email":"mkensetc@blogger.com","address":"337 Lunder Crossing","city":"Des Moines","state":"Iowa","zip":"50936"},"portfolio":[{"symbol":"WFC","owned":935},{"symbol":"EBAY","owned":749}]},
  {"id":14,"user":{"firstname":"Paulie","lastname":"Clifton","email":"pcliftond@merriam-webster.com","address":"65540 Fieldstone Pass","city":"Peoria","state":"Illinois","zip":"61656"},"portfolio":[{"symbol":"NFLX","owned":947}]},
  {"id":15,"user":{"firstname":"Henka","lastname":"Briant","email":"hbriante@howstuffworks.com","address":"56995 Talisman Pass","city":"Salt Lake City","state":"Utah","zip":"84152"},"portfolio":[{"symbol":"JPM","owned":370},{"symbol":"VZ","owned":203}]},
  {"id":16,"user":{"firstname":"Gwyn","lastname":"Baird","email":"gbairdf@nba.com","address":"5 Loftsgordon Plaza","city":"Gaithersburg","state":"Maryland","zip":"20883"},"portfolio":[{"symbol":"SBUX","owned":934},{"symbol":"CVX","owned":297}]},
  {"id":17,"user":{"firstname":"Ariel","lastname":"Dignall","email":"adignallg@gmpg.org","address":"45692 Continental Pass","city":"New York City","state":"New York","zip":"10150"},"portfolio":[{"symbol":"ADSK","owned":316}]},
  {"id":18,"user":{"firstname":"Ikey","lastname":"Wendover","email":"iwendoverh@rambler.ru","address":"0 Debs Road","city":"New York City","state":"New York","zip":"10009"},"portfolio":[{"symbol":"GIS","owned":-39},{"symbol":"ACN","owned":726}]},
  {"id":19,"user":{"firstname":"Keir","lastname":"Allabarton","email":"kallabartoni@cdbaby.com","address":"2954 Holmberg Terrace","city":"Shreveport","state":"Louisiana","zip":"71137"},"portfolio":[{"symbol":"EXPE","owned":625}]},
  {"id":20,"user":{"firstname":"Elnar","lastname":"Message","email":"emessagej@yolasite.com","address":"2 Pearson Hill","city":"Provo","state":"Utah","zip":"84605"},"portfolio":[{"symbol":"APA","owned":481},{"symbol":"IP","owned":883}]},
  {"id":21,"user":{"firstname":"Timothee","lastname":"Deveril","email":"tdeverilk@telegraph.co.uk","address":"16920 Nancy Terrace","city":"Tallahassee","state":"Florida","zip":"32314"},"portfolio":[{"symbol":"IBM","owned":933},{"symbol":"MSFT","owned":548}]},
  {"id":22,"user":{"firstname":"Wainwright","lastname":"Scarffe","email":"wscarffel@ow.ly","address":"8 Gerald Terrace","city":"Camden","state":"New Jersey","zip":"08104"},"portfolio":[{"symbol":"WFC","owned":527},{"symbol":"TWX","owned":604}]},
  {"id":23,"user":{"firstname":"Daniella","lastname":"Windley","email":"dwindleym@economist.com","address":"84 Vahlen Parkway","city":"Amarillo","state":"Texas","zip":"79118"},"portfolio":[{"symbol":"HPQ","owned":704},{"symbol":"XOM","owned":791}]},
  {"id":24,"user":{"firstname":"Michal","lastname":"Langdale","email":"mlangdalen@jigsy.com","address":"3 Bobwhite Trail","city":"Kansas City","state":"Missouri","zip":"64114"},"portfolio":[{"symbol":"SNA","owned":1500},{"symbol":"BAC","owned":423}]},
  {"id":25,"user":{"firstname":"Ulises","lastname":"Oattes","email":"uoatteso@parallels.com","address":"5279 Old Shore Court","city":"New York City","state":"New York","zip":"10009"},"portfolio":[{"symbol":"MA","owned":855},{"symbol":"BAX","owned":955}]},
  {"id":26,"user":{"firstname":"Justinn","lastname":"Esselen","email":"jesselenp@cbslocal.com","address":"0933 Crownhardt Crossing","city":"Tampa","state":"Florida","zip":"33647"},"portfolio":[{"symbol":"UA","owned":469},{"symbol":"PEP","owned":309}]},
  {"id":27,"user":{"firstname":"Kelwin","lastname":"Esmond","email":"kesmondq@newsvine.com","address":"87619 Thierer Junction","city":"Dearborn","state":"Michigan","zip":"48126"},"portfolio":[{"symbol":"GOOG","owned":38},{"symbol":"NDAQ","owned":664}]},
  {"id":28,"user":{"firstname":"Marchall","lastname":"Micka","email":"mmickar@columbia.edu","address":"3364 Rigney Junction","city":"Amarillo","state":"Texas","zip":"79105"},"portfolio":[{"symbol":"AMZN","owned":680},{"symbol":"ADM","owned":829}]},
  {"id":29,"user":{"firstname":"Rosie","lastname":"Eliot","email":"reliots@upenn.edu","address":"365 Debs Lane","city":"Birmingham","state":"Alabama","zip":"35231"},"portfolio":[{"symbol":"MMM","owned":272},{"symbol":"HOG","owned":803}]},
  {"id":30,"user":{"firstname":"Gates","lastname":"Reinbeck","email":"greinbeckt@biblegateway.com","address":"6 Stuart Plaza","city":"Fresno","state":"California","zip":"93786"},"portfolio":[{"symbol":"AJG","owned":320},{"symbol":"ED","owned":271}]}
]
`;

// ======== Parse JSON into usable users array ========
const users = JSON.parse(userContent).map(item => ({
  id: item.id,
  name: `${item.user.firstname} ${item.user.lastname}`,
  address: `${item.user.address}, ${item.user.city}, ${item.user.state} ${item.user.zip}`,
  email: item.user.email,
  portfolio: item.portfolio.map(stock => ({
  symbol: stock.symbol,
  shares: stock.owned,
  sector: stockSectors[stock.symbol] || "Unknown"
}))
}));



// ======== DOM Elements ========
const userList = document.querySelector(".user-list");
const nameInput = document.querySelectorAll("input")[0];
const addressInput = document.querySelectorAll("input")[1];
const emailInput = document.querySelectorAll("input")[2];
const saveButton = document.querySelector("button:nth-of-type(1)");
const deleteButton = document.querySelector("button:nth-of-type(2)");
const portfolioTable = document.querySelector(".portfolio-table tbody");
const detailsSection = document.querySelector(".details-section");

let selectedUser = null;

// ======== Functions ========

// Display user list
function renderUserList() {
  userList.innerHTML = "";
  users.forEach((user) => {
    const li = document.createElement("li");
    li.textContent = user.name;
    li.addEventListener("click", () => selectUser(user));
    userList.appendChild(li);
  });
}

// Select a user
function selectUser(user) {
  selectedUser = user;
  nameInput.value = user.name;
  addressInput.value = user.address;
  emailInput.value = user.email;
  renderPortfolio(user.portfolio);
  detailsSection.innerHTML = "<h3>Stock Details</h3>";
}

// Display user's portfolio
function renderPortfolio(portfolio) {
  portfolioTable.innerHTML = "";
  portfolio.forEach((stock) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${stock.symbol}</td>
      <td>${stock.shares}</td>
      <td><button class="view-details">View</button></td>
    `;
    row.querySelector(".view-details").addEventListener("click", () => showStockDetails(stock));
    portfolioTable.appendChild(row);
  });
}

// Show stock details
function showStockDetails(stock) {
  detailsSection.innerHTML = `
    <h3>Stock Details</h3>
    <p><strong>Symbol:</strong> ${stock.symbol}</p>
    <p><strong>Sector:</strong> ${stock.sector}</p>
    <p><strong>Shares:</strong> ${stock.shares}</p>
  `;
}

// Save updates
saveButton.addEventListener("click", () => {
  if (!selectedUser) return;
  selectedUser.name = nameInput.value;
  selectedUser.address = addressInput.value;
  selectedUser.email = emailInput.value;
  renderUserList();
  alert("User details updated!");
});

// Delete user
deleteButton.addEventListener("click", () => {
  if (!selectedUser) return;
  const index = users.indexOf(selectedUser);
  users.splice(index, 1);
  selectedUser = null;
  nameInput.value = "";
  addressInput.value = "";
  emailInput.value = "";
  portfolioTable.innerHTML = "";
  detailsSection.innerHTML = "<h3>Stock Details</h3>";
  renderUserList();
  alert("User deleted!");
});

// Initialize
renderUserList();
