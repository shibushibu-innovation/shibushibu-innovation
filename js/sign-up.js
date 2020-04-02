var database = firebase.database();

function writeUserData(username, password, name, display_name, grade) {
    firebase.database().ref('accounts/' + username).set({
        pw: sha(password),
        real_name : name,
        display_name : display_name,
        grade : grade,
    }, function(error) {
        if (error) {
            alert('アカウントを作成することができませんでした。時間をおいて、お試しください。');
        } else {  
            console.log('作成完了');
            location.href = 'index.html';
        }
    });
}

function sha(num){
    const SHA_OBJ = new jsSHA("SHA-256","TEXT");
    let _text = num;
    SHA_OBJ.update(_text);
    return SHA_OBJ.getHash("HEX");
}


function create_account() {
    const username = $('.username_box').val();
    const password = $('.pw_box').val();
    const password_2 = $('.pw_2_box').val();
    const name = $('.realname_box').val();
    const display_name = $('.displayname_box').val();
    const grade = $('.grade_box').val();
    const create_pw = sha($('.create_pw_box').val());
    if (username === '' || password === '' || password_2 === '' || name === '' || display_name === '' || grade === '' || grade === 'create_pw'){
        //error
        $('#sign-up-errorSpan').text('入力していない欄があります。');
        $('.sign-up-errorText').css('display', 'inline');
    }else {
        if(password === password_2){
            if(create_pw === "afbec331e577820e1216ac57c0528c2d6192cf5bfd4387f61beeaf995be65f6e"){
                writeUserData(username, password, name, display_name, grade);
            }else {
                //error
                $('#sign-up-errorSpan').text('アカウント作成用のパスワードが間違っています。');
                $('.sign-up-errorText').css('display', 'inline');
            }
        }else {
            //error
            $('#sign-up-errorSpan').text('パスワードが一致しません。');
            $('.sign-up-errorText').css('display', 'inline');
        }
    }
}