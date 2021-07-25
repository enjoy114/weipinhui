// 根据商品id获取商品详情
let id = location.search.split('=')[1]
let price
$.get('http://jx.xuzhixiang.top/ap/api/detail.php', { id }, function (res) {
    let obj = res.data
    // console.log(obj);
    $('.product_img').attr("src",obj.pimg)
    $('.product_id').html(`商品id:${obj.pid}`)
    $('.product_pname').html(obj.pname)
    $('.product_pdesc').html(obj.pdesc)
    $('.product_price').html(obj.pprice)
    price=obj.pprice*1000
    let sum=getSum(price,$('.product_num').val())/1000
    $('.product_sum').html(`￥${sum}`)
    
})
// 点击颜色选项卡
$('.product_color').click(function(){
    for(let i=0;i<$('.product_color').length;i++){
        $('.product_color').eq(i).css('border','1px solid #999')
        $('.product_color').eq(i).next().css('opacity','0')
    }
    $(this).css('border','2px solid #f43499')
    $(this).next().css('opacity','1')
})
// 点击尺码选项卡
$('.product_size').click(function(){
    for(let i=0;i<$('.product_size').length;i++){
        $('.product_size').eq(i).css('border','1px solid #999')
        $('.product_size').eq(i).next().css('opacity','0')
    }
    $(this).css('border','2px solid #f43499')
    $(this).next().css('opacity','1')
})
// 点击数量的减号按钮，并计算总价
$('.minus_btn').click(function(){
    let num=$('.product_num').val()
    if(num<=1){
        return
    }
    $('.product_num').val(num-1)
    let sum=getSum(price,$('.product_num').val())/1000
    $('.product_sum').html(`￥${sum}`)

})
// 点击数量的加号按钮，并计算总价
$('.plus_btn').click(function(){
    let num=$('.product_num').val()
    $('.product_num').val(parseInt(num)+1)
    let sum=getSum(price,$('.product_num').val())/1000
    $('.product_sum').html(`￥${sum}`)
})
function getSum(pnum,pprice){
   return pnum*pprice 
}



// 加入购物车
var timer=null
function enter(){
    // console.log('进来了')
    clearTimeout(timer)
    $('.shopping').css('display','block')
}
function leave(){
    // console.log('出去了，3秒后关闭')
    clearTimeout(timer)
    timer=setTimeout(()=>{
        $('.shopping').css('display','none')
    },3000)
}
$('.product_sum').click(function(){
    let num = $('.product_num').val()
    $.get('http://jx.xuzhixiang.top/ap/api/add-product.php', {
        uid: localStorage.getItem('uid'), pid: id, pnum: num
    }, function (res) {
        if ($('.shopping').css('display') == 'none') {//如果购物车是关着的，执行；否则不执行
            $('.shopping').css('display', 'block')
            $('.shopping').html(`添加购物车成功<a href="shopping.html">进入购物车</a>`)
            // console.log('不进来，3秒后关闭')
            clearTimeout(timer)
            timer = setTimeout(() => {
                $('.shopping').css('display', 'none')
            }, 3000)
            $('.shopping').unbind('mouseenter', enter)
            $('.shopping').unbind('mouseleave', leave)
            $('.shopping').on('mouseenter', enter)
            $('.shopping').on('mouseleave', leave)
        } else {
            clearTimeout(timer)
            timer = setTimeout(() => {
                $('.shopping').css('display', 'none')
            }, 3000)
        }
    })   
    }) 
$(document).click(function(e){ //点击不是购物车和价格的时候，关闭购物车弹窗
    if(!e.target.getAttribute('class')){
        $('.shopping').unbind('mouseenter',enter)
        $('.shopping').unbind('mouseleave',leave)
        clearTimeout(timer)
        $('.shopping').css('display','none')
        return
    }
    if(!e.target.getAttribute('class').includes('product_sum') && !e.target.getAttribute('class').includes('shopping')){
        $('.shopping').unbind('mouseenter',enter)
        $('.shopping').unbind('mouseleave',leave)
        clearTimeout(timer)
        $('.shopping').css('display','none')
    }
})
// 购物车页面的消失和出现
$('.buy_car').on('mouseenter',function(){
    console.log('出现')
    $('.shopping').css('display','block')
})
$('.buy_car').on('mouseleave',function(){
    clearTimeout(timer)
    timer = setTimeout(() => {
        $('.shopping').css('display', 'none')
    }, 3000)
    $('.shopping').unbind('mouseenter', enter)
    $('.shopping').unbind('mouseleave', leave)
    $('.shopping').on('mouseenter', enter)
    $('.shopping').on('mouseleave', leave)
})


// 放大图片
let fdj = document.querySelector('.photo')
let big = document.querySelector('.fdj_img')
fdj.onmouseenter = function () {
    big.style.width='1200px'
    big.style.height='1200px'
}
fdj.onmouseleave = function () {
    big.style.width = '420px'
    big.style.height = '420px'
    big.style.left =  '0px'
    big.style.top =  '0px'
}
fdj.onmousemove = function (evt) {
    // 鼠标在fdj内的坐标
    let mouseX = evt.pageX - fdj.offsetLeft
    let mouseY = evt.pageY - fdj.offsetTop
    // 鼠标不能移出div
    if (mouseX <= 0) {
        mouseX = 0
    }
    if (mouseY <= 0) {
        mouseY = 0
    }
    // 大图比小图
    let b = big.offsetWidth / fdj.offsetWidth
    let bigX = -mouseX * b
    console.log(bigX);
    let bigY = -mouseY * b
    if (bigX>-420){
        big.style.left = '0px'
    } else if (bigX<-1200){
        big.style.left = '-1200px'
    }else{
        big.style.left = bigX+420  + 'px'
    }
    if (bigY >-420) {
        big.style.top = '0px'
    } else if (bigY < -1200) {
        big.style.top= '-1200px'
    } else {
        big.style.top = bigY+420+ 'px'
    }
}
