$(function(){
  //ホームメニューのhtml
  function buildUserHome(){
    var html =
     `<div class="mypage-top">
        <span class="top-text">kenk</span>
      </div>
      <div class="mypage-main">
        <ul class="menu-lists margin_bottom">
          <li class="profile-box">
            <div class="logo-box">
              <img class="profile-box__img" src="/assets/default.jpg">
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
          <li class="posts-box">
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
    console.log(character);
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
   if ( data.user_image ) {
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
                 <img class="profile-img" src="${data.user_image.url}">
                 <i class="fas fa-camera"></i>
               </div>
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
   }
   else {
    var html =
    `<div class="mypage-top">
       <span class="top-text">プロフィール</span>
     </div>
     <div class="mypage-main">
       <form class="edit_user" id="edit_user_${data.id}" action="/users/${data.id}.json" accept-charset="UTF-8" method="patch" data-remote="true">
         <div class="user-info">
           <div class="user-info__right">
             <div class="img-wrapper">
               <img class="profile-img" src="/assets/default.jpg">
               <i class="fas fa-camera"></i>
             </div>
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
                   <option selected="selected" value="医師">医師</option>
                   <option value="アカデミー">アカデミー</option>
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
  };
  

  //メニューバーがクリック後のcss調整
  $(".mypage__menu").on('click',".list",function(e){
   //cssが初期化
   $(".list").css({
    "background-color": "#fff",
   });
   $(".list").children().css({
    "font-size": "30px",
    "color": "#62b1ca"
   });
   //css付与
   $(e.currentTarget).css({
    "background-color": "#62b1ca",
   });
   $(e.currentTarget).children().css({
    "font-size": "40px",
    "color": "#fff"
   });
  });
  

  //以下各メニューがクリックされたときの画面表示

  //ホーム
  $('#user_home').click(function(){
    $(".mypage__whole").empty();
    $(".mypage__whole").append(buildUserHome());
  });

  //プロフィール
  if ($(".edit_user")){
    var authenticity_token = $(':input[name="authenticity_token"]:first').val()
    console.log(authenticity_token);
  };
  $('#profile').click(function(){
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
   })
   .fail(function(){
     alert("ユーザー情報取得に失敗しました");
   })
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
      var selection = buildSelection(data.character);
      var html = buildUserProfile(data, selection, authenticity_token);
      $(".mypage__whole, .user_name").empty();
      $('.mypage__whole').append(html);
      $(".user_name").append(data.name);
      $('.user-update').prop('disabled',false);
      alert("プロフィールを更新しました");
    })
    .fail(function(){
      $('.user-update').prop('disabled',false);
      alert("プロフィール更新に失敗しました");
    })
  });
});