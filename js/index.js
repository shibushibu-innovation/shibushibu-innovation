const rememberdUsername = localStorage.getItem('rememberdUsername');
const rememberdPW = localStorage.getItem('rememberdPW');

let userInfo = {
    username: '',
    pw: '',
    real_name : '',
    display_name : '',
    grade : 0,
};

var database = firebase.database();
function getUserInfo(username, callback) {
    var pwRef = firebase.database().ref('accounts/' + username + '/');
    pwRef.on('value', function(snapshot) {
        userInfo["username"] = username;
        userInfo["pw"] = snapshot.val().pw;
        userInfo["real_name"] = snapshot.val().real_name;
        userInfo["display_name"] = snapshot.val().display_name;
        userInfo["grade"] = snapshot.val().grade;
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
        console.log(get_ls('userInfo').pw);
        callback();
    });
}

function sha(num){
    const SHA_OBJ = new jsSHA("SHA-256","TEXT");
    let _text = num;
    SHA_OBJ.update(_text);
    return SHA_OBJ.getHash("HEX");
}


function setAutoSignIn() {
    if(rememberdUsername !== null){
        getUserInfo(rememberdUsername, setAutoSignInDone);
    }
}
function setAutoSignInDone(){
    if(sha(rememberdPW) === userInfo.pw){
        localStorage.setItem('loginStatus', true);
        location.href  = 'main.html'
    }else{
        $('.usernameTextbox').val(rememberdUsername);
        signIn();
        $('.please_signIn_Text').css('display', 'none');
        $('.incollectUserText').css('display', 'inline');
    }
}


function signIn(){
    $('.mainView').addClass('signInViewAni');
}

function Onscroll(){
    signIn();
    $("html,body").animate({ scrollTop: $('.mainViewDiv').offset().top - 42 + 'px' });
    $('.incollectUserText').css('display', 'none');
    $('.please_signIn_Text').css('display', 'inline');
}


function cheackSignIn (){
    const username = $('.usernameTextbox').val();
    getUserInfo(username, cheackSignInDone);
    
}
function cheackSignInDone(){
    const username = $('.usernameTextbox').val();
    const pw = $('.pwTextbox').val();
    if(sha(pw) === userInfo.pw){
        if($("#box-1").prop("checked") == true){
            localStorage.setItem('rememberdUsername', username);
            localStorage.setItem('rememberdPW', pw);
        }
        localStorage.setItem('loginStatus', true);
        location.href  = 'main.html'
    }else{
        $('.please_signIn_Text').css('display', 'none');
        $('.incollectUserText').css('display', 'inline');
        $('.usernameTextbox').val('');
        $('.pwTextbox').val('');
    }
}


function get_ls(key) {
  return JSON.parse(localStorage.getItem(key));
}


//console.log(get_ls('userInfo'));