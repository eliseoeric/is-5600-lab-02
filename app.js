// 1. DATA TEST - This will tell us if the files in the 'data' folder are actually loading
console.log("Checking for data variables...");
console.log("userData exists:", typeof userData !== 'undefined');
console.log("stockData exists:", typeof stockData !== 'undefined');

// 2. DEFINE THE DATA
// If userData is missing, we use an empty array so the code doesn't crash
const data = (typeof userData !== 'undefined') ? userData : [];
const stocks = (typeof stockData !== 'undefined') ? stockData : [];

// 3. SELECT THE SIDEBAR
const userListContainer = document.querySelector('.user-list');
function renderUserList() {
    if (!userListContainer) {
        console.error("Could not find .user-list");
        return;
    }

    userListContainer.innerHTML = "";

    data.forEach(item => {
        const li = document.createElement('li');

        const u = item.user ? item.user : item;

        li.textContent = `${u.lastname}, ${u.firstname}`;
        li.style.cursor = "pointer";

        li.addEventListener('click', () => {
            populateUserForm(item);
            renderPortfolio(item);
        });

        userListContainer.appendChild(li);
    });
}

function populateUserForm(item) {
    const u = item.user || item;
    // We use standard IDs from the lab instructions
    document.querySelector('#firstname').value = u.firstname || "";
    document.querySelector('#lastname').value = u.lastname || "";
    document.querySelector('#address').value = u.address || "";
    document.querySelector('#email').value = u.email || "";
    document.querySelector('#userID').value = item.id;
}

function renderPortfolio(item) {
    const pList = document.querySelector('.portfolio-list');
    if (!pList) return;
    pList.innerHTML = '';

    item.portfolio.forEach(pItem => {
        const row = document.createElement('div');
        row.innerHTML = `<strong>${pItem.symbol}</strong> — ${pItem.shares} shares`;
        pList.appendChild(row);
    });
}

// RUN THE APP
renderUserList();