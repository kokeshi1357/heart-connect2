$(function(){
  $("#msg_img_0").hover(function(){
   $(".img_scroll_box").css("left", "0")
  });
  $("#msg_img_1").hover(function(){
   $(".img_scroll_box").css("left", "-100%")
  });
  $("#msg_img_2").hover(function(){
   $(".img_scroll_box").css("left", "-200%")
  });
  $("#msg_img_3").hover(function(){
   $(".img_scroll_box").css("left", "-300%")
  });
  $("#msg_img_4").hover(function(){
   $(".img_scroll_box").css("left", "-400%")
  });
  //(画像の表示調整)
  if ($(".img_scroll_box")){
    for (var i = 0; i < 5; i++) {
      var option = $(`#img_option_${i}`)
      if (option) {
       option.bind("load",function(){
        const nh = $(this).height();
        const nw = $(this).width();
        if (nh < nw){
          $(this).css("min-width", "100%");
        };
       });
      }
      else{
       break;
      }
    };
  };
});