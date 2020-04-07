$(function (){
 //サイドバーのカテゴリ表示(messageIndex)
  //タグ検索から表示する関数
  function buildTagMsg(msg){
    if (msg.image != undefined){
     var img = `<div class="index_message_image">
                  <img style="height:100px; width:150px;" src=${msg.image.url}>
                </div>`;
    }else{
     var img = "<div class='no_image'>No Image</div>";
    }
    var html = `<div class="message_box">
                  ${img}
                  <div class="message">
                    <a id="link" href="/messages/${msg.id}"></a>
                    <div class="chara">
                      ${msg.user_character}
                    </div>
                    <div class="name">
                      ${msg.user_name}
                    </div>
                    <div class="created_date">
                      ${msg.date}
                    </div>
                    <div class="title">
                      <p class="title__call">Title：</p>
                      ${msg.title}
                    </div>
                  </div>
                </div>`;
    $('.index-table').append(html);
  };
  //タグアイコンをクリックで表示・色の切り替え
  $('#tag_push').on('click', function(){
    $('.tag_choose').fadeToggle(400);
  });
  $('.cat_tag').on('click', function(){
   $('.cat_tag').css('background-color', '#fbfbfb8f');
   $(this).css('background-color', '#5dcefbd6');
  });
  //cssでカテゴリー以下のタグを表示・非表示
  $('.cat_btn').on('click', function(){
    $(this).next().slideToggle(300);
  });
  //投稿一覧ボタン
  $('.index-head__title').click(function(){
    $('.cat_tag').css('background-color', '#fbfbfb8f');
    $.ajax({
     url: '/messages/tag_search',
     type: 'GET',
     dataType: 'json'
    })
    .done(function(data){
      if (data.length != 0 ){
        $('.index-table').empty();
        data.forEach(function(msg){
          buildTagMsg(msg);
        });
      }else{
       $('.index-table').empty();
       $('.index-table').html(`<div class="msg_empty_notice">現在の投稿はありません</div>`);
      };
      $('.tag_shift').empty();
    })
    .fail(function(){
      alert('failure')
    })
  });
  //タグ検索
  $('.cat_tag').on('click', function(){
    var dataId = $(this).data('id');
    var tag_name = $(this).html();
    var cat_name = $(this).parent().prev().html();
    $.ajax({
      url: '/messages/tag_search',
      type: 'GET',
      data: {tag_id: dataId},
      dataType: 'json'
    })
    .done(function(data){
      if (data.length != 0 ){
        $('.index-table').empty();
        data.forEach(function(msg){
          buildTagMsg(msg);
        });
      }else{
       $('.index-table').empty();
       $('.index-table').html(`<div class="msg_empty_notice">現在の投稿はありません</div>`);
      };
      $('.tag_shift').empty();
      $('.tag_shift').html(`>  ${cat_name}  >  ${tag_name}`)
    })
    .fail(function(){
      alert('failure')
    })
  });
  

 //新規投稿
  //選択されたタグの関数
  function buildTagInput(id, name){
    var html = 
         `<div class="tag">
            <div class="tag_off" data-id=${id}>×</div>
            <nobr class="tag_name">${name}</nobr>
          </div>
          <input type="hidden" name="message[category_ids][]" value=${id} id="tag_num_${id}"></input>`;
     $('.tag_lists').append(html);
  };
  //カテゴリー内のタグの関数
  function buildTagoption(tag, tagged){
    var html = `<div class="one_tag ${tagged}" data-id=${tag.id} id="one_tag_${tag.id}">${tag.name}</div>`;
    $('.child_list').append(html);
  };

  $('.parent').on('click', function(e){
    //css 装飾
    $('.parent').css({
     'background-color': '#fff',
     'color': '#16c7ef'
    });
    $(this).css({
      'background-color': '#00d0ffc7',
      'color': '#fff'
    });
    //tag表示
    e.preventDefault();
    var parentId = $(this).data('id')
    $.ajax({
     url: '/messages/tag_spread',
     type: 'GET',
     data: {parent_id: parentId},
     dataType: 'json'
    })
    .done(function(data){
     //カテゴリー以下にタグを表示
      $('.child_list').empty();
      data.forEach(function(tag){
        var tagged = '';
        if ($(`#tag_num_${tag.id}`).length != 0){
          tagged = 'tagged'
        };
        buildTagoption(tag, tagged);
      });
     //タグリストにタグを加える
      $('.one_tag').on('click', function(){
       var dataId = $(this).data('id');
       var name = $(this).html();
       if ($(`#tag_num_${dataId}`).length == 0){
        buildTagInput(dataId, name);
       }
       $(this).css('background-color','#00d0ffa1');
      //編集で削除していた場合
       $(`#dele_tag_${dataId}`).remove();
      //タグ削除
       $('.tag_off').on('click', function(){
        var id = $(this).data('id');
        $(this).parent().remove();
        $(`#tag_num_${id}`).remove();
        $(`#one_tag_${id}`).css('background-color','#fbfbfb8f')
       });
      });
    })
    .fail(function(){
      alert('failure');
    });
  });
 //タグ削除(編集)
  //編集でタグが空になると、空タグで更新を送る関数
  function buildTagDelete(){
    if ($('.make_empty').length == 0){
      var html = 
      `<input type="hidden" name="message[category_ids][]" value='' " class="make_empty"></input>`;
      $('.tag_lists').append(html);
    };
  };
  $('.tag_off').on('click', function(){
   var id = $(this).data('id');
   $(this).parent().remove();
   $(`#tag_num_${id}`).remove();
   $(`#one_tag_${id}`).css('background-color','#fbfbfb8f');
   buildTagDelete();
  });
});