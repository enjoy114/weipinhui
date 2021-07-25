// 注册验证
let flag = false
// console.log($('input').eq(3));
// 当第一个文本框失去焦点时，先判断内容是否为空，然后再进行正则验算
$('input').eq(0).blur(function () {
    if ($('input').eq(0).val()){
        console.log($('input').eq(0).val());
        reg = /^1[3-9][0-9]{9}$/
        if (reg.test($('input').eq(0).val())) {
            let url = 'http://jx.xuzhixiang.top/ap/api/checkname.php'
            $.get(url, { username: $('input').eq(0).val() }, function (res) {
                // console.log(res);
                $('span').eq(0).html(res.msg)
                $('span').eq(0).css("color", "red")
                if (res.code == 1) {
                    $('span').eq(0).html(res.msg)
                    $('span').eq(0).css("color", "red")
                    flag = true
                } else {
                    $('span').eq(0).html("请输入正确的手机号")
                    $('span').eq(0).css("color", "red")
                }
            })
        } else {
            $('span').eq(0).html('手机号输入错误，无法获取验证码')
            $('span').eq(0).css("color", "red")
        }
    }else{
        $('span').eq(0).html('手机号不能为空')
        $('span').eq(0).css("color", "red")
        return
    }
   
})

// 第二个文本框失去焦点时，验证密码
let isPassword = false
$('input').eq(1).blur(function () {
    if ($('input').eq(1).val()){
        reg = /^\S{8,20}$/
        if (reg.test($('input').eq(1).val())) {
            $('span').eq(1).html("密码格式正确")
            $('span').eq(1).css("color", "red")
            isPassword = true
        } else {
            $('span').eq(1).html("密码格式不正确")
            $('span').eq(1).css("color", "red")
        }
    }else{
        $('span').eq(1).html("密码不能为空")
        $('span').eq(1).css("color", "red")
    }
    
})


// 第三个文本框应与第二个文本框的值一样
let isUsePassword=false
$('input').eq(2).blur(function () {
    if ($('input').eq(2).val() == $('input').eq(1).val()) {
        $('span').eq(2).html("密码格式正确")
        $('span').eq(2).css("color", "red")
        isUsePassword = true
    } else {
        $('span').eq(2).html("二次输入的密码不一致")
        $('span').eq(2).css("color", "red")
    }
})
$('input').eq(4).click(function () {
    //!!是把undefined转为Boolean
    if (flag && isPassword && isUsePassword && $('input')[3].checked) {
        console.log(111);
        $.get('http://jx.xuzhixiang.top/ap/api/reg.php', {
            username: $('input').eq(0).val(),
            password: $('input').eq(1).val()
        }, function (res) {
            console.log(res);
            alert(res.msg)
            location.href = "login.html"
        })
    }
})