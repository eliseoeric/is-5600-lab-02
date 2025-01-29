document.addEventListener('DOMContentLoaded', () => {
    const stocksData = JSON.parse(stockContent);
    const userData = JSON.parse(userContent);
    const deleteButton = document.querySelector('#btnDelete');
    const saveButton = document.querySelector('#btnSave');
    generateUserList(userData, stocksData);

    deleteButton.addEventListener('click', (event) => {
      event.preventDefault();
      const userId = document.querySelector('#userID').value;
      const userIndex = userData.findIndex(user => user.id == userId);
      userData.splice(userIndex, 1);
      generateUserList(userData, stocksData);
});      
      saveButton.addEventListener('click', (event) => {
        event.preventDefault();

        const id = document.querySelector('#userID').value;
        const userIndex = userData.findIndex(user => user.id == id);

            const newUser = [
                ...userData.slice(0, userIndex),
                {
                        ...userData[userIndex],
                        user: {
                            firstname: document.querySelector('#firstname').value,
                            lastname: document.querySelector('#lastname').value,
                            address: document.querySelector('#address').value,
                            city: document.querySelector('#city').value,
                            email: document.querySelector('#email').value,
                    },
                },
                ...userData.slice(userIndex + 1)
            ];
            generateUserList(newUser, stocksData);
           // for (let i=0; i<userData.length; i++) {
            //    if (users[i].id == id) {
            //      userData[i].user.firstname = document.querySelector('#firstname').value;
            //     userData[i].user.lastname = document.querySelector('#lastname').value;
            //      userData[i].user.address = document.querySelector('#address').value;
            //     userData[i].user.city = document.querySelector('#city').value;
            // 