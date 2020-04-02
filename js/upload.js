var storage = firebase.storage();
var database = firebase.database();


var storageRef = firebase.storage().ref();


//formのsubmitにイベント設定
let file;
function uploadImage(event_name, event_date){
    const uploads = [];
    const date = new Date();
    const unix_time = date.getTime();// UNIXタイムスタンプを取得する (ミリ秒単位)
    const event_id = String(unix_time) + String(Math.floor(Math.random() * (10 ** 5)));
    const storageRef = firebase.storage().ref('event_images/' + event_id);
    
    uploads.push(storageRef.put(file));
    //すべての画像のアップロード完了を待つ
    Promise.all(uploads).then(function () {
        console.log('アップロード完了');
        uploadEventsData(event_id, event_name, event_date);
    });
}
function uploadEventsData(event_id, event_name, event_date) {
    firebase.database().ref('events/' + event_id).set({
        event_name: event_name,
        event_date: event_date,
    }, function(error) {
        if (error) {
            alert('アカウントを作成することができませんでした。時間をおいて、お試しください。');
        } else {  
            console.log('作成完了');
        }
    });
}













(function ($) {
    $(document).ready(function () {
      choose();
      upload_Image();
      submit();
      resetButton();
      removeNotification();
      autoRemoveNotification();
    //   autoDequeue();
      var way = 0;
      var queue = [];
      var fullStock = 10;
      var speedCloseNoti = 1000;
      
      function choose() {
        var li = $('.ways li')
        var section = $('.sections section')
        var index = 0
        li.on('click', function () {
          index = $(this).index()
          $(this).addClass('active')
          $(this).siblings().removeClass('active')
          
          section.siblings().removeClass('active')
          section.eq(index).addClass('active')
          if(!way) {
            way = 1
          }  else {
            way = 0
          }
        })
      }
      
      function upload_Image() {
        var button = $('.images .pic')
        var uploader = $('<input type="file" accept="image/*" />')
        var images = $('.images')
        
        button.on('click', function () {
          uploader.click()
        })
        
        uploader.on('change', function () {
            file = uploader[0].files[0];
            var reader = new FileReader()
            reader.onload = function(event) {
              images.prepend('<div class="img" style="background-image: url(\'' + event.target.result + '\');" rel="'+ event.target.result  +'"><span>remove</span></div>')
            }
            reader.readAsDataURL(uploader[0].files[0])
            $('.images .pic').css('display', 'none');
         })
        
        images.on('click', '.img', function () {
          $(this).remove();
          $('.images .pic').css('display', 'inline');
        })
      
      }
      
      function submit() {  
        var button = $('#send')
        
        button.on('click', function () {
          if(!way) {
            var title = $('#title')
            var images = $('.images .img')
            var imageArr = []
  
            
            for(var i = 0; i < images.length; i++) {
              imageArr.push({url: $(images[i]).attr('rel')})
            }
            
            var newStock = {
              title: title.val(),
              images: imageArr,
              type: 1
            }
            
            saveToQueue(newStock)
          }
        })
        
      }
      
      function removeNotification() {
        var close = $('.notification')
        close.on('click', 'span', function () {
          var parent = $(this).parent()
          parent.fadeOut(300)
          setTimeout(function() {
            parent.remove()
          }, 300)
        })
      }
      
      function autoRemoveNotification() {
        setInterval(function() {
          var notification = $('.notification')
          var notiPage = $(notification).children('.btn')
          var noti = $(notiPage[0])
          
          setTimeout(function () {
            setTimeout(function () {
             noti.remove()
            }, speedCloseNoti)
            noti.fadeOut(speedCloseNoti)
          }, speedCloseNoti)
        }, speedCloseNoti)
      }
      
      function autoDequeue() {
        var notification = $('.notification')
        var text
        
        setInterval(function () {
  
            if(queue.length > 0) {
              if(queue[0].type == 2) {
                text = ' Your discusstion is sent'
              } else {
                text = ' Your order is allowed.'
              }
              
              notification.append('<div class="success btn"><p><strong>Success:</strong>'+ text +'</p><span><i class=\"fa fa-times\" aria-hidden=\"true\"></i></span></div>')
              queue.splice(0, 1)
              
            }  
        }, 10000)
      }
      
      function resetButton() {
        var resetbtn = $('#reset')
        resetbtn.on('click', function () {
          reset()
        })
      }
      
      // helpers
      function saveToQueue(stock) {
        var notification = $('.notification');
        var check = 0;
        
        if(queue.length <= fullStock) {
          if(stock.type !== 2) {
            if(!stock.title || stock.images == 0) {
                check = 1;
            }
            if($('.event_date').val() === ""){
                check = 1;
            }
            // if($(''))
          }
          
          if(check) {
            notification.append('<div class="error btn"><p><strong>Error:</strong> Please fill in the form.</p><span><i class=\"fa fa-times\" aria-hidden=\"true\"></i></span></div>');
          } else {
            notification.append('<div class="success btn"><p><strong>Success:</strong> Account: 管理者用 is submitted.</p><span><i class=\"fa fa-times\" aria-hidden=\"true\"></i></span></div>');
            queue.push(stock);
            uploadImage($('.event_name').val(), $('.event_date').val());
            reset();
          }
        } else {
          notification.append('<div class="error btn"><p><strong>Error:</strong> Please waiting a queue.</p><span><i class=\"fa fa-times\" aria-hidden=\"true\"></i></span></div>');
        } 
      }
      function reset() {
        
        $('#title').val('');
        $('.event_date').val('');
        
        var images = $('.images .img')
        for(var i = 0; i < images.length; i++) {
          $(images)[i].remove()
        }
        $('.images .pic').css('display', 'inline');
        
      }
    })
  })(jQuery)