$(function(){
  //blur後に線を透明化
  if (document.hasFocus()) {
   $(".input1").blur(function(){
    $(".input_line").css({
     "background-color": "transparent",
     "transition": "all 0.4s ease-out",
     "transition-delay": "0.3s"
    });
   });
  }
  //線を入力名に合わせて白に
  $("#input_n").focus(function(){
   $("#line_n").css({
    "transition": "none",
    "width": "86px",
    "background-color": "white"
   });
  });
  $("#input_e").focus(function(){
   $("#line_e").css({
    "transition": "none",
    "width": "52px",
    "background-color": "white"
   });
  });
  $("#input_p").focus(function(){
   $("#line_p").css({
    "transition": "none",
    "width": "83px",
    "background-color": "white"
   });
  });
  $("#input_c").focus(function(){
   $("#line_c").css({
    "transition": "none",
    "width": "72px",
    "background-color": "white"
   });
  });

  //入力欄のpaddingの動き
  $(".input1").focus(function(){
   $(this).css({
    "padding": "15px",
    "transition": "all 0.3s ease-out",
    "transition-delay": "0.2s"
   });
  });
  $(".input1").blur(function(){
    $(this).css("padding", "10px 10px 10px 130px");
  });

  //パスワの表示
  $("#eye_i").click(function(){
    // iconの切り替え
    $(this).toggleClass("fa-eye-slash fa-eye");
    // type切替
    var input = $(".eye");
    if (input.attr("type") == "password") {
      input.attr("type", "text");
    } else {
      input.attr("type", "password");
    }
  });
});