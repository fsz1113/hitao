/**
 * Created by my on 2016/9/30.
 */

$(function() {
    //设置#login .top中li的点击事件
    $("#login .top li").click(function() {
        //点击的类名变为active,其余的为normal
        $("#login .top li").removeClass("active").addClass("normal");
        $(this).addClass("active");;
    })

    //点击不同的li时对应下方不同的div显示(Tab切换)
    $("#login .top li").eq(0).click(function() {
        $(".QRcode").hide();
        $(".account").show();
    })

    $("#login .top li").eq(1).click(function() {
        $(".account").hide();
        $(".QRcode").show();
    })

    //点击获取验证码

    //运行就先调用生成一次验证码
    $("#login .pic").html(getCode());

    //.right点击改变验证码
    $("#login .pic").click(function() {
        //先将之前的验证码清空
        $(this).html("");
        //调用生成验证码函数
        $(this).html(getCode());
        //文本输入框清空
        $(".code input").eq(0).val("");
    })

    //得到验证码函数
    function getCode(){
        var randomCode = [];
        for( var i = 0; i < 4; i++){
            var randomNum = parseInt(Math.random() * 48 + 75);
            if( randomNum > 57 && randomNum < 65 || randomNum > 90 && randomNum < 97 ){
                i--;
            }else{
                randomCode[i] = String.fromCharCode(randomNum);
            }
        }
        return randomCode;
    }


    //.account页面的判断
    //判断账号是否填写
    $("#login input").eq(0).blur(function() {
        input0($(this));
    })

    //判断密码是否填写
    $("#login input").eq(1).blur(function() {
        input1($(this));
    })

    //.QRcode页面的判断
    //判断账号是否填写
    $("#login input").eq(2).blur(function() {
        input2($(this));
    })

    //判断验证码是否填写
    $("#login input").eq(3).blur(function() {
        input3($(this));
    })


    //点击按钮进入主页
    $("#login button").click(function() {
        //.account情况下点击
        var value = $("#login input").eq(0).val();
        var value2 = $("#login input").eq(1).val();

        //再判断输入的账户和密码是否和cookie已经存在的相同
        //不同时，提示账号或者密码错误，相同时登陆进入主页

        if(value == "" && value2 == ""){
            //用户名密码都没有填写
            $("#login span").eq(0).text("请输入用户名").addClass("wrongSpan");
            $("#login span").eq(1).text("请输入密码").addClass("wrongSpan");
        }else if(value == "" || value2 == "") {
            //用户名密码有一个没有填写
            $("#login span").eq(0).text("")
            $("#login span").eq(1).text("请输入完整的用户名和密码").addClass("wrongSpan");
        }else if($.cookie.getAll(value).password == undefined && value2 != ""){
            //用户名和密码都填写但是用户名在cookie中不存在
            $("#login span").eq(1).text("请输入正确的用户名或密码").addClass("wrongSpan");
            $("#login input").eq(1).val("");
        }else if($.cookie.getAll(value) != undefined && value2 != $.cookie.getAll(value).password ){
            //用户名在cookie中存在但是密码错误
            $("#login span").eq(1).text("请输入正确的用户名或密码").addClass("wrongSpan");
            $("#login input").eq(1).val("");
        }else{
            //成功登陆
            $("#login input").eq(0).val("");
            $("#login input").eq(1).val("");
            window.open("../index.html","_self");
        }


        //.RQcode下的点击
        var value3 = $("#login input").eq(2).val();
        var value4 = $("#login input").eq(3).val();

        if(value3 == "" && value4 == ""){
            //用户名密码都没有填写
            $("#login span").eq(2).text("请输入用户名").addClass("wrongSpan");
            $("#login span").eq(3).text("请输入验证码").addClass("wrongSpan");
        }else if(value3 == "" || value4 == "") {
            //用户名验证码有一个没有填写
            $("#login span").eq(2).text("")
            $("#login span").eq(3).text("请输入完整的用户名和验证码").addClass("wrongSpan");
        }else if($.cookie.getAll(value3).password == undefined && value4 != ""){
            //用户名和验证码都填写但是用户名在cookie中不存在
            $("#login span").eq(3).text("请输入正确的用户名").addClass("wrongSpan");
            $("#login input").eq(2).val("");
            $("#login input").eq(3).val("");
        }else if($.cookie.getAll(value3).password != undefined && value4 != $("#login .pic").html() ){
            //用户名在cookie中存在但是验证码错误
            $("#login span").eq(3).text("请输入正确的验证密码").addClass("wrongSpan");
            $("#login input").eq(4).val("");
        }else{
            $("#login input").eq(3).val("");
            $("#login input").eq(4).val("");
            window.open("../index.html","_self");
        }
    })

    function input0(obj){
        if(obj.val() == ""){
            $("#login span").eq(0).text("请输入账号").addClass("wrongSpan");
            $("#login .account .name").css("border","1px solid #ed0e8d");
        }else{
            $("#login span").eq(0).text("");
            $("#login .account .name").css("border","1px solid #cccccc");
        }
    };

    function input1(obj) {
        if(obj.val() == ""){
            $("#login span").eq(1).text("请输入密码").addClass("wrongSpan");
            $("#login .account .psd").css("border","1px solid #ed0e8d");
        }else{
            $("#login span").eq(1).text("");
            $("#login .account .psd").css("border","1px solid #cccccc");
        }
    }

    function input2(obj) {
        if(obj.val() == ""){
            $("#login span").eq(2).text("请输入账号").addClass("wrongSpan");
            $("#login .QRcode .name").css("border","1px solid #ed0e8d");
        }else{
            $("#login span").eq(2).text("");
            $("#login .QRcode .name").css("border","1px solid #cccccc");
        }
    }

    function input3(obj) {
        if(obj.val() == ""){
            $("#login span").eq(3).text("请输入验证码").addClass("wrongSpan");
            $("#login .QRcode .code").css("border","1px solid #ed0e8d");
        }else{
            $("#login span").eq(3).text("");
            $("#login .QRcode .code").css("border","1px solid #cccccc");
        }
    }

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
