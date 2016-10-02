/**
 * Created by my on 2016/10/1.
 */

$(function() {
    //手机酷站 鼠标移上移出改变下方图片显示状态
    $("#nav .bottom").children().eq(0).children().eq(5).on("mouseenter mouseleave",function() {
        $("#nav .code").stop().fadeToggle();
    })

    //.code鼠标移上显示，离开消失
    $("#nav .code").bind("mouseenter mouseleave",function() {
        $(this).stop().fadeToggle();
    })

    //放大镜功能(点击小图出现一块镜子，并且在右侧出现对应区域的图像)
    $(".photo .smallpic").bind("mouseenter",function(event) {
        //鼠标移到.smallpic上，放大镜以及大图均显示
        $(".photo .mirror").show();
        $(".photo .glass").show();
       $(".photo .smallpic").bind("mousemove",function(event) {
           var _top = event.pageY - $(".smallpic").offset().top - $(".glass").height() / 2;
           var _left = event.pageX - $(".smallpic").offset().left - $(".glass").width() / 2;
           //设置.glass的位置
           $(".glass").css({
               left : _left,
               top : _top
           })

           //对.glass的位置进行判断
           //需先进性边界判断
           if($(".glass").get(0).offsetLeft <= 0){
               $(".glass").css("left",0);
           }
           if($(".glass").get(0).offsetLeft >= $(".smallpic").width() - $(".glass").width()){
               $(".glass").css("left",$(".smallpic").width() - $(".glass").width() + "px");
               //$(".mirror").css(left : )
           }
           if($(".glass").get(0).offsetTop <= 0){
               $(".glass").css("top",0);
           }
           if($(".glass").get(0).offsetTop >= $(".smallpic").height() - $(".glass").height()){
               $(".glass").css("top",$(".smallpic").height() - $(".glass").height() + "px");
           }

           //设置对应的大图片的位置
           //大图片的top与left从.glass来判断
           $(".photo .mirror img").css({left : -5 * parseInt($(".glass").css("left")),
                                        top : -5 * parseInt($(".glass").css("top"))
           })
       })
    })

    //鼠标移出时，放大镜和大图消失
    $(".photo .smallpic").bind("mouseleave",function() {
        $(".photo .mirror").hide();
        $(".photo .glass").hide();

    })
})