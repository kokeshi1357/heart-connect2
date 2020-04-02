$(function(){
  function buildHTML(dm){
    if ( dm.content ) {
      var html =
       `<div class="your_dm">
          <div class="user_name">
            <span class="your_name">
              ${dm.user_name}:
            </span>
            <span class="posted_date">
              ${dm.created_at}
            </span>
          </div>
          <div class="dm_content">
            <span class="dm_content__span">
              ${dm.content}
            </span>
          </div>
        </div>`
      return html;
    };
  };
 
  $('#dm_content').keyup(function(){
    var str = $(this).val();
    if (str == ""){
      $("#dm_content").attr('data-name', 'inactive');
      $(".send_dm").css('background-color','#a6a9ab');
    }else{
      $("#dm_content").attr('data-name', 'active')
      $(".send_dm").css('background-color','#61d0ff');
    };
  });
  $('.dm-form').on('submit', function(e){
    var name = $('#dm_content').attr('data-name');
    if (name != 'active'){
      return false;
    };
    e.preventDefault()
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
      var html = buildHTML(data);
      if ($('.annotation_dm')){
        $('.annotation_dm').remove();
      };
      $('#dms').append(html);
      $('form')[0].reset();
      $('.dm_box').animate({scrollTop: $('.dm_box')[0].scrollHeight});
      $('.send_dm').prop('disabled',false);
      $("#dm_content").attr('data-name', 'inactive');
      $(".send_dm").css('background-color','#a6a9ab');
    })
    .fail(function(){
      alert("メッセージ送信に失敗しました");
    });
  });
});