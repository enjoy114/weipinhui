
$('.logo3').children().eq(0).on('focus', function () {
    $('.logo3_search').css('display', 'block')
})
$('.logo3').children().eq(0).on('blur', function () {
    $('.logo3_search').css('display', 'none')
})
// 搜索内容改变
function box(obj) {
    console.log(obj);
    let arr = obj.s
    let html = ''
    arr.forEach(function (v, i) {
        html += `<li>${arr[i]}</li>`
    })
    console.log(html);
    $('.logo3_search').html(html)
}
function inputFn(){
    let value = $('.logo3').children().eq(0).val()
    // 创建script标签元素
    let sc = document.createElement('script')
    // 利用script标签的src属性进行跨域请求    cb=box是一个回调函数，所以要建一个box函数
    sc.src = `https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=${value}&cb=box&_=1623826766230`
    //在body内添加script，显示
    document.body.appendChild(sc)
    // 在body内删除script，因为添加一个就多一个script，原来的要删除，所以要移除
    document.body.removeChild(sc)
    // 当输入框为空时，ul的内容为默认值
    if (value == '') {
        $('.logo3_search').html('女式休闲裤')
    }
}

