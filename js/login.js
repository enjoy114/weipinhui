// 点击切换页面
$('.header h3').click(function(res){
    console.log($(this).index());
    $(this).addClass('active')
    $(this).siblings().removeClass('active')
    // this.clsssName='active'
//  $('h3').eq(i).className='active'
    $('.dl>div').eq($(this).index()).css({"display":"block"})
    console.log($('.dl>div').eq($(this).index()));
    $('.dl>div').eq($(this).index()).siblings().css({ "display":"none" })
})

// 第一个文本框失去焦点
$('input').eq(0).blur(function () {
    if ($('input').eq(0).val()) {
        $('span').eq(1).html('')
        $('span').eq(1).css('color',"red")
    } else {
        $('span').eq(1).html('请输入登录名')
        $('span').eq(1).css('color', "red")
    }
})

// 第二个文本框市区叫焦点
$('input').eq(1).blur(function () {
    if ($('input').eq(1).val()) {
        $('span').eq(2).html('')
    } else {
        $('span').eq(2).html('请输入密码')
    }
})



// 点击登录
$('input').eq(2).click(function () {

    $.get('http://jx.xuzhixiang.top/ap/api/login.php', {
        username: $('input').eq(0).val(),
        password: $('input').eq(1).val()
    }, function (res) {
        alert(res.msg)
        localStorage.setItem('uid', res.data.id)
        localStorage.setItem('token', res.data.token)
        localStorage.setItem('username', res.data.username)
        // location.href = 'index.html'
        window.open("index.html")
    })
})