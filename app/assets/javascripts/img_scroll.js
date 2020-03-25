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
  //自動表示(完成したが今回のアプリではユーザビリティーの低下に繋がりそう)
  // var img_count = $(".img_wrap").length;
  // console.log(img_count);
  // if (img_count != 1){
  //  var distance = 0
  //  let num = 1;
  //  function slideshow_timer(){
  //    if (num == img_count){
  //      num = 1;
  //      distance = 0;
  //      $(".img_scroll_box").css({
  //       "left": distance+"%",
  //       "transition": " all 0.4s ease-in"
  //      });
  //    } 
  //    else {
  //      num ++;
  //      distance -= 100;
  //      $(".img_scroll_box").css({
  //       "left": distance+"%",
  //       "transition": " all 0.4s ease-in"
  //      });
  //    }
  //    $(".img_scroll_box").css("transition", " all 0.25s ease-in");
  //  }
  //  setInterval(slideshow_timer, 5000);
  // }
});