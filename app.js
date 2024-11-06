/* add your code here */

document.addEventListener('DOMContentLoaded', () => {
    const stocksData = JSON.parse(stockContent);
    const userData = JSON.parse(userContent);
const deleteButton = document.getElementById("btnDelete");
const saveButton = document.getElementById("btnSave");

console.log(stocksData)

function generateUserList(users,stocks ){
    const userList=document.querySelector('.user-list')
    userList.innerHTML='';
    users.map(({user,id})=>{
        const listItem = 
        document.createElement('li');
        listItem.innerText = user.lastname + ',  '+ user.firstname;
        listItem.setAttribute('id', id );
        userList.appendChild(listItem)
        userList.addEventListener('click', (event)=>
        handleUserListClick(event,users,stocks));
    });

}

function handleUserListClick(event,users,stocks){
    const userId=  event.target.id
    const user = users.find(user => user.id == userId);
    console.log(user)
    populateForm(user);
    renderPortfolio(user, stocks);


}

function renderPortfolio(user,stocks){
    const { portfolio }= user;
    const portfolioDetails = document.querySelector('.portfolio-list');
         portfolioDetails.innerHTML = '';
  portfolio.map(({ symbol, owned }) => {
    const symbolEl = document.createElement('p');
    const sharesEl = document.createElement('p');
        const actionEl = document.createElement('button');
    symbolEl.innerText = symbol;
    sharesEl.innerText = owned;
    actionEl.innerText = 'View';
    actionEl.setAttribute('id', symbol);
    portfolioDetails.appendChild(symbolEl);
    portfolioDetails.appendChild(sharesEl);
    portfolioDetails.appendChild(actionEl)

    portfolioDetails.addEventListener('click', (event) => {
        if (event.target.tagName === 'BUTTON') {
            console.log(event.target.id)
          viewStock(event.target.id, stocks);
        }
      });
  });


}

const  populateForm = (data)=>{
    const{user, id } = data;
    document.querySelector('#userID').value= id;
    document.querySelector('#userID').value = id;
    document.querySelector('#firstname').value = user.firstname;
    document.querySelector('#lastname').value = user.lastname;
    document.querySelector('#address').value = user.address;
    document.querySelector('#city').value = user.city;
    document.querySelector('#email').value = user.email;

    };

    function viewStock(symbol ,stocks){
        const stockArea = document.querySelector('.stock-form');
         if(stockArea){
            const stock= stocks.find( function(s){
                return s.symbol == symbol;
            });
            document.querySelector('#stockName').textContent = stock.name;
            document.querySelector('#stockSector').textContent = stock.sector;
            document.querySelector('#stockIndustry').textContent = stock.subIndustry;
            document.querySelector('#stockAddress').textContent = stock.address;

            document.querySelector('#logo').src = `./logos/${symbol}.svg`;
         }
    }
    deleteButton.addEventListener('click', (event)=>{
        event.preventDefault()
        const userId = document.querySelector('#userID').value;
        const userIndex = userData.findIndex(user => user.id == userId);
        userData.splice(userIndex, 1);
        generateUserList(userData, stocksData);
    })

    saveButton.addEventListener('click', (event) => {
        event.preventDefault();
        const id = document.querySelector('#userID').value;

        for (let i=0; i<userData.length; i++) {
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

    generateUserList(userData, stocksData);


});


