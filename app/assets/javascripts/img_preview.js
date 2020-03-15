$(function(){
//ユーザー登録preview
  $("#user_user_image").on("change",function(){
    var file = $('input[type="file"]').prop('files')[0];
    if(file){
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function (e) {
        $('.future_user_img').attr('src', e.target.result);
      };
      $(".no-img").css("display", "none");
    }else{
      $('.future_user_img').attr('src', null);
      $(".no-img").css("display", "block");
    };
  });
  //(画像の表示調整)
  if ($(".future_user_img")){
    $("img").bind("load",function(){
      const nh = $(this).height();
      const nw = $(this).width();
      if(nh <= nw){
        $('.future_user_img').css({
          "max-height": "250px",
          "max-width": ""
        });
        $(".img_label").css("top", "");
      }else{
        $('.future_user_img').css({
          "max-height": "",
          "max-width": "250px"
          });
        $(".img_label").css("left", "");
      };
      $(".field-image").scroll(function(){
        var x = $(this).scrollLeft();
        var y = $(this).scrollTop();  
        if(nh <= nw){
          $(".img_label").css("left", x+"px");
        }else{
          $(".img_label").css("top", y+"px");
        };
      });
    });
  };


//メッセージ投稿preview
  // 画像用のinputを生成する関数
  const buildFileField = (index)=> {
    const html = `<div class="js-file_group" data-index="${index}" >
                    <input class="js-file" type="file"
                    name="message[images_attributes][${index}][img_src]"
                    id="message_images_attributes_${index}_img_src">
                  </div>`;
    return html;
  }
  // プレビュー用のimgタグを生成する関数
  const buildMessageImg = (index, url)=> {
    const html = `
            <div class="img_wrapper">
              <a data-lightbox="group" href="${url}" class="expansion">
                <img data-index="${index}" src="${url}" class="prev_img" id="">
              </a>
              <i class="fas fa-check-circle check_icon"></i>
            </div>`;
    return html;
  }
  // file_fieldのnameに動的なindexをつける為の配列
  let fileIndex = [1,2,3,4,5];
  lastIndex = $('.js-file_group:last').data('index');
  fileIndex.splice(0, lastIndex);

  // 新規画像の処理(プレビュー/新しいinputの追加)
  $('.img-area__menu').on('change', '.js-file', function(e) {
    // ファイルのindexとURLを取得する
    const targetIndex = $(this).parent().data('index');
    const file = e.target.files[0];
    const blobUrl = window.URL.createObjectURL(file);
    // 該当indexを持つimgタグがあれば取得して変数imgに入れる(画像変更の処理)
    if (img = $(`img[data-index="${targetIndex}"]`)[0]) {
      img.setAttribute('src', blobUrl);
    } else {
      //プレビュー挿入、file_fieldの追加、それを指定するlabelのfor属性を変更
      $('.img-area__box').append(buildMessageImg(targetIndex, blobUrl));
      var name = $('#delete-img')[0].getAttribute('name');
      if (name == 'active') {
        $(".expansion").removeAttr("data-lightbox href");
      };
      //画像のリミットは5枚
      if ($(".js-file_group").length < 5){ 
        $('.js-file_group:last').after(buildFileField(fileIndex[0]));
        $('#msg-img-box')[0].setAttribute('for', `message_images_attributes_${fileIndex[0]}_img_src`);
        // 追加したindexを消し、末尾の数に1足した数を追加する
        fileIndex.shift();
        fileIndex.push(fileIndex[fileIndex.length - 1] + 1);
      }else{    
        //入力を無効にする
        var html = '<div id="msg-img-box"><div id="add-img" class="push_btn">追加</div></div>';
        $('#msg-img-box').replaceWith(html);
      };
    };
  });

  //削除の選択表示
  $('#delete-img').click(function(){
    var name = $(this)[0].getAttribute('name');
    if (name == ""){
      $(this)[0].setAttribute('name', 'active')
      $(this).css({
        "top": "1.2px",
        "left": "1.2px",
        "box-shadow": "none",
        "border": "1px dashed #0cb8ff"
      });
      $(".expansion").removeAttr("data-lightbox href");
    }else{
      $(this)[0].setAttribute('name', '')
      $(this).css({
        "top": "",
        "left": "",
        "box-shadow": "1.2px 1.2px 0 #44c7ff",
        "border": "1px solid #0cb8ff"
      });
      $('.prev_img').css("opacity", "1");
      $('.prev_img').attr('id', '');
      $('.check_icon').css("display", "none");
      $(".expansion").each(function(index, link){
        var url = $(link).children().attr('src');
        $(link).attr({
          "data-lightbox": "group",
          "href": `${url}`
        });
      });
    };
  });
  
  $('.img-area__box').on('click', '.prev_img', function(){
    var name = $('#delete-img')[0].getAttribute('name');
    if (name == "active"){
      var img_id = $(this).prop('id');
      if (img_id == ''){
        $(this).attr('id', 'checked');
        $(this).css("opacity", "0.6");
        $(this).parent().next().css("display", "block");
      }else{
        $(this).attr('id', '');
        $(this).css("opacity", "1");
        $(this).parent().next().css("display", "none");
      };
    };
  });

  //削除の処理
  $('#done-img').click(function(){
    var prev = $(".prev_img");
    var checked_prev = $('img[id="checked"]');

    //消去画像が選択されているとき
    if (checked_prev.length != 0){
      //プレビューと紐ずくファイルを削除
      checked_prev.each(function(index,img){
        $(img).parent().parent().remove();
        const num = $(img).data('index');
        $(`.js-file_group[data-index="${num}"]`).remove();
      });
      // 新しいfile_fieldを最後尾にセット(プレビューが５つあった & 入力欄が残っている時)
      if (prev.length == 5){
        $('.js-file_group:last').after(buildFileField(fileIndex[0]));
        fileIndex.shift();
        fileIndex.push(fileIndex[fileIndex.length - 1] + 1);
      };
      // file_fieldが0にならないようにしておく
      if ($('.js-file').length == 0){
        $('#msg-img-box').after(buildFileField(fileIndex[0]));
        fileIndex.shift();
        fileIndex.push(fileIndex[fileIndex.length - 1] + 1);
      };
    };

    //プルビューが4枚以下で入力を可能にする
    if ($(".prev_img").length < 5){
      var index = $(".js-file_group:last").data('index');
      var html = `<label for="message_images_attributes_${index}_img_src" id="msg-img-box">
                    <div id="add-img" class="push_btn">追加</div>
                  </label>`;
      $('#msg-img-box').replaceWith(html);
    };
  });
});