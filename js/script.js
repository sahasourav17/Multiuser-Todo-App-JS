// let logButton = document.querySelector("#login-btn");
// let userName = document.querySelector('.entered-name');


const login =()=>{
    const userName = document.getElementById('username').value;
    const userExists = localStorage.getItem(userName);
    if(!userExists){
        const data = {'name': userName,'todos':[]};
        const jsonData = JSON.stringify(data);
        localStorage.setItem(userName,jsonData);
    }
    else console.log('welcome');

}

// logButton.addEventListener('click',()=>login())


