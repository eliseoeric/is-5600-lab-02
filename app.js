/* add your code here */
document.addEventListener('DOMContentLoaded',() => {
const stocksData = JSON.parse(stockContent);
const userData =JSON.parse(userContent);
const deleteButton = document.querySelector('#btndelete');
const deleteSave = document.querySelector('#btnsave');
generateUserList(userData, stocksData);
deleteButton.addEventListener('click', (event) => {
    event.preventDefaultDefault();
    const Id =document.querySelector('#userId').value;
    const userIndex = userData.findIndex(user=> user.id == Id);
userData.splice(userIndex, 1);
generateUserList(userData, stocksData);
})
saveButton.addEventListener('click', (event) => {
    event.preventDefault();
    const id =document.querySelector('#userId').value;
    const userIndex = userData.findIndex(user => user.id == id);
    const newUsers = 
    [
        ...userData.slice(0,userIndex),
        {
            ...userData[userIndex],
            user: {
                firstname:document.querySelector('#firstname').value,
                lastname:document.querySelector('#lastname').value,
                address:document.querySelector('#address').value,
                city:document.querySelector('#city').value,
                email:document.querySelector('#email').value,


            },
        },
        ...userData.slice(userIndex +1 )
    ];
    userData = newUsers;

})
function generateUserList(users, stocks) {
    const userList = document.querySelector('.user-list');
    userList.innerHTML = '';
     users.map(({user, id}) => {
        const listItem = document.createElement('li');
        listItem.innerText = user.lastname + ', ' + user.firstname;
        listItem.setAttribute('id' , id);
        userList.appendChild(listItem);
     }
    )
    userList.addEventListener('click', (event) => handleUserListClick(event, users, stocks))
}
function handleUserListClick(event, users, stocks){
    const userId = event.target.id;
    const user = users.find(user => user.id == userId);
    populateForm(user);
    renderPortfolio(user, stocks);

}
function renderPortfolio(user, stocks){
const{ portfolio } = user;
const portfolioDetails= document.querySelector('.portfolio-list');
//clear out the list
portfolioDetails.innerHTML = '';
portfolio.map(({symbol, owned}) => {
    const symbolEl = document.createElement('p');
    const sharesEl = document.createElement('p');
    const actionEl = document.createElement('button');
    symbolEl.innerText =symbol;
    actionEl.inner =owned;
    actionEl.innerText = 'view';
    actionEl.setAttribute('id', symbol);
    portfolioDetails.appendChild(symbolEl);
    portfolioDetails.appendChild(sharesEl);
    portfolioDetails.appendChild(actionEl);

    
})
portfolioDetails.addEventListener('click',(event) => {
    if (event.target.tagName =='BUTTON') {
        viewStock(event.target.id, stocks);

    }

}
);
}
function populateForm(data)
{
    const { user, id} = data;
    document.querySelector('#userId').value = id;
    document.querySelector('#firstname').value = user.firstname;
    document.querySelector('#lastname').value = user.lastname;
    document.querySelector('#address').value = user.address;
    document.querySelector('#city').value = user.city;
    document.querySelector('#email').value = user.email;
}
function viewStock(symbol, stocks){
    const stockArea = document.querySelector('.stock-form');
    if(stockArea) {
        const stock = stocks.find(function(s){ return s.symbol == symbol})
        document.querySelector('#stockname').textContent = stock.name;
        document.querySelector('#stocksector').textContent = stock.sector;
        document.querySelector('#stockIndustry').textContent = stock.Industry;
        document.querySelector('#stockaddress').textContent = stock.address;
        document.querySelector('#logo').textContent = `logos/${symbol}.svg`

    }
    

}
});