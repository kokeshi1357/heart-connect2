$(function(){
  //コメントのhtmlを挿入する関数
  function buildComment(comment, class_name, icon_html){
    if (comment.image != undefined){
      var image = `<img class="c_user_photo" src=${comment.image} width="20" height="20">`;
    }else{
      var image = `<img class="comment_user_icon" src="/assets/default.jpg" width="20" height="20">`;
    };
    if (comment.replied_num == undefined){
      var html =
            `<li class="comment_box" data-id=${comment.comment_num} name=${comment.user_name}>
                <div class="c_user_info">
                  ${image}
                  <div class=${class_name}>
                    <a href="/users/${comment.user_id}">${comment.user_name}</a>
                    ${icon_html}
                  </div>
                </div>
                <span class="c_text">
                  ${comment.text}
                </span>
                <div class="c_num">
                  ${comment.comment_num}.
                </div>
                <div class="reply_menu">
                  <div class="c_reply">
                    返信
                  </div>
                  <div class="reply_open2" data-id=${comment.comment_num} id="open_${comment.comment_num}" name>
                    
                  </div>
                </div>
                <ul class="reply_area2" data-id=${comment.comment_num} id="area2_${comment.comment_num}"></ul>
            </li>`;
      // コメントのhtmlをappendする
      $(".comment_lists").append(html);
      $('.comment_lists').animate({scrollTop: $('.comment_lists')[0].scrollHeight});
      // 非同期コメントへのリプライを開く
      $(`#open_${comment.comment_num}`).on('click', function(){
        var data_id = $(this).data('id');
        if ($(this).attr('name') == ''){
          $(this).attr('name', 'active');
          $(`#area2_${data_id}`).css('display', 'block');
        }else{
          $(this).attr('name', '');
          $(`#area2_${data_id}`).css('display', 'none');
        };
      });
    }
    else{
      var html = 
            `<li class="reply_box">
              <div class="c_user_info">
                ${image}
                <div class=${class_name}>
                  <a href="/users/${comment.user_id}">${comment.user_name}</a>
                  ${icon_html}
                </div>
              </div>
              <span class="c_text">
                ${comment.text}
              </span>
            </li>`;
      //挿入と"〜件の返信"の表示
      if ($(`#area2_${comment.replied_num}`).length != 0){
        var length = $(`#area2_${comment.replied_num}`).children().length;
        if (length == 0){
          $(`.reply_open2[data-id=${comment.replied_num}]`).html('1件の返信');
        }else{
          $(`.reply_open2[data-id=${comment.replied_num}]`).html(`${length+1}件の返信`);
        };
        $(`#area2_${comment.replied_num}`).append(html);
      }else{
        var length = $(`#area_${comment.replied_num}`).children().length;
        if (length == 0){
          $(`.reply_open[data-id=${comment.replied_num}]`).html('1件の返信');
        }else{
          $(`.reply_open[data-id=${comment.replied_num}]`).html(`${length+1}件の返信`);
        };
        $(`#area_${comment.replied_num}`).append(html);
      }
    };
  };
  //リプライ先の情報を表示・入力する関数
  function showReplyInfo(){
    $(".c_reply").on('click',function(){
      $('input[id="comment_replied_num"]').prop('checked', true);
      var parent = $(this).parent().parent();
      var data_id = parent.data("id");
      var user = parent.attr('name');
      var text = parent.children('span').html();
      var html = `　＞　 ${data_id}.　${user}:　${text}`;
      $('.replied_user_info').html(html);
      //リプライ先を示す番号を加える
      $('#comment_replied_num').val(data_id);
    });
  };
  //コメント入力欄の枠色が変わる
  $("#comment_text").focus(function(){
    $(".c_form").css("border", "1px solid #31bddc");
    $(this).blur(function(){
      $(".c_form").css("border", "1px solid #d8d8d8");
    });
  });
  //バリデーション
  $('#comment_submit').click(function(){
    var content = $("#comment_text").val();
    if (content == ""){
      $(".c_error").html("　*コメントを入力してください。");
      return false;
    }else{
      $(".c_error").empty();
      return true;
    };
  });
  //セレクトボックスを押したときの挙動
  $("#comment_replied_num").on('click',function(){
    var check = $(this).prop('checked');
    if (check == false){
      $('.replied_user_info').empty();
      $(this).val(0);
      $('.reply_num_box').html('');
    }else{
      var length = $(".comment_box").length;
      if (length != 0){
        for (var i = 1; i <= length; i++) {
          $('.reply_num_box').append(`<div class="reply_num" data-id=${i}>${i}</div>`);
        };
        $(`.reply_num`).mouseover(function(){
          var id = $(this).data('id');
          $(`.comment_box[data-id=${id}]`).css('background-color', '#dbf4ff')
        });
        $(`.reply_num`).mouseout(function(){
          var id = $(this).data('id');
          $(`.comment_box[data-id=${id}]`).css('background-color', '')
        });
        $(`.reply_num`).on('click',function(){
          var id = $(this).data('id');
          var parent = $(`.comment_box[data-id=${id}]`);
          var data_id = parent.data("id");
          var user = parent.attr('name');
          var text = parent.children('span').html();
          var html = `　＞　 ${data_id}.　${user}:　${text}`;
          $('.replied_user_info').html(html);
          //リプライ先を示す番号を加える
          $('#comment_replied_num').val(data_id);
          //cssを元に戻す
          $('.reply_num_box').html('');
          parent.css('background-color', '')
        });
      };
    };
  });
  //コメントへの返信を開く(ajax前)
  $('.reply_open').on('click', function(){
    var id = $(this).attr("id");
    var data_id = $(this).data('id');
    if (id =="active"){
      $(this).attr("id","");
      $(`#area_${data_id}`).css('display', 'none');
    }else{
      $(this).attr("id","active");
      $(`#area_${data_id}`).css('display', 'block');
    };
  });
  //リプライ先の情報を表示・入力する(ajax前)
  $(".c_reply").on('click',function(){
    $('input[id="comment_replied_num"]').prop('checked', true);
    var parent = $(this).parent().parent();
    var data_id = parent.data("id");
    var user = parent.attr('name');
    var text = parent.children('span').html();
    var html = `　＞　 ${data_id}.　${user}:　${text}`;
    $('.replied_user_info').html(html);
    //リプライ先を示す番号を加える(replied_num)
    $('#comment_replied_num').val(data_id);
  });
  //defaultで0を設定(replied_numが０以外 → リプライ)
  $('#comment_replied_num').val(0);
  //コメントを非同期で保存・表示
  $(".c_form").on('submit', function(e){
    e.preventDefault();
    //リプライかの判別 + コメントに番号をつける
    var value = $('#comment_replied_num').val();
    if (value == 0){
      if ($(".comment_box").length == 0){
        var num = 1;
      }else{
        var num = $(".comment_box:last").data("id") + 1
      };
      $('#comment_comment_num').val(num);
    }else{
      $('#comment_comment_num').val(null);
    };
    //formデータを取り出してajax
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var userId = $(e.target).prop("id");
      if (data.user_id == userId){
        var class_name = 'c_host_name';
        var icon_html = '<i class="fas fa-user-check"></i>';
      }else{
        var class_name = 'c_user_name';
        var icon_html = '';
      };
      //挿入
      $(".comment_lists").append(buildComment(data, class_name, icon_html));
      //リセット
      $('.reply_num_box').html('');
      $('#comment_text').val('');
      $('#comment_replied_num').val(0);
      $('.replied_user_info').empty();
      $('input[id="comment_replied_num"]').prop('checked', false);
      $('#comment_submit').attr('disabled', false);
      showReplyInfo();
    })
    .fail(function(){
      alert("投稿失敗");
    });
  });
});