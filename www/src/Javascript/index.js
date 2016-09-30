/**
 * Created by my on 2016/9/28.
 */


$(function() {

    //#hot轮播图
    var ulNode = $("#hot ul");

    //向前或者向后键的显示(鼠标移上或移出#hot时)
    $("#hot").bind("mouseenter mouseleave",function() {
        $("#prev,#next").stop().fadeToggle("slow");
    });

    // 翻前页和后页
    //向前向后键点击执行clickPreOrNext函数
    $("#prev, #next").bind("click", clickPreOrNext);
    //点击右下方span执行clickHot函数
    $("#counter span").bind("click", clickHot);

    //设置初始值
    function init() {
        ulNode.timer = null;
        //ulNode.date是设置一个临时数据缓存
        ulNode.data("pageIndex", 0);
        //调用轮播函数
        wave();
    };

    //判断是左还是右按钮点击
    function clickPreOrNext(){
        //先清空之前的定时器
        clearInterval(ulNode.timer);
        //通过id名判断点击的是哪个按钮
        //然后再调用向左或者向右的函数
        if ($(this).attr("id") == "prev") {
            turnPage("left");
        } else {
            turnPage("right");
        }
        //调用向左或向右函数之后继续执行轮播函数
        wave();
    }

    //右下方span点击时的事件
    function clickHot() {
        //先记录下当前点击span的下标
        var index = $(this).index();
        //之后调用以下三个函数
        renderHot(index);
        turnPage(index);
        wave();
    }

    //500毫秒让ulNode往左走相应的距离(一张图片的宽度)
    function ulNodeplay(pageIndex) {
        ulNode.stop().animate({left: -$("#hot").width() * pageIndex}, 500);
    }

    //轮播(定时器，且方向为右)
    function wave(){
        clearInterval(ulNode.timer);
        ulNode.timer = setInterval(function(){
            turnPage("right");
        }, 2000);
    }

    //轮播效果
    function turnPage(direction){
        //取出零时缓存数据pageIndex
        var pageIndex = ulNode.data("pageIndex");

        if (direction == "left") {
            if (pageIndex == 0) {
                ulNode.css("left", -ulNode.width() + $("#hot").width());
                pageIndex = 3;
            }
            --pageIndex;
            renderHot(pageIndex);

        }
        if (direction == "right") {
            ++pageIndex;
            //第四张图片时其实也是第一张图片
            if (pageIndex == 4) {
                ulNode.css("left", 0);
                pageIndex = 1;
            }
            // 当页面在第3张 准备跳到第4张的时候进行设置，否则直接执行
            if (pageIndex == 3) {
                renderHot(0);
            } else {
                renderHot(pageIndex);
            }

        }
        //传入的是数字的时候，直接执行即可
        if (typeof direction == "number") {
            pageIndex = direction;
            renderHot(pageIndex);
        }
        //执行之后设置当下的pageIndex然后继续调用
        ulNode.data("pageIndex", pageIndex);
        ulNodeplay(pageIndex);
    }

    //随着图片变化改变下方span样式
    function renderHot(index){
        $("#counter").children().eq(index).addClass("active")
            .siblings().removeClass("active")
    }

    init();


    //#nav .bottom中的点击显示对应的页面内容(即滚动条的高度有变化)
    //$("#nav .bottom").children().eq(0)是ul,单击事件是其下的子元素
    $("#nav .bottom").children().eq(0).children().eq(0).click(function() {
        $("body,html").animate({"scrollTop" : 0},200)
    });
    $("#nav .bottom").children().eq(0).children().eq(1).click(function() {
        $("body,html").animate({"scrollTop" : 543},800)
    })
    $("#nav .bottom").children().eq(0).children().eq(2).click(function() {
        $("body,html").animate({"scrollTop" : 1024},1600)
    })
    $("#nav .bottom").children().eq(0).children().eq(3).click(function() {
        $("body,html").animate({"scrollTop" : 9540},4000)
    })
    $("#nav .bottom").children().eq(0).children().eq(4).click(function() {
        $("body,html").animate({"scrollTop" : 10490},4500)
    })
    $("#nav .bottom").children().eq(0).children().eq(5).on("mouseenter mouseleave",function() {
        $("#nav .code").stop().fadeToggle();
    })

    //.code鼠标移上显示，离开消失
    $("#nav .code").bind("mouseenter mouseleave",function() {
        $(this).stop().fadeToggle();
    })


    //#first-floor,#third-floor里的div鼠标移上透明度变化
    $("#first-floor div").on("mouseover",function() {
        $(this).stop().animate({opacity:0.7},500)
    })
    $("#first-floor div").on("mouseout",function() {
            $(this).stop().animate({opacity:1},500)
    })

    //#third-floor里的div鼠标移上透明度变化
    $("#third-floor div").on("mouseover",function() {
        $(this).find("img").stop().animate({opacity:0.7},500)
    })
    $("#third-floor div").on("mouseout",function() {
        $(this).find("img").stop().animate({opacity:1},500)
    })

    //#fourth-floor里鼠标移上图片上移
    $("#fourth-floor dl").on("mouseover",function() {
        $(this).stop().animate({marginTop:"-30px"},500)
    })
    $("#fourth-floor dl").on("mouseout",function() {
        $(this).stop().animate({marginTop:"0"},500)
    })

    //侧边栏#help的点击事件
    //点击shopbag打开购物车页面
    $("#help .shopbag").click(function() {
        window.open("html/shoppingbag.html","_self");
    })

    //点击top返回顶部
    $("#help .toTop").click(function() {
        $("body,html").animate({scrollTop:0},1000)
    })
})