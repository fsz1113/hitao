/**
 * Created by my on 2016/10/3.
 */
$(function() {

    //购物车没有商品时，显示.empty,否则显示.full
    if($.cookie.getAll("pic1").id == undefined){
        $(".empty").show();
        $(".full").hide();
    }else{
        $(".empty").hide();
        $(".full").show();
    }

    //遍历document.cookie，若其中有id属性，则取出
    var cookies = document.cookie.split("; ");
    for(var i = 0;i < cookies.length;i++){
        var cookiekey = cookies[i].split("=");
        //cookiekey[1]的前两位是id,说明该cookie存在的是商品信息
        if(/^[id]{2}$/.test(cookiekey[1].substring(0,2))){
            //获取当前的id名来获取之后的id
            var newId = cookiekey[0];
            //读取出之前存在cookie中的商品信息
            //创建新的tr追加到tbody中
            var newTr = $("<tr id=" + newId + ">" +
                "<td><input type='checkbox'/></td>"
                + "<td><img src=" + $.cookie.getAll(newId).src+ "/>"
                + $.cookie.getAll(newId).name +"</td>"
                + "<td>￥" + $.cookie.getAll(newId).price +"</td>"
                + "<td><div><button>-</button>" + "<input class='no1' value=" + $.cookie.getAll(newId).count + "><button>+</button></div></td>"
                + "<td class='onetotal'>￥" + ($.cookie.getAll(newId).price * $.cookie.getAll(newId).count).toFixed(2) + "</td>"
                + "<td>删除</td>"
                +"</tr>");
            $("tbody").append(newTr);
        }
    }

    //商品总价
    $(".total").text("￥" + ($.cookie.getAll('pic1').price * $.cookie.getAll('pic1').count).toFixed(2));

    //按钮单击事件
    $(document).on("click","table button",function() {
        judge($(this));
        numOnly($(this));
        noZero($(this));
        resetCookie($(this));
        reTotal($(this));
    })

    //输入框状态改变时
    $(document).on("input propertychange",".no1",function() {
        numOnly($(this));
        noZero($(this));
        resetCookie($(this));
        reTotal($(this));
    })


    //判断按钮加减
    function judge(obj){
        if(obj.text() == "-"){
            //点击减的时候，文本框的数字减1
            obj.parent().children().eq(1).val(obj.parent().children().eq(1).val() - 1);
        }else{
            //点击加的时候，文本框的数字加1
            var num = 1 + parseInt(obj.parent().children().eq(1).val());
            obj.parent().children().eq(1).val(num);
        }
    }

    //输入框中只能输入数字(正则判断)
    //如果有不是数字的，改成数字1
    function numOnly(obj) {
        var reg = /^[\d]+$/;
        var a = obj.parent().children().eq(1).val();
        if(!reg.test(a)){
            obj.parent().children().eq(1).val(1);
        }
    }

    //输入框的值小于1，同时将其改成1不变
    //输入框的值大于20，变成20不变
    function noZero(obj){
        if(obj.parent().children().eq(1).val() <= 0){
            obj.parent().children().eq(1).val(1);
        }else if(obj.parent().children().eq(1).val() >= 20){
            obj.parent().children().eq(1).val(20);
        }
    }

    //重新创建一个cookie
    function resetCookie(obj){
        var againId = obj.parent().parent().parent().attr("id");
        $.cookie.setAll(againId,{id : againId ,
                src : $.cookie.getAll(againId).src ,
                name : $.cookie.getAll(againId).name ,
                price : $.cookie.getAll(againId).price ,
                count : obj.parent().children().eq(1).val()},
            "/");
    }

    //重新计算总金额
    function reTotal(obj){
        //总金额 = 总件数 * 单价
        var totalPrice = obj.parent().children().eq(1).val() * obj.parent().parent().prev().text().substring(1);
        obj.parent().parent().next().text("￥" + totalPrice.toFixed(2));
        $(".total").text("￥" + totalPrice.toFixed(2));
    }

    //复选框
    //console.log($("table input:checkbox").not(".allCheck"))
    //console.log($(".allCheck").is(":checked"))

    //不是全部复选框都勾选的情况下，若第一个复选框勾选，其他所有的复选框勾选
    //所有复选框在全部勾选状态下，点第一个复选框，所有复选框全部不勾选
    $(".allCheck").change(function() {
        if($(this).is(":checked")){
            $("table input:checkbox").not(".allCheck").attr("checked",true);
        }else{
            $("table input:checkbox").not(".allCheck").attr("checked",false);
        }
    })

    //除第一个之外所有复选框勾选，第一个自动勾选
    //除第一个之外所有复选框不勾选，第一个复选框也不勾选
    $("table input:checkbox").not(".allCheck").on("change",function() {
        //下方的复选框全选
        if($("table input:checkbox").not(".allCheck").length == $("tbody input:checkbox:checked").length){
            $(".allCheck").attr("checked",true);
        }else{
            $(".allCheck").attr("checked",false);
        }
    })

})