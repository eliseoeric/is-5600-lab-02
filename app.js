/* add your code here */
document. addEventListener('DOMContentLoaded',()=>{
    const stocksData= JSON.parse(stockContent);
    const userData = JSON.parse(userContent);
    

    generateUserList(userData,stocksData);
    document.querySelector('#btnSave').addEventListener('click',(event)=>{
        event.preventDefault();
        const id = document.querySelector('#userID').value;
        console.log(id);
        const users=userData;
        for (let i=0;i<users.length;i++){
             if(users[i].id == id){
                 users[i].user.firstname = document.querySelector('#firstname').value;
                 users[i].user.lastname = document.querySelector('#lastname').value;
                 users[i].user.address = document.querySelector('#address').value;
                 users[i].user.city = document.querySelector('#city').value;
                 users[i].user.email = document.querySelector('#email').value;
                 console.log(users[i].user.firstname);
                 generateUserList(users,stocksData);
             }
         }
     })

     document.querySelector('#btnDelete').addEventListener('click',(event)=>{
        event.preventDefault();
        const id = document.querySelector('#userID').value;
        const userIndex= userData.findIndex(user=> user.id == id);
        userData.splice(userIndex,1);
        generateUserList(userData,stocksData);
     })
})

function generateUserList(users,stocks){
    const list_selection = document.querySelector('.user-list');
    list_selection.innerHTML = '';
    users.map(({user,id})=>{
        const listitem = document.createElement('li');
        listitem.innerText=user.firstname+","+user.lastname;
        listitem.setAttribute('id',id);
        list_selection.appendChild(listitem);
    })
    
    list_selection.addEventListener('click',(event)=>handleUserListClick(event,users,stocks));
}
function populate(data){
    
    const {user,id} = data;
    document.querySelector('#userID').value = id;
    document.querySelector('#firstname').value = user.firstname;
    document.querySelector('#lastname').value = user.lastname;
    document.querySelector('#address').value = user.address;
    document.querySelector('#city').value = user.city;
    document.querySelector('#email').value = user.email;
    //console.log(document.querySelector('#firstname').value);
}
function renderportfolio(userdata,stockdata){
    const {portfolio} = userdata;
    const portfoliodetails = document.querySelector('.portfolio-list');
    portfoliodetails.innerHTML = '';
    //console.log(userinfo);
    portfolio.map(({symbol,owned})=>{
        const symbol1= document.createElement('image');
        const shares1= document.createElement('p');
        const view1= document.createElement('button');
        symbol1.innerText = symbol;
        shares1.innerText= owned;
        view1.innerText = 'View';
        view1.setAttribute('id',symbol);
        portfoliodetails.appendChild(symbol1);
        portfoliodetails.appendChild(shares1);
        portfoliodetails.appendChild(view1);
        view1.addEventListener('click',(event)=>handlestockListClick(event,stockdata))
    })

}
function handlestockListClick(event,stock){
    const stockID = event.target.id;
    const stockdetils = stock.find((stock)=>stockID == stock.symbol);
    populatestockdata(stockdetils);
}
function populatestockdata(stock){
    
    document.querySelector('#stockName').textContent= stock.name;
    document.querySelector('#stockSector').textContent = stock.sector;
    //console.log(document.getElementById('#stockSector'));
    document.querySelector('#stockIndustry').textContent = stock.subIndustry;
    document.querySelector('#stockAddress').textContent = stock.address;
    document.querySelector('#logo').src = `logos/${stock.symbol}.svg`;

}
function handleUserListClick(event,users,stocks){
    const userID = event.target.id;
    const user = users.find(user=> user.id==userID);
    populate(user);
    //console.log(user);
    renderportfolio(user,stocks);

}