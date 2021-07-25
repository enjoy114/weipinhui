// 轮播图
var mySwiper = new Swiper('.swiper-container', {
    // direction: 'vertical', // 垂直切换选项
    autoplay: {
        delay:1000,
    }, //自动切换模式开启
    loop: true, // 循环模式选项
    effect: 'fade', //切换效果 fade 淡入，cube方块，coverflow（3d流）flip（3d翻转）不加 默认为slide(位移切换)
    // 如果需要分页器
    pagination: {
        el: '.swiper-pagination', //分页器容器标签
        clickable: true, //点击小点的效果
    },
    // 如果需要前进后退按钮
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    },
    on: {
        slideChangeTransitionStart: function(){ //slide动画开始滑动的时候
            for(let i=0;i<$('.ph').children().length;i++){//先把.ph下边的所有节点去掉class类
                $('.ph').children().eq(i).removeAttr('class')
            }
            $('.ph').children().eq(this.realIndex).attr('class','active')//轮播的索引==选项卡的索引，另外加上class=active
        },
      },
})
for(let i=0;i<$('.ph').children().length;i++){
    $('.ph').children().eq(i).mouseover(()=>{//.ph下边的每一个选项加一个点击事件
        // console.log(i)
        // console.log(mySwiper)
        mySwiper.slideToLoop(i)//点击哪个就滑倒哪一个轮播
        setTimeout(()=>{
            mySwiper.autoplay.start();//3秒之后轮播继续自动播放
        },3000)
    })
}
// 固定定位
var trigger_once=false
$(window).scroll(()=>{
    let scrollTop=$(this).scrollTop()
    if(scrollTop>=171){
        if(!trigger_once){//为啥带个！
            trigger_once=true
            $('.plist_box').css('position','fixed')
            $('.plist_box').css('top','-43px')
            let num=-43
            var timer=setInterval(()=>{
                num+=1
                $('.plist_box').css('top',num+'px')
                if(num==0){
                    clearInterval(timer)
                }
            },10)
            $('.oplist_box').css('display','block')
        }
    }else{
        trigger_once=false
        $('.oplist_box').css('display','none')
        $('.plist_box').css('position','inherit')
    }
})
