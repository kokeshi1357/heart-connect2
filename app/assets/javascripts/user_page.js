$(function(){
  //ホームメニューのhtml
  function buildUserHome(img){
    var html =
     `<div class="mypage-top">
        <span class="top-text">kenk</span>
      </div>
      <div class="mypage-main">
        <ul class="menu-lists margin_bottom">
          <li class="profile-box list-box" data-id="1">
            <div class="logo-box">
              <img class="profile-box__img" src=${img}>
            </div>
          <div class="user-show-text">プロフィール</div>
          </li>
          <li class="setting-box">
            <div class="logo-box">
              <i class="fas fa-cog"></i>
            </div>
            <span class="user-show-text">設定</span>
          </li>
          <li class="guide-box">
            <div class="logo-box">
              <i class="far fa-map"></i>
            </div>
            <span class="user-show-text">利用ガイド</span>
          </li>
        </ul>
        <ul class="menu-lists">
          <li class="posts-box list-box" data-id="4">
            <div class="logo-box">
              <i class="fas fa-window-restore"></i>
            </div>
            <span class="user-show-text">投稿リスト</span>
          </li>
          <li class="posting-box">
            <div class="logo-box">
              <i class="fas fa-edit icon-write"></i>
            </div>
            <span class="user-show-text">投稿する</span>
          </li>
          <li class="help-box">
            <div class="logo-box">
              <i class="fas fa-question-circle"></i>
            </div>
            <span class="user-show-text">ヘルプ</span>
          </li>
        </ul>
      </div>`
    return html;
  };

  //プロフィールのhtml
  function buildSelection(character){
    var selection = '';
    var all_options = ["医師","患者","アカデミー"];
    all_options.forEach(function(option){
      if (option == character){
        var option_html = `<option selected="selected" value="${character}">${character}</option>`
      } else{
        var option_html = `<option value="${option}">${option}</option>`
      };
      selection += option_html
    });
    return selection;
  };
  function buildUserProfile(data, selection, authenticity_token){
    if (data.user_image.url){
      var img = `<img class="profile-img" src=${data.user_image.url}>`;
    }else{
      var img = `<img class="profile-img" style="display:none;" src(unknown)>
                 <i id="icon_user" class="fas fa-user"></i>`;
    };
    var html =
    `<div class="mypage-top">
        <span class="top-text">プロフィール</span>
      </div>
      <div class="mypage-main">
        <form class="edit_user" id="edit_user_${data.id}" action="/users/${data.id}" accept-charset="UTF-8" method="post">
          <input name="utf8" type="hidden" value="✓">
          <input type="hidden" name="_method" value="patch">
          <input type="hidden" name="authenticity_token" value="${authenticity_token}">
          <div class="user-info">
            <div class="user-info__right">
              <div class="img-wrapper">
                <label for="user_user_image">
                  ${img}
                </label>
                <i class="fas fa-camera" id="camera"></i>
              </div>
              <input style="display: none;" type="file" name="user[user_image]" id="user_user_image">
              <div class="introduction">
                <span>自己紹介</span>
                <div class="introduction__detail">
                  <textarea name="user[detail]" id="user_detail">${data.detail}</textarea>
                </div>
              </div>
            </div>
            <div class="user-info__left">
              <div class="text-box">
                <span>ニックネーム</span>
                <div class="user-text">
                  <input autofocus="autofocus" maxlength="25" size="25" type="text" value="${data.name}" name="user[name]" id="user_name">
                </div>
              </div>
              <div class="text-box">
                <span>職業</span>
                <div class="user-text">
                  <select name="user[character]" id="user_character">
                    ${selection}
                  </select>
                </div>
              </div>
              <input type="submit" name="commit" value="更新する" class="user-update" data-disable-with="更新する">
            </div>
          </div>
        </form>
      </div>`
    return html;
  };

  //ログインしてないと投稿詳細からユーザー情報へいけない
  $(".user_head__name").on('click', function(){
    if ($("#user_proof").length == 0){
      $(".user_page_notice").fadeToggle();
      return false;
    };
  });

  //メニューバーがクリック後のcss調整
  $(".mypage__menu").on('click',".list",function(e){
    //cssが初期化
    $(".list").css("background-color", "transparent");
    $(".list").children().css({
      "font-size": "30px",
      "color": "#62b1ca"
    });
    //css付与
    $(e.currentTarget).css("background-color", "#62b1ca");
    $(e.currentTarget).children().css({
      "font-size": "40px",
      "color": "#fff"
    });
  });

  //画面切り替え+その後の更新の関数
  function makeProfileAjax(){
    $('.profile-box').click(function(){
      $.ajax({
        url: '/users/get_user_info',
        type: 'GET',
        dataType: 'json'
      })
      .done(function(data){
        var selection = buildSelection(data.character);
        var html = buildUserProfile(data, selection, authenticity_token);
        $(".mypage__whole").empty();
        $('.mypage__whole').append(html);
        //プロフィール画像のプレビュー(ajax後)
        $('#user_user_image').on('change',function(){
         var file = $('input[type="file"]').prop('files')[0]
         if(file){
           var reader = new FileReader();
           reader.readAsDataURL(file);
           reader.onload = function (e) {
             $('.profile-img').attr('src', e.target.result);
             $('.profile-img').css('display', 'block');
           };
           $("#icon_user").css("display", "none");
         }else{
           $('.profile-img').css('display', 'none');
           $("#icon_user").css("display", "block");
         };
        });
        //プロフィールの更新(ajaxで画面を切り替えた後)
        $('.edit_user').on('submit', function(e){
          e.preventDefault()
          var formData = new FormData(this);
          var url = $(this).attr('action');
          $.ajax({
            url: url,
            cache: false,
            type: "POST",
            data: formData,
            dataType: 'json',
            processData: false,
            contentType: false
          })
          .done(function(data){
            home_img = data.user_image.url;
            $(".user_name").html(data.name);
            $('img[class="user_image"]').attr('src', data.user_image.url)
            $('.user-update').prop('disabled',false);
            alert("プロフィールを更新しました");
          })
          .fail(function(){
            $('.user-update').prop('disabled',false);
            alert("プロフィール更新に失敗しました");
          });
        });
      })
      .fail(function(){
        alert("ユーザー情報取得に失敗しました");
      })
    });
  };
  //以下各メニューがクリックされたときの画面表示
  
  var home_img = $('.profile-img').attr('src')
  console.log(home_img)
  //ホーム
  $('#user_home').click(function(){
    $(".mypage__whole").empty();
    $(".mypage__whole").append(buildUserHome(home_img));
    $(".list-box").on('click',function(){
      //cssが初期化
      $(".list").css("background-color", "transparent");
      $(".list").children().css({
        "font-size": "30px",
        "color": "#62b1ca"
      });
      //css付与
      var id = $(this).data("id");
      $(`.list[data-id=${id}]`).css("background-color", "#62b1ca");
      $(`.list[data-id=${id}]`).children().css({
        "font-size": "40px",
        "color": "#fff"
      });
    });
    makeProfileAjax();
    buildHistoryWhole();
  });

  //プロフィール
  if ($(".edit_user")){
    var authenticity_token = $(':input[name="authenticity_token"]:first').val()
  };
  makeProfileAjax();

  //プロフィール画像のプレビュー
  $('#user_user_image').on('change',function(){
    var file = $('input[type="file"]').prop('files')[0]
    if(file){
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function (e) {
        $('.profile-img').attr('src', e.target.result);
        $('.profile-img').css('display', 'block');
      };
      $("#icon_user").css("display", "none");
    }else{
      $('.profile-img').css('display', 'none');
      $("#icon_user").css("display", "block");
    };
  });

  //プロフィールの更新
  $('.edit_user').on('submit', function(e){
    e.preventDefault()
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      cache: false,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      home_img = data.user_image.url;
      $(".user_name").html(data.name);
      $('img[class="user_image"]').attr('src', data.user_image.url)
      $('.user-update').prop('disabled',false);
      alert("プロフィールを更新しました");
    })
    .fail(function(){
      $('.user-update').prop('disabled',false);
      alert("プロフィール更新に失敗しました");
    });
  });



  ///投稿履歴
  //投稿履歴画面の表示
  function buildUserHistory(msg_li, img_li, msg_body, ntc){
    var html = 
         `<div class="mypage-top">
            <span class="top-text">投稿履歴</span>
          </div>
          <div class="mypage-main">
            <div class="history-box">
              <div class="history-box__right">
                <ul class="icon-box">
                  <li class="current">
                    <span>投稿中</span>
                    <i id="file_icon" class="fas fa-window-maximize"></i>
                  </li>
                  <li class="trash">
                    <span>ゴミ箱</span>
                    <i id="trash_icon" class="fas fa-trash-alt"></i>
                  </li>
                </ul>
                <ul class="lists">
                  ${msg_li}
                  <div class="msg_notice">
                    ${ntc}
                  </div>
                </ul>
              </div>
              <div class="history-box__left">
                <div class="option-list">
                </div>
                <div class="history-content">
                  <div class="image-history">
                    ${img_li}
                  </div>
                  <div class="detail-history">
                    ${msg_body}
                  </div>
                </div>
              </div>
            </div>
          </div>`;
    $('.mypage__whole').append(html);
  };
  //画面表示のhtml(上:現在の投稿 下:ゴミ箱)
  function buildCurrentHtml(msg,i){
    var html = 
          `<li class="current-post" data-id=${msg.id} id="current_index_${i}">
            <img src=${msg.images[0].img_src.url} width="60" height="50">
            <div class="post-log">
              <div class="date">
                ${msg.created_at}
              </div>
              <div class="title">
                ${msg.title}
              </div>
            </div>
           </li>`
    return html;
  };
  function buildTrashHtml(msg,i){
    var html = 
          `<li class="past-post" data-id=${msg.id} id="past_index_${i}">
            <img src=${msg.images[0].img_src.url} width="60" height="50">
            <div class="post-log">
              <div class="date">
                ${msg.created_at}
              </div>
              <div class="title">
                ${msg.title}
              </div>
            </div>
            <i class="fas fa-arrow-circle-up upload" data-id=${msg.id}></i>
           </li>`
    return html;
  };
  //挿入する画像
  function buildPostImg(img_url){
    var html =
            `<a data-lightbox="group" href="${img_url}">
            <img src=${img_url} width="65" height="55" style="margin: 0 5px 0 0;">
             </a>`
    return html;
  };
  //一つ一つの履歴を表示するajax
  function retrieveHistory(messageId){
    $.ajax({
      url: '/users/get_user_message',
      type: 'GET',
      data: { message_id: messageId },
      dataType: 'json'
    })
    .done(function(data){
      var message = data["message"];
      var images = data["images"];
      //trash_statusが1だとゴミ箱にある
      if (message.trash_status == 1){
        $(".detail-history").html(message.body)
        $(".image-history").empty();
        images.forEach(function(img){
          var img_html = buildPostImg(img.img_src.url);
          $(".image-history").append(img_html);
        });
      };
    })
    .fail(function(){
      alert("ユーザー情報取得に失敗しました");
    });
  };
  //画面全体を表示
  buildHistoryWhole();
  function buildHistoryWhole(){
    $(".posts-box").click(function(){
      $.ajax({
        url: '/users/get_history_info',
        type: 'GET',
        dataType: 'json'
      })
      .done(function(data){
        var notice = "";
        $(".mypage__whole").empty();
        if (data[0]){
          //投稿リストを製作
          var msg_lists = [];
          data.forEach(function(msg,i){
            msg_lists += buildCurrentHtml(msg,i);
          });
          //投稿1の画像リストを製作
          var images = data[0].images
          var first_img_lists = []; 
          images.forEach(function(img){
            first_img_lists += buildPostImg(img.img_src.url);
          });
          //挿入
          buildUserHistory(msg_lists, first_img_lists, data[0].body, notice);
        }else{
          var emp_msg = "";
          var emp_img = "";
          var emp_body = "";
          notice = "現在の投稿はありません。";
          buildUserHistory(emp_msg, emp_img, emp_body, notice);
        };
        //一つ一つの投稿を表示(投稿中)
        $('.lists').on('click', '.current-post',function(){
          var messageId = $(this).data("id");
          $('.current-post').css("background-color", "#fff");
          $(this).css("background-color", "#cff1ff")
          $.ajax({
            url: '/users/get_user_message',
            type: 'GET',
            data: { message_id: messageId },
            dataType: 'json'
          })
          .done(function(data){
            var message = data["message"];
            var images = data["images"];
            //trash_statusが1だとゴミ箱にある
            if (message.trash_status != 1){
              $(".detail-history").html(message.body)
              $(".image-history").empty();
              images.forEach(function(img){
                var img_html = buildPostImg(img.img_src.url);
                $(".image-history").append(img_html);
              });
            };
          })
          .fail(function(){
            alert("ユーザー情報取得に失敗しました");
          });
        });
        //ゴミ箱の投稿表示
        $(".trash").click(function(){
          $(this).css("background-color", "#69c3df")
          $(".current").css("background-color", "#c5c5c5")
          $.ajax({
            url: '/users/msg_history_show',
            type: 'GET',
            data: {status: "trash"},
            dataType: 'json'
          })
          .done(function(data){
            $('ul[class="lists"]').empty();
            $(".detail-history").empty();
            $(".image-history").empty();
            if (data[0]){
              //右の投稿一覧
              data.forEach(function(msg,i){
                $('ul[class="lists"]').append(buildTrashHtml(msg,i))
              });
              //左に初めの投稿を表示
              $(".detail_history").append(data[0].body);
              var images = data[0].images
              images.forEach(function(img){
                var img_html = buildPostImg(img.img_src.url);
                $(".image-history").append(img_html);
              });
              $(".image-history").append(data.body);
            }else{
              $('ul[class="lists"]').html(
                `<div class="msg_notice">ゴミ箱の中は空です。</div>`
              );
            };
            //ゴミ箱のアップロードボタン
            $(".option-list").empty();
            $(".option-list").html(
              `<button class="up_from_past" name="" type="button">
                ゴミ箱からアップロードする
                <i style="font-size: 18px;" class="fas fa-upload"></i>
                </button>`
            );
            //一つ一つの投稿を表示(ゴミ箱)
            $('.lists').on('click', '.past-post',function(){
              var messageId = $(this).data("id");
              $('.past-post').css("background-color", "#fff");
              $(this).css("background-color", "#ececec")
              retrieveHistory(messageId);
            });
            //ゴミ箱からアップロード
            $(".up_from_past").click(function(){
              if ($(this).prop("name") == ""){
                $(this).prop("name","active");
                $(this).css("background-color", "#a5a5a5");
                $(".upload").css("display", "block")
              }else{
                $(this).prop("name","");
                $(this).css("background-color", "#8bd3f1");
                $(".upload").css("display", "none")
              };
            });
            $('ul[class="lists"]').on("click", ".upload", function(e){
              var msg_id = $(e.target).data("id");
              $(e.target).css("display", "none")
              $(e.target).after(`<div class="upload_end">アップロード済</div>`);
              $.ajax({
                url: '/users/partial_update',
                type: 'PATCH',
                dataType: 'json',
                data: {id: msg_id}
              })
              .done(function(){
              console.log("ok");
              })
              .fail(function(){
              console.log("failure");
              });
            });
          })
          .fail(function(){
            alert("ユーザー情報取得に失敗しました");
          });
        });
        //現在投稿表示
        $(".current").click(function(){
          $(this).css("background-color", "#69c3df")
          $(".trash").css("background-color", "#c5c5c5")
          $.ajax({
            url: '/users/msg_history_show',
            type: 'GET',
            data: {status: "current"},
            dataType: 'json'
          })
          .done(function(data){
            $(".up_from_past").prop("name","");
            $('.up_from_past').css("background-color", "#8bd3f1");
            $('.lists').empty();
            $(".detail-history").empty();
            $(".image-history").empty();
            $(".option-list").empty();
            if (data[0]){
              data.forEach(function(msg,i){
                $('ul[class="lists"]').append(buildCurrentHtml(msg,i))
              });
              $(".detail_history").append(data[0].body);
              var images = data[0].images
              images.forEach(function(img){
              var img_html = buildPostImg(img.img_src.url);
              $(".image-history").append(img_html);
              });
              $(".image-history").append(data.body);
            }else{
              $('ul[class="lists"]').html(
                `<div class="msg_notice">現在の投稿はありません。</div>`
              );
            }
          })
          .fail(function(){
            alert("ユーザー情報取得に失敗しました");
          });
        });

      })
      .fail(function(){
        alert("ユーザー情報取得に失敗しました");
      });
    });
  };
});