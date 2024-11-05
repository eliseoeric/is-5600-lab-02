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

