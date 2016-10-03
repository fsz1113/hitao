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
           //鼠标在.glass的正中心
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

    //#content的商品介绍和商品评论的Tab切换
    //li点击时的事件
    $("#content .select").children().click(function() {
        //先将所有li的样式清空
        $(this).siblings().andSelf().removeClass("hover");
        //再讲点击的li的样式变成hover
        $(this).addClass("hover");
    })

    //第一个li点击显示详情
    $("#content .select").children().eq(0).click(function() {
        $("#content .comment").hide();
        $("#content .para").show();
        $("#content .right").css("height","5150px");
    })

    //第二个li点击显示评论
    $("#content .select").children().eq(1).click(function() {
        $("#content .para").hide();
        $("#content .comment").show();
        $("#content .right").css("height","2150px");
    })

    //点击加减按钮，改变input框中的数值
    $("#details .addtocar button").eq(0).click(function() {
        var num = parseInt($("#details .addtocar input").eq(0).val());
        $("#details .addtocar input").eq(0).val(num - 1);
        noZero();
        numOnly();
    })
    $("#details .addtocar button").eq(1).click(function() {
        var num = parseInt($("#details .addtocar input").eq(0).val());
        $("#details .addtocar input").eq(0).val(num + 1);
    })

    //输入框失去焦点时也要判断值
    $("#details .addtocar input").eq(0).change(function() {
        noZero();
        numOnly();
    })

    //输入框中只能输入数字(正则判断)
    function numOnly() {
        var reg = /^[\d]+$/;
        if(!reg.test($("#details .addtocar input").eq(0).val())){
            $("#details .addtocar input").eq(0).val(1);
        }
    }

    //输入框的值小于1，将其改成1，同时将减号的按钮更换
    function noZero(){
        if($("#details .addtocar input").eq(0).val() <= 0){
            $("#details .addtocar input").eq(0).val(1);
        }
    }


    //购物车
    //点击加入购物袋，将商品信息存入cookie
    $("#details .add").click(function() {
        //获取商品图片路径
        var pSrc = $(".photo img").eq(1).attr("src");
        //获取商品价格
        var pPrice = $(".literal .price .present").text();
        //获取商品名称
        var pName = $(".photo span").text();
        //获取商品id
        var pId = $(".smallpic img").eq(0).attr("id");
        //获取加入购物车的件数
        var pCount = $(".amount input").eq(0).val();

        //创建cookie
        //第三个参数"/"表明该cookie可以跨域请求
        $.cookie.setAll(pId,{src : pSrc , name : pName , price : pPrice , count : pCount},"/");
    })



    //侧边栏#help的点击事件
    //点击shopbag打开购物车页面
    $("#help .shopbag").click(function() {
        window.open("shoppingbag.html","_self");
    })

    //点击top返回顶部
    $("#help .toTop").click(function() {
        $("body,html").animate({scrollTop:0},1000)
    })
})