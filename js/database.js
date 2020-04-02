cheakLocked();
function cheakLocked (){
    const loginStatus = localStorage.getItem('loginStatus');
    if(loginStatus !== 'true'){    
        location.href = 'index.html';
    }
}
