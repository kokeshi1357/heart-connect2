$(function(){
 var length = $('.open_box').length;
  if (length != 0){
    var height = $('.main-body').height();
    var width = $('.main-body').width();
    var h = Math.pow(height, 2);
    var w = Math.pow(width, 2);
    var oblique = Math.pow((h + w), 0.5);
    var deg = Math.atan(height/width) * 56.5;
    $('.open1').css({
      'height': height+"px",
      'width': oblique+"px"
    });
    $('.open2').css({
     'height': height+"px",
     'width': oblique+"px"
   });
   $('.open_box').css({
    'transform': `rotate(-${deg}deg)`,
     'left': `-${(oblique-width)/2}px`
   });
   $('.open_box').delay(1300)
   $('.open_box').fadeOut(1000)
  };
});