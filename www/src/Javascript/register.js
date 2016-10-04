/**
 * Created by my on 2016/9/29.
 */

$(function() {

    //设置#register的.right内的随机4位数验证码
    //点击.right可改变验证码

    //运行就先调用生成一次验证码
    $("#register .right").html(getCode());

    //.right点击改变验证码
    $("#register .right").click(function() {
        //先将之前的验证码清空
        $(this).html("");
        //调用生成验证码函数
        $(this).html(getCode());
        //文本框清空
        $(".txt").val("");
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


    //输入框有内容时就改变按钮状态
    //propertychange用于IE
    $("#register .txt").bind("input propertychange", function() {
        if($("#register .txt").val() == ""){
            $("#register .button").css("background","#999999");
            $("#register .button").css("cursor","not-allowed");
        }else{
            $("#register .button").css("background","#e10482");
            $("#register .button").css("cursor","pointer");
            $("#register .button").attr("disabled",false);
        }
    })


    //当input文本框中有内容时，button可以点击，点击按钮的时候进行判断
    //内容相同进行注册，不相同提示不同并且禁止下一步操作
    //因为input属于表单元素，所以获取内容用val()
    $("#register .button").click(function() {
        if($("#register .txt").val() == ""){
            $("#register .button").css("background","#999999");
            $("#register .button").css("cursor","not-allowed");
            return false;
        }else{
            $("#register .button").css("background","#e10482");
            $("#register .button").css("cursor","pointer");
            $("#register .button").attr("disabled",false);
            if($("#register .txt").val() != $("#register .right").html()){
                alert("请输入正确的验证码");
                $("#register .txt").val("");
                $("#register .right").html(getCode());
            }else{
                $("#register .code").hide();
                $("#register .validation").show();
                $("#register .button").val("注册");
                $("#register .button").css("bottom","-40px");
            }
        }
    })



    //正则表达式判断注册信息是否符合要求
    $("#register .validation input").eq(0).blur(function() {
        isNickname();
    })

    //正则表达式判断注册信息是否符合要求
    $("#register .validation input").eq(1).blur(function() {
        isPassword();
    })

    //密码确认
    $("#register .validation input").eq(2).blur(function() {
        confirmPassword();
    })


    //判断用户名是否合格
    function isNickname() {
        var regnickname = /^\w{6,18}$/;
        var nickname = $("#register .validation input").eq(0).val();
        if(nickname == ""){
            $("#register .validation span").eq(0).html("请输入昵称").addClass("wrongSpan");
        }else if(!regnickname.test(nickname)){
            $("#register .validation span").eq(0).html("昵称格式不正确").addClass("wrongSpan");
        }else if(regnickname.test(nickname) && $.cookie.getAll(nickname).password != undefined){
            $("#register .validation span").eq(0).html("昵称已存在，换一个吧").addClass("wrongSpan");
        }else{
            $("#register .validation span").eq(0).html("昵称符合标准").removeClass().addClass("rightSpan");
        }
    }

    //判断密码是够合格
    function isPassword() {
        var regpassword = /^\w{6,18}$/;
        if($("#register .validation input").eq(1).val() == ""){
            $("#register .validation span").eq(1).html("请设置密码").addClass("wrongSpan");
        }else if(!regpassword.test($("#register .validation input").eq(1).val())){
            $("#register .validation span").eq(1).html("密码格式不正确").addClass("wrongSpan");
            $("#register .validation input").eq(1).val("");
        }else{
            $("#register .validation span").eq(1).html("请再下行再输入一次密码").removeClass().addClass("rightSpan");
        }
    }

    //验证两次输入密码是否相同
    function confirmPassword() {
        if($("#register .validation input").eq(2).val() == ""){
            $("#register .validation span").eq(1).html("请输入确认密码").addClass("wrongSpan");
            $("#register .validation input").eq(2);
        }else if($("#register .validation input").eq(2).val() != $("#register .validation input").eq(1).val()){
            $("#register .validation span").eq(1).html("密码输入不一致").addClass("wrongSpan");
            $("#register .validation input").eq(2).val("");
        }else{
            $("#register .validation span").eq(1).html("填写资料成功").removeClass().addClass("rightSpan");
        }
    };

    //设置注册按钮的单击事件
    $("#register .button").click(function() {
        if($("#register .validation span").eq(1).html() == "填写资料成功" && $("#register .insure input").is(":checked")){
            //将用户名和密码存入cookie
            //第四个参数/表明cookie可以跨域求情
            $.cookie.setAll($("#register .validation input").eq(0).val(),
                {password : $("#register .validation input").eq(2).val()},
                "/"
            );
            //回到主页
            window.open("../index.html","_self");
        }
    });

    //侧边栏#help的点击事件
    //点击shopbag打开购物车页面
    $("#help .shopbag").click(function() {
        window.open("shoppingbag.html","_self");
    })

    //点击top返回顶部
    $("#help .toTop").click(function() {
        $("body,html").animate({scrollTop:0},1000)
    })


});