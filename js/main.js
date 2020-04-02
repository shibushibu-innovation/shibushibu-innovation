function scrollFunc(num) {
    $("html,body").animate({ scrollTop: $(num).offset().top });
}

$('.bx-viewport').ready(function(){
    // console.log("load");
    $('.bx-viewport').css('height', '80vw');
    $('.slider img').css('height', '80vw');
    $('.bx-prev').css('display', 'none');
    $('.bx-next').css('display', 'none');
});


languageClass = [
    '#topMenuLi0', 
    '#topMenuLi1', 
    '#topMenuLi2', 
    '#topMenuLi3', 
    '#topMenuLi4', 
    '#signInButton', 
    '#signUpButton', 
    '.mainViewContent',
    '#incollectUserSpan',
    '#please_signIn_Span',
    '#box_label',
    '.signInButton',
    '.adressText',
    '.feedbackTitle',
    '.socialTitle',
];

languageEn = [
    'Concept', 
    'About us', 
    'Events', 
    'Calendar', 
    'Board', 
    'SIGN IN', 
    'SIGN UP', 
    "What is the ShibuShibu Innovation Project? It's a project that aims to organize and compile information around us in order to make it accessible and useful to students anytime, anywhere. It is done by converting paper-information such as posters of events,  school calendars, notifications by our teachers to our electronic devices. This website is the ultimate platform that makes student’s life at school better.",
    'Your user data does not match.',
    'Plese SignIn',
    'REMEMBER ME',
    '〉SIGN IN',
    '〒150-0002　1 Chome-21-18 Shibuya, Shibuya City, Tokyo',
    'Feedback',
    'Social',
];

languageJp = [
    'コンセプト', 
    'プロジェクト', 
    'イベント', 
    'カレンダー', 
    '掲示板', 
    'ログイン', 
    '新規登録', 
    "Shibushibu Innovation Projectとは、学校から伝達される情報を可能な限り電子化し、その情報をより正確に見やすく生徒に対して発信するプロジェクトです。各学年のホームページでは、先生から伝達されている情報や掲示板に貼り出された情報を、いつでもどこでも、見ることができる仕様となっております。",
    'ユーザー情報が間違っています',
    'ログインしてください',
    '次回以降、自動ログイン',
    '〉ログイン',
    '〒150-0002　東京都渋谷区渋谷 1丁目 21-18',
    'フィードバック',
    'SNS',
];

function setLanguage(num){
    if (num ==="En"){
        for(let i = 0; i < languageClass.length; i++) {
            $(languageClass[i]).text(languageEn[i]);
        }
        $('#enText').css('text-decoration', 'underline');
        $('#jpText').css('text-decoration', 'none');

    }else if (num ==="Jp"){
        for(let i = 0; i < languageClass.length; i++) {
            $(languageClass[i]).text(languageJp[i]);
        }
        $('#enText').css('text-decoration', 'none');
        $('#jpText').css('text-decoration', 'underline');
    }
}
