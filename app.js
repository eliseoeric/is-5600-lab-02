/* add your code here */
document.addEventListener('DOMContentLoaded', () => {
    const stocksData = JSON.parse(stockContent);
    const userData = JSON.parse(userContent);

    const userList = document.querySelector('.user-list');
    const portfolioDetails = document.querySelector('.portfolio-list');
    const deleteButton=document.querySelector('#btnDelete');
    const saveButton=document.querySelector('#btnSave');
    generateUserList(userData,stocksData);

    deleteButton.addEventListener('click', (event)=>{
        event.preventDefault();

        const userId=document.querySelector('#userID').value;
        const userIndex=userData.findIndex(user=>user.id==userId);
        userData.splice(userIndex,1);
        generateUserList(userData, stocksData);
    })

    saveButton.addEventListener('click',(event)=>{
        event.preventDefault();
        const id=document.querySelector('#userID').value;

        const userIndex=userData.findIndex(user=>user.id==id);

        const newUsers=[
            ...userData.slice(0,userIndex),
            {   id:id,
                user:{
                    firstname : document.querySelector('#firstname').value,
                    lastname :document.querySelector('#lastname').value,
                    address :document.querySelector('#address').value,
                    city : document.querySelector('#city').value,
                    email : document.querySelector('#email').value,
                },
                portfolio: userData[userIndex].portfolio
            },
            ...userData.slice(userIndex+1)
        ];
        userData.splice(0, userData.length, ...newUsers);

        generateUserList(userData, stocksData);

/*         for(let i=0; i<userData.length; i++){
            if(userData[i].id==id){
                userData[i].user.firstname = document.querySelector('#firstname').value;
                userData[i].user.lastname = document.querySelector('#lastname').value;
                userData[i].user.address = document.querySelector('#address').value;
                userData[i].user.city = document.querySelector('#city').value;
                userData[i].user.email = document.querySelector('#email').value;     
            generateUserList(userData, stocks);
            }
        } */
    })

    function generateUserList(users) {
        userList.innerHTML='';
        users.map(({ user, id }) => {
            const listItem = document.createElement('li');
            listItem.innerText = `${user.lastname}, ${user.firstname}`;
            listItem.setAttribute('id', id);
            userList.appendChild(listItem);
        });
    }

    userList.addEventListener('click', (event) => handleUserListClick(event, userData, stocksData));

    function handleUserListClick(event, users, stocks) {
        const userId = event.target.id;
        const user = users.find(user => user.id == userId);
        if (user) {
            populateForm(user);
            renderPortfolio(user, stocks);
        }
    }

    function populateForm(data) {
        const { user, id } = data;
        document.querySelector('#userID').value = id;
        document.querySelector('#firstname').value = user.firstname;
        document.querySelector('#lastname').value = user.lastname;
        document.querySelector('#address').value = user.address;
        document.querySelector('#city').value = user.city;
        document.querySelector('#email').value = user.email;
    }

    function renderPortfolio(user, stocks) {
        const { portfolio } = user;
        portfolioDetails.innerHTML = '';

        portfolio.forEach(({ symbol, owned }) => {
            const symbolEl = document.createElement('p');
            const sharesEl = document.createElement('p');
            const actionEl = document.createElement('button');

            symbolEl.innerText = `Symbol: ${symbol}`;
            sharesEl.innerText = `Owned: ${owned}`;
            actionEl.innerText = "View";
            actionEl.setAttribute('id', symbol);

            portfolioDetails.appendChild(symbolEl);
            portfolioDetails.appendChild(sharesEl);
            portfolioDetails.appendChild(actionEl);
        });
    }

    portfolioDetails.addEventListener('click', (event) => {
        if (event.target.tagName === 'BUTTON') {
            viewStock(event.target.id, stocksData);
        }
    });

    function viewStock(symbol, stocks) {
        const stock = stocks.find(s => s.symbol == symbol);
        if (stock) {
            document.querySelector('#stockName').textContent = stock.name;
            document.querySelector('#stockSector').textContent = stock.sector;
            document.querySelector('#stockIndustry').textContent = stock.subIndustry;
            document.querySelector('#stockAddress').textContent = stock.address;
            document.querySelector('#logo').textContent = `logo/${symbol}.svg`;
        }
    }
});
